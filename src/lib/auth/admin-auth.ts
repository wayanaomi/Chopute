import { redirect } from "next/navigation";
import { getFirebaseAuth } from "@/lib/auth/firebase-auth";
import { prisma } from "@/lib/db/prisma";

export async function getAdminUser() {
  const session = await getFirebaseAuth();

  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      isAdmin: true,
      isActive: true,
    },
  });

  if (!user?.isAdmin || !user.isActive) {
    return null;
  }

  return user;
}

export async function requireAdmin() {
  const user = await getAdminUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}