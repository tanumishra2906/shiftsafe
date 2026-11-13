import { Suspense } from "react";
import { connection } from "next/server";
import { listEmployees } from "@/lib/data/organisation";

function PortalLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <p role="status">Loading portal...</p>
    </main>
  );
}

export default function OrganisationPage() {
  return (
    <Suspense fallback={<PortalLoading />}>
      <OrganisationPortal />
    </Suspense>
  );
}

async function OrganisationPortal() {
  await connection();
  const employees = await listEmployees();
  const registeredEmployees = employees.filter((employee) => employee.user_id);
  const activeEmployees = registeredEmployees.filter(
    (employee) => employee.status === "active"
  );
  const pendingInvites = employees.filter(
    (employee) => employee.status === "invited"
  );
  const metrics = [
    { label: "Registered employees", value: registeredEmployees.length },
    { label: "Active employees", value: activeEmployees.length },
    { label: "Pending invites", value: pendingInvites.length },
  ];

  return (
    <section aria-labelledby="overview-heading">
      <h2 className="text-3xl" id="overview-heading">
        Overview
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        A current view of your organisation&apos;s employee roster.
      </p>
      <dl className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric, index) => (
          <div
            className={`rounded-xl border border-[var(--line)] p-5 ${
              index === 1 ? "bg-[var(--peri-soft)]" : "bg-white"
            }`}
            key={metric.label}
          >
            <dt className="text-sm font-semibold text-[var(--muted)]">
              {metric.label}
            </dt>
            <dd className="mt-3 font-[var(--font-fraunces)] text-4xl font-semibold tabular-nums">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
