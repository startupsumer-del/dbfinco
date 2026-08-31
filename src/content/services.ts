import {
  BarChart3,
  BookOpenCheck,
  Calculator,
  ClipboardCheck,
  CreditCard,
  Lightbulb,
  Receipt,
  ShieldCheck,
} from "lucide-react";

import type { ServiceDetail, ServiceSummary } from "@/types/content";

/* ==========================================================================
   Accounting
   ========================================================================== */

const accounting: ServiceDetail = {
  slug: "accounting",
  href: "/services/accounting",
  name: "Financial Accounting",
  title: "Financial Accounting",
  icon: Calculator,
  summary:
    "Statement preparation, budgeting and forecasting handled by accountants who know your numbers.",
  eyebrow: "Financial Accounting",
  headline: "Financial statements you can actually make decisions from.",
  intro:
    "We prepare the profit and loss, balance sheet and cash flow statement that show where your business really stands — then help you read them. Budgets and forecasts are built from the same numbers, so the plan and the actuals speak the same language.",
  metaTitle: "Financial Accounting Services",
  metaDescription:
    "Financial statement preparation, budgeting and forecasting for small and medium-sized businesses. DB FinCo builds accounting you can plan against.",
  problem: {
    heading: "When accounting is an afterthought, planning becomes guesswork",
    body: "Most growing businesses do not lack data — they lack accounting that arrives on time, in a consistent format, tied to a chart of accounts that reflects how the business actually operates. Until that exists, every budget conversation starts with a debate about whether the numbers are right.",
    points: [
      "Statements arrive weeks after the period closes, too late to change anything",
      "The chart of accounts has grown organically and no longer maps to how you manage the business",
      "Budgets live in a spreadsheet that was never reconciled back to the books",
      "Accrual and cash figures are mixed, so margins move for reasons nobody can explain",
    ],
  },
  features: [
    {
      title: "Financial statement preparation",
      description:
        "Profit and loss, balance sheet and statement of cash flows prepared on a consistent basis and delivered on a fixed schedule.",
    },
    {
      title: "Chart of accounts design",
      description:
        "An account structure built around your revenue streams, cost centers and reporting needs — detailed enough to be useful, short enough to maintain.",
    },
    {
      title: "Budgeting",
      description:
        "Annual and departmental budgets built bottom-up from real cost drivers, then loaded back into the books so variance reporting is automatic.",
    },
    {
      title: "Forecasting",
      description:
        "Rolling revenue, expense and cash forecasts that update as actuals land, with the assumptions written down and open to challenge.",
    },
    {
      title: "Accrual and adjusting entries",
      description:
        "Prepaids, accruals, deferred revenue, depreciation and amortization posted correctly so each period carries its own costs.",
    },
    {
      title: "Management reporting",
      description:
        "A reporting pack that pairs the statements with the handful of measures your leadership team actually uses.",
    },
  ],
  deliverables: [
    {
      title: "Every period",
      items: [
        "Profit and loss statement",
        "Balance sheet",
        "Statement of cash flows",
        "Budget versus actual variance report",
        "Written commentary on movements that matter",
      ],
    },
    {
      title: "Every year",
      items: [
        "Annual financial statements",
        "Full-year budget with departmental detail",
        "Year-end close file and supporting schedules",
        "Documentation ready for your tax preparer or auditor",
      ],
    },
  ],
  process: {
    heading: "How an accounting engagement runs",
    intro:
      "The first weeks are about getting the foundation right. After that the work settles into a predictable rhythm.",
    steps: [
      {
        title: "Review the current position",
        description:
          "We walk through your existing books, chart of accounts, accounting basis and reporting calendar, and write up what is working and what needs to change.",
      },
      {
        title: "Rebuild the foundation",
        description:
          "Where needed we restructure the chart of accounts, correct opening balances and agree the accounting policies that will apply going forward.",
      },
      {
        title: "Establish the reporting cycle",
        description:
          "We set a close calendar with named owners and due dates, so you know exactly when each period’s statements will land.",
      },
      {
        title: "Report, review, refine",
        description:
          "Statements are delivered on schedule and reviewed with you. Budgets and forecasts are revised as the business changes rather than once a year.",
      },
    ],
  },
  faqs: [
    {
      question: "Do you work on a cash or accrual basis?",
      answer:
        "Both. Many smaller businesses start on a cash basis and move to accrual as they take on inventory, deferred revenue or outside financing. We will tell you which basis fits your situation, and if a change is warranted we handle the conversion and restate prior periods so comparatives remain meaningful.",
    },
    {
      question: "Will you work with the accounting software we already use?",
      answer:
        "Yes. We work in the systems our clients already run rather than forcing a migration. If your current setup is genuinely holding the business back we will say so and lay out what a move would involve, but that is your decision to make.",
    },
    {
      question: "How is this different from bookkeeping?",
      answer:
        "Bookkeeping records and reconciles transactions as they happen. Financial accounting takes those records and turns them into statements, budgets and forecasts prepared to a consistent standard. Most clients need both, and they work best when the same team handles them.",
    },
    {
      question: "Can you take over partway through a financial year?",
      answer:
        "Yes, and it is common. We review the year to date, correct what needs correcting, document the adjustments, and take over from an agreed cut-off date.",
    },
  ],
  related: ["bookkeeping", "analytics", "tax"],
  cta: {
    heading: "Let’s look at your current statements",
    body: "Bring your most recent profit and loss and balance sheet to a free consultation. We will tell you what they show, what they are missing, and what it would take to fix.",
  },
};

/* ==========================================================================
   Bookkeeping
   ========================================================================== */

const bookkeeping: ServiceDetail = {
  slug: "bookkeeping",
  href: "/services/bookkeeping",
  name: "Bookkeeping",
  title: "Bookkeeping",
  icon: BookOpenCheck,
  summary:
    "Clean, reconciled books closed on a schedule — categorization, AR, AP and month-end close.",
  eyebrow: "Bookkeeping",
  headline: "Books that are current, reconciled and closed on time.",
  intro:
    "Transactions categorized correctly, bank and card accounts reconciled, receivables and payables tracked, and the month closed on a date you can count on. Everything downstream — tax, financing, valuation, planning — depends on this being right.",
  metaTitle: "Bookkeeping Services",
  metaDescription:
    "Ongoing bookkeeping for small and medium-sized businesses: transaction categorization, reconciliation, accounts receivable and payable, and month-end close.",
  problem: {
    heading: "Behind books cost more than they look like they cost",
    body: "Bookkeeping rarely fails loudly. It slips a week, then a month, and by the time anyone notices, the tax deadline is close, the lender wants statements, and nobody can say with confidence what the cash position was at month end.",
    points: [
      "Bank feeds pile up uncategorized or land in a catch-all account",
      "Reconciliations are skipped, so errors and duplicates survive for months",
      "Nobody is chasing receivables, and payment terms quietly stretch",
      "Month end has no fixed close date, so the numbers are never final",
    ],
  },
  features: [
    {
      title: "Bookkeeping setup",
      description:
        "Opening balances, bank and card feeds, account mappings and rules configured properly from the start.",
    },
    {
      title: "Transaction categorization",
      description:
        "Every transaction coded to the right account against a documented policy, so categorization stays consistent month after month.",
    },
    {
      title: "Bank and card reconciliation",
      description:
        "All bank, credit card and merchant accounts reconciled each period, with unmatched items investigated rather than written off.",
    },
    {
      title: "Accounts receivable",
      description:
        "Invoices raised and tracked, an aging report you can act on, and follow-up on balances that have drifted past terms.",
    },
    {
      title: "Accounts payable",
      description:
        "Bills recorded against the right period, approvals tracked, and a payables schedule that shows what is due and when.",
    },
    {
      title: "Month-end close",
      description:
        "A defined close checklist run every period, ending with reconciled books and a delivered reporting pack.",
    },
  ],
  deliverables: [
    {
      title: "Every month",
      items: [
        "Fully reconciled bank, card and merchant accounts",
        "Categorized transaction ledger",
        "Accounts receivable aging",
        "Accounts payable schedule",
        "Profit and loss, balance sheet and cash flow statement",
        "A close checklist showing exactly what was reviewed",
      ],
    },
    {
      title: "Ongoing",
      items: [
        "A named point of contact who knows your account",
        "Documented categorization rules",
        "Clean records ready for tax preparation",
        "Support for lender, investor and audit requests",
      ],
    },
  ],
  process: {
    heading: "How bookkeeping works with us",
    intro:
      "Onboarding is front-loaded on purpose. Once the setup is right, the monthly cycle becomes routine.",
    steps: [
      {
        title: "Assess and clean up",
        description:
          "We review the existing books, identify unreconciled periods and miscoded transactions, and agree the scope of any catch-up work before it starts.",
      },
      {
        title: "Set up the system",
        description:
          "Feeds, chart of accounts, categorization rules and access permissions are configured, and we document how each type of transaction should be treated.",
      },
      {
        title: "Run the monthly cycle",
        description:
          "Transactions are categorized and reconciled through the month rather than in a rush at the end, so the close date holds.",
      },
      {
        title: "Close and report",
        description:
          "The close checklist is completed, statements are produced, and anything that needs your attention is flagged in plain language.",
      },
    ],
  },
  faqs: [
    {
      question: "Our books are months behind. Can you catch us up?",
      answer:
        "Yes. Catch-up work is scoped separately from ongoing bookkeeping so you can see what the backlog costs before committing. We work oldest period forward, reconcile as we go, and give you a written summary of the corrections made.",
    },
    {
      question: "How quickly after month end do we get our reports?",
      answer:
        "We agree a close date with you during onboarding and hold to it. The timing depends on how quickly source documents and bank data reach us, which is why we set expectations on both sides up front.",
    },
    {
      question: "Do you handle payroll?",
      answer:
        "We record payroll in the books and reconcile it, and we work alongside your payroll provider. Payroll processing itself is a separate function — tell us who runs it and we will make sure it flows through the accounts correctly.",
    },
    {
      question: "Who actually does the work?",
      answer:
        "Your account is handled by a named bookkeeper who works on it every month, with review by a senior accountant. You are not routed to a different person each time you have a question.",
    },
  ],
  related: ["accounting", "tax", "merchant-services"],
  cta: {
    heading: "Find out what your books actually need",
    body: "We will review your current setup, tell you honestly whether you need a clean-up, and scope it before any work begins.",
  },
};

/* ==========================================================================
   Tax
   ========================================================================== */

const tax: ServiceDetail = {
  slug: "tax",
  href: "/services/tax",
  name: "Tax Services",
  title: "Tax Services",
  icon: Receipt,
  summary:
    "Business tax preparation, sales tax, information reporting and notice support, handled year-round.",
  eyebrow: "Tax Services",
  headline: "Tax handled through the year, not just at the deadline.",
  intro:
    "Federal and state business tax preparation, sales tax filings, 1099 reporting and support when a notice arrives. Because we work from books we help maintain, filing season is a continuation of ordinary work rather than a scramble.",
  metaTitle: "Business Tax Services",
  metaDescription:
    "Business tax preparation and compliance: federal and state returns, sales tax, 1099 information reporting and tax notice support for small and medium-sized businesses.",
  problem: {
    heading: "Deadline-driven tax work is where avoidable problems start",
    body: "When tax is treated as a once-a-year event, the preparer inherits whatever the books happen to look like in March. Elections get missed, filing obligations in new states go unnoticed, and there is no time left to do anything but file.",
    points: [
      "Nexus is created in a new state and nobody registers until a notice arrives",
      "1099 obligations surface in January, after vendor details should have been collected",
      "Sales tax is collected at the wrong rate, or filed late in one jurisdiction",
      "Books are still being corrected while the return is being prepared",
    ],
  },
  features: [
    {
      title: "Business tax preparation",
      description:
        "Federal and state business income tax returns prepared from reconciled books, with the positions taken documented and explained.",
    },
    {
      title: "Sales tax compliance",
      description:
        "Registration, rate application, return preparation and filing calendars across the jurisdictions where you have an obligation.",
    },
    {
      title: "Information reporting",
      description:
        "Form 1099 preparation and filing, including vendor onboarding and W-9 collection through the year rather than in January.",
    },
    {
      title: "Filing calendar management",
      description:
        "A single calendar covering every federal, state and local filing that applies to your business, with owners and lead times.",
    },
    {
      title: "Tax notice support",
      description:
        "When a notice arrives we read it, explain what it actually says, prepare the response and track it through to resolution.",
    },
    {
      title: "Year-round coordination",
      description:
        "Tax treatment is considered as transactions happen — new states, new entities, new revenue streams — not reconstructed afterwards.",
    },
  ],
  deliverables: [
    {
      title: "Compliance",
      items: [
        "Prepared federal and state business returns",
        "Sales tax returns for each registered jurisdiction",
        "Form 1099 filings and recipient copies",
        "A written filing calendar for the year ahead",
      ],
    },
    {
      title: "Support",
      items: [
        "Plain-language explanation of every return before it is filed",
        "Copies of filings and supporting workpapers",
        "Responses to tax authority correspondence",
        "Guidance when the business changes shape",
      ],
    },
  ],
  process: {
    heading: "How we approach tax work",
    intro:
      "The aim is that nothing about filing season comes as a surprise to either side.",
    steps: [
      {
        title: "Map your obligations",
        description:
          "We establish which returns apply — entity type, states, sales tax registrations, information reporting — and build the filing calendar from that.",
      },
      {
        title: "Keep records filing-ready",
        description:
          "Vendor documentation, sales tax data and supporting records are collected as part of ordinary bookkeeping rather than gathered at the deadline.",
      },
      {
        title: "Prepare and review",
        description:
          "Returns are prepared from closed books and reviewed with you before filing, including anything unusual and the reasoning behind it.",
      },
      {
        title: "File and follow through",
        description:
          "We file, retain the workpapers, and handle any correspondence that follows.",
      },
    ],
  },
  faqs: [
    {
      question: "Can you file in more than one state?",
      answer:
        "Yes. Multi-state filing obligations are common once a business sells or employs across state lines. We work through where you have a filing requirement, handle the registrations, and manage the ongoing calendar.",
    },
    {
      question: "We received a notice from a tax authority. What now?",
      answer:
        "Send it to us before you respond. Many notices are routine and resolved with a straightforward reply and supporting documentation. We will tell you what it means, what it will take to resolve, and handle the response.",
    },
    {
      question: "Do you prepare personal returns for business owners?",
      answer:
        "Our focus is business tax. Where an owner’s personal return depends on business activity, we coordinate with your personal preparer so both sides are consistent. Ask us about your specific situation and we will tell you plainly what we can take on.",
    },
    {
      question: "Can you promise to reduce our tax bill?",
      answer:
        "No, and you should be cautious of anyone who does. What we do is make sure your return is accurate, filed on time, and that available treatments applicable to your circumstances are properly considered and documented.",
    },
  ],
  related: ["accounting", "bookkeeping", "audit-assurance"],
  cta: {
    heading: "Get ahead of your next filing deadline",
    body: "Tell us your entity type and where you operate. We will map the filings that apply and what needs to happen before the next one is due.",
  },
};

/* ==========================================================================
   Audit & Assurance
   ========================================================================== */

const auditAssurance: ServiceDetail = {
  slug: "audit-assurance",
  href: "/services/audit-assurance",
  name: "Audit & Assurance",
  title: "Audit & Assurance",
  icon: ClipboardCheck,
  summary:
    "Assurance work for privately held companies — external audit, internal audit and agreed-upon procedures.",
  eyebrow: "Audit & Assurance",
  headline: "Assurance work built for privately held companies.",
  intro:
    "Our assurance practice focuses on privately held businesses. That focus keeps engagements free of public company reporting deadlines and regulatory overhead, and keeps the work centered on the evidence behind your financial statements.",
  metaTitle: "Audit & Assurance Services",
  metaDescription:
    "Audit and assurance services for privately held companies: external audit, internal audit and agreed-upon procedures engagements from DB FinCo.",
  problem: {
    heading: "Different questions need different engagements",
    body: "\"We need an audit\" often turns out to mean something else. A lender may accept a review. A board may want internal audit work on a specific process. A buyer may want agreed-upon procedures over a defined set of balances. Choosing the wrong engagement costs time and money and still may not answer the question.",
    points: [
      "An audit provides an opinion on whether the financial statements are fairly presented",
      "Internal audit examines controls and processes, and reports to management or the board",
      "Agreed-upon procedures perform specific tests you define, and report findings without an opinion",
      "These are distinct engagements with distinct standards — they are not interchangeable",
    ],
  },
  features: [
    {
      title: "Testing of accounting records",
      description:
        "Rigorous testing of the underlying records supporting the figures and disclosures in the financial statements.",
    },
    {
      title: "Evidence gathering",
      description:
        "Evidence obtained through inquiry, analytical assessment, physical inspection, observation and independent confirmation.",
    },
    {
      title: "Opinion on fair presentation",
      description:
        "For audit engagements, an opinion on whether the financial statements are presented fairly in conformity with generally accepted accounting principles or another applicable reporting framework.",
    },
    {
      title: "Private company focus",
      description:
        "Working exclusively with privately held companies keeps engagements clear of public company regulation, filing deadlines and the risk management overhead that comes with them.",
    },
    {
      title: "Control observations",
      description:
        "Weaknesses and inefficiencies identified during the work are reported back to you in a form you can act on.",
    },
    {
      title: "Coordinated planning",
      description:
        "Timetables, document requests and site visits agreed in advance so the engagement fits around your operations.",
    },
  ],
  deliverables: [
    {
      title: "Engagement outputs",
      items: [
        "Audit report and opinion, where an audit is performed",
        "Internal audit findings and recommendations",
        "Agreed-upon procedures report setting out findings",
        "Management letter covering control observations",
      ],
    },
    {
      title: "Throughout",
      items: [
        "An agreed engagement letter defining scope before work starts",
        "A single, consolidated document request list",
        "Regular status updates during fieldwork",
        "A closing meeting to walk through findings",
      ],
    },
  ],
  process: {
    heading: "How an assurance engagement runs",
    intro:
      "Scope is settled before fieldwork begins, so there are no surprises about what is and is not covered.",
    steps: [
      {
        title: "Scope the engagement",
        description:
          "We establish what question you actually need answered and which engagement type answers it, then set it out in an engagement letter.",
      },
      {
        title: "Plan and assess risk",
        description:
          "We build an understanding of the business and its processes, identify where material misstatement is most likely, and plan the work around that.",
      },
      {
        title: "Perform fieldwork",
        description:
          "Testing, inspection, observation and confirmation are carried out against the plan, with findings raised as they emerge rather than held to the end.",
      },
      {
        title: "Report",
        description:
          "We issue the report appropriate to the engagement and walk you through the findings and any control observations.",
      },
    ],
  },
  faqs: [
    {
      question: "What is the difference between an audit and a review?",
      answer:
        "An audit provides reasonable assurance and results in an opinion on whether the financial statements are fairly presented. A review provides limited assurance and is substantially narrower in scope, based mainly on inquiry and analytical procedures. They are separate engagements with separate standards, and the report wording differs accordingly.",
    },
    {
      question: "Do you audit public companies?",
      answer:
        "No. Our assurance work is exclusively for privately held companies. That is a deliberate focus — it keeps our engagements away from public company regulation, reporting deadlines and the associated risk management burden.",
    },
    {
      question: "How long does an engagement take?",
      answer:
        "It depends on the size of the business, the state of the records and the engagement type. We give you an expected timetable during scoping, and the biggest factor in holding to it is how ready the supporting documentation is when fieldwork starts.",
    },
    {
      question: "Can you audit books that you also prepare?",
      answer:
        "Independence requirements govern which services can be provided alongside an audit for the same client. We will tell you at the outset whether the combination you are asking about is appropriate, and what the alternatives are.",
    },
  ],
  related: ["accounting", "risk-advisory", "tax"],
  cta: {
    heading: "Not sure which engagement you need?",
    body: "Tell us who is asking for the work and what they want to know. We will tell you which engagement answers that question — and if you need less than you thought, we will say so.",
  },
};

/* ==========================================================================
   Consulting
   ========================================================================== */

const consulting: ServiceDetail = {
  slug: "consulting",
  href: "/services/consulting",
  name: "Consulting",
  title: "Business Consulting",
  icon: Lightbulb,
  summary:
    "Practical support on financial, operational and technology challenges as the business grows.",
  eyebrow: "Business Consulting",
  headline: "Help with the financial and operational decisions in front of you.",
  intro:
    "Seasoned professionals working alongside your team on financial, operational and technology challenges — pricing and margin, finance operations, systems, and the structural questions that come with growth.",
  metaTitle: "Business Consulting Services",
  metaDescription:
    "Business consulting from DB FinCo: financial strategy, margin and pricing analysis, finance operations design and systems support for growing companies.",
  problem: {
    heading: "Growth exposes the things that used to work",
    body: "Processes that carried a business through its first few years tend to break at the next stage. The close takes longer every month, the person who knows how everything works is a bottleneck, and nobody has time to redesign the system while running it.",
    points: [
      "Finance is stretched, and hiring a full-time leader is not yet justified",
      "Margins are moving and the reason is not visible in the current reporting",
      "Manual processes are absorbing time that should go into the business",
      "A decision needs analysis nobody internally has the bandwidth to build",
    ],
  },
  features: [
    {
      title: "Financial strategy",
      description:
        "Working through the financial implications of the decisions on your table, with the assumptions made explicit.",
    },
    {
      title: "Margin and pricing analysis",
      description:
        "Unit economics built from your own cost data, showing where margin is actually earned and where it leaks.",
    },
    {
      title: "Finance operations design",
      description:
        "Redesigning the close, approval workflows and reporting cycle so they hold up as volume grows.",
    },
    {
      title: "Systems and tooling",
      description:
        "Assessing the accounting and finance stack, and supporting selection or implementation where a change is warranted.",
    },
    {
      title: "Project-based support",
      description:
        "Defined pieces of work with a clear scope, timeline and output, rather than an open-ended retainer.",
    },
    {
      title: "Preparation for external review",
      description:
        "Getting records, reporting and controls into shape ahead of a lender, investor or audit process.",
    },
  ],
  deliverables: [
    {
      title: "Typical outputs",
      items: [
        "A written assessment with prioritized recommendations",
        "Financial models with documented assumptions",
        "Process documentation and close calendars",
        "System requirements and selection criteria",
      ],
    },
    {
      title: "Working style",
      items: [
        "A defined scope agreed before work starts",
        "Regular check-ins rather than a single reveal at the end",
        "Recommendations you can implement, with the reasoning shown",
        "Support during implementation where you want it",
      ],
    },
  ],
  process: {
    heading: "How consulting engagements work",
    intro:
      "Every engagement starts with agreeing what \"done\" looks like.",
    steps: [
      {
        title: "Define the question",
        description:
          "We spend the first conversation making sure we are solving the right problem, and write down what a useful answer would contain.",
      },
      {
        title: "Gather and analyze",
        description:
          "We work from your own data — books, systems, contracts, operational records — rather than generic benchmarks.",
      },
      {
        title: "Present options",
        description:
          "You get real alternatives with trade-offs shown, not a single recommendation presented as the only path.",
      },
      {
        title: "Support the decision",
        description:
          "Once you decide, we help put it into practice and stay available while it beds in.",
      },
    ],
  },
  faqs: [
    {
      question: "Do we need to be an existing accounting client?",
      answer:
        "No. Consulting engagements are frequently standalone. If we already handle your accounting the work starts faster because we know the numbers, but that is a convenience, not a requirement.",
    },
    {
      question: "How are consulting engagements scoped?",
      answer:
        "We agree the question, the deliverable and the timeline in writing before starting. If the work uncovers something that changes the scope, we come back to you rather than expanding it quietly.",
    },
    {
      question: "Can you act as an outsourced finance function?",
      answer:
        "We provide ongoing financial support in the areas covered by our services. Where a business genuinely needs a full-time finance leader, we will tell you — and we can help you get the function and the reporting ready for that person to inherit.",
    },
  ],
  related: ["risk-advisory", "analytics", "accounting"],
  cta: {
    heading: "Talk through the decision you’re facing",
    body: "A consultation costs nothing and usually clarifies whether the problem needs a project, a process change, or simply better reporting.",
  },
};

/* ==========================================================================
   Risk & Financial Advisory
   ========================================================================== */

const riskAdvisory: ServiceDetail = {
  slug: "risk-advisory",
  href: "/services/risk-advisory",
  name: "Risk & Financial Advisory",
  title: "Risk & Financial Advisory",
  icon: ShieldCheck,
  summary:
    "Identifying financial and operational risk, and strengthening the controls that contain it.",
  eyebrow: "Risk & Financial Advisory",
  headline: "Know where the business is exposed — before it costs you.",
  intro:
    "Financial and operational risk is easiest to manage while it is still small. We work through where your business is exposed, how likely each exposure is to matter, and which controls are worth the effort of putting in place.",
  metaTitle: "Risk & Financial Advisory",
  metaDescription:
    "Risk and financial advisory services: financial risk assessment, internal control design, cash flow risk and process safeguards for growing businesses.",
  problem: {
    heading: "Most financial losses are not sophisticated",
    body: "They come from ordinary gaps: one person controlling both approval and payment, a customer concentration nobody tracked, a cash position that was tight for a quarter before anyone raised it. None of these require bad intent to cause damage.",
    points: [
      "Approval and payment authority sit with the same person",
      "A single customer represents a share of revenue the business could not absorb losing",
      "Cash flow is monitored by bank balance rather than by forecast",
      "Controls were designed for a smaller business and never revisited",
    ],
  },
  features: [
    {
      title: "Financial risk assessment",
      description:
        "A structured review of where financial loss could originate, with each exposure rated by likelihood and impact.",
    },
    {
      title: "Internal control design",
      description:
        "Controls sized to your business — segregation of duties, approval thresholds and reconciliation routines that people will actually follow.",
    },
    {
      title: "Cash flow risk",
      description:
        "Forecasting that shows the pinch points ahead, including the effect of receivable timing and seasonal swings.",
    },
    {
      title: "Concentration analysis",
      description:
        "Customer, supplier and revenue concentration measured and monitored rather than assumed to be fine.",
    },
    {
      title: "Process safeguards",
      description:
        "Practical checks built into payment, payroll and procurement processes to catch errors before money moves.",
    },
    {
      title: "Advisory support",
      description:
        "Ongoing input as circumstances change — new markets, new financing, new operating models.",
    },
  ],
  deliverables: [
    {
      title: "Assessment outputs",
      items: [
        "A risk register with likelihood and impact ratings",
        "Documented control gaps with recommended remediation",
        "Cash flow forecast with sensitivity scenarios",
        "Concentration analysis across customers and suppliers",
      ],
    },
    {
      title: "Implementation",
      items: [
        "Written control procedures your team can follow",
        "Approval matrices and authority limits",
        "Reconciliation and review schedules",
        "Periodic reassessment as the business changes",
      ],
    },
  ],
  process: {
    heading: "How risk work is carried out",
    intro:
      "Risk work is only useful if it ends in changes people actually adopt.",
    steps: [
      {
        title: "Understand the business",
        description:
          "We map how money moves through the organization — who initiates, who approves, who records and who reconciles.",
      },
      {
        title: "Identify and rate exposures",
        description:
          "Exposures are documented and rated so attention goes to what could genuinely hurt, not to whatever is easiest to fix.",
      },
      {
        title: "Design proportionate controls",
        description:
          "Controls are sized to the business. A ten-person company does not need the control environment of a hundred-person one, and imposing it guarantees it will be bypassed.",
      },
      {
        title: "Implement and revisit",
        description:
          "We help put controls in place, then reassess periodically as the business grows and the risk profile shifts.",
      },
    ],
  },
  faqs: [
    {
      question: "We are a small team. Can we really segregate duties?",
      answer:
        "Not completely, and pretending otherwise is unhelpful. In small teams the answer is usually compensating controls — owner review of bank activity, dual authorization above a threshold, independent reconciliation. We design around the team you have.",
    },
    {
      question: "How is this different from an internal audit?",
      answer:
        "Risk advisory is forward-looking: identifying exposures and designing controls to contain them. Internal audit tests whether the controls that exist are operating as intended. They complement each other, and we offer both.",
    },
    {
      question: "How often should a risk assessment be refreshed?",
      answer:
        "Annually as a baseline, and sooner after a material change — a new market, a significant customer, a financing event or a change in who holds financial authority.",
    },
  ],
  related: ["audit-assurance", "consulting", "analytics"],
  cta: {
    heading: "Find the gaps while they’re still small",
    body: "A first conversation usually surfaces two or three exposures worth acting on straight away, at no cost.",
  },
};

/* ==========================================================================
   Analytics
   ========================================================================== */

const analytics: ServiceDetail = {
  slug: "analytics",
  href: "/services/analytics",
  name: "Financial Analytics",
  title: "Financial Analytics",
  icon: BarChart3,
  summary:
    "Reporting and analysis that turn your financial data into decisions you can defend.",
  eyebrow: "Financial Analytics",
  headline: "Your numbers, arranged so the decision becomes obvious.",
  intro:
    "Management reporting, margin analysis, cash forecasting and the handful of measures that genuinely drive your business — built from your own books, refreshed on a cycle, and explained rather than dropped in an inbox.",
  metaTitle: "Financial Analytics Services",
  metaDescription:
    "Financial analytics and management reporting: margin analysis, cash flow forecasting, budget variance and KPI reporting built from your own accounting data.",
  problem: {
    heading: "More reporting is not the same as more insight",
    body: "Plenty of businesses have dashboards. Fewer can say which three numbers to watch this quarter and what they should do if one moves. The gap is not data volume — it is that reporting was never designed around the decisions it is meant to support.",
    points: [
      "Reports show what happened, but not what to do about it",
      "Different systems produce different answers to the same question",
      "Nobody can explain what actually drove the change in gross margin",
      "Forecasting is a single spreadsheet nobody trusts enough to plan against",
    ],
  },
  features: [
    {
      title: "Management reporting",
      description:
        "A concise recurring pack covering performance, position and cash, with commentary on what changed and why.",
    },
    {
      title: "Margin and profitability analysis",
      description:
        "Profitability by product, service line, customer or channel, so pricing and investment decisions rest on real contribution.",
    },
    {
      title: "Cash flow forecasting",
      description:
        "Short and medium-term cash forecasts that account for receivable timing, payables and seasonality.",
    },
    {
      title: "Budget versus actual",
      description:
        "Variance reporting that separates volume, price and cost effects instead of showing a single unexplained difference.",
    },
    {
      title: "KPI definition",
      description:
        "Agreeing the small set of measures that matter for your business and defining precisely how each is calculated.",
    },
    {
      title: "Data quality review",
      description:
        "Making sure the underlying records support the analysis, because analytics on unreliable books produces confident wrong answers.",
    },
  ],
  deliverables: [
    {
      title: "Recurring",
      items: [
        "Management reporting pack on an agreed cycle",
        "Cash flow forecast with scenario view",
        "Budget versus actual variance analysis",
        "KPI summary with definitions attached",
      ],
    },
    {
      title: "On request",
      items: [
        "Profitability analysis by segment",
        "Pricing and margin models",
        "Board and lender reporting packs",
        "Ad hoc analysis to support a specific decision",
      ],
    },
  ],
  process: {
    heading: "How analytics engagements work",
    intro:
      "We start from the decisions you need to make and work backwards to the reporting.",
    steps: [
      {
        title: "Agree the questions",
        description:
          "We establish what you need to be able to answer each month, each quarter and each year. Everything else is noise.",
      },
      {
        title: "Check the foundation",
        description:
          "We verify that the underlying accounting data can support those answers, and fix what cannot.",
      },
      {
        title: "Build the reporting",
        description:
          "Reports and forecasts are built with definitions documented, so the same number means the same thing every period.",
      },
      {
        title: "Review and adapt",
        description:
          "We review the pack with you regularly and change it as the questions change. Reporting that nobody reads gets removed.",
      },
    ],
  },
  faqs: [
    {
      question: "Do we need a business intelligence platform?",
      answer:
        "Usually not. Most businesses at this stage are better served by well-structured reporting built on accurate books. If your volume and complexity genuinely justify a dedicated platform we will say so, but we will not recommend tooling to solve a data quality problem.",
    },
    {
      question: "Can you work with data from outside the accounting system?",
      answer:
        "Yes. Sales platforms, payment processors, inventory and CRM data often hold what is needed for meaningful analysis. The important part is reconciling those sources back to the books so the numbers agree.",
    },
    {
      question: "How often should reporting be produced?",
      answer:
        "Monthly for management reporting, more often for cash where it is tight. The right cadence is the one that matches how often you actually make the decisions the reporting supports.",
    },
  ],
  related: ["accounting", "consulting", "bookkeeping"],
  cta: {
    heading: "Get reporting that answers your questions",
    body: "Tell us the three things you most need visibility on. We will show you what it takes to report on them reliably.",
  },
};

/* ==========================================================================
   Merchant Services
   ========================================================================== */

const merchantServices: ServiceDetail = {
  slug: "merchant-services",
  href: "/merchant-services",
  name: "Merchant Services",
  title: "Merchant Services",
  icon: CreditCard,
  summary:
    "Support for accepting card, online, in-person and ACH payments — and reconciling them properly.",
  eyebrow: "Merchant Services",
  headline: "Accept payments, and know exactly what landed in the bank.",
  intro:
    "Support for taking card payments online and in person, ACH and bank transfers, payment links, invoicing and recurring billing — with the settlement, fee and chargeback data flowing back into your books where it belongs.",
  metaTitle: "Merchant Services & Payment Support",
  metaDescription:
    "Merchant services support from DB FinCo: card acceptance, online and in-person payments, ACH transfers, payment links, invoicing, recurring billing and payment reporting.",
  problem: {
    heading: "Taking the payment is only half the job",
    body: "Money arrives net of fees, in batches that do not match individual invoices, sometimes days after the sale, occasionally reversed. If none of that is reconciled properly, revenue is overstated, fees are invisible and the bank balance never quite agrees with the books.",
    points: [
      "Deposits arrive net of processing fees that never get recorded separately",
      "Settlement batches cannot be traced back to the invoices they cover",
      "Refunds and chargebacks are missed until a reconciliation fails",
      "Nobody knows the true cost of acceptance as a percentage of revenue",
    ],
  },
  features: [
    {
      title: "Card acceptance",
      description:
        "Support for accepting the payment types your customers expect, with the acceptance costs made visible rather than buried in a net deposit.",
    },
    {
      title: "Online payments",
      description:
        "Checkout and hosted payment page setup so online sales flow into your records with the detail needed to reconcile them.",
    },
    {
      title: "In-person payments",
      description:
        "Point-of-sale and payment terminal arrangements for businesses taking payments at a counter, on site or on the move.",
    },
    {
      title: "ACH and bank transfers",
      description:
        "Bank transfer options for higher-value or recurring business-to-business payments where card acceptance costs do not make sense.",
    },
    {
      title: "Payment links and invoicing",
      description:
        "Sending a payable link or invoice, tracking what has been paid, and matching receipts against open receivables.",
    },
    {
      title: "Recurring billing",
      description:
        "Subscription and retainer billing set up so renewals, failures and cancellations are visible in your reporting.",
    },
    {
      title: "Payment reporting and reconciliation",
      description:
        "Settlement, fee, refund and chargeback activity reconciled to your books so the numbers agree line by line.",
    },
    {
      title: "Merchant payment support",
      description:
        "Help understanding statements, comparing acceptance costs and working through issues when something does not settle as expected.",
    },
  ],
  deliverables: [
    {
      title: "Getting set up",
      items: [
        "A review of how you take payments today and what it costs",
        "Guidance on the acceptance methods that fit your business",
        "Support through provider applications and documentation",
        "Chart of accounts mapping for gross sales, fees and reversals",
      ],
    },
    {
      title: "Once you’re running",
      items: [
        "Reconciliation of settlements to sales and to the bank",
        "Processing fees recorded and tracked as a cost of doing business",
        "Refund and chargeback activity reflected in your reporting",
        "Ongoing support when payment questions arise",
      ],
    },
  ],
  process: {
    heading: "How merchant onboarding works",
    intro:
      "Payment acceptance involves a provider application and underwriting review. We help you prepare for it and make sure the accounting side is set up correctly from day one.",
    steps: [
      {
        title: "Review how you get paid",
        description:
          "We look at your current payment mix, ticket sizes, customer types and what acceptance is costing you today.",
      },
      {
        title: "Match methods to the business",
        description:
          "We identify which acceptance methods fit — card, online, in person, ACH, links, recurring — based on how your customers actually pay.",
      },
      {
        title: "Prepare the application",
        description:
          "Providers review business documentation as part of underwriting. We help you assemble what is needed so the process is not delayed by missing paperwork.",
      },
      {
        title: "Connect it to the books",
        description:
          "Once you are accepting payments, settlements, fees and reversals are mapped into your accounts and reconciled as part of the normal monthly cycle.",
      },
    ],
  },
  faqs: [
    {
      question: "Can DB FinCo guarantee we’ll be approved to accept payments?",
      answer:
        "No. Approval is decided by the payment provider through its own underwriting review, based on factors including business type, processing history, financial standing and jurisdiction. We help you prepare a complete application, but no one outside the provider can guarantee the outcome.",
    },
    {
      question: "Is DB FinCo a bank or a payment processor?",
      answer:
        "No. DB FinCo is an accounting and advisory firm. We support you in arranging and managing payment acceptance and in accounting for it correctly. Payment processing, card issuing and banking are carried out by the relevant providers and financial institutions, not by us.",
    },
    {
      question: "What does accepting payments cost?",
      answer:
        "Pricing varies by provider, payment method, card type, transaction size, business type and risk profile. Rather than quote a rate we cannot stand behind, we help you read the pricing you are offered and work out the true all-in cost of acceptance for your mix of transactions.",
    },
    {
      question: "Can you help us reconcile payments we already take?",
      answer:
        "Yes, and it is one of the most common requests. If you already accept card or online payments but the deposits have never been properly reconciled to sales and fees, that is bookkeeping work we can pick up regardless of who processes your payments.",
    },
    {
      question: "Which payment methods can our customers use?",
      answer:
        "Commonly supported methods include major card networks, online checkout, in-person card and contactless payments, digital wallets, ACH and bank transfers. Exactly which are available to your business depends on the provider you work with and the outcome of its underwriting review.",
    },
  ],
  related: ["bookkeeping", "accounting", "analytics"],
  cta: {
    heading: "Let’s look at how you get paid",
    body: "Bring a recent processing statement to a free consultation. We will walk through what you are being charged and how the money is reaching your books.",
  },
};

/* ==========================================================================
   Collections
   ========================================================================== */

/** Every service with a dedicated detail page, in presentation order. */
export const services: ServiceDetail[] = [
  accounting,
  bookkeeping,
  tax,
  auditAssurance,
  consulting,
  riskAdvisory,
  analytics,
  merchantServices,
];

/** Services shown under /services (Merchant Services has its own top-level route). */
export const coreServices: ServiceDetail[] = services.filter(
  (service) => service.slug !== "merchant-services",
);

export const serviceBySlug = new Map(
  services.map((service) => [service.slug, service] as const),
);

export function getService(slug: string): ServiceDetail | undefined {
  return serviceBySlug.get(slug);
}

export function getServices(slugs: readonly string[]): ServiceDetail[] {
  return slugs
    .map((slug) => serviceBySlug.get(slug))
    .filter((service): service is ServiceDetail => service !== undefined);
}

export function toSummary(service: ServiceDetail): ServiceSummary {
  return {
    slug: service.slug,
    href: service.href,
    name: service.name,
    title: service.title,
    summary: service.summary,
    icon: service.icon,
  };
}
