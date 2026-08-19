import { customAlphabet } from "nanoid";
import { prisma } from "@/lib/db/prisma";

// Unambiguous alphabet (no 0/O/1/I/l) for referral codes that get typed
// or shared out loud.
const alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
const generate = customAlphabet(alphabet, 8);

/** Generates a referral code guaranteed unique in the database. */
export async function generateReferralCode(): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generate();
    const existing = await prisma.user.findUnique({ where: { referralCode: code } });
    if (!existing) return code;
  }
  throw new Error("Could not generate a unique referral code");
}

export function buildReferralUrl(appUrl: string, referralCode: string): string {
  return `${appUrl}/login?ref=${referralCode}`;
}
