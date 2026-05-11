import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Colophon",
  description:
    "Tech stack, typography, hosting and license details for the Gulf PR Atlas.",
};

type Row = { label: string; value: string; note?: string };

const STACK: Row[] = [
  { label: "Framework", value: "Next.js 16 (App Router)", note: "TypeScript strict" },
  { label: "Styling", value: "Tailwind CSS 4", note: "Custom design tokens in globals.css" },
  { label: "Motion", value: "Motion (motion/react)", note: "Restrained, never bouncy" },
  { label: "Icons", value: "Lucide React", note: "Used sparingly" },
  { label: "Hosting", value: "Vercel" },
  { label: "Content", value: "TypeScript data files", note: "One file per agency under /content/agencies" },
  { label: "Package manager", value: "pnpm" },
];

const TYPOGRAPHY: Row[] = [
  { label: "Display", value: "Fraunces", note: "Variable, opsz axis" },
  { label: "Body", value: "Inter", note: "Variable, ss01 alternates" },
  { label: "Mono / tabular", value: "Geist Mono" },
];

const LICENSE: Row[] = [
  { label: "Editorial content", value: SITE.license, note: "Attribution required" },
  { label: "Code", value: "All rights reserved", note: "Source not currently published" },
  { label: "Quoted material", value: "© the respective rights holders" },
];

export default function ColophonPage() {
  return (
    <div className="pb-32 pt-16 lg:pt-24">
      <Container size="narrow">
        <Eyebrow accent>Colophon</Eyebrow>
        <h1 className="mt-4 font-display text-[44px] leading-[0.98] font-medium tracking-[-0.025em] sm:text-[56px]">
          How this was built.
        </h1>

        <div className="mt-14 space-y-14">
          <Table title="Stack" rows={STACK} />
          <Table title="Typography" rows={TYPOGRAPHY} />
          <Table title="License" rows={LICENSE} />

          <section>
            <Eyebrow>Acknowledgments</Eyebrow>
            <p className="mt-4 prose-editorial font-display">
              The atlas relies on the public reporting of the regional trade
              press — <em>Campaign Middle East</em>, PRovoke Media, MEPRA, PRCA
              MENA, <em>Arabian Business</em>, <em>The National</em>, and
              others. The factual scaffolding of these profiles would not be
              possible without their work.
            </p>
          </section>

          <section>
            <Eyebrow>Contributing</Eyebrow>
            <p className="mt-4 prose-editorial font-display">
              Corrections, additions and disagreements are welcome at{" "}
              <a href={`mailto:${SITE.editorEmail}`}>{SITE.editorEmail}</a>.
              Practitioners closest to the work usually know first when
              something has changed.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}

function Table({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <section>
      <Eyebrow>{title}</Eyebrow>
      <dl className="mt-4 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
        {rows.map((r) => (
          <div
            key={r.label}
            className="grid grid-cols-[1fr_2fr] items-baseline gap-4 py-4"
          >
            <dt className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
              {r.label}
            </dt>
            <dd className="text-[15px]">
              <div className="font-display text-[18px]">{r.value}</div>
              {r.note && (
                <div className="mt-1 text-[12px] text-[var(--color-text-muted)]">
                  {r.note}
                </div>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
