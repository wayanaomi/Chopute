import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const city = typeof body.city === "string" ? body.city.trim() : "";
    const occupation = typeof body.occupation === "string" ? body.occupation.trim() : "";

    if (
      !fullName || fullName.length > 120 ||
      !phone || phone.length > 30 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
      !city || city.length > 100 ||
      !occupation || occupation.length > 100
    ) {
      return NextResponse.json(
        { error: "Please complete all fields with valid information." },
        { status: 400 }
      );
    }

    await prisma.tourWaitlist.create({
      data: { fullName, phone, email, city, occupation },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "This email is already on the waitlist." },
        { status: 409 }
      );
    }

    console.error("Tour waitlist submission failed:", error);
    return NextResponse.json(
      { error: "We couldn't save your registration right now. Please try again later." },
      { status: 500 }
    );
  }
}
