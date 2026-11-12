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

  if (parsed.data.inviteCode) {
    const { error: inviteError } = await supabase.rpc("claim_employee_invite", {
      p_code: parsed.data.inviteCode,
    });

    if (inviteError) {
      return {
        message: `Your account was created, but the invite code could not be claimed: ${inviteError.message}`,
      };
    }
  }

  if (!data.session) {
    return {
      message: "Account created. Check your email to confirm it, then log in.",
      success: true,
    };
  }

  redirect("/employee");
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

  if (!data.session) {
    return {
      message: "Account created. Check your email to confirm it, then log in.",
      success: true,
    };
  }

  redirect("/organisation");
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`Could not log out: ${error.message}`);
  }

  redirect("/login");
}
