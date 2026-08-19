import { prisma } from "@/lib/db/prisma";

export interface UserQuota {
  plan: "FREE" | "UNLIMITED";
  used: number;
  granted: number;
  /** null when plan is UNLIMITED (no cap). */
  remaining: number | null;
}

export async function getUserQuota(userId: string): Promise<UserQuota | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, freeSearchesUsed: true, freeSearchesGranted: true },
  });
  if (!user) return null;

  return {
    plan: user.plan,
    used: user.freeSearchesUsed,
    granted: user.freeSearchesGranted,
    remaining:
      user.plan === "UNLIMITED"
        ? null
        : Math.max(0, user.freeSearchesGranted - user.freeSearchesUsed),
  };
}

/**
 * Atomically consumes one free search unit using optimistic concurrency
 * (compare-and-swap on freeSearchesUsed) so concurrent/duplicate requests
 * can never consume more than the user's actual remaining allowance.
 * Returns whether the caller is allowed to proceed, and whether a free
 * search unit was actually deducted (false for UNLIMITED-plan users, since
 * there's nothing to deduct).
 */
export async function tryConsumeFreeSearch(
  userId: string
): Promise<{ allowed: boolean; consumed: boolean }> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true, freeSearchesUsed: true, freeSearchesGranted: true },
    });
    if (!user) return { allowed: false, consumed: false };

    if (user.plan === "UNLIMITED") {
      return { allowed: true, consumed: false };
    }

    if (user.freeSearchesUsed >= user.freeSearchesGranted) {
      return { allowed: false, consumed: false };
    }

    const result = await prisma.user.updateMany({
      where: { id: userId, freeSearchesUsed: user.freeSearchesUsed },
      data: { freeSearchesUsed: { increment: 1 } },
    });

    if (result.count === 1) {
      return { allowed: true, consumed: true };
    }
    // Lost a race with another concurrent request — retry with fresh data.
  }
  return { allowed: false, consumed: false };
}

/** Refunds a previously-consumed free search (e.g. the provider run failed). */
export async function refundFreeSearch(userId: string): Promise<void> {
  await prisma.user.updateMany({
    where: { id: userId, freeSearchesUsed: { gt: 0 } },
    data: { freeSearchesUsed: { decrement: 1 } },
  });
}
