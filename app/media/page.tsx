import type { Metadata } from "next";
import { PhaseStub } from "@/components/phase-stub";

export const metadata: Metadata = {
  title: "Media Landscape",
  description:
    "The Arabic and English press, the trade titles, the broadcasters — coming in Phase 4.",
};

export default function MediaPage() {
  return (
    <PhaseStub
      phase="Phase 4"
      title="Media Landscape"
      blurb="The press the industry actually pitches to. Arabic and English national press, the trade titles, the broadcasters, the wire services — who covers what, who edits what, and where the reporting lines have moved."
      shippingNotes={[
        "Outlets indexed by language, country and editorial focus.",
        "Section editors and beat reporters, where they can be reliably attributed.",
        "How regional press has evolved — the ownership consolidations, the new Arabic-language publications, the shift in trade titles.",
        "A working map of which outlets matter for which kinds of stories.",
      ]}
    />
  );
}
