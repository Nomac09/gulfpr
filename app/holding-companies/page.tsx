import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { HoldingNetwork } from "@/components/charts/holding-network";
import { getAllHoldingCompanies } from "@/lib/holding-companies";
import { getAllAgencies, getAgenciesByParent } from "@/lib/agencies";
import { SITE } from "@/lib/site";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Holding Companies",
  description:
    "How WPP, Omnicom, IPG and Publicis structure their Gulf operations. Ownership trees, regional leadership, sister-agency relationships.",
};

const PULL: Record<string, string> = {
  wpp: "The most consolidated PR network in the Gulf — three brands inside Burson plus Memac Ogilvy alongside.",
  omnicom: "FleishmanHillard and Ketchum locally; the IPG acquisition closed November 2025 and redraws the regional map.",
  ipg: "Three sister agencies under deliberate differentiation, now part of Omnicom following the November 2025 close.",
  publicis: "The leanest Gulf PR footprint of the four — MSL and Capital MSL operate inside larger Publicis Groupe engagements.",
};

export default function HoldingCompaniesPage() {
  const holdings = getAllHoldingCompanies();
  const agencies = getAllAgencies();

  return (
    <div className="pb-32">
      <section className="pt-16 lg:pt-24">
        <Container>
          <Eyebrow>Phase 2</Eyebrow>
          <h1 className="mt-3 font-display text-[44px] leading-[0.98] font-medium tracking-[-0.025em] sm:text-[64px] lg:text-[80px]">
            Holding Companies
          </h1>

          <div className="mt-8 max-w-[680px] space-y-5 text-[17px] leading-[1.6] text-[var(--color-text-secondary)]">
            <p>
              Four global holding companies own eleven of the twenty PR
              agencies tracked in this atlas. The remaining nine are
              independents — locally owned firms that compete with the
              networks on the briefs that matter most.
            </p>
            <p>
              Each holding company structures its Gulf operations
              differently. WPP has consolidated four named brands into a
              single regional umbrella under Burson. Omnicom has just absorbed
              IPG and now sits on the largest combined regional PR portfolio
              in the industry. Publicis has stayed deliberately lean. The
              network graph below shows ownership and the secondary
              relationships that public org charts do not capture: conflict
              shops inside the same parent, sister agencies on differentiated
              positioning, peer competitors across holding-company lines.
            </p>
            <p>
              Independent agencies are documented separately in the directory.
              This section traces the structures the networks themselves
              operate inside.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-[var(--color-border)] pt-6 font-mono text-[12px] text-[var(--color-text-muted)] tabular">
            <span>
              <span className="text-[var(--color-text)] font-semibold">
                {holdings.length}
              </span>{" "}
              holding companies
            </span>
            <span>
              <span className="text-[var(--color-text)] font-semibold">
                {agencies.filter((a) => a.parentCompany !== "Independent").length}
              </span>{" "}
              networked agencies
            </span>
            <span>
              <span className="text-[var(--color-text)] font-semibold">
                {agencies.filter((a) => a.parentCompany === "Independent").length}
              </span>{" "}
              independents
            </span>
            <span>Last updated {formatDate(SITE.lastUpdated)}</span>
          </div>
        </Container>
      </section>

      <section className="mt-14">
        <Container>
          <div className="mb-6 flex flex-col gap-3 border-b border-[var(--color-border-strong)] pb-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Network</Eyebrow>
              <h2 className="mt-2 font-display text-[24px] font-medium tracking-[-0.01em] md:text-[30px]">
                Ownership and secondary relationships
              </h2>
            </div>
            <p className="max-w-md font-mono text-[11px] text-[var(--color-text-muted)]">
              Click a holding company or agency node to open its profile.
            </p>
          </div>

          <HoldingNetwork holdings={holdings} agencies={agencies} />
        </Container>
      </section>

      <section className="mt-20">
        <Container>
          <div className="mb-8 border-b border-[var(--color-border-strong)] pb-3">
            <Eyebrow>The four</Eyebrow>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {holdings.map((h) => {
              const ownedCount = getAgenciesByParent(
                h.name as "WPP" | "Omnicom" | "IPG" | "Publicis"
              ).length;
              return (
                <Link
                  key={h.slug}
                  href={`/holding-companies/${h.slug}`}
                  className="group flex h-full flex-col gap-5 border border-[var(--color-border)] bg-[var(--color-surface)] p-7 transition-all duration-200 hover:border-[var(--color-text)] hover:shadow-[0_1px_0_var(--color-text)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="tracked-label">{h.shortName}</div>
                    <ArrowRight
                      size={16}
                      className="text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-accent)]"
                    />
                  </div>
                  <h3 className="font-display text-[28px] leading-[1.05] font-medium tracking-[-0.01em]">
                    {h.name}
                  </h3>
                  <ul className="space-y-1 font-mono text-[12px] text-[var(--color-text-muted)] tabular">
                    <li>Regional HQ · {h.hqRegional}</li>
                    <li>
                      {ownedCount}{" "}
                      {ownedCount === 1 ? "agency" : "agencies"} in this atlas
                    </li>
                  </ul>
                  <p className="flex-1 text-[14px] leading-[1.55] text-[var(--color-text-secondary)]">
                    {PULL[h.slug]}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 border-t border-[var(--color-border)] pt-6">
            <Link
              href={{ pathname: "/agencies", query: { holding: "Independent" } }}
              className="group inline-flex items-center gap-2 text-[14px] font-medium underline decoration-[var(--color-border-strong)] underline-offset-[6px] hover:decoration-[var(--color-accent)]"
            >
              Independent agencies are documented in The Agencies directory
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
