import "server-only";

import { createClient } from "@/lib/supabase/server";
import type {
  MyOrganisation,
  OrganisationEmployee,
} from "@/types/organisation";

export async function getMyOrganisation(): Promise<MyOrganisation> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(`Could not verify your session: ${userError.message}`);
  }

  if (!user) {
    return { userId: null, organisation: null, roles: [] };
  }

  const { data: memberships, error: membershipError } = await supabase
    .from("organisation_members")
    .select("org_id, role")
    .eq("user_id", user.id);

  if (membershipError) {
    throw new Error(
      `Could not load organisation membership: ${membershipError.message}`
    );
  }

  if (!memberships?.length) {
    return { userId: user.id, organisation: null, roles: [] };
  }

  const organisationId = memberships[0].org_id;
  const roles = [
    ...new Set(
      memberships
        .filter((membership) => membership.org_id === organisationId)
        .map((membership) => membership.role)
        .filter((role): role is string => typeof role === "string")
    ),
  ];

  const { data: organisation, error: organisationError } = await supabase
    .from("organisations")
    .select("id, name, status")
    .eq("id", organisationId)
    .maybeSingle();

  if (organisationError) {
    throw new Error(
      `Could not load your organisation: ${organisationError.message}`
    );
  }

  return {
    userId: user.id,
    organisation: organisation
      ? {
          id: organisation.id,
          name: organisation.name,
          status: organisation.status,
        }
      : null,
    roles,
  };
}

export async function listEmployees(): Promise<OrganisationEmployee[]> {
  const context = await getMyOrganisation();

  if (!context.userId || !context.organisation) {
    throw new Error("You must be an organisation member to view employees.");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("employees")
    .select(
      "id, user_id, full_name, email, employee_code, department, designation, office_location, status, invite_code"
    )
    .eq("org_id", context.organisation.id)
    .order("full_name");

  if (error) {
    throw new Error(`Could not load employees: ${error.message}`);
  }

  return (data ?? []) as OrganisationEmployee[];
}
