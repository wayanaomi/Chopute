export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <span
        className="h-6 w-6 animate-spin rounded-full border-2 border-brand border-t-transparent"
        aria-hidden="true"
      />
      <p className="text-sm text-foreground-muted">{label}</p>
    </div>
  );
}
