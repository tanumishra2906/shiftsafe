import { ForgotPasswordPanel } from "@/components/auth/auth-forms";
import { loginSide } from "@/components/auth/auth-panels";
import { AuthShell } from "@/components/auth/AuthShell";

export default function ForgotPasswordPage() {
  return (
    <AuthShell side={loginSide}>
      <ForgotPasswordPanel />
    </AuthShell>
  );
}
