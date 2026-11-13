import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/server";

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

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <section className="w-full max-w-lg rounded-xl border bg-background p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Organisation Portal
        </h1>
        {error ? (
          <p className="mt-4 text-sm text-destructive" role="alert">
            Could not load your profile: {error.message}
          </p>
        ) : (
          <p className="mt-4 text-muted-foreground">
            Welcome, {profile?.full_name || "organisation member"}.
          </p>
        )}
        <form action={logout} className="mt-6">
          <Button type="submit">Logout</Button>
        </form>
      </section>
    </main>
  );
}
