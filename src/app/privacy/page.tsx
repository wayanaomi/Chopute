import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";

export const metadata = { title: "Privacy Policy — Chopute" };

export default function PrivacyPage() {
  return (
    <>
      <LandingHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h1 className="text-3xl font-bold text-foreground">
            Privacy Policy
          </h1>

          <div className="mt-6 space-y-8 text-sm leading-relaxed text-foreground-muted">
            <section>
              <h2 className="text-lg font-semibold text-foreground">
                Information We Collect
              </h2>

              <p className="mt-3">
                Chopute collects information you provide when creating an
                account, including your name and email address. We also collect
                the search queries you submit, such as business type and
                location. Business results returned by a search may be stored
                so you can revisit your search history.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">
                Cookies and Analytics
              </h2>

              <p className="mt-3">
                Chopute uses necessary technologies to provide core website
                functionality, including authentication, security, and
                essential preferences.
              </p>

              <p className="mt-3">
                With your consent, Chopute may use analytics cookies through
                Google Analytics to understand how visitors interact with the
                website. This information helps us measure website performance,
                understand usage patterns, and improve the Chopute experience.
              </p>

              <p className="mt-3">
                Analytics cookies are optional. You can accept or reject them
                through the cookie consent banner, and you can change your
                preference later using the Cookie Settings option in the
                website footer.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">
                Payments
              </h2>

              <p className="mt-3">
                Payment processing is handled by our payment providers. Chopute
                does not store your full card details.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">
                Google Sign-In
              </h2>

              <p className="mt-3">
                If you choose to sign in using Google, Google processes the
                authentication. Chopute receives the account information
                necessary to create and manage your Chopute account.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">
                Data Sharing
              </h2>

              <p className="mt-3">
                We do not sell your personal data. We may use service providers
                to provide functionality such as authentication, analytics,
                hosting, payment processing, and business-data retrieval.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">
                Your Choices
              </h2>

              <p className="mt-3">
                You may change your optional cookie preferences at any time
                through Cookie Settings. You may also request deletion of your
                account and associated personal data by contacting Chopute
                support.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">
                Contact
              </h2>

              <p className="mt-3">
                If you have questions about this Privacy Policy or your
                personal data, please contact Chopute support.
              </p>
            </section>
          </div>
        </div>
      </main>

      <LandingFooter />
    </>
  );
}
