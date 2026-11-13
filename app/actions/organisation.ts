"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getMyOrganisation } from "@/lib/data/organisation";
import { createClient } from "@/lib/supabase/server";
import type {
  AddEmployeeState,
  OrganisationActionResult,
} from "@/types/organisation";

const optionalText = z.preprocess(
  (value) => {
    if (value === null || value === undefined) {
      return undefined;
    }
    if (typeof value === "string" && value.trim() === "") {
      return undefined;
    }
    return value;
  },
  z.string().trim().max(120, "Use 120 characters or fewer.").optional()
);

const addEmployeeSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter the employee's full name.")
    .max(120),
  email: z.preprocess(
    (value) =>
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "")
        ? undefined
        : value,
    z.string().trim().email("Enter a valid email address.").optional()
  ),
  employeeId: optionalText,
  department: optionalText,
  designation: optionalText,
  officeLocation: optionalText,
});

const statusSchema = z.object({
  employeeId: z.string().trim().min(1, "Employee ID is required."),
  status: z.enum(["active", "inactive"]),
});

type AuthorisationResult =
  | { ok: true; organisationId: string }
  | { ok: false; error: string };

async function getAuthorisedOrganisation(): Promise<AuthorisationResult> {
  let context;

  try {
    context = await getMyOrganisation();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Organisation access failed.";
    return {
      ok: false,
      error: `Could not verify organisation access: ${message}`,
    };
  }

  if (!context.userId) {
    return { ok: false, error: "Please sign in to manage employees." };
  }

  if (!context.organisation) {
    return { ok: false, error: "You do not have access to an organisation." };
  }

  if (!context.roles.some((role) => ["org_admin", "hr_admin"].includes(role))) {
    return {
      ok: false,
      error: "Only organisation admins and HR admins can manage employees.",
    };
  }

  if (context.organisation.status !== "verified") {
    return {
      ok: false,
      error:
        "Your organisation is awaiting verification. Employee changes are unavailable until it is verified.",
    };
  }

  return { ok: true, organisationId: context.organisation.id };
}

export async function addEmployee(
  _previousState: AddEmployeeState,
  formData: FormData
): Promise<AddEmployeeState> {
  const parsed = addEmployeeSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    employeeId: formData.get("employeeId"),
    department: formData.get("department"),
    designation: formData.get("designation"),
    officeLocation: formData.get("officeLocation"),
  });

  if (!parsed.success) {
    return {
      message: "Please correct the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const access = await getAuthorisedOrganisation();
  if (!access.ok) {
    return { message: access.error };
  }

  const inviteCode = randomBytes(8).toString("hex").toUpperCase();
  const supabase = await createClient();
  const { error } = await supabase.from("employees").insert({
    organisation_id: access.organisationId,
    user_id: null,
    full_name: parsed.data.fullName,
    email: parsed.data.email ?? null,
    employee_id: parsed.data.employeeId ?? null,
    department: parsed.data.department ?? null,
    designation: parsed.data.designation ?? null,
    office_location: parsed.data.officeLocation ?? null,
    status: "invited",
    invite_code: inviteCode,
  });

  if (error) {
    return { message: `Could not add employee: ${error.message}` };
  }

  revalidatePath("/organisation");
  revalidatePath("/organisation/employees");
  return {
    success: true,
    message: "Employee added. Share this invite code with them.",
    inviteCode,
  };
}

export async function setEmployeeStatus(
  employeeId: string,
  status: string
): Promise<OrganisationActionResult> {
  const parsed = statusSchema.safeParse({ employeeId, status });
  if (!parsed.success) {
    return {
      success: false,
      message: "The employee status request is invalid.",
    };
  }

  const access = await getAuthorisedOrganisation();
  if (!access.ok) {
    return { success: false, message: access.error };
  }

  const supabase = await createClient();
  const { data: employee, error: employeeError } = await supabase
    .from("employees")
    .select("id, user_id, status")
    .eq("id", parsed.data.employeeId)
    .eq("organisation_id", access.organisationId)
    .maybeSingle();

  if (employeeError) {
    return {
      success: false,
      message: `Could not check employee status: ${employeeError.message}`,
    };
  }

  if (!employee) {
    return {
      success: false,
      message: "Employee not found in your organisation.",
    };
  }

  if (!employee.user_id || employee.status === "invited") {
    return {
      success: false,
      message: "Invited employees cannot be deactivated or reactivated.",
    };
  }

  const { data: updatedEmployee, error } = await supabase
    .from("employees")
    .update({ status: parsed.data.status })
    .eq("id", employee.id)
    .eq("organisation_id", access.organisationId)
    .not("user_id", "is", null)
    .select("id")
    .maybeSingle();

  if (error) {
    return {
      success: false,
      message: `Could not update employee status: ${error.message}`,
    };
  }

  if (!updatedEmployee) {
    return {
      success: false,
      message: "Employee status was not changed. Please check your permissions and try again.",
    };
  }

  revalidatePath("/organisation");
  revalidatePath("/organisation/employees");
  return {
    success: true,
    message: `Employee ${parsed.data.status === "active" ? "reactivated" : "deactivated"}.`,
  };
}
