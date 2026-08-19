import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  NEW: "bg-info-bg text-info",
  CONTACTED: "bg-warning-bg text-warning",
  INTERESTED: "bg-brand-light text-brand-dark",
  CLOSED: "bg-success-bg text-success",
  default: "bg-background text-foreground-muted",
};

export function Badge({
  className,
  tone = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof styles }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        styles[tone] ?? styles.default,
        className
      )}
      {...props}
    />
  );
}
