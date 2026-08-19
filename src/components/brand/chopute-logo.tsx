import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";

/**
 * Renders the official Chopute logo asset. The real files must be supplied
 * by the client at the paths documented in public/brand/README.md — this
 * component intentionally does not fall back to a text/generated logo.
 */
export function ChoputeLogo({
  variant = "full",
  className,
  width,
  height,
  priority,
}: {
  variant?: "full" | "icon";
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  const src = variant === "full" ? "/brand/chopute-logo.png" : "/brand/chopute-icon.png";
  const w = width ?? (variant === "full" ? 340 : 32);
  const h = height ?? (variant === "full" ? 120 : 32);

  return (
    <Image
      src={src}
      alt={`${APP_NAME} logo`}
      width={w}
      height={h}
      priority={priority}
      className={cn("object-contain", className)}
      style={{ width: "auto", height: h }}
    />
  );
}

export function ChoputeLogoLink({
  className,
  variant = "full",
}: {
  className?: string;
  variant?: "full" | "icon";
}) {
  return (
    <Link href="/" className={cn("inline-flex items-center", className)} aria-label={APP_NAME}>
      <ChoputeLogo variant={variant} priority />
    </Link>
  );
}
