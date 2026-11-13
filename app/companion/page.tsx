import { Suspense } from "react";
import { connection } from "next/server";

function PortalLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <p role="status">Loading portal...</p>
    </main>
  );
}

export default function CompanionPage() {
  return (
    <Suspense fallback={<PortalLoading />}>
      <CompanionPortal />
    </Suspense>
  );
}

async function CompanionPortal() {
  await connection();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold tracking-tight">Companion Portal</h1>
    </main>
  );
}
