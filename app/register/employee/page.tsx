import Link from "next/link";
import { EmployeeRegistrationForm } from "@/components/auth/auth-forms";

export default function RegisterEmployeePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Employee registration
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Create your employee account. An organisation invite code is optional.
        </p>
        <div className="mt-7">
          <EmployeeRegistrationForm />
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link className="font-medium text-primary underline" href="/login">
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
}
