import { requireAdmin } from "@/lib/auth/admin-auth";
import { prisma } from "@/lib/db/prisma";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata = {
  title: "Admin Dashboard — Chopute",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatAmount(amount: number, currency: string) {
  if (currency === "NGN") {
    return `₦${(amount / 100).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  return `${currency} ${(amount / 100).toFixed(2)}`;
}

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();

  const [
    totalUsers,
    unlimitedUsers,
    totalSearches,
    completedSearches,
    failedSearches,
    totalLeads,
    recentUsers,
    recentSearches,
    recentPayments,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.user.count({
      where: {
        plan: "UNLIMITED",
      },
    }),

    prisma.search.count(),

    prisma.search.count({
      where: {
        status: "COMPLETED",
      },
    }),

    prisma.search.count({
      where: {
        status: "FAILED",
      },
    }),

    prisma.lead.count(),

    prisma.user.findMany({
      take: 8,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        createdAt: true,
      },
    }),

    prisma.search.findMany({
      take: 8,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        businessType: true,
        location: true,
        status: true,
        resultCount: true,
        createdAt: true,
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    }),

    prisma.payment.findMany({
      take: 8,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        reference: true,
        amount: true,
        currency: true,
        status: true,
        provider: true,
        createdAt: true,
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    }),
  ]);

  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
    },
    {
      label: "Unlimited Users",
      value: unlimitedUsers,
    },
    {
      label: "Total Searches",
      value: totalSearches,
    },
    {
      label: "Total Leads",
      value: totalLeads,
    },
    {
      label: "Completed Searches",
      value: completedSearches,
    },
    {
      label: "Failed Searches",
      value: failedSearches,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Chopute Admin
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#111827]">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-[#6b7280]">
              Welcome back, {admin.name || admin.email}.
            </p>
          </div>

          <div className="mt-6">
                <AdminNav />
            </div>

          <a
            href="/app"
            className="text-sm font-medium text-[#6b7280] transition hover:text-[#111827]"
          >
            Back to app →
          </a>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-[#6b7280]">
                {stat.label}
              </p>

              <p className="mt-3 text-3xl font-bold text-[#111827]">
                {stat.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Recent users */}
        <section className="mt-8 rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
          <div className="border-b border-[#e5e7eb] px-6 py-5">
            <h2 className="text-lg font-semibold text-[#111827]">
              Recent Users
            </h2>

            <p className="mt-1 text-sm text-[#6b7280]">
              The latest accounts created on Chopute.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb] text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Joined</th>
                </tr>
              </thead>

              <tbody>
                {recentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[#f1f5f9] last:border-0"
                  >
                    <td className="px-6 py-4 font-medium text-[#111827]">
                      {user.name || "—"}
                    </td>

                    <td className="px-6 py-4 text-[#4b5563]">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={
                          user.plan === "UNLIMITED"
                            ? "rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700"
                            : "rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700"
                        }
                      >
                        {user.plan}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-[#6b7280]">
                      {formatDate(user.createdAt)}
                    </td>
                  </tr>
                ))}

                {recentUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-sm text-[#6b7280]"
                    >
                      No users yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent searches */}
        <section className="mt-8 rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
          <div className="border-b border-[#e5e7eb] px-6 py-5">
            <h2 className="text-lg font-semibold text-[#111827]">
              Recent Searches
            </h2>

            <p className="mt-1 text-sm text-[#6b7280]">
              The latest business searches and their results.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb] text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Search</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Results</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {recentSearches.map((search) => (
                  <tr
                    key={search.id}
                    className="border-b border-[#f1f5f9] last:border-0"
                  >
                    <td className="px-6 py-4 text-[#4b5563]">
                      {search.user.name || search.user.email}
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

                {recentSearches.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-sm text-[#6b7280]"
                    >
                      No searches yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent payments */}
        <section className="mt-8 rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
          <div className="border-b border-[#e5e7eb] px-6 py-5">
            <h2 className="text-lg font-semibold text-[#111827]">
              Recent Payments
            </h2>

            <p className="mt-1 text-sm text-[#6b7280]">
              Recent payment activity from customers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb] text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Provider</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {recentPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-[#f1f5f9] last:border-0"
                  >
                    <td className="px-6 py-4 text-[#4b5563]">
                      {payment.user.name || payment.user.email}
                    </td>

                    <td className="px-6 py-4 font-medium text-[#111827]">
                      {formatAmount(
                        payment.amount,
                        payment.currency
                      )}
                    </td>

                    <td className="px-6 py-4 text-[#4b5563]">
                      {payment.provider}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={
                          payment.status === "PAID"
                            ? "rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700"
                            : "rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700"
                        }
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-mono text-xs text-[#6b7280]">
                      {payment.reference}
                    </td>

                    <td className="px-6 py-4 text-[#6b7280]">
                      {formatDate(payment.createdAt)}
                    </td>
                  </tr>
                ))}

                {recentPayments.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-sm text-[#6b7280]"
                    >
                      No payments yet.
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