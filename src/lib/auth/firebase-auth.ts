import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";
import { prisma } from "@/lib/db/prisma";

const SESSION_COOKIE_NAME = "chopute_session";

export type ChoputeAuth = {
  user: {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    firebaseUid: string;
  };
} | null;

export async function getFirebaseAuth(): Promise<ChoputeAuth> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(
      sessionCookie,
      true
    );

    const firebaseUid = decoded.uid;

    let user = await prisma.user.findUnique({
      where: { firebaseUid },
    });

    if (!user && decoded.email) {
      user = await prisma.user.findUnique({
        where: { email: decoded.email.toLowerCase() },
      });

      if (user) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            firebaseUid,
            name: user.name ?? decoded.name ?? null,
            image: user.image ?? decoded.picture ?? null,
          },
        });
      }
    }

    if (!user) {
      return null;
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        firebaseUid,
      },
    };
  } catch {
    return null;
  }
}