import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ReportingPreview } from "@/components/charts/ReportingPreview";
import { JsonLd } from "@/components/layout/JsonLd";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import {
  AuditEvidenceVisual,
  EngagementComparison,
  RiskRegisterVisual,
} from "@/components/sections/ServiceVisuals";
import {
  AdvisoryVisual,
  CloseChecklistVisual,
  FilingCalendarVisual,
} from "@/components/sections/StoryVisuals";
import {
  AccountingScene,
  AnalyticsScene,
  AuditScene,
  BookkeepingScene,
  ConsultingScene,
  RiskScene,
  TaxScene,
} from "@/components/illustrations/ServiceScenes";
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
 * Each service gets its own illustration in the hero banner, so the eight
 * pages are distinguishable at a glance rather than reading as one template.
 */
function heroVisualFor(slug: string) {
  switch (slug) {
    case "accounting":
      return <AccountingScene />;
    case "bookkeeping":
      return <BookkeepingScene />;
    case "tax":
      return <TaxScene />;
    case "audit-assurance":
      return <AuditScene />;
    case "risk-advisory":
      return <RiskScene />;
    case "consulting":
      return <ConsultingScene />;
    case "analytics":
      return <AnalyticsScene />;
    default:
      return undefined;
  }
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
        heroVisual={heroVisualFor(slug)}
        deliverableVisual={deliverableVisualFor(slug)}
        extraSection={slug === "audit-assurance" ? <EngagementComparison /> : undefined}
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
