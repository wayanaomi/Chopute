import Link from "next/link";
import { ChoputeLogo } from "@/components/brand/chopute-logo";
import { APP_TAGLINE } from "@/lib/constants";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-background px-4 py-12">
      <Link href="/" className="mb-2 inline-flex items-center">
        <ChoputeLogo priority />
      </Link>
      <p className="mb-8 text-sm text-foreground-muted">{APP_TAGLINE}</p>
      {children}
      <Link href="/" className="mt-6 text-sm text-foreground-muted hover:text-foreground">
        ← Back to homepage
      </Link>
    </div>
  );
}
