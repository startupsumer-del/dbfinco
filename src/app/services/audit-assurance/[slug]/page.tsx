import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/layout/JsonLd";
import { ServicePortrait } from "@/components/imagery/ServicePortrait";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import {
  AuditProgressSection,
  RiskProfileSection,
} from "@/components/sections/EngagementVisuals";
import { AuditEvidenceVisual } from "@/components/sections/ServiceVisuals";
import { auditServices, getAuditService, getAuditServices } from "@/content/audit-services";
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return auditServices.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getAuditService(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: service.href,
  });
}

/**
 * Agreed-upon procedures gets no progress or findings chart, deliberately:
 * the engagement expresses no conclusion, and a chart summarising it would
 * imply one. Its evidence panel says what it does say.
 */
function extraSectionFor(slug: string) {
  switch (slug) {
    case "external-audit":
      return <AuditProgressSection />;
    case "internal-audit":
      return (
        <RiskProfileSection
          eyebrow="The Findings"
          title="Findings You Can Rank, Assign and Close"
          lead="An internal audit report is only worth the follow-up it gets. Every finding carries a rating, an owner and a status, so the next review starts from what actually moved."
          panelTitle="Open findings"
        />
      );
    default:
      return undefined;
  }
}

export default async function AuditServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getAuditService(slug);

  if (!service) {
    notFound();
  }

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Audit & Assurance", path: "/services/audit-assurance" },
    { name: service.name, path: service.href },
  ];

  return (
    <>
      <ServicePageTemplate
        service={service}
        crumbs={crumbs}
        heroVisual={<ServicePortrait slug={slug} />}
        deliverableVisual={
          slug === "external-audit" ? <AuditEvidenceVisual /> : undefined
        }
        extraSection={extraSectionFor(slug)}
        related={getAuditServices(service.related)}
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
