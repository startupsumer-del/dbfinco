import { FileSearch, ListChecks, ScanSearch } from "lucide-react";

import type { ServiceDetail } from "@/types/content";

/**
 * The three assurance engagements offered under /services/audit-assurance.
 *
 * These are deliberately kept distinct: an audit, an internal audit and an
 * agreed-upon procedures engagement are performed under different standards
 * and produce different reports. The copy never uses the terms
 * interchangeably.
 */

const externalAudit: ServiceDetail = {
  slug: "external-audit",
  href: "/services/audit-assurance/external-audit",
  name: "External Audit",
  title: "External Audit",
  icon: FileSearch,
  summary:
    "An independent opinion on whether your financial statements are fairly presented.",
  eyebrow: "Audit & Assurance",
  headline: "An independent opinion on your financial statements.",
  intro:
    "An external audit examines the evidence behind the figures and disclosures in your financial statements and results in an opinion on whether those statements are presented fairly, in conformity with the applicable financial reporting framework.",
  metaTitle: "External Audit Services",
  metaDescription:
    "External audit for privately held companies: independent testing of accounting records and evidence, resulting in an opinion on the fair presentation of financial statements.",
  problem: {
    heading: "When an outside party needs more than your word",
    body: "Lenders, investors, boards, franchisors and counterparties often need assurance that financial statements can be relied on. An external audit provides that through independent testing — and it also tends to surface control weaknesses that were invisible from inside the business.",
    points: [
      "A lender or investor has made audited statements a condition",
      "A shareholder agreement or bylaw requires an annual audit",
      "A transaction or funding round is approaching",
      "The board wants independent verification of what management reports",
    ],
  },
  features: [
    {
      title: "Testing of accounting records",
      description:
        "Rigorous testing of the accounting records underlying the financial statements, targeted at the areas where misstatement is most likely to be material.",
    },
    {
      title: "Examination of supporting evidence",
      description:
        "In-depth examination of the evidence supporting the figures and disclosures presented in the financial statements.",
    },
    {
      title: "Independent confirmation",
      description:
        "Direct confirmation with banks, customers, suppliers and other third parties where independent corroboration is required.",
    },
    {
      title: "Inquiry and analytical procedures",
      description:
        "Structured inquiry of management and staff, combined with analytical assessment of relationships and trends within the financial data.",
    },
    {
      title: "Physical inspection and observation",
      description:
        "Inspection of assets and observation of processes, including inventory counts where inventory is material to the statements.",
    },
    {
      title: "Audit opinion",
      description:
        "An opinion on whether the financial statements are presented fairly, in conformity with generally accepted accounting principles or another applicable financial reporting framework.",
    },
  ],
  deliverables: [
    {
      title: "At completion",
      items: [
        "Independent auditor’s report containing the opinion",
        "Audited financial statements with notes",
        "Management letter setting out control observations",
        "Communication of matters required to be reported to those charged with governance",
      ],
    },
    {
      title: "During the engagement",
      items: [
        "An engagement letter defining scope and responsibilities",
        "A consolidated request list issued before fieldwork",
        "An agreed fieldwork timetable",
        "Findings raised as they arise, not held to the closing meeting",
      ],
    },
  ],
  process: {
    heading: "How an external audit is conducted",
    intro:
      "An audit is a structured process. Knowing the shape of it in advance makes it far less disruptive.",
    steps: [
      {
        title: "Planning and risk assessment",
        description:
          "We build an understanding of the business, its environment and its processes, and identify where material misstatement is most likely to occur.",
      },
      {
        title: "Understanding controls",
        description:
          "We evaluate the controls relevant to financial reporting to determine the nature, timing and extent of the testing required.",
      },
      {
        title: "Fieldwork and testing",
        description:
          "Evidence is gathered through inquiry, analytical assessment, physical inspection, observation and independent confirmation, and tested against the accounting records.",
      },
      {
        title: "Conclusion and reporting",
        description:
          "Findings are evaluated, the statements and disclosures are reviewed, and the auditor’s report is issued together with any control observations.",
      },
    ],
  },
  faqs: [
    {
      question: "What kind of opinion will we receive?",
      answer:
        "That depends entirely on the evidence. An unmodified opinion states that the financial statements are presented fairly in all material respects. Where evidence does not support that conclusion, or where scope was limited, the opinion is modified accordingly. The opinion follows the evidence — it is not negotiated.",
    },
    {
      question: "How is an audit different from a review or a compilation?",
      answer:
        "An audit provides reasonable assurance and an opinion, supported by substantive testing and independent confirmation. A review provides limited assurance and is based principally on inquiry and analytical procedures. A compilation provides no assurance at all — financial information is presented in the correct form without verification. Each is a distinct engagement with distinct standards.",
    },
    {
      question: "Do you audit public companies?",
      answer:
        "No. Our assurance practice works exclusively with privately held companies, which keeps engagements free of public company regulation, reporting deadlines and the associated risk management requirements.",
    },
    {
      question: "How should we prepare?",
      answer:
        "The single biggest factor in a smooth audit is having reconciled books and supporting documentation ready when fieldwork starts. We issue a consolidated request list in advance and are happy to walk through it with your team beforehand.",
    },
  ],
  related: ["internal-audit", "agreed-upon-procedures"],
  cta: {
    heading: "Planning an audit?",
    body: "Tell us who requires the audit and for what period. We will confirm whether an audit is what you need and set out the timetable it would follow.",
  },
};

const internalAudit: ServiceDetail = {
  slug: "internal-audit",
  href: "/services/audit-assurance/internal-audit",
  name: "Internal Audit",
  title: "Internal Audit",
  icon: ScanSearch,
  summary:
    "Independent examination of controls and processes, reporting to management or the board.",
  eyebrow: "Audit & Assurance",
  headline: "Test whether your controls actually work.",
  intro:
    "Internal audit examines whether the controls and processes your business relies on are designed properly and operating as intended. It reports to management or the board, and its purpose is improvement rather than an opinion on financial statements.",
  metaTitle: "Internal Audit Services",
  metaDescription:
    "Internal audit services for privately held companies: independent examination of internal controls, processes and compliance, reporting to management and the board.",
  problem: {
    heading: "Controls on paper are not controls in practice",
    body: "Most businesses can describe their controls. Far fewer have tested whether those controls are being followed under real conditions — when someone is on leave, when a payment is urgent, when a workaround saves an afternoon.",
    points: [
      "A control was designed years ago and the process around it has since changed",
      "Approval limits are routinely worked around for convenience",
      "The board wants assurance that is independent of management",
      "A specific process — payments, payroll, procurement — needs focused examination",
    ],
  },
  features: [
    {
      title: "Control design assessment",
      description:
        "Evaluating whether the controls in place would prevent or detect the risks they are meant to address, assuming they are followed.",
    },
    {
      title: "Operating effectiveness testing",
      description:
        "Testing samples of real transactions to establish whether controls were actually applied, not just documented.",
    },
    {
      title: "Process reviews",
      description:
        "Focused examination of individual cycles — procure-to-pay, order-to-cash, payroll, expenses — end to end.",
    },
    {
      title: "Compliance with internal policy",
      description:
        "Checking that the organization is following its own approved policies, authority limits and procedures.",
    },
    {
      title: "Findings and recommendations",
      description:
        "Each finding rated by significance, with a practical recommendation and a suggested owner rather than a generic instruction.",
    },
    {
      title: "Follow-up testing",
      description:
        "Re-testing agreed remediation in a later cycle to confirm that changes were implemented and held.",
    },
  ],
  deliverables: [
    {
      title: "Reporting",
      items: [
        "Internal audit report with rated findings",
        "Practical recommendations with suggested owners",
        "Management responses recorded alongside each finding",
        "Follow-up status on previously raised items",
      ],
    },
    {
      title: "Planning",
      items: [
        "A risk-based internal audit plan",
        "Scope agreed with management or the board before work starts",
        "Defined testing approach and sample basis",
        "An agreed reporting timetable",
      ],
    },
  ],
  process: {
    heading: "How internal audit work is carried out",
    intro:
      "Internal audit works best as a cycle rather than a one-off exercise.",
    steps: [
      {
        title: "Agree scope and reporting line",
        description:
          "We establish which areas will be examined, on what basis, and to whom findings will be reported — management, the owner or the board.",
      },
      {
        title: "Document the process",
        description:
          "We map how the process actually works today, including the informal workarounds, rather than relying solely on the written procedure.",
      },
      {
        title: "Test",
        description:
          "Controls are tested against real transactions to establish whether they operated as intended throughout the period under review.",
      },
      {
        title: "Report and follow up",
        description:
          "Findings are reported with recommendations and management responses, then re-tested in a subsequent cycle to confirm remediation.",
      },
    ],
  },
  faqs: [
    {
      question: "Is internal audit the same as an external audit?",
      answer:
        "No. An external audit is an independent engagement resulting in an opinion on the financial statements, performed for the benefit of external users. Internal audit examines controls and processes and reports internally, to management or the board. The scope, standards and output are different.",
    },
    {
      question: "Does internal audit produce an opinion?",
      answer:
        "Not an audit opinion on financial statements. Internal audit reports findings, rates them by significance and makes recommendations. It is a management tool, not an assurance report for external users.",
    },
    {
      question: "Can a business our size justify internal audit?",
      answer:
        "Often as a targeted engagement rather than a standing function. A focused review of one high-risk cycle — payments or payroll, for example — frequently delivers more value to a smaller business than a broad program.",
    },
  ],
  related: ["external-audit", "agreed-upon-procedures"],
  cta: {
    heading: "Which process concerns you most?",
    body: "Name the cycle you are least confident about. We will scope a focused review of it and tell you what the testing would involve.",
  },
};

const agreedUponProcedures: ServiceDetail = {
  slug: "agreed-upon-procedures",
  href: "/services/audit-assurance/agreed-upon-procedures",
  name: "Agreed-Upon Procedures",
  title: "Agreed-Upon Procedures",
  icon: ListChecks,
  summary:
    "Specific procedures you define, performed and reported as findings — without an opinion.",
  eyebrow: "Audit & Assurance",
  headline: "Specific procedures, specific findings, no opinion.",
  intro:
    "In an agreed-upon procedures engagement, you and the other parties who will use the report define exactly which procedures we perform. We carry them out and report the findings factually. No opinion or assurance conclusion is expressed — the users draw their own conclusions from the findings.",
  metaTitle: "Agreed-Upon Procedures Engagements",
  metaDescription:
    "Agreed-upon procedures engagements: specific procedures defined by the engaging parties, performed and reported as factual findings without an opinion or assurance conclusion.",
  problem: {
    heading: "Sometimes an audit is more than the question requires",
    body: "When the question is narrow — do these royalty calculations agree to the underlying sales records, does this grant expenditure match the approved budget, do these balances agree to the schedule — a full audit is an expensive way to answer it. Agreed-upon procedures target exactly the question asked.",
    points: [
      "A contract or grant requires verification of specific figures",
      "A buyer wants defined balances tested ahead of a transaction",
      "A franchisor or licensor requires confirmation of reported amounts",
      "A specific reconciliation or calculation needs independent checking",
    ],
  },
  features: [
    {
      title: "Procedures defined by the users",
      description:
        "The parties who will use the report specify the procedures, so the work addresses precisely the question being asked.",
    },
    {
      title: "Factual reporting of findings",
      description:
        "We report what we found in factual terms — what was tested, against what, and what the results were.",
    },
    {
      title: "No opinion expressed",
      description:
        "An agreed-upon procedures engagement does not produce an audit opinion or an assurance conclusion. Users evaluate the findings and reach their own conclusions.",
    },
    {
      title: "Defined, contained scope",
      description:
        "Work is confined to the agreed procedures, which keeps the engagement proportionate to the question.",
    },
    {
      title: "Suitable for contractual requirements",
      description:
        "Well suited to contract, grant, royalty, franchise and transaction requirements where specific figures must be verified.",
    },
    {
      title: "Clear written agreement",
      description:
        "The procedures are documented and agreed in writing by all parties before the work begins.",
    },
  ],
  deliverables: [
    {
      title: "The report",
      items: [
        "A written report listing each procedure performed",
        "The findings resulting from each procedure",
        "An explicit statement that no opinion or assurance conclusion is expressed",
        "Identification of the parties for whom the report is intended",
      ],
    },
    {
      title: "Before work starts",
      items: [
        "Written agreement of the procedures by all engaging parties",
        "An engagement letter setting out responsibilities",
        "A document request list specific to the agreed procedures",
        "An agreed timetable",
      ],
    },
  ],
  process: {
    heading: "How an agreed-upon procedures engagement runs",
    intro:
      "Almost all of the value comes from getting the procedures right before any work is done.",
    steps: [
      {
        title: "Establish who needs what",
        description:
          "We identify every party who will rely on the report and what each of them needs the procedures to establish.",
      },
      {
        title: "Draft and agree the procedures",
        description:
          "The procedures are written in specific, testable terms and agreed in writing by all parties. Vague procedures produce findings nobody can use.",
      },
      {
        title: "Perform the procedures",
        description:
          "We carry out exactly the agreed procedures against the underlying records and document the results.",
      },
      {
        title: "Report the findings",
        description:
          "We issue a report listing each procedure and its findings, stating clearly that no opinion or assurance conclusion is expressed.",
      },
    ],
  },
  faqs: [
    {
      question: "Will the report say whether our figures are correct?",
      answer:
        "No. The report states what procedures were performed and what was found. It does not express an opinion or conclusion about the figures overall. The parties who requested the procedures assess the findings and decide what they mean.",
    },
    {
      question: "Who decides which procedures are performed?",
      answer:
        "The parties who will use the report. That is what makes the engagement 'agreed-upon'. We will help you draft procedures that are specific and testable, but the scope is yours to set and must be agreed in writing before work begins.",
    },
    {
      question: "Can we use the report for anything else?",
      answer:
        "The report is restricted to the parties who agreed the procedures. Because those procedures were designed for a specific purpose, the findings may be misleading if read by someone with a different question in mind.",
    },
    {
      question: "Is this cheaper than an audit?",
      answer:
        "Usually, because the scope is far narrower. But it is not a discount audit — it answers a different kind of question. If what you actually need is assurance over the financial statements as a whole, an audit is the right engagement and we will tell you so.",
    },
  ],
  related: ["external-audit", "internal-audit"],
  cta: {
    heading: "Have a specific figure that needs verifying?",
    body: "Tell us what needs to be established and who is asking. We will help draft procedures that answer it and confirm whether this is the right engagement.",
  },
};

export const auditServices: ServiceDetail[] = [
  externalAudit,
  internalAudit,
  agreedUponProcedures,
];

export const auditServiceBySlug = new Map(
  auditServices.map((service) => [service.slug, service] as const),
);

export function getAuditService(slug: string): ServiceDetail | undefined {
  return auditServiceBySlug.get(slug);
}

export function getAuditServices(slugs: readonly string[]): ServiceDetail[] {
  return slugs
    .map((slug) => auditServiceBySlug.get(slug))
    .filter((service): service is ServiceDetail => service !== undefined);
}
