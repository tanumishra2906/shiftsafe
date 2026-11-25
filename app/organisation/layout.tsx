import { Suspense, type ReactNode } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { OrganisationNav } from "@/app/organisation/organisation-nav";
import { getMyOrganisation } from "@/lib/data/organisation";

function OrganisationLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <p role="status">Loading organisation portal...</p>
    </main>
  );
}

export default function OrganisationLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Suspense fallback={<OrganisationLoading />}>
      <OrganisationPortalLayout>{children}</OrganisationPortalLayout>
    </Suspense>
  );
}

async function OrganisationPortalLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  await connection();
  let context: Awaited<ReturnType<typeof getMyOrganisation>>;

  try {
    context = await getMyOrganisation();
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Could not load your organisation.";
    return (
      <main className="flex min-h-screen items-center justify-center p-8">
        <p
          className="max-w-xl rounded-lg bg-[var(--blush)] p-4 text-sm"
          role="alert"
        >
          {message}
        </p>
      </main>
    );
  }

  if (!context.userId) {
    redirect("/login");
  }

  if (!context.organisation) {
    redirect("/employee");
  }

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--maroon)] lg:flex">
      <aside className="flex w-full shrink-0 flex-col border-b border-[var(--line)] bg-white lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
        <div className="border-b border-[var(--line)] px-6 py-5">
          <Link
            className="font-[var(--font-fraunces)] text-xl font-semibold text-[var(--primary)]"
            href="/organisation"
          >
            SHIFTSAFE
          </Link>
        </div>
        <OrganisationNav />
        <div className="mt-auto border-t border-[var(--line)] p-5">
          <p className="text-sm font-semibold">{context.organisation.name}</p>
          <p className="mt-1 text-xs capitalize text-[var(--muted)]">
            {context.roles
              .map((role) => role.replaceAll("_", " "))
              .join(", ") || "Organisation member"}
          </p>
          <form action={logout} className="mt-4">
            <button
              className="min-h-10 rounded-lg border border-[var(--line)] px-3 text-sm font-semibold hover:bg-[var(--cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--peri)]"
              type="submit"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="border-b border-[var(--line)] bg-white px-5 py-5 sm:px-8">
          <p className="text-sm font-semibold text-[var(--peri)]">
            Organisation portal
          </p>
          <h1 className="mt-1 text-2xl">{context.organisation.name}</h1>
        </header>
        <main className="p-5 sm:p-8">
          {context.organisation.status !== "verified" && (
            <p
              className="mb-6 rounded-xl border border-[var(--rose)] bg-[var(--blush)] px-4 py-3 text-sm font-semibold text-[var(--maroon)]"
              role="status"
            >
              Your organisation is awaiting verification
            </p>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
