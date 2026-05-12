import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { SITE } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { getAtlasStats } from "@/lib/agencies";

export function SiteFooter() {
  const stats = getAtlasStats();
  return (
    <footer className="mt-32 border-t border-[var(--color-border)] bg-[var(--color-surface-2)]">
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-12">
        {/* Atlas stat strip */}
        <div className="mb-12 grid grid-cols-3 gap-x-6 gap-y-3 border-b border-[var(--color-border)] pb-10 md:grid-cols-3">
          <FooterStat
            label="Agencies tracked"
            value={String(stats.agencyCount)}
          />
          <FooterStat label="Last updated" value={formatDate(SITE.lastUpdated)} />
          <FooterStat label="License" value={SITE.license} />
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
          <div>
            <Wordmark size="lg" />
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
              A structured reference to public relations in the Gulf. Edited by{" "}
              {SITE.editor}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h4 className="tracked-label mb-3">Sections</h4>
              <ul className="space-y-2 text-[14px]">
                <li>
                  <Link
                    href="/agencies"
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                  >
                    Agencies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/holding-companies"
                    className="text-[var(--color-text-muted)]"
                  >
                    Holding Companies
                  </Link>
                </li>
                <li>
                  <Link href="/campaigns" className="text-[var(--color-text-muted)]">
                    Campaigns
                  </Link>
                </li>
                <li>
                  <Link href="/media" className="text-[var(--color-text-muted)]">
                    Media
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="tracked-label mb-3">About</h4>
              <ul className="space-y-2 text-[14px]">
                <li>
                  <Link
                    href="/about"
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                  >
                    About the atlas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/colophon"
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                  >
                    Colophon
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.editorEmail}`}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                  >
                    Contact editor
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="tracked-label mb-3">Reference</h4>
              <div className="space-y-0.5">
                <p className="font-mono text-[12px] text-[var(--color-text-secondary)]">
                  Updated {formatDate(SITE.lastUpdated)}
                </p>
                <p className="font-mono text-[12px] text-[var(--color-text-muted)]">
                  {SITE.version}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--color-border)] pt-6 text-[12px] text-[var(--color-text-muted)] md:flex-row md:items-center md:justify-between">
          <p>
            Editorial content licensed under {SITE.license}. Code rights reserved.
          </p>
          <p>
            gulfpr.org — a non-commercial reference. Corrections welcome.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="tracked-label">{label}</div>
      <div className="mt-1 font-display text-[20px] font-medium tracking-[-0.01em] tabular">
        {value}
      </div>
    </div>
  );
}
