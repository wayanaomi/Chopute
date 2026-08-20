import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";
import { prisma } from "@/lib/db/prisma";
import { getAdminUser } from "@/lib/auth/admin-auth";

type AdminAction =
  | "upgrade"
  | "downgrade"
  | "deactivate"
  | "reactivate"
  | "delete"
  | "set-free-searches";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminUser();

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  let body: {
    action?: AdminAction;
    freeSearchesGranted?: number;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const action = body.action;

  if (!action) {
    return NextResponse.json(
      { error: "Action is required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      firebaseUid: true,
      isAdmin: true,
      isActive: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  // Never allow an admin to accidentally deactivate/delete another admin
  // through the ordinary user-management screen.
  if (user.isAdmin) {
    return NextResponse.json(
      { error: "Admin accounts cannot be changed from this screen." },
      { status: 403 }
    );
  }

  switch (action) {
    case "upgrade": {
      const updated = await prisma.user.update({
        where: { id },
        data: {
          plan: "UNLIMITED",
        },
        select: {
          id: true,
          plan: true,
          isActive: true,
          freeSearchesGranted: true,
          freeSearchesUsed: true,
        },
      });

      return NextResponse.json(updated);
    }

    case "downgrade": {
      const updated = await prisma.user.update({
        where: { id },
        data: {
          plan: "FREE",
        },
        select: {
          id: true,
          plan: true,
          isActive: true,
          freeSearchesGranted: true,
          freeSearchesUsed: true,
        },
      });

      return NextResponse.json(updated);
    }

    case "deactivate": {
      const updated = await prisma.user.update({
        where: { id },
        data: {
          isActive: false,
        },
        select: {
          id: true,
          plan: true,
          isActive: true,
        },
      });

      if (user.firebaseUid) {
        try {
          await adminAuth.updateUser(user.firebaseUid, {
            disabled: true,
          });
        } catch (error) {
          // Roll back the database state if Firebase deactivation fails.
          await prisma.user.update({
            where: { id },
            data: { isActive: true },
          });

          throw error;
        }
      }

      return NextResponse.json(updated);
    }

    case "reactivate": {
      const updated = await prisma.user.update({
        where: { id },
        data: {
          isActive: true,
        },
        select: {
          id: true,
          plan: true,
          isActive: true,
        },
      });

      if (user.firebaseUid) {
        try {
          await adminAuth.updateUser(user.firebaseUid, {
            disabled: false,
          });
        } catch (error) {
          await prisma.user.update({
            where: { id },
            data: { isActive: false },
          });

          throw error;
        }
      }

      return NextResponse.json(updated);
    }

    case "delete": {
      /*
       * Remove the Firebase identity first.
       * Prisma then removes the corresponding application data
       * according to the existing relation delete rules.
       */
      if (user.firebaseUid) {
        try {
          await adminAuth.deleteUser(user.firebaseUid);
        } catch (error: unknown) {
          const code =
            typeof error === "object" &&
            error !== null &&
            "code" in error
              ? String(
                  (error as { code?: unknown }).code
                )
              : "";

          // If Firebase user is already gone, continue with DB deletion.
          if (code !== "auth/user-not-found") {
            throw error;
          }
        }
      }

      await prisma.user.delete({
        where: { id },
      });

      return NextResponse.json({
        success: true,
      });
    }

    case "set-free-searches": {
      if (
        typeof body.freeSearchesGranted !== "number" ||
        !Number.isInteger(body.freeSearchesGranted) ||
        body.freeSearchesGranted < 0 ||
        body.freeSearchesGranted > 10000
      ) {
        return NextResponse.json(
          {
            error:
              "Free-search allocation must be a whole number between 0 and 10,000.",
          },
          { status: 400 }
        );
      }

      const updated = await prisma.user.update({
        where: { id },
        data: {
          freeSearchesGranted: body.freeSearchesGranted,
        },
        select: {
          id: true,
          plan: true,
          isActive: true,
          freeSearchesGranted: true,
          freeSearchesUsed: true,
        },
      });

      return NextResponse.json(updated);
    }

    default:
      return NextResponse.json(
        { error: "Unsupported action" },
        { status: 400 }
      );
  }
}