import type { Metadata } from "next";
import { PhaseStub } from "@/components/phase-stub";

export const metadata: Metadata = {
  title: "Holding Companies",
  description:
    "How WPP, Omnicom, IPG and Publicis structure their Gulf operations — coming in Phase 2.",
};

export default function HoldingCompaniesPage() {
  return (
    <PhaseStub
      phase="Phase 2"
      title="Holding Companies"
      blurb="The four global holding companies own most of the network agencies operating in the Gulf. Phase 2 maps each tree — what they own, how the regional structures are organized, and where the lines between sister brands actually fall."
      shippingNotes={[
        "Org trees for WPP, Omnicom, IPG and Publicis as they operate in MENA.",
        "Regional leadership at the holding-company level, not just at the agency level.",
        "Cross-references to every agency profile that sits inside each tree.",
        "Notes on recent restructurings, mergers and rebrands — Burson is the most recent example.",
      ]}
    />
  );
}
