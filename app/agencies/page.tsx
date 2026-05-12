import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { AgencyDirectory } from "@/components/agency-directory";
import { PracticeHeatmapInteractive } from "@/components/charts/practice-heatmap-wrapper";
import {
  getAllAgencies,
  getAllParents,
  getAllPracticeAreas,
  getAllCities,
  getAtlasStats,
} from "@/lib/agencies";
import { orderedPracticesForHeatmap } from "@/lib/aggregations";
import { SITE } from "@/lib/site";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "The Agencies",
  description:
    "The twenty most significant PR agencies operating in the Gulf region. Filterable by holding company, practice area, and city.",
};

export default function AgenciesPage() {
  const agencies = getAllAgencies();
  const parents = getAllParents();
  const practiceAreas = getAllPracticeAreas();
  const cities = getAllCities();
  const stats = getAtlasStats();
  const heatmapPractices = orderedPracticesForHeatmap(agencies);

  return (
    <div className="pb-32">
      <section className="pt-16 lg:pt-24">
        <Container>
          <Eyebrow>Directory</Eyebrow>
          <h1 className="mt-3 font-display text-[44px] leading-[0.98] font-medium tracking-[-0.025em] sm:text-[64px] lg:text-[80px]">
            The Agencies
          </h1>
          <p className="mt-6 max-w-[640px] text-[17px] leading-[1.6] text-[var(--color-text-secondary)]">
            A working directory of the twenty firms that run most of the Gulf
            communications industry — the multinational networks under WPP,
            Omnicom, IPG and Publicis, alongside the independents that compete
            with them on the briefs that matter most.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-[var(--color-border)] pt-6 font-mono text-[12px] text-[var(--color-text-muted)] tabular">
            <span>
              <span className="text-[var(--color-text)] font-semibold">
                {stats.agencyCount}
              </span>{" "}
              agencies
            </span>
            <span>
              <span className="text-[var(--color-text)] font-semibold">
                {stats.holdingCompanyCount}
              </span>{" "}
              holding companies
            </span>
            <span>
              <span className="text-[var(--color-text)] font-semibold">
                {stats.independentCount}
              </span>{" "}
              independents
            </span>
            <span>
              <span className="text-[var(--color-text)] font-semibold">
                {stats.cityCount}
              </span>{" "}
              cities
            </span>
            <span>Last updated {formatDate(SITE.lastUpdated)}</span>
          </div>
        </Container>
      </section>

      {/* Practice coverage heatmap */}
      <section className="mt-16">
        <Container>
          <div className="flex flex-col gap-3 border-b border-[var(--color-border-strong)] pb-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Practice coverage</Eyebrow>
              <h2 className="mt-2 font-display text-[24px] font-medium tracking-[-0.01em] md:text-[30px]">
                Twenty agencies × what they cover
              </h2>
            </div>
            <p className="max-w-md font-mono text-[11px] text-[var(--color-text-muted)]">
              Click a column header to filter the directory. Click a row to
              open the agency profile.
            </p>
          </div>

          <div className="mt-8">
            <Suspense
              fallback={
                <div className="h-[480px] animate-pulse border border-[var(--color-border)] bg-[var(--color-surface)]" />
              }
            >
              <PracticeHeatmapInteractive
                agencies={agencies}
                practices={heatmapPractices}
              />
            </Suspense>
          </div>
        </Container>
      </section>

      <section id="directory" className="mt-16 scroll-mt-20">
        <Container>
          <div className="mb-8 border-b border-[var(--color-border-strong)] pb-3">
            <Eyebrow>The directory</Eyebrow>
          </div>
          <Suspense
            fallback={
              <div className="h-[400px] animate-pulse border border-[var(--color-border)] bg-[var(--color-surface)]" />
            }
          >
            <AgencyDirectory
              agencies={agencies}
              parents={parents}
              practiceAreas={practiceAreas}
              cities={cities}
            />
          </Suspense>
        </Container>
      </section>
    </div>
  );
}
