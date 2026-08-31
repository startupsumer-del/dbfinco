import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/LegalPage";
import { addressOneLine, mailtoEnquiry, site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "The terms governing your use of the DB FinCo website, including permitted use, intellectual property, third-party links and limitation of liability.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="These terms govern your use of this website. By accessing or using the site you agree to them. If you do not agree, please do not use the site."
      updated="August 2026"
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Terms of Use", path: "/terms" },
      ]}
    >
      <h2>About these terms</h2>
      <p>
        This website is operated by {site.name}, {addressOneLine}. These terms
        apply to the website only. They do not govern the provision of
        professional services, which is set out separately in the engagement
        letter agreed between {site.name} and each client. Where an engagement
        letter and these terms conflict in relation to services, the engagement
        letter prevails.
      </p>

      <h2>No professional advice</h2>
      <p>
        The content on this website is provided for general information. It does
        not constitute accounting, tax, audit, legal, investment or other
        professional advice, and it does not take account of your particular
        circumstances. You should not act, or refrain from acting, on the basis
        of anything on this site without obtaining advice specific to your
        situation. See our{" "}
        <a href="/disclaimer">professional services disclaimer</a> for further
        detail.
      </p>

      <h2>No client relationship</h2>
      <p>
        Using this website, submitting the contact form or otherwise
        corresponding with us does not create a client relationship. A client
        relationship arises only when both parties have agreed the scope of work
        in writing through a signed engagement letter.
      </p>

      <h2>Permitted use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>
          use the site for any unlawful purpose or in breach of these terms;
        </li>
        <li>
          attempt to gain unauthorised access to the site, its servers or any
          connected system;
        </li>
        <li>
          introduce malicious code, or interfere with the operation or
          availability of the site;
        </li>
        <li>
          systematically extract content from the site, including by scraping,
          for republication or commercial use;
        </li>
        <li>
          submit false, misleading or another person&apos;s information through
          any form on the site.
        </li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The content, design, layout, graphics, charts and source code of this
        website, and the {site.name} name and logo, are owned by {site.name} or
        used under licence. You may view and print pages for your own reference.
        Any other use — including reproduction, redistribution or adaptation —
        requires our prior written permission.
      </p>

      <h2>Illustrative figures</h2>
      <p>
        Financial figures, charts, dashboards and reporting examples shown on
        this website are illustrative demonstrations for a fictional business.
        They are not client data, they are not our own results, and they are not
        a representation of outcomes any business will achieve.
      </p>

      <h2>Third-party links</h2>
      <p>
        The site may link to third-party websites, including our social media
        profile and mapping services. Those sites are not under our control. We
        provide links for convenience and do not endorse, and are not
        responsible for, their content, availability or privacy practices.
      </p>

      <h2>Availability</h2>
      <p>
        We aim to keep the site available but do not guarantee uninterrupted
        access. We may change, suspend or withdraw all or part of the site
        without notice.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by applicable law, {site.name} is not
        liable for any loss or damage arising from your use of, or inability to
        use, this website, or from reliance on any content on it. Nothing in
        these terms limits liability that cannot lawfully be limited.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may revise these terms from time to time. The revised version applies
        from the date it is posted, shown at the top of this page.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms and any dispute arising from them are governed by the laws
        of the State of New York, United States, without regard to its conflict
        of law rules.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href={mailtoEnquiry}>{site.contact.emailEnquiry}</a>.
      </p>
    </LegalPage>
  );
}
