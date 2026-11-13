import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { EmployeeManagement } from "@/app/organisation/employees/employee-management";
import { getMyOrganisation, listEmployees } from "@/lib/data/organisation";

function EmployeesLoading() {
  return <p role="status">Loading employees...</p>;
}

export default function EmployeesPage() {
  return (
    <Suspense fallback={<EmployeesLoading />}>
      <EmployeesContent />
    </Suspense>
  );
}

async function EmployeesContent() {
  await connection();
  const context = await getMyOrganisation();

  if (!context.userId) {
    redirect("/login");
  }

  if (!context.organisation) {
    redirect("/employee");
  }

  if (!context.roles.some((role) => ["org_admin", "hr_admin"].includes(role))) {
    redirect("/organisation");
  }

  let employees: Awaited<ReturnType<typeof listEmployees>> | undefined;
  let loadError: string | undefined;

  try {
    employees = await listEmployees();
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Could not load employees.";
  }

  if (loadError) {
    return (
      <section aria-labelledby="employees-heading">
        <h2 className="text-3xl" id="employees-heading">
          Employees
        </h2>
        <p className="mt-4 rounded-lg bg-[var(--blush)] p-4 text-sm" role="alert">
          {loadError}
        </p>
      </section>
    );
  }

  return <EmployeeManagement employees={employees ?? []} />;
}
