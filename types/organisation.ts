export type OrganisationSummary = {
  id: string;
  name: string;
  status: string;
};

export type MyOrganisation = {
  userId: string | null;
  organisation: OrganisationSummary | null;
  roles: string[];
};

export type EmployeeStatus = "invited" | "active" | "inactive";

export type OrganisationEmployee = {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string | null;
  employee_code: string | null;
  department: string | null;
  designation: string | null;
  office_location: string | null;
  status: EmployeeStatus | string;
  invite_code: string | null;
};

export type AddEmployeeState = {
  success?: boolean;
  message?: string;
  inviteCode?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export type OrganisationActionResult = {
  success: boolean;
  message: string;
};
