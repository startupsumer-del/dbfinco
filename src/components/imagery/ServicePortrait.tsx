import { UserRound } from "lucide-react";

import {
  CardIcon,
  FloatCard,
  PortraitScene,
  type PortraitName,
} from "@/components/imagery/PortraitScene";

/**
 * The portrait in a service page's hero banner.
 *
 * It sits in the banner rather than further down deliberately. Beside the
 * process steps it landed roughly three and a half screens down — halfway
 * through the page — which is far enough that a visitor could reasonably
 * conclude the page had no people on it at all.
 *
 * One face per page, chosen so no two pages a visitor is likely to see in a
 * row repeat. The ground is always gold or lilac: the banner behind it is
 * deep purple, so a violet ground would disappear into it.
 *
 * The card restates the promise the site already makes in the hero and on the
 * About page. Like every portrait here it is decorative: nobody is named, and
 * no claim is made that these are photographs of the firm's staff.
 */
const assignments: Record<
  string,
  { portrait: PortraitName; tone: "gold" | "lilac" }
> = {
  accounting: { portrait: "principal", tone: "gold" },
  bookkeeping: { portrait: "lead", tone: "lilac" },
  tax: { portrait: "associate", tone: "gold" },
  "audit-assurance": { portrait: "director", tone: "lilac" },
  consulting: { portrait: "managerTwo", tone: "gold" },
  "risk-advisory": { portrait: "adviser", tone: "lilac" },
  analytics: { portrait: "analyst", tone: "gold" },
  "merchant-services": { portrait: "specialist", tone: "lilac" },
  "external-audit": { portrait: "partner", tone: "lilac" },
  "internal-audit": { portrait: "standing", tone: "gold" },
  "agreed-upon-procedures": { portrait: "consultant", tone: "gold" },
};

export function ServicePortrait({ slug }: { slug: string }) {
  const assignment = assignments[slug];
  if (!assignment) return null;

  return (
    <PortraitScene
      portrait={assignment.portrait}
      tone={assignment.tone}
      // Above the fold on every service page, so it is worth the priority.
      priority
      className="mx-auto max-w-[20rem] lg:max-w-none"
      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 22rem, 90vw"
      cards={
        <FloatCard
          at="low-left"
          icon={
            <CardIcon tone="violet">
              <UserRound className="size-4" />
            </CardIcon>
          }
          title="A named accountant"
          detail="Who knows your engagement"
        />
      }
    />
  );
}
