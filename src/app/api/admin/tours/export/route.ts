import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/admin-auth";
import { prisma } from "@/lib/db/prisma";

function csvCell(value: string | Date) {
  const text = value instanceof Date ? value.toISOString() : value;
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  await requireAdmin();

  const params = request.nextUrl.searchParams;
  const q = (params.get("q") || "").trim().slice(0, 120);
  const occupation = (params.get("occupation") || "").trim();

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

  const registrations = await prisma.tourWaitlist.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      fullName: true,
      email: true,
      phone: true,
      city: true,
      occupation: true,
      createdAt: true,
    },
  });

  const rows = [
    ["Full Name", "Email", "Phone", "City", "Occupation", "Registered At"],
    ...registrations.map((person) => [
      person.fullName,
      person.email,
      person.phone,
      person.city,
      person.occupation,
      person.createdAt,
    ]),
  ];

  const csv = "\uFEFF" + rows.map((row) => row.map(csvCell).join(",")).join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="boss-campus-tour-waitlist.csv"',
      "Cache-Control": "no-store",
    },
  });
}
