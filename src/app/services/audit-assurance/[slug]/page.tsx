import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/layout/JsonLd";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { AuditEvidenceVisual } from "@/components/sections/ServiceVisuals";
import {
  AuditScene,
  InternalAuditScene,
  ProceduresScene,
} from "@/components/illustrations/ServiceScenes";
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

/** Each engagement type gets its own illustration in the hero banner. */
function heroVisualFor(slug: string) {
  switch (slug) {
    case "external-audit":
      return <AuditScene />;
    case "internal-audit":
      return <InternalAuditScene />;
    case "agreed-upon-procedures":
      return <ProceduresScene />;
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
        heroVisual={heroVisualFor(slug)}
        deliverableVisual={
          slug === "external-audit" ? <AuditEvidenceVisual /> : undefined
        }
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
