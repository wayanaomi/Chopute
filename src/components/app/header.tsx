import { ChoputeLogoLink } from "@/components/brand/chopute-logo";
import { SignOutButton } from "./sign-out-button";
import type { UserQuota } from "@/lib/search/entitlement";

export function AppHeader({
  email,
  quota,
}: {
  email: string;
  quota: UserQuota;
}) {
  const quotaLabel =
    quota.plan === "UNLIMITED"
      ? "Unlimited searches"
      : `Free · ${quota.remaining} of ${quota.granted} searches left`;

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <ChoputeLogoLink variant="full" />
          <span className="hidden text-sm font-medium text-foreground-muted sm:inline">
            {quotaLabel}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-foreground-muted sm:inline">
            {email}
          </span>
          <SignOutButton />
        </div>
      </div>

      <div className="border-t border-border px-4 py-1.5 text-xs font-medium text-foreground-muted sm:hidden">
        {quotaLabel}
      </div>
    </header>
  );
}