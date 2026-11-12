import { OrganisationRegistrationForm } from "@/components/auth/auth-forms";
import { organisationSide } from "@/components/auth/auth-panels";
import { AuthShell } from "@/components/auth/AuthShell";

export default function RegisterOrganisationPage() {
  return (
    <AuthShell side={organisationSide}>
      <OrganisationRegistrationForm />
    </AuthShell>
  );
}
