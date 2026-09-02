import { UserRound } from "lucide-react";

import {
  CardIcon,
  FloatCard,
  PortraitScene,
  type PortraitName,
} from "@/components/imagery/PortraitScene";

/**
 * The portrait that sits beside the process steps on a service page.
 *
 * One face per page, chosen so no two pages a visitor is likely to see in a
 * row repeat, and the ground tone picked per portrait for contrast — the
 * purple and plum jackets need the gold or lilac ground, the taupe and lilac
 * ones need the deep violet.
 *
 * The card restates the promise the site already makes in the hero and on the
 * About page. Like every portrait here it is decorative: nobody is named, and
 * no claim is made that these are photographs of the firm's staff.
 */
const assignments: Record<
  string,
  { portrait: PortraitName; tone: "violet" | "gold" | "lilac" }
> = {
  accounting: { portrait: "principal", tone: "gold" },
  bookkeeping: { portrait: "lead", tone: "lilac" },
  tax: { portrait: "associate", tone: "gold" },
  "audit-assurance": { portrait: "director", tone: "violet" },
  consulting: { portrait: "managerTwo", tone: "gold" },
  "risk-advisory": { portrait: "adviser", tone: "lilac" },
  analytics: { portrait: "analyst", tone: "violet" },
  "merchant-services": { portrait: "specialist", tone: "gold" },
  "external-audit": { portrait: "partner", tone: "lilac" },
  "internal-audit": { portrait: "standing", tone: "gold" },
  "agreed-upon-procedures": { portrait: "consultant", tone: "lilac" },
};

export function ServicePortrait({ slug }: { slug: string }) {
  const assignment = assignments[slug];
  if (!assignment) return null;

  return (
    <PortraitScene
      portrait={assignment.portrait}
      tone={assignment.tone}
      className="max-w-[19rem] lg:max-w-none"
      sizes="(min-width: 1024px) 19rem, 19rem"
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
