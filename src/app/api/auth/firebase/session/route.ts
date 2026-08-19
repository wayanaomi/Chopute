import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";
import { prisma } from "@/lib/db/prisma";
import { generateReferralCode } from "@/lib/referrals/referral";

const SESSION_COOKIE_NAME = "chopute_session";

const SESSION_EXPIRES_IN = 1000 * 60 * 60 * 24 * 5;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const idToken =
      typeof body?.idToken === "string" ? body.idToken : null;

    const referralCode =
      typeof body?.referralCode === "string"
        ? body.referralCode.trim().toUpperCase()
        : null;

    if (!idToken) {
      return NextResponse.json(
        { error: "Firebase ID token is required" },
        { status: 400 }
      );
    }

    const decoded = await adminAuth.verifyIdToken(idToken);

    const firebaseUid = decoded.uid;
    const email = decoded.email?.toLowerCase();

    if (!email) {
      return NextResponse.json(
        {
          error:
            "Your Firebase account does not have an email address",
        },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({
      where: { firebaseUid },
    });

    if (!user) {
      user = await prisma.user.findUnique({
        where: { email },
      });
    }

    if (!user) {
      let referredById: string | undefined;

      if (referralCode) {
        const referrer = await prisma.user.findUnique({
          where: { referralCode },
        });

        if (referrer) {
          referredById = referrer.id;
        }
      }

      const newReferralCode = await generateReferralCode();

      user = await prisma.$transaction(async (tx) => {
        const created = await tx.user.create({
          data: {
            firebaseUid,
            email,
            name: decoded.name ?? null,
            image: decoded.picture ?? null,
            referralCode: newReferralCode,
            referredById,
          },
        });

        if (referredById && referredById !== created.id) {
          try {
            await tx.referralReward.create({
              data: {
                referrerId: referredById,
                referredUserId: created.id,
                extraSearchesGranted: 1,
              },
            });

            await tx.user.update({
              where: { id: referredById },
              data: {
                freeSearchesGranted: {
                  increment: 1,
                },
              },
            });
          } catch {
            // Referral reward already exists; safely ignore.
          }
        }

        return created;
      });
    } else if (!user.firebaseUid) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          firebaseUid,
          name: user.name ?? decoded.name ?? null,
          image: user.image ?? decoded.picture ?? null,
        },
      });
    }

    const sessionCookie =
      await adminAuth.createSessionCookie(idToken, {
        expiresIn: SESSION_EXPIRES_IN,
      });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_EXPIRES_IN / 1000,
    });

    return response;
  } catch (error) {
    console.error(
      "========== FIREBASE SESSION ERROR =========="
    );
    console.error(error);
    console.error(
      "============================================"
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not create your Chopute session",
      },
      { status: 500 }
    );
  }
}

/**
 * Clears the Chopute server-side session cookie.
 */
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}