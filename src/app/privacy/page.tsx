import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/LegalPage";
import { addressOneLine, mailtoEnquiry, site, telHref } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How DB FinCo collects, uses, shares and protects personal information provided through this website and in the course of providing professional services.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy explains what personal information DB FinCo collects through this website and in the course of providing our services, how we use it, and the choices available to you."
      updated="August 2026"
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Privacy Policy", path: "/privacy" },
      ]}
    >
      <h2>Who we are</h2>
      <p>
        {site.name} ({site.tagline}) provides accounting, bookkeeping, tax,
        audit and assurance, consulting, advisory, analytics and merchant
        services support to businesses. Our head office is at {addressOneLine}.
        In this policy, &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo;
        refer to {site.name}.
      </p>

      <h2>Information we collect</h2>
      <p>We collect personal information in the following ways.</p>
      <ul>
        <li>
          <strong>Information you give us.</strong> When you complete the
          contact form, call us or email us, we collect the details you provide
          — typically your name, email address, telephone number, company name,
          business type, the service you are interested in and the content of
          your message.
        </li>
        <li>
          <strong>Information provided during an engagement.</strong> If you
          become a client, we collect the financial and business records
          necessary to perform the services you have engaged us to provide.
        </li>
        <li>
          <strong>Technical information.</strong> Our hosting provider processes
          standard server request data such as IP address, browser type and the
          pages requested, for the purposes of delivering and securing the site.
        </li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your enquiry and arrange a consultation.</li>
        <li>To provide the professional services you have engaged us for.</li>
        <li>To communicate with you about an active engagement.</li>
        <li>
          To meet our legal, regulatory and professional obligations, including
          record-retention requirements applicable to accounting, tax and
          assurance work.
        </li>
        <li>To operate, secure and improve this website.</li>
      </ul>
      <p>
        We do not sell your personal information, and we do not use enquiry
        details for unrelated marketing.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        This website does not set advertising or tracking cookies. Where website
        analytics are enabled, they are used solely to understand aggregate site
        usage, and any such measurement is configured through an environment
        setting rather than being embedded in the site by default. If analytics
        are active on your visit, the provider&apos;s own privacy terms will
        also apply.
      </p>

      <h2>Sharing your information</h2>
      <p>
        We share personal information only where necessary, and only with:
      </p>
      <ul>
        <li>
          service providers who support our operations, such as our website
          host and email delivery provider, under obligations of
          confidentiality;
        </li>
        <li>
          third parties where you have asked us to, for example when we
          coordinate with your payroll provider, payment provider or another
          adviser;
        </li>
        <li>
          regulators, courts or authorities where we are legally required or
          professionally obliged to do so.
        </li>
      </ul>

      <h2>How long we keep it</h2>
      <p>
        Enquiry correspondence is retained for as long as needed to respond and
        to maintain a record of the conversation. Client records are retained
        for the periods required by applicable law, tax rules and professional
        standards, which are typically several years after an engagement ends.
      </p>

      <h2>Security</h2>
      <p>
        We take reasonable technical and organisational measures to protect
        personal information against unauthorised access, loss or disclosure. No
        method of transmission or storage is completely secure, and we cannot
        guarantee absolute security. Please do not send sensitive financial
        documents or identification numbers through the website contact form —
        we will agree a secure method with you once we are in touch.
      </p>

      <h2>Your choices</h2>
      <p>
        You may ask us to confirm what personal information we hold about you,
        to correct inaccurate information, or to delete information we are not
        required to retain. Depending on where you are located, additional
        rights may apply. To make a request, contact us using the details below.
      </p>

      <h2>Children</h2>
      <p>
        This website is directed to businesses and is not intended for children.
        We do not knowingly collect personal information from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top of this
        page shows when it was last revised.
      </p>

      <h2>Contact us</h2>
      <p>
        For any question about this policy or about how we handle your
        information, contact us at{" "}
        <a href={mailtoEnquiry}>{site.contact.emailEnquiry}</a>, call{" "}
        <a href={telHref}>{site.contact.phoneDisplay}</a>, or write to us at{" "}
        {addressOneLine}.
      </p>
    </LegalPage>
  );
}
