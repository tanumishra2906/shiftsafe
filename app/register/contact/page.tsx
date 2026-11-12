import { ContactRegistrationPanel } from "@/components/auth/auth-forms";
import { contactSide } from "@/components/auth/auth-panels";
import { AuthShell } from "@/components/auth/AuthShell";

export default function RegisterContactPage() {
  return (
    <AuthShell side={contactSide}>
      <ContactRegistrationPanel />
    </AuthShell>
  );
}
