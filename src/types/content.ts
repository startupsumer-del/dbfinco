import type { LucideIcon } from "lucide-react";

/** A short, scannable benefit or deliverable. */
export interface FeatureItem {
  title: string;
  description: string;
}

/** One numbered step in a service engagement. */
export interface ProcessStep {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** A statistic-free proof point: what the client actually receives. */
export interface DeliverableGroup {
  title: string;
  items: string[];
}

export interface ServiceSummary {
  /** URL slug segment, unique across the services collection. */
  slug: string;
  /** Full site-absolute route. */
  href: string;
  /** Short name used in navigation. */
  name: string;
  /** Longer name used as the page H1 subject. */
  title: string;
  /** One sentence for cards and mega-menu rows. */
  summary: string;
  icon: LucideIcon;
}

export interface ServiceDetail extends ServiceSummary {
  /** Small label above the hero H1. */
  eyebrow: string;
  /** Hero headline. Written per service — never templated. */
  headline: string;
  /** Hero supporting paragraph. */
  intro: string;
  /** SEO title (without the brand suffix) and description. */
  metaTitle: string;
  metaDescription: string;
  /** The client problem this service exists to solve. */
  problem: {
    heading: string;
    body: string;
    points: string[];
  };
  /** Core capabilities. */
  features: FeatureItem[];
  /** What is handed over, grouped. */
  deliverables: DeliverableGroup[];
  /** How the engagement runs. */
  process: {
    heading: string;
    intro: string;
    steps: ProcessStep[];
  };
  faqs: FaqItem[];
  /** Sibling services worth surfacing at the foot of the page. */
  related: string[];
  /** Closing CTA copy, tailored to the service. */
  cta: {
    heading: string;
    body: string;
  };
}
