import { NextResponse } from "next/server";
import { getFirebaseAuth } from "@/lib/auth/firebase-auth";
import { prisma } from "@/lib/db/prisma";
import { buildReferralUrl } from "@/lib/referrals/referral";
import { APP_URL } from "@/lib/constants";

export async function GET() {
  const session = await getFirebaseAuth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      referralCode: true,
      _count: {
        select: {
          referrals: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    referralUrl: buildReferralUrl(
      APP_URL,
      user.referralCode
    ),
    referralCode: user.referralCode,
    totalReferrals: user._count.referrals,
  });
}