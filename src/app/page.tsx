import { headers } from "next/headers";

import { CorporateHomePage } from "@/components/corporate/corporate-home-page";
import { LeadsLandingPage } from "@/components/leads-landing/leads-landing-page";
import { WebsiteServicesPage } from "@/components/website-services/website-services-page";

export default async function Home() {
  const requestHeaders = await headers();

  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "";

  const hostname = host.split(":")[0].toLowerCase();

  if (
    hostname === "websites.chopute.com" ||
    hostname === "www.websites.chopute.com"
  ) {
    return <WebsiteServicesPage />;
  }

  if (
    hostname === "leads.chopute.com" ||
    hostname === "www.leads.chopute.com"
  ) {
    return <LeadsLandingPage />;
  }

  return <CorporateHomePage />;
}
