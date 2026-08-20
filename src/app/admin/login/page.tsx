import { redirect } from "next/navigation";
import { getFirebaseAuth } from "@/lib/auth/firebase-auth";
import { AdminLoginForm } from "@/components/auth/admin-login-form";

export const metadata = {
  title: "Admin Login — Chopute",
};

export default async function AdminLoginPage() {
  const session = await getFirebaseAuth();

  if (session?.user) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-6">
      <div className="w-full max-w-md rounded-2xl border border-[#e5e7eb] bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
            Chopute
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#111827]">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-[#6b7280]">
            Sign in to access the Chopute admin dashboard.
          </p>
        </div>

        <AdminLoginForm />

        <p className="mt-6 text-center text-xs text-[#9ca3af]">
          Authorized administrators only.
        </p>
      </div>
    </main>
  );
}