import { redirect } from "next/navigation";
import { getFirebaseAuth } from "@/lib/auth/firebase-auth";
import { getUserQuota } from "@/lib/search/entitlement";
import { SearchWorkspace } from "@/components/search/search-workspace";

export const metadata = { title: "New Search — Chopute" };

export default async function NewSearchPage() {
  const session = await getFirebaseAuth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const quota = await getUserQuota(session.user.id);

  if (!quota) {
    redirect("/login");
  }

  return <SearchWorkspace initialQuota={quota} />;
}