"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { AuthActionState } from "@/lib/auth/action-state";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.");

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

const employeeRegistrationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s().-]{7,20}$/, "Enter a valid phone number."),
  password: passwordSchema,
  inviteCode: z.preprocess(
    (value) => (value === null ? "" : value),
    z.string().trim()
  ),
});

const organisationRegistrationSchema = z.object({
  organisationName: z.string().trim().min(2, "Enter the organisation name."),
  officialEmail: z.string().trim().email("Enter a valid official email."),
  organisationType: z.string().trim().min(2, "Enter the organisation type."),
  officeAddress: z.string().trim().min(5, "Enter the office address."),
  contactNumber: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s().-]{7,20}$/, "Enter a valid contact number."),
  adminName: z.string().trim().min(2, "Enter the admin's name."),
  password: passwordSchema,
});

function fieldErrors(error: z.ZodError): AuthActionState {
  return {
    fieldErrors: z.flattenError(error).fieldErrors,
    message: "Please correct the highlighted fields.",
  };
}

export async function login(
  _previousState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return fieldErrors(parsed.error);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { message: error.message };
  }

  const { data: membership, error: membershipError } = await supabase
    .from("organisation_members")
    .select("id")
    .eq("user_id", data.user.id)
    .limit(1)
    .maybeSingle();

  if (membershipError) {
    return { message: `Signed in, but could not check organisation access: ${membershipError.message}` };
  }

  redirect(membership ? "/organisation" : "/employee");
}

export async function registerEmployee(
  _previousState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = employeeRegistrationSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    inviteCode: formData.get("inviteCode"),
  });

  if (!parsed.success) {
    return fieldErrors(parsed.error);
  }

  let destination: "/employee" | "/organisation" | null = null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        data: {
          full_name: parsed.data.fullName,
          phone: parsed.data.phone,
        },
      },
    });

    if (error) {
      return { message: error.message };
    }

    let session = data.session;
    if (!session) {
      try {
        const { data: signInData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email: parsed.data.email,
            password: parsed.data.password,
          });

        if (signInError || !signInData.session) {
          return {
            message: "Account created. Please log in.",
            showLoginLink: true,
          };
        }

        session = signInData.session;
      } catch (signInException) {
        console.error(
          "Unexpected error signing in a newly registered employee.",
          signInException
        );
        return {
          message: "Account created. Please log in.",
          showLoginLink: true,
        };
      }
    }

    if (parsed.data.inviteCode) {
      try {
        const { error: inviteError } = await supabase.rpc(
          "claim_employee_invite",
          { p_code: parsed.data.inviteCode }
        );

        if (inviteError) {
          return {
            message: `Your account was created, but the invite code could not be claimed: ${inviteError.message}`,
          };
        }
      } catch (inviteException) {
        console.error(
          "Unexpected error claiming an employee invite.",
          inviteException
        );
        return {
          message:
            "Your account was created, but the invite code could not be claimed. Please log in and try again.",
          showLoginLink: true,
        };
      }
    }

    const { data: membership, error: membershipError } = await supabase
      .from("organisation_members")
      .select("id")
      .eq("user_id", session.user.id)
      .limit(1)
      .maybeSingle();

    if (membershipError) {
      return {
        message: `Your account was created, but organisation access could not be checked: ${membershipError.message}`,
      };
    }

    destination = membership ? "/organisation" : "/employee";
  } catch (registrationException) {
    console.error(
      "Unexpected error during employee registration.",
      registrationException
    );
    return {
      message:
        "Registration could not be completed. If your account was created, please log in.",
      showLoginLink: true,
    };
  }

  if (!destination) {
    console.error("Employee registration completed without a destination.");
    return {
      message:
        "Your account was created, but portal access could not be determined. Please log in.",
      showLoginLink: true,
    };
  }

  redirect(destination);
}

export async function registerOrganisation(
  _previousState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = organisationRegistrationSchema.safeParse({
    organisationName: formData.get("organisationName"),
    officialEmail: formData.get("officialEmail"),
    organisationType: formData.get("organisationType"),
    officeAddress: formData.get("officeAddress"),
    contactNumber: formData.get("contactNumber"),
    adminName: formData.get("adminName"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return fieldErrors(parsed.error);
  }

  let destination: "/employee" | "/organisation" | null = null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.officialEmail,
      password: parsed.data.password,
      options: {
        data: {
          full_name: parsed.data.adminName,
          phone: parsed.data.contactNumber,
        },
      },
    });

    if (error) {
      return { message: error.message };
    }

    let session = data.session;
    if (!session) {
      try {
        const { data: signInData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email: parsed.data.officialEmail,
            password: parsed.data.password,
          });

        if (signInError || !signInData.session) {
          return {
            message: "Account created. Please log in.",
            showLoginLink: true,
          };
        }

        session = signInData.session;
      } catch (signInException) {
        console.error(
          "Unexpected error signing in a newly registered organisation admin.",
          signInException
        );
        return {
          message: "Account created. Please log in.",
          showLoginLink: true,
        };
      }
    }

    try {
      const { error: organisationError } = await supabase.rpc(
        "create_organisation",
        {
          p_name: parsed.data.organisationName,
          p_official_email: parsed.data.officialEmail,
          p_org_type: parsed.data.organisationType,
          p_office_address: parsed.data.officeAddress,
          p_contact_number: parsed.data.contactNumber,
        }
      );

      if (organisationError) {
        return {
          message: `The admin account was created, but the organisation could not be created: ${organisationError.message}`,
        };
      }
    } catch (organisationException) {
      console.error(
        "Unexpected error creating an organisation.",
        organisationException
      );
      return {
        message:
          "The admin account was created, but the organisation could not be created. Please log in and try again.",
        showLoginLink: true,
      };
    }

    const { data: membership, error: membershipError } = await supabase
      .from("organisation_members")
      .select("id")
      .eq("user_id", session.user.id)
      .limit(1)
      .maybeSingle();

    if (membershipError) {
      return {
        message: `The admin account and organisation were created, but organisation access could not be checked: ${membershipError.message}`,
      };
    }

    destination = membership ? "/organisation" : "/employee";
  } catch (registrationException) {
    console.error(
      "Unexpected error during organisation registration.",
      registrationException
    );
    return {
      message:
        "Registration could not be completed. If your account was created, please log in.",
      showLoginLink: true,
    };
  }

  if (!destination) {
    console.error(
      "Organisation registration completed without a destination."
    );
    return {
      message:
        "Your account was created, but portal access could not be determined. Please log in.",
      showLoginLink: true,
    };
  }

  redirect(destination);
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`Could not log out: ${error.message}`);
  }

  redirect("/login");
}
