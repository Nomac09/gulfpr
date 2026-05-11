import type { Metadata } from "next";
import { PhaseStub } from "@/components/phase-stub";

export const metadata: Metadata = {
  title: "Career",
  description:
    "The career ladder in Gulf communications — coming in Phase 6.",
};

export default function CareerPage() {
  return (
    <PhaseStub
      phase="Phase 6"
      title="Career"
      blurb="From junior account executive to managing partner. Titles, salary bands, typical tenure at each step, and the moves that change a trajectory — boutique to network, agency to in-house, Dubai to Riyadh."
      shippingNotes={[
        "Standard regional title taxonomy across agencies, with translations between network conventions.",
        "Salary bands by level and market, drawn from public reporting and recruiter data.",
        "The career-changing moves: how senior practitioners say they got to where they are.",
        "What practitioners trade off when they leave agency for in-house, or boutique for network.",
      ]}
    />
  );
}
