import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/cookies/cookie-consent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chopute — Automatic Leads. Real Growth.",
  description:
    "Search for businesses by type and location, retrieve real business information, and build lead lists in seconds. 1,000 business leads, 60 seconds, $25 one-time.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}

        <CookieConsent />

        {measurementId && (
          <Script
            id="google-analytics-consent"
            strategy="afterInteractive"
          >
            {`
              (function () {
                var measurementId = "${measurementId}";
                var consentKey = "chopute_cookie_consent";

                function loadGoogleAnalytics() {
                  if (window.__choputeGAInitialized) return;

                  window.__choputeGAInitialized = true;

                  var script = document.createElement("script");
                  script.async = true;
                  script.src =
                    "https://www.googletagmanager.com/gtag/js?id=" +
                    measurementId;

                  document.head.appendChild(script);

                  window.dataLayer = window.dataLayer || [];

                  window.gtag = function () {
                    window.dataLayer.push(arguments);
                  };

                  window.gtag("js", new Date());
                  window.gtag("config", measurementId);
                }

                function handleConsent() {
                  var consent = window.localStorage.getItem(consentKey);

                  if (consent === "accepted") {
                    loadGoogleAnalytics();
                  }
                }

                handleConsent();

                window.addEventListener(
                  "chopute-cookie-consent",
                  function (event) {
                    if (event.detail === "accepted") {
                      loadGoogleAnalytics();
                    }
                  }
                );
              })();
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
