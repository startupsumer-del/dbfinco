import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ReportingPreview } from "@/components/charts/ReportingPreview";
import { ServicePortrait } from "@/components/imagery/ServicePortrait";
import { JsonLd } from "@/components/layout/JsonLd";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import {
  AuditProgressSection,
  BookkeepingVolumeSection,
  FilingActivitySection,
  RiskProfileSection,
} from "@/components/sections/EngagementVisuals";
import {
  AuditEvidenceVisual,
  EngagementComparison,
  ReceivablesAgingSection,
  RevenueForecastSection,
  RiskRegisterVisual,
} from "@/components/sections/ServiceVisuals";
import {
  AdvisoryVisual,
  CloseChecklistVisual,
  FilingCalendarVisual,
} from "@/components/sections/StoryVisuals";
import { getAuditServices } from "@/content/audit-services";
import { coreServices, getService, getServices } from "@/content/services";
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo";

/** Only the core services live at /services/[slug]. */
const routableSlugs = coreServices.map((service) => service.slug);

export function generateStaticParams() {
  return routableSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service || !routableSlugs.includes(slug)) return {};

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: service.href,
  });
}

/**
 * The data-rich preview sits with the deliverables, where the page is already
 * talking about what actually gets handed over.
 */
function deliverableVisualFor(slug: string) {
  switch (slug) {
    case "accounting":
    case "analytics":
      return <ReportingPreview />;
    case "bookkeeping":
      return <CloseChecklistVisual />;
    case "tax":
      return <FilingCalendarVisual />;
    case "audit-assurance":
      return <AuditEvidenceVisual />;
    case "risk-advisory":
      return <RiskRegisterVisual />;
    case "consulting":
      return <AdvisoryVisual />;
    default:
      return undefined;
  }
}

/**
 * The one extra section a page gets between its deliverables and its process.
 * Only where the service has a second thing worth *showing* rather than
 * describing — not every page needs one.
 */
function extraSectionFor(slug: string) {
  switch (slug) {
    case "audit-assurance":
      return (
        <>
          <EngagementComparison />
          <AuditProgressSection />
        </>
      );
    case "accounting":
      return <ReceivablesAgingSection />;
    case "analytics":
      return <RevenueForecastSection />;
    case "bookkeeping":
      return <BookkeepingVolumeSection />;
    case "tax":
      return <FilingActivitySection />;
    case "risk-advisory":
      return (
        <RiskProfileSection
          eyebrow="The Register"
          title="A Risk Register You Can Actually Work Through"
          lead="A list of everything that could go wrong is not useful. A list rated by severity, with an owner and a status against each item, is."
          panelTitle="Open risks"
        />
      );
    default:
      return undefined;
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service || !routableSlugs.includes(slug)) {
    notFound();
  }

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: service.href },
  ];

  // Related items may reference either a core service or an audit engagement.
  const related = [
    ...getServices(service.related),
    ...getAuditServices(service.related),
  ];

  return (
    <>
      <ServicePageTemplate
        service={service}
        crumbs={crumbs}
        heroVisual={<ServicePortrait slug={slug} />}
        deliverableVisual={deliverableVisualFor(slug)}
        extraSection={extraSectionFor(slug)}
        related={related}
      />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={serviceSchema({
          name: service.title,
          description: service.metaDescription,
          path: service.href,
        })}
      />
    </>
  );
}
