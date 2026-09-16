import { requireAdmin } from "@/lib/auth/admin-auth";
import { prisma } from "@/lib/db/prisma";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata = {
  title: "Cookie Consent — Chopute Admin",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminCookiesPage() {
  await requireAdmin();

  const [
    total,
    accepted,
    rejected,
    recentConsents,
  ] = await Promise.all([
    prisma.cookieConsent.count(),

    prisma.cookieConsent.count({
      where: {
        choice: "ACCEPTED",
      },
    }),

    prisma.cookieConsent.count({
      where: {
        choice: "REJECTED",
      },
    }),

    prisma.cookieConsent.findMany({
      take: 50,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        choice: true,
        version: true,
        createdAt: true,
      },
    }),
  ]);

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Chopute Admin
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#111827]">
              Cookie Consent
            </h1>

            <p className="mt-1 text-sm text-[#6b7280]">
              View visitor cookie-consent decisions recorded by Chopute.
            </p>
          </div>

          <AdminNav />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-[#6b7280]">
              Total Consents
            </p>

            <p className="mt-3 text-3xl font-bold text-[#111827]">
              {total.toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-[#6b7280]">
              Accepted
            </p>

            <p className="mt-3 text-3xl font-bold text-green-700">
              {accepted.toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-[#6b7280]">
              Rejected
            </p>

            <p className="mt-3 text-3xl font-bold text-[#b91c1c]">
              {rejected.toLocaleString()}
            </p>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
          <div className="border-b border-[#e5e7eb] px-6 py-5">
            <h2 className="text-lg font-semibold text-[#111827]">
              Recent Consent Records
            </h2>

            <p className="mt-1 text-sm text-[#6b7280]">
              The latest cookie-consent decisions recorded by Chopute.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb] text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                  <th className="px-6 py-4">Choice</th>
                  <th className="px-6 py-4">Version</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {recentConsents.map((consent) => (
                  <tr
                    key={consent.id}
                    className="border-b border-[#f1f5f9] last:border-0"
                  >
                    <td className="px-6 py-4">
                      <span
                        className={
                          consent.choice === "ACCEPTED"
                            ? "rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700"
                            : "rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                        }
                      >
                        {consent.choice}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-[#4b5563]">
                      {consent.version}
                    </td>

                    <td className="px-6 py-4 text-[#6b7280]">
                      {formatDate(consent.createdAt)}
                    </td>
                  </tr>
                ))}

                {recentConsents.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-8 text-center text-sm text-[#6b7280]"
                    >
                      No cookie consent records yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
