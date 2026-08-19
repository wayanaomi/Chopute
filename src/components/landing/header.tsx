import Link from "next/link";
import { ChoputeLogoLink } from "@/components/brand/chopute-logo";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#eeeeee] bg-white">
      <div className="mx-auto flex h-[121px] w-full max-w-[1050px] items-center justify-between px-6">
        {/* Logo */}
        <ChoputeLogoLink className="shrink-0" />

        {/* Right-side actions */}
        <div className="flex items-center gap-5">
          <Link
            href="/login"
            className="text-[14px] font-medium text-[#697386] transition-colors hover:text-[#111111]"
          >
            Try free
          </Link>

          <Link
            href="/pricing"
            className="inline-flex h-[44px] items-center justify-center rounded-[12px] bg-[#f4771f] px-[24px] text-[14px] font-semibold text-white shadow-[0_6px_16px_rgba(244,119,31,0.20)] transition-all hover:bg-[#e96b15] hover:shadow-[0_8px_20px_rgba(244,119,31,0.25)]"
          >
            Get Instant Access — $25
          </Link>
        </div>
      </div>
    </header>
  );
}