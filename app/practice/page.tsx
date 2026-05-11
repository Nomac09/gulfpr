import type { Metadata } from "next";
import { PhaseStub } from "@/components/phase-stub";

export const metadata: Metadata = {
  title: "Practice",
  description:
    "How the work is actually done — coming in Phase 5.",
};

export default function PracticePage() {
  return (
    <PhaseStub
      phase="Phase 5"
      title="Practice"
      blurb="The unglamorous part of the trade. How pitches actually get written, how news cycles get worked, how briefings get run, how crisis files get managed, and how Arabic-English copy moves between newsroom and client."
      shippingNotes={[
        "Working notes on regional pitch craft, with examples that have already been published.",
        "How news cycles in the Gulf differ from those in London or New York — and why timing matters.",
        "Crisis playbooks adapted to regional press norms and stakeholder expectations.",
        "Arabic-English copy: when to translate, when to localize, and when to write twice.",
      ]}
    />
  );
}
