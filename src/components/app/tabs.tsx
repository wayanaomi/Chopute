"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/app/search", label: "New Search" },
  { href: "/app/searches", label: "My Searches" },
];

export function AppTabs() {
  const pathname = usePathname();

  return (
    <div className="inline-flex rounded-lg bg-background p-1">
      {TABS.map((tab) => {
        const isActive = pathname?.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-card text-foreground shadow-sm border border-border"
                : "text-foreground-muted hover:text-foreground"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
