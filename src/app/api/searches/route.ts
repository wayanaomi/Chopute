import { NextResponse } from "next/server";
import { getFirebaseAuth } from "@/lib/auth/firebase-auth";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const session = await getFirebaseAuth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const searches = await prisma.search.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      businessType: true,
      location: true,
      status: true,
      resultCount: true,
      errorMessage: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ searches });
}