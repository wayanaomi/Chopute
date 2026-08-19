import type { UserQuota } from "@/lib/search/entitlement";

export function SearchQuota({ quota }: { quota: UserQuota }) {
  if (quota.plan === "UNLIMITED") {
    return <p className="text-sm text-foreground-muted">Unlimited searches</p>;
  }
  return (
    <p className="text-sm text-foreground-muted">
      Free · {quota.remaining} of {quota.granted} searches left
    </p>
  );
}
