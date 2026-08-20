import { requireAdmin } from "@/lib/auth/admin-auth";
import { prisma } from "@/lib/db/prisma";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata = {
  title: "Payments — Chopute Admin",
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

export default async function AdminPaymentsPage() {
  await requireAdmin();

  const payments = await prisma.payment.findMany({
    take: 100,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      reference: true,
      provider: true,
      amount: true,
      currency: true,
      status: true,
      verifiedAt: true,
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
              Payments
            </h1>

            <p className="mt-1 text-sm text-[#6b7280]">
              View customer payment records.
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
          <table className="w-full min-w-[1100px] text-sm">
            <thead>
              <tr className="border-b border-[#e5e7eb] text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Provider</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Verified</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-[#f1f5f9] last:border-0"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#111827]">
                      {payment.user.name || "—"}
                    </div>

                    <div className="mt-0.5 text-xs text-[#6b7280]">
                      {payment.user.email}
                    </div>
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
                          : payment.status === "FAILED" ||
                              payment.status === "CANCELLED"
                            ? "rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                            : payment.status === "REFUNDED"
                              ? "rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700"
                              : "rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700"
                      }
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-mono text-xs text-[#6b7280]">
                    {payment.reference}
                  </td>

                  <td className="px-6 py-4 text-[#6b7280]">
                    {payment.verifiedAt
                      ? formatDate(payment.verifiedAt)
                      : "—"}
                  </td>

                  <td className="px-6 py-4 text-[#6b7280]">
                    {formatDate(payment.createdAt)}
                  </td>
                </tr>
              ))}

              {payments.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-10 text-center text-sm text-[#6b7280]"
                  >
                    No payments found.
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