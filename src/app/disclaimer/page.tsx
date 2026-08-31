import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/LegalPage";
import { mailtoEnquiry, site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Professional Services Disclaimer",
  description:
    "Important information about the scope of DB FinCo’s accounting, tax, assurance, advisory and merchant services, and the limits of the information provided on this website.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Professional Services Disclaimer"
      intro="This page sets out important limits on the information published here and on the scope of the services we provide. Please read it alongside our terms of use."
      updated="August 2026"
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Disclaimer", path: "/disclaimer" },
      ]}
    >
      <h2>General information only</h2>
      <p>
        Everything published on this website is general information about the
        services {site.name} offers. It is not accounting, bookkeeping, tax,
        audit, assurance, legal, investment or financial advice, and it is not a
        substitute for advice tailored to your circumstances. No content here
        should be relied upon in making a financial, tax or business decision.
      </p>

      <h2>No engagement without an engagement letter</h2>
      <p>
        Reading this website, submitting the contact form, or speaking with us
        during a consultation does not create a professional relationship. We
        act for a client only once the scope, responsibilities and terms have
        been agreed in a signed engagement letter.
      </p>

      <h2>Illustrative financial figures</h2>
      <p>
        The dashboards, charts, statements, reconciliations, settlement
        summaries and metrics shown across this site use demonstration figures
        for a fictional business. They exist to show the format and clarity of
        our reporting. They are not client data, they are not our own financial
        results, and they do not represent or predict results for any business.
      </p>

      <h2>Tax services</h2>
      <p>
        Tax treatment depends on the specific facts of each business and on law
        that changes over time. We prepare returns and support compliance based
        on the information provided to us and the law as we understand it to
        apply at the time. We do not guarantee any particular tax outcome, tax
        saving, refund, or that a filing position will not be challenged by a
        tax authority.
      </p>

      <h2>Audit and assurance</h2>
      <p>
        An audit, a review, a compilation and an agreed-upon procedures
        engagement are distinct engagements performed under different standards,
        providing different levels of assurance and resulting in different
        reports. An audit provides reasonable assurance and results in an
        opinion; a review provides limited assurance; agreed-upon procedures
        provide no assurance conclusion and report findings only; a compilation
        provides no assurance. Our assurance practice works with privately held
        companies. Any report we issue is subject to the scope, limitations and
        intended users stated within it, and should not be used for any other
        purpose or by any other party.
      </p>

      <h2>Advisory, consulting and analytics</h2>
      <p>
        Advisory, consulting, risk and analytics work is based on the
        information available to us at the time and on assumptions that are
        documented and open to challenge. Forecasts and projections are
        inherently uncertain and actual results will differ. We do not guarantee
        any business, financial or operational outcome.
      </p>

      <h2>Merchant services</h2>
      <p>
        {site.name} is an accounting and advisory firm. We are not a bank, a
        payment processor, a payment gateway, an acquiring bank, a payment
        facilitator, an independent sales organisation, a member service
        provider or a card network. We do not issue cards, hold funds, or
        process payments. Payment processing, card issuing, settlement and
        banking are performed by the relevant payment providers and financial
        institutions.
      </p>
      <p>
        Payment methods, pricing and service availability may vary by provider,
        business type, underwriting requirements and jurisdiction. Acceptance of
        any merchant application, and the terms offered, are determined solely
        by the payment provider and its sponsoring financial institution. We do
        not guarantee merchant approval, processing rates, settlement timing,
        chargeback outcomes or the continued availability of any payment
        service. Where card networks, wallets or bank transfer methods are
        referred to on this site, they are described as payment methods that may
        commonly be supported — not as partners, sponsors or endorsers of{" "}
        {site.name}.
      </p>

      <h2>Business formation and legal matters</h2>
      <p>
        {site.name} does not provide legal services and is not a law firm. Where
        a matter requires legal advice — including entity formation documents,
        contracts, disputes or regulatory representation — you should engage
        appropriately qualified legal counsel.
      </p>

      <h2>No guarantees or performance claims</h2>
      <p>
        This website does not publish client counts, ratings, awards,
        certifications, partnership claims or performance statistics, because we
        publish only what can be substantiated. Any figure presented is either
        clearly labelled as illustrative or is a verified fact about our
        business, such as our contact details and business hours.
      </p>

      <h2>Third-party content</h2>
      <p>
        Links to third-party websites are provided for convenience only. We do
        not control and are not responsible for their content, accuracy,
        availability or practices.
      </p>

      <h2>Questions</h2>
      <p>
        If anything here is unclear, or you want to know exactly what a
        particular engagement would and would not cover, contact us at{" "}
        <a href={mailtoEnquiry}>{site.contact.emailEnquiry}</a> and we will set
        it out in writing before any work begins.
      </p>
    </LegalPage>
  );
}
