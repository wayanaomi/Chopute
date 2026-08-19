import { redirect } from "next/navigation";
import { getFirebaseAuth } from "@/lib/auth/firebase-auth";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/auth-card";

export const metadata = { title: "Sign in — Chopute" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; ref?: string }>;
}) {
  const session = await getFirebaseAuth();

  if (session?.user) {
    redirect("/app");
  }

  const { mode, ref } = await searchParams;

  return (
    <AuthLayout>
      <AuthCard
        initialMode={mode === "signup" ? "signup" : "login"}
        referralCode={ref}
      />
    </AuthLayout>
  );
}