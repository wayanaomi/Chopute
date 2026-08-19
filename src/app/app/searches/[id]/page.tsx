import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getFirebaseAuth } from "@/lib/auth/firebase-auth";
import { prisma } from "@/lib/db/prisma";
import { SearchLeadsView } from "@/components/search/search-leads-view";

export const metadata = { title: "Search leads — Chopute" };

export default async function SearchLeadsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getFirebaseAuth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  const search = await prisma.search.findUnique({
    where: { id },
  });

  if (!search || search.userId !== session.user.id) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/app/searches"
        className="text-sm text-foreground-muted hover:text-foreground"
      >
        ← Back to My Searches
      </Link>

      <SearchLeadsView searchId={id} />
    </div>
  );
}