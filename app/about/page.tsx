import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { AccentRule } from "@/components/accent-rule";
import { EditorialProse } from "@/components/editorial-prose";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Gulf PR Atlas — methodology, editorial principles, and the editor.",
};

const ABOUT_BODY = `The Gulf PR Atlas is a reference work, not a magazine. It exists because the people who actually run public relations in the Gulf — the practitioners, the journalists who cover them, and the students learning the trade — do not have a single, structured place to look up who runs which agency, which holding company sits behind it, what the firm is known for, and where credible information stops.

That gap is filled, where it gets filled at all, by industry awards lists, agency websites that all say roughly the same thing, and tribal knowledge passed between practitioners who happen to know each other. The atlas tries to do the unglamorous work of putting the public facts in one place, attributed, and updated when they change.

There is no membership tier and no paywall. The editorial content is licensed under ${SITE.license} so that students, journalists and educators can quote it, link to it, and build on it.

Phase 1, the version live today, covers the twenty most significant PR agencies operating in the Gulf. Holding company trees, signature campaigns by year, the regional media landscape, the practice notes that go into how the work is actually done, and the career ladder follow in later phases.`;

const METHODOLOGY = `Every entry is built from publicly available information — agency websites, regional trade press, association rankings, company filings where they exist. Where a fact cannot be confirmed and attributed, the field is left blank rather than filled with a guess. The atlas's value rests on its trustworthiness, and the fastest way to lose that is to invent.

The atlas does not scrape sites against their terms of service, does not extract from LinkedIn programmatically, and does not bypass paywalls. Sources are linked from every profile.

Profiles are reviewed monthly. Corrections and additions from practitioners and firms are welcome — and the people closest to the work usually know first when something has changed.

Featured profiles are agencies where public data depth meets the atlas's full target across leadership, clients, campaigns, awards, recent moves, practice mix and editorial coverage.

Profile depth is a function of public attribution, not agency size. The largest agencies sometimes have the thinnest public records because their current work is reported under parent brand names rather than their own. A boutique that publishes every client win will appear richer here than a global network whose Gulf operations are folded into holding-company press releases. Empty fields are signal, not omission.`;

const PRINCIPLES = `The voice is senior practitioner: declarative, calm, specific. The atlas does not call agencies "leading" or "world-class," does not use exclamation marks, and does not editorialize beyond what the publicly available record will support.

Inclusion is a judgment call, not a sales decision. Firms are listed because the editor believes they matter in the regional market, not because they have paid or asked. Removal works the same way.

Neutrality is the standard. Profiles describe what a firm is known for, where it sits inside the network of holding companies, who runs it, and what is publicly knowable about its work. Where the editor's own assessment appears, it is in the editorial note, framed as a working professional's reading rather than as a ranking.`;

const EDITOR_BIO = `Nasim Sawalma is a Gulf-region communications observer and the editor of the atlas. Palestinian, trilingual in Arabic, French and English, and based between Dubai and Lille, he has deep personal and academic ties to the region and built the atlas to fill a gap he kept hitting in his own work.

The atlas is a personal project. Corrections, additions and disagreements are welcome at ${SITE.editorEmail}.`;

export default function AboutPage() {
  return (
    <div className="pb-32 pt-16 lg:pt-24">
      <Container size="narrow">
        <Eyebrow accent>About the atlas</Eyebrow>
        <h1 className="mt-4 font-display text-[44px] leading-[0.98] font-medium tracking-[-0.025em] sm:text-[64px] lg:text-[80px]">
          A reference for an industry that did not have one.
        </h1>
        <AccentRule className="mt-10 w-32" />

        <div className="mt-12 space-y-16">
          <section>
            <EditorialProse text={ABOUT_BODY} />
          </section>

          <section id="methodology" className="scroll-mt-24">
            <Eyebrow>Methodology</Eyebrow>
            <div className="mt-4">
              <EditorialProse text={METHODOLOGY} />
            </div>
          </section>

          <section>
            <Eyebrow>Editorial principles</Eyebrow>
            <div className="mt-4">
              <EditorialProse text={PRINCIPLES} />
            </div>
          </section>

          <section>
            <Eyebrow>The editor</Eyebrow>
            <div className="mt-4">
              <EditorialProse text={EDITOR_BIO} />
            </div>
          </section>

          <section className="border-t border-[var(--color-border-strong)] pt-10">
            <Eyebrow>Get in touch</Eyebrow>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <a
                href={`mailto:${SITE.editorEmail}`}
                className="group flex flex-col gap-1 border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-text)]"
              >
                <span className="tracked-label">Email the editor</span>
                <span className="font-mono text-[14px] group-hover:text-[var(--color-accent)]">
                  {SITE.editorEmail}
                </span>
              </a>
              <Link
                href="/colophon"
                className="group flex flex-col gap-1 border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-text)]"
              >
                <span className="tracked-label">Colophon</span>
                <span className="font-mono text-[14px] group-hover:text-[var(--color-accent)]">
                  Stack, license, acknowledgments
                </span>
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
