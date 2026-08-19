import { NextResponse } from "next/server";
import { getFirebaseAuth } from "@/lib/auth/firebase-auth";
import { prisma } from "@/lib/db/prisma";
import { buildLeadsCsv } from "@/lib/exports/csv";

/**
 * Exports the authenticated user's leads as CSV. Optionally scoped to a
 * single search via ?searchId=; otherwise exports all of the user's leads.
 */
export async function GET(request: Request) {
  const session = await getFirebaseAuth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const searchId = searchParams.get("searchId") || undefined;

  if (searchId) {
    const search = await prisma.search.findUnique({
      where: { id: searchId },
    });

    if (!search || search.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Search not found" },
        { status: 404 }
      );
    }
  }

  const leads = await prisma.lead.findMany({
    where: {
      userId: session.user.id,
      ...(searchId ? { searchId } : {}),
    },
    include: {
      business: true,
      search: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const csv = buildLeadsCsv(
    leads.map((lead) => ({
      businessName: lead.business.name,
      address: lead.business.address,
      phone: lead.business.phone,
      website: lead.business.website,
      rating: lead.business.rating,
      reviewCount: lead.business.reviewCount,
      status: lead.status,
      searchLabel: `${lead.search.businessType} in ${lead.search.location}`,
      searchDate: lead.search.createdAt,
    }))
  );

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="chopute-leads-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}