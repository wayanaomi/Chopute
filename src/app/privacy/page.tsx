import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";

export const metadata = { title: "Privacy Policy — Chopute" };

export default function PrivacyPage() {
  return (
    <>
      <LandingHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
          <div className="prose-p:text-foreground-muted mt-6 space-y-4 text-sm leading-relaxed text-foreground-muted">
            <p>
              Chopute collects the information you provide when creating an account
              (name, email) and the search queries you submit (business type,
              location). Business results returned by a search are stored so you can
              revisit your search history.
            </p>
            <p>
              We do not sell your personal data. Payment is processed by Paystack;
              Chopute does not store your card details. Google sign-in is processed
              by Google; Chopute only receives your name, email, and profile image.
            </p>
            <p>
              You may request deletion of your account and associated data at any
              time by contacting support.
            </p>
          </div>
        </div>
      </main>
      <LandingFooter />
    </>
  );
}
