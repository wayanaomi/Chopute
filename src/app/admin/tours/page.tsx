import Link from "next/link";
import { requireAdmin } from "@/lib/auth/admin-auth";
import { prisma } from "@/lib/db/prisma";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata = {
  title: "Campus Tour Waitlist — Chopute Admin",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminToursPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; occupation?: string }>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const q = (params.q || "").trim().slice(0, 120);
  const occupation = (params.occupation || "").trim();

  const where = {
    ...(q
      ? {
          OR: [
            { fullName: { contains: q, mode: "insensitive" as const } },
            { email: { contains: q, mode: "insensitive" as const } },
            { city: { contains: q, mode: "insensitive" as const } },
            { phone: { contains: q } },
          ],
        }
      : {}),
    ...(occupation ? { occupation } : {}),
  };

  const [total, filteredTotal, registrations] = await Promise.all([
    prisma.tourWaitlist.count(),
    prisma.tourWaitlist.count({ where }),
    prisma.tourWaitlist.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 500,
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        city: true,
        occupation: true,
        createdAt: true,
      },
    }),
  ]);

  const occupations = [
    "Student",
    "Graduate",
    "Working professional",
    "Founder / Entrepreneur",
    "Educator",
    "Other",
  ];

  const exportParams = new URLSearchParams();
  if (q) exportParams.set("q", q);
  if (occupation) exportParams.set("occupation", occupation);

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Chopute Admin
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#111827]">
              Campus Tour Waitlist
            </h1>
            <p className="mt-1 text-sm text-[#6b7280]">
              Manage registrations for Boss Campus Tour.
            </p>
          </div>
          <AdminNav />
          <div>
            <Link
              href="/admin"
              className="text-sm font-medium text-[#6b7280] hover:text-[#111827]"
            >
              ← Dashboard
            </Link>
          </div>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-[#6b7280]">
              Total registrations
            </p>
            <p className="mt-3 text-3xl font-bold text-[#111827]">
              {total.toLocaleString()}
            </p>
          </div>
          <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-[#6b7280]">
              Matching registrations
            </p>
            <p className="mt-3 text-3xl font-bold text-[#111827]">
              {filteredTotal.toLocaleString()}
            </p>
          </div>
        </section>

        <form
          method="GET"
          className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#e5e7eb] bg-white p-4 sm:flex-row"
        >
          <input
            name="q"
            defaultValue={q}
            placeholder="Search name, email, phone or city"
            className="min-w-0 flex-1 rounded-xl border border-[#d1d5db] px-4 py-3 text-sm text-[#111827] outline-none focus:border-[#f4771f]"
          />
          <select
            name="occupation"
            defaultValue={occupation}
            className="rounded-xl border border-[#d1d5db] px-4 py-3 text-sm text-[#111827] outline-none focus:border-[#f4771f]"
          >
            <option value="">All occupations</option>
            {occupations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-xl bg-[#f4771f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#df6817]"
          >
            Filter
          </button>
          <Link
            href="/admin/tours"
            className="rounded-xl border border-[#d1d5db] px-5 py-3 text-center text-sm font-semibold text-[#374151] hover:bg-[#f9fafb]"
          >
            Reset
          </Link>
          <a
            href={`/api/admin/tours/export${exportParams.size ? `?${exportParams.toString()}` : ""}`}
            className="rounded-xl bg-[#111827] px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#374151]"
          >
            Export CSV
          </a>
        </form>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
          <table className="w-full min-w-[1050px] text-sm">
            <thead>
              <tr className="border-b border-[#e5e7eb] text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Phone</th>
                <th className="px-5 py-4">City</th>
                <th className="px-5 py-4">Occupation</th>
                <th className="px-5 py-4">Registered</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((person) => (
                <tr
                  key={person.id}
                  className="border-b border-[#f1f5f9] last:border-0"
                >
                  <td className="px-5 py-4 font-medium text-[#111827]">
                    {person.fullName}
                  </td>
                  <td className="px-5 py-4 text-[#4b5563]">{person.email}</td>
                  <td className="px-5 py-4 text-[#4b5563]">{person.phone}</td>
                  <td className="px-5 py-4 text-[#4b5563]">{person.city}</td>
                  <td className="px-5 py-4 text-[#4b5563]">
                    {person.occupation}
                  </td>
                  <td className="px-5 py-4 text-[#6b7280]">
                    {formatDate(person.createdAt)}
                  </td>
                </tr>
              ))}
              {registrations.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-sm text-[#6b7280]"
                  >
                    No registrations match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredTotal > registrations.length && (
          <p className="mt-3 text-sm text-[#6b7280]">
            Showing the latest {registrations.length} of {filteredTotal} matching
            registrations. Use CSV export to download all matches.
          </p>
        )}
      </div>
    </main>
  );
}
