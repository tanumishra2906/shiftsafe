import { LoginForm } from "@/components/auth/auth-forms";
import { loginSide } from "@/components/auth/auth-panels";
import { AuthShell } from "@/components/auth/AuthShell";

export default function LoginPage() {
  return (
    <AuthShell side={loginSide}>
      <LoginForm />
    </AuthShell>
  );
}
