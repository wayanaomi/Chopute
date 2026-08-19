import { NextResponse } from "next/server";
import { getFirebaseAuth } from "@/lib/auth/firebase-auth";
import { prisma } from "@/lib/db/prisma";
import { leadStatusSchema } from "@/lib/validation/schemas";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getFirebaseAuth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const lead = await prisma.lead.findUnique({
    where: { id },
  });

  if (!lead || lead.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Lead not found" },
      { status: 404 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const parsed = leadStatusSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid status" },
      { status: 400 }
    );
  }

  const updated = await prisma.lead.update({
    where: { id },
    data: { status: parsed.data.status },
  });

  return NextResponse.json({
    id: updated.id,
    status: updated.status,
  });
}