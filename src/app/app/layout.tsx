import { redirect } from "next/navigation";
import { getFirebaseAuth } from "@/lib/auth/firebase-auth";
import { getUserQuota } from "@/lib/search/entitlement";
import { AppHeader } from "@/components/app/header";
import { AppTabs } from "@/components/app/tabs";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getFirebaseAuth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const quota = await getUserQuota(session.user.id);

  if (!quota) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background">
      <AppHeader email={session.user.email ?? ""} quota={quota} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <div className="mb-6">
          <AppTabs />
        </div>

        {children}
      </main>
    </div>
  );
}