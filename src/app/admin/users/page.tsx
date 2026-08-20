import { requireAdmin } from "@/lib/auth/admin-auth";
import { prisma } from "@/lib/db/prisma";
import { AdminUserActions } from "@/components/admin/admin-user-actions";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata = {
  title: "Users — Chopute Admin",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminUsersPage() {
  await requireAdmin();

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      plan: true,
      freeSearchesUsed: true,
      freeSearchesGranted: true,
      isAdmin: true,
      isActive: true,
      createdAt: true,
      _count: {
        select: {
          searches: true,
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
              Users
            </h1>

            <p className="mt-1 text-sm text-[#6b7280]">
              Manage Chopute user accounts.
            </p>
          </div>

          <div className="mt-6">
            <AdminNav />
        </div>

          <a
            href="/admin"
            className="text-sm font-medium text-[#6b7280] transition hover:text-[#111827]"
          >
            ← Dashboard
          </a>
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
          <table className="w-full min-w-[1450px] text-sm">
            <thead>
              <tr className="border-b border-[#e5e7eb] text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Searches</th>
                <th className="px-6 py-4">Free Usage</th>
                <th className="px-6 py-4">Admin</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
                const freeRemaining = Math.max(
                  0,
                  user.freeSearchesGranted -
                    user.freeSearchesUsed
                );

                return (
                  <tr
                    key={user.id}
                    className="border-b border-[#f1f5f9] last:border-0"
                  >
                    {/* User */}
                    <td className="px-6 py-4 align-top">
                      <div className="font-medium text-[#111827]">
                        {user.name || "—"}
                      </div>

                      <div className="mt-0.5 text-xs text-[#6b7280]">
                        {user.email}
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="px-6 py-4 align-top">
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

                    {/* Account status */}
                    <td className="px-6 py-4 align-top">
                      <span
                        className={
                          user.isActive
                            ? "rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700"
                            : "rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                        }
                      >
                        {user.isActive
                          ? "Active"
                          : "Deactivated"}
                      </span>
                    </td>

                    {/* Searches */}
                    <td className="px-6 py-4 align-top text-[#4b5563]">
                      {user._count.searches.toLocaleString()}
                    </td>

                    {/* Free usage */}
                    <td className="px-6 py-4 align-top text-[#4b5563]">
                      <div className="font-medium text-[#111827]">
                        {freeRemaining} remaining
                      </div>

                      <div className="mt-1 text-xs text-[#9ca3af]">
                        {user.freeSearchesUsed} used /{" "}
                        {user.freeSearchesGranted} granted
                      </div>
                    </td>

                    {/* Admin */}
                    <td className="px-6 py-4 align-top">
                      {user.isAdmin ? (
                        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                          Admin
                        </span>
                      ) : (
                        <span className="text-[#9ca3af]">
                          —
                        </span>
                      )}
                    </td>

                    {/* Joined */}
                    <td className="px-6 py-4 align-top text-[#6b7280]">
                      {formatDate(user.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 align-top">
                      <AdminUserActions
                        userId={user.id}
                        plan={user.plan}
                        isActive={user.isActive}
                        isAdmin={user.isAdmin}
                        freeSearchesGranted={
                          user.freeSearchesGranted
                        }
                      />
                    </td>
                  </tr>
                );
              })}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-10 text-center text-sm text-[#6b7280]"
                  >
                    No users found.
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