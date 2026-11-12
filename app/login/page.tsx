import Link from "next/link";
import { LoginForm } from "@/components/auth/auth-forms";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-semibold tracking-tight">Log in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to continue to your SHIFTSAFE portal.
        </p>
        <div className="mt-7">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to SHIFTSAFE?{" "}
          <Link className="font-medium text-primary underline" href="/register/employee">
            Register as an employee
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Register an organisation?{" "}
          <Link
            className="font-medium text-primary underline"
            href="/register/organisation"
          >
            Get started
          </Link>
        </p>
      </section>
    </main>
  );
}
