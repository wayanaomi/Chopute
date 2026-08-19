import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { signupSchema } from "@/lib/validation/schemas";
import { generateReferralCode } from "@/lib/referrals/referral";
import { REFERRAL_REWARD_SEARCHES } from "@/lib/constants";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid input" },
      { status: 400 }
    );
  }

  const { name, email, password, referralCode } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists" },
      { status: 409 }
    );
  }

  let referredById: string | undefined;
  if (referralCode) {
    const referrer = await prisma.user.findUnique({
      where: { referralCode: referralCode.toUpperCase() },
    });
    if (referrer) referredById = referrer.id;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const newReferralCode = await generateReferralCode();

  const user = await prisma.$transaction(async (tx) => {
    const created = await tx.user.create({
      data: {
        name,
        email,
        passwordHash,
        referralCode: newReferralCode,
        referredById,
      },
    });

    if (referredById) {
      try {
        await tx.referralReward.create({
          data: {
            referrerId: referredById,
            referredUserId: created.id,
            extraSearchesGranted: REFERRAL_REWARD_SEARCHES,
          },
        });
        await tx.user.update({
          where: { id: referredById },
          data: { freeSearchesGranted: { increment: REFERRAL_REWARD_SEARCHES } },
        });
      } catch {
        // Reward already recorded for this referred user — ignore.
      }
    }

    return created;
  });

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}
