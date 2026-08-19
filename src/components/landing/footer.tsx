export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-16 sm:px-6">
        <div>
          <div className="text-2xl font-bold tracking-tight text-foreground">
            <span>Cho</span>
            <span className="text-brand">pute</span>
          </div>

          <p className="mt-0.5 text-[6px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
            AUTOMATE YOUR SALES. BUILD YOUR PIPE.
          </p>
        </div>

        <nav className="flex items-center gap-7 text-sm text-foreground-muted">
          <a
            href="#pricing"
            className="transition-colors hover:text-foreground"
          >
            Pricing
          </a>

          <a
            href="#try-free"
            className="transition-colors hover:text-foreground"
          >
            Try free
          </a>

          <a
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            Privacy
          </a>

          <a
            href="/terms"
            className="transition-colors hover:text-foreground"
          >
            Terms
          </a>

          <span>© 2026 Chopute</span>
        </nav>
      </div>
    </footer>
  );
}