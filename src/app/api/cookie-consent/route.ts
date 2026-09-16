import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

const CONSENT_VERSION = "1.0";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const choice = body?.choice;

    if (choice !== "ACCEPTED" && choice !== "REJECTED") {
      return NextResponse.json(
        { error: "Invalid cookie consent choice." },
        { status: 400 }
      );
    }

    const consent = await prisma.cookieConsent.create({
      data: {
        choice,
        version: CONSENT_VERSION,
      },
      select: {
        id: true,
        choice: true,
        version: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        consent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Cookie consent error:", error);

    return NextResponse.json(
      { error: "Unable to save cookie consent." },
      { status: 500 }
    );
  }
}
