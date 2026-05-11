import type { Metadata } from "next";
import { PhaseStub } from "@/components/phase-stub";

export const metadata: Metadata = {
  title: "Campaigns",
  description:
    "The regional work that mattered — coming in Phase 3.",
};

export default function CampaignsPage() {
  return (
    <PhaseStub
      phase="Phase 3"
      title="Campaigns"
      blurb="A year-by-year record of the regional work that mattered. Awarded campaigns, the briefs behind them, the teams that shipped them, and what they actually did — separated from the reel-and-headline version."
      shippingNotes={[
        "Annual indexes from 2018 onward, with deeper profiles on the work that shifted how the industry thinks.",
        "Cross-references from each campaign back to the agency and the client.",
        "MEPRA, PRCA MENA, PRovoke SABRE EMEA and PR Week Global award winners as the spine of the data.",
        "Editorial notes on the campaigns that mattered without winning, too.",
      ]}
    />
  );
}
