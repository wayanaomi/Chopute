import { redirect } from "next/navigation";
import { getFirebaseAuth } from "@/lib/auth/firebase-auth";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/auth-card";

export const metadata = { title: "Sign in — Chopute" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    mode?: string;
    ref?: string;
    redirect?: string;
  }>;
}) {
  const session = await getFirebaseAuth();
  const { mode, ref, redirect: redirectTo } = await searchParams;

  const safeRedirect =
    redirectTo && redirectTo.startsWith("/")
      ? redirectTo
      : "/app";

  if (session?.user) {
    redirect(safeRedirect);
  }

  return (
    <AuthLayout>
      <AuthCard
        initialMode={mode === "signup" ? "signup" : "login"}
        referralCode={ref}
        redirectTo={safeRedirect}
      />
    </AuthLayout>
  );
}