import { requireAdmin } from "@/lib/auth/admin-auth";
import { prisma } from "@/lib/db/prisma";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata = {
  title: "Searches — Chopute Admin",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminSearchesPage() {
  await requireAdmin();

  const searches = await prisma.search.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
    select: {
      id: true,
      businessType: true,
      location: true,
      status: true,
      resultCount: true,
      errorMessage: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Chopute Admin
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#111827]">
              Searches
            </h1>

            <p className="mt-1 text-sm text-[#6b7280]">
              View recent business searches and their results.
            </p>
          </div>

          <div className="mt-6">
            <AdminNav />
        </div>

          <a
            href="/admin"
            className="text-sm font-medium text-[#6b7280] hover:text-[#111827]"
          >
            ← Dashboard
          </a>
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
          <table className="w-full min-w-[1000px] text-sm">
            <thead>
              <tr className="border-b border-[#e5e7eb] text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Business</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Results</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {searches.map((search) => (
                <tr
                  key={search.id}
                  className="border-b border-[#f1f5f9] last:border-0"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#111827]">
                      {search.user.name || "—"}
                    </div>
                    <div className="mt-0.5 text-xs text-[#6b7280]">
                      {search.user.email}
                    </div>
                  </td>

                  <td className="px-6 py-4 font-medium text-[#111827]">
                    {search.businessType}
                  </td>

                  <td className="px-6 py-4 text-[#4b5563]">
                    {search.location}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={
                        search.status === "COMPLETED"
                          ? "rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700"
                          : search.status === "FAILED"
                            ? "rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                            : "rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700"
                      }
                    >
                      {search.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-[#4b5563]">
                    {search.resultCount.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-[#6b7280]">
                    {formatDate(search.createdAt)}
                  </td>
                </tr>
              ))}

              {searches.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-sm text-[#6b7280]"
                  >
                    No searches found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}