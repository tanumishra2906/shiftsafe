import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterRolePicker } from "@/components/auth/RegisterRolePicker";

export default function RegisterPage() {
  return (
    <AuthShell>
      <RegisterRolePicker />
    </AuthShell>
  );
}
