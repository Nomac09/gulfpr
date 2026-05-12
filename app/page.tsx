import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { Stat } from "@/components/stat";
import { AgencyCard } from "@/components/agency-card";
import { HeroHeadline } from "@/components/hero-headline";
import { AccentRule } from "@/components/accent-rule";
import { FadeIn } from "@/components/fade-in";
import { HoldingDistributionChart } from "@/components/charts/holding-distribution";
import { GeographicMap } from "@/components/charts/geographic-map";
import {
  getAllAgencies,
  getAtlasStats,
  getFeaturedAgencies,
  getAllParents,
} from "@/lib/agencies";
import { getCityFootprints, getHoldingDistribution } from "@/lib/aggregations";
import { SITE } from "@/lib/site";
import { formatDate } from "@/lib/format";

const ROADMAP = [
  {
    phase: "Phase 2",
    title: "Holding Companies",
    href: "/holding-companies",
    blurb:
      "How WPP, Omnicom, IPG and Publicis structure their Gulf operations — and what sits inside each tree.",
  },
  {
    phase: "Phase 3",
    title: "Campaigns",
    href: "/campaigns",
    blurb:
      "The regional work that mattered, year by year. Awarded campaigns, the briefs behind them, and the teams that shipped them.",
  },
  {
    phase: "Phase 4",
    title: "Media Landscape",
    href: "/media",
    blurb:
      "The Arabic and English press, the trade titles, the broadcasters and the wire services. Who covers what.",
  },
  {
    phase: "Phase 5",
    title: "Practice",
    href: "/practice",
    blurb:
      "How the work is actually done — pitches, news cycles, briefings, crisis playbooks, Arabic-English copy moves.",
  },
  {
    phase: "Phase 6",
    title: "Career",
    href: "/career",
    blurb:
      "The ladder from junior account executive to managing partner. Salaries, titles, and the moves that change a trajectory.",
  },
];

export default function HomePage() {
  const stats = getAtlasStats();
  const featured = getFeaturedAgencies();
  const parents = getAllParents();
  const agencies = getAllAgencies();
  const distribution = getHoldingDistribution(agencies);
  const cityFootprints = getCityFootprints(agencies);

  return (
    <div className="pb-32">
      {/* HERO */}
      <section className="relative pt-14 lg:pt-20">
        <Container>
          <FadeIn delay={0}>
            <Eyebrow accent>Gulf PR Atlas</Eyebrow>
          </FadeIn>

          <div className="mt-6">
            <HeroHeadline />
          </div>

          <AccentRule className="mt-10 w-32 sm:w-48" delay={0.55} />

          <FadeIn delay={0.7} className="mt-8 max-w-[640px]">
            <p className="text-[17px] leading-[1.55] text-[var(--color-text-secondary)] sm:text-[19px]">
              A structured reference to public relations in the Gulf — the firms
              that run the work, the holding companies behind them, the
              campaigns they ship, and the people who make decisions. Public
              sources, attribution first, updated as the picture changes.
            </p>
          </FadeIn>

          <FadeIn delay={0.85} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/agencies"
              className="group inline-flex items-center gap-2.5 border-[1.5px] border-[var(--color-text)] bg-transparent px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--color-text)] transition-colors duration-200 hover:bg-[var(--color-text)] hover:text-white"
            >
              Browse the agencies
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/about"
              className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--color-text)] underline decoration-[var(--color-border-strong)] underline-offset-[6px] transition-colors hover:decoration-[var(--color-accent)]"
            >
              About this project
              <ArrowUpRight size={14} className="opacity-70" />
            </Link>
          </FadeIn>

          <FadeIn delay={1.0} className="mt-6">
            <Link
              href="/about#methodology"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
            >
              <span className="inline-block h-[1px] w-4 bg-current" />
              Read the methodology
            </Link>
          </FadeIn>
        </Container>
      </section>

      {/* AT A GLANCE — survey stats */}
      <section className="mt-28 lg:mt-40">
        <Container>
          <div className="flex items-baseline justify-between border-b border-[var(--color-border-strong)] pb-4">
            <Eyebrow>At a glance</Eyebrow>
            <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
              {SITE.version}
            </span>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-10">
            <Stat
              value={stats.agencyCount}
              label="Agencies tracked"
              sub="Network and independent shops"
            />
            <Stat
              value={stats.holdingCompanyCount}
              label="Holding companies"
              sub={parents
                .filter((p) => p !== "Independent")
                .join(" · ")}
            />
            <Stat
              value={stats.cityCount}
              label="Cities covered"
              sub="Across the GCC and wider MENA"
            />
            <Stat
              value={formatDate(SITE.lastUpdated)}
              label="Last updated"
              sub="Reviewed monthly"
            />
          </div>

          {/* Distribution chart */}
          <div className="mt-16 border-t border-[var(--color-border)] pt-12">
            <HoldingDistributionChart
              data={distribution}
              totalAgencies={stats.agencyCount}
            />
          </div>
        </Container>
      </section>

      {/* WHERE THE WORK HAPPENS — geographic map */}
      <section className="mt-28 lg:mt-40">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Geographic footprint</Eyebrow>
              <h2 className="mt-3 font-display text-[36px] leading-[1.02] font-medium tracking-[-0.02em] md:text-[52px]">
                Where the work happens.
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-[1.6] text-[var(--color-text-secondary)]">
                Dubai dominates by volume, but the regional bench reaches across
                the GCC and beyond. Circle size is proportional to the number
                of agency offices in each city. Click a city to filter the
                directory.
              </p>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)] tabular">
              {cityFootprints.length} cities · {agencies.length} agencies
            </span>
          </div>

          <div className="mt-10">
            <GeographicMap cities={cityFootprints} />
          </div>
        </Container>
      </section>

      {/* AGENCIES PREVIEW */}
      <section className="mt-28 lg:mt-40">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>The directory</Eyebrow>
              <h2 className="mt-3 font-display text-[40px] leading-[1.02] font-medium tracking-[-0.02em] md:text-[56px]">
                The Agencies
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-[1.6] text-[var(--color-text-secondary)]">
                The twenty firms that run most of the work in the region —
                multinational networks under WPP, Omnicom, IPG and Publicis,
                plus the independents that compete with them on the briefs that
                matter. Each profile is a working reference, not a marketing
                page.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 6).map((a) => (
              <AgencyCard key={a.slug} agency={a} />
            ))}
          </div>

          <div className="mt-12 flex justify-center border-t border-[var(--color-border-strong)] pt-10">
            <Link
              href="/agencies"
              className="group inline-flex items-center gap-2.5 border-[1.5px] border-[var(--color-text)] bg-transparent px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--color-text)] transition-colors duration-200 hover:bg-[var(--color-text)] hover:text-white"
            >
              View all {stats.agencyCount} agencies
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Container>
      </section>

      {/* ROADMAP */}
      <section className="mt-28 lg:mt-40">
        <Container>
          <div className="flex items-baseline justify-between border-b border-[var(--color-border-strong)] pb-4">
            <Eyebrow>What's coming</Eyebrow>
            <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
              Phases 2 — 6
            </span>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ROADMAP.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 border border-[var(--color-border)] bg-[var(--color-surface)] p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="tracked-label-accent">{item.phase}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                    Soon
                  </span>
                </div>
                <h3 className="font-display text-[24px] leading-[1.1] font-medium tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="text-[14px] leading-[1.55] text-[var(--color-text-secondary)]">
                  {item.blurb}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* METHODOLOGY */}
      <section className="mt-28 lg:mt-40">
        <Container size="narrow">
          <div className="border-t border-[var(--color-border-strong)] pt-12">
            <Eyebrow>Methodology</Eyebrow>
            <h2 className="mt-3 font-display text-[28px] leading-[1.15] font-medium tracking-[-0.01em] md:text-[36px]">
              Public sources, attribution first, updated as the picture changes.
            </h2>
            <p className="mt-6 max-w-[60ch] text-[16px] leading-[1.7] text-[var(--color-text-secondary)]">
              Every entry in the atlas is built from publicly available
              information — agency websites, regional trade press, company
              filings, association rankings. Where a fact cannot be confirmed
              and attributed, the field is left blank. Corrections from
              practitioners and firms are welcome and the date of last review
              is on every profile.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-1.5 text-[14px] font-medium underline decoration-[var(--color-border-strong)] underline-offset-[6px] transition-colors hover:decoration-[var(--color-accent)]"
            >
              Read the full editorial principles
              <ArrowRight size={14} />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
