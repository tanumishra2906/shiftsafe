import { EmployeeRegistrationForm } from "@/components/auth/auth-forms";
import { employeeSide } from "@/components/auth/auth-panels";
import { AuthShell } from "@/components/auth/AuthShell";

export default function RegisterEmployeePage() {
  return (
    <AuthShell side={employeeSide}>
      <EmployeeRegistrationForm />
    </AuthShell>
  );
}
