import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { Pill } from "@/components/pill";
import { EditorialProse } from "@/components/editorial-prose";
import {
  getAllHoldingCompanies,
  getHoldingCompanyBySlug,
} from "@/lib/holding-companies";
import { getAgenciesByParent } from "@/lib/agencies";
import { formatDate } from "@/lib/format";
import type { Agency } from "@/content/agencies/types";
import type {
  HoldingCompany,
  TimelineEventType,
} from "@/content/holding-companies/types";

type Params = { slug: string };

const HOLDING_NAME: Record<string, "WPP" | "Omnicom" | "IPG" | "Publicis"> = {
  wpp: "WPP",
  omnicom: "Omnicom",
  ipg: "IPG",
  publicis: "Publicis",
};

export function generateStaticParams() {
  return getAllHoldingCompanies().map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const h = getHoldingCompanyBySlug(slug);
  if (!h) return {};
  return {
    title: `${h.name} — Holding Companies`,
    description: `${h.name} regional structure in the Gulf: agencies owned, regional leadership, timeline of structural change.`,
  };
}

type TimelineRow = {
  year: number;
  date?: string;
  type: TimelineEventType;
  title: string;
  body: string;
  source?: string;
};

function buildTimeline(h: HoldingCompany, agencies: Agency[]): TimelineRow[] {
  const rows: TimelineRow[] = h.timeline.map((e) => ({
    year: e.year,
    type: e.type,
    title: e.title,
    body: e.body,
  }));

  for (const a of agencies) {
    for (const move of a.notableMoves) {
      const year = Number(move.date.slice(0, 4));
      if (!Number.isFinite(year)) continue;
      const moveType: TimelineEventType =
        move.type === "hire" || move.type === "exit"
          ? "leadership"
          : move.type === "acquisition"
            ? "acquisition"
            : "restructure";
      rows.push({
        year,
        date: move.date,
        type: moveType,
        title: `${a.name} — ${moveTypeLabel(move.type)}`,
        body: move.description,
        source: move.source,
      });
    }
  }

  return rows.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    const ad = a.date ?? `${a.year}-00-00`;
    const bd = b.date ?? `${b.year}-00-00`;
    return bd.localeCompare(ad);
  });
}

function moveTypeLabel(type: string): string {
  return type
    .split("_")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

const TYPE_LABEL: Record<TimelineEventType, string> = {
  acquisition: "Acquisition",
  merger: "Merger",
  restructure: "Restructure",
  leadership: "Leadership",
  strategic: "Strategic",
  entry: "Market entry",
};

export default async function HoldingCompanyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const h = getHoldingCompanyBySlug(slug);
  if (!h) notFound();

  const parentName = HOLDING_NAME[h.slug];
  const agencies = parentName ? getAgenciesByParent(parentName) : [];
  // Anchor by declared agency slug order in the holding-company data, falling
  // back to alphabetical for any agency the slug list does not pin.
  const agencyOrder = new Map(h.agencies.map((s, i) => [s, i]));
  const orderedAgencies = [...agencies].sort((a, b) => {
    const ai = agencyOrder.has(a.slug) ? agencyOrder.get(a.slug)! : 999;
    const bi = agencyOrder.has(b.slug) ? agencyOrder.get(b.slug)! : 999;
    if (ai !== bi) return ai - bi;
    return a.name.localeCompare(b.name);
  });

  const timeline = buildTimeline(h, agencies);

  return (
    <article className="pb-32">
      <Container>
        <nav className="pt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
          <Link href="/" className="hover:text-[var(--color-text)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/holding-companies"
            className="hover:text-[var(--color-text)]"
          >
            Holding Companies
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-text-secondary)]">{h.name}</span>
        </nav>

        <header className="mt-10 border-b border-[var(--color-border-strong)] pb-12">
          <div className="tracked-label">{h.shortName}</div>
          <h1 className="mt-5 font-display text-[48px] leading-[0.98] font-medium tracking-[-0.025em] sm:text-[72px] lg:text-[96px]">
            {h.name}
          </h1>
          <p className="mt-2 text-[14px] text-[var(--color-text-muted)] font-mono">
            {h.fullLegalName}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
            <Stat label="Global HQ" value={h.hqGlobal} />
            <Stat label="Regional HQ" value={h.hqRegional} />
            <Stat
              label="Entered Gulf"
              value={h.yearEnteredGulf ? String(h.yearEnteredGulf) : "—"}
              sub={!h.yearEnteredGulf ? "Not publicly attributable" : undefined}
            />
            <Stat
              label="Agencies in atlas"
              value={String(orderedAgencies.length)}
            />
          </div>
        </header>

        <Section eyebrow="What to know">
          <EditorialProse text={h.editorialIntro} />
        </Section>

        {h.thinDataNote && (
          <Section eyebrow="A note on this profile">
            <div className="border border-[var(--color-border-strong)] bg-[var(--color-surface-2)] p-6 text-[14px] leading-[1.6] text-[var(--color-text-secondary)]">
              {h.thinDataNote}
            </div>
          </Section>
        )}

        <Section
          eyebrow={`Inside ${h.shortName}`}
          subtitle={
            orderedAgencies.length === 0
              ? `No agencies under ${h.shortName} are currently tracked in this atlas.`
              : undefined
          }
        >
          {orderedAgencies.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {orderedAgencies.map((a) => (
                <InsideCard key={a.slug} agency={a} />
              ))}
            </div>
          )}
        </Section>

        <Section eyebrow="Regional leadership">
          {h.regionalLeadership.length === 0 ? (
            <p className="text-[15px] leading-[1.6] text-[var(--color-text-secondary)]">
              Regional leadership at the holding-company level is not
              consistently publicly documented for {h.name}. Agency-level
              leadership is on individual agency profiles.
            </p>
          ) : (
            <div className="overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
                    <th className="tracked-label px-5 py-3">Name</th>
                    <th className="tracked-label px-5 py-3">Role</th>
                    <th className="tracked-label px-5 py-3 text-right">
                      Appointed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {h.regionalLeadership.map((l, i) => (
                    <tr
                      key={`${l.name}-${i}`}
                      className="border-b border-[var(--color-border)] last:border-0"
                    >
                      <td className="px-5 py-4 font-display text-[18px] tracking-[-0.005em]">
                        {l.name}
                      </td>
                      <td className="px-5 py-4 text-[14px] text-[var(--color-text-secondary)]">
                        {l.role}
                      </td>
                      <td className="px-5 py-4 text-right font-mono text-[12px] text-[var(--color-text-muted)] tabular">
                        {l.appointed ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>

        {timeline.length > 0 && (
          <Section
            eyebrow="Timeline"
            subtitle="Holding-company structural changes combined with agency-level moves under this parent. Sorted most recent first."
          >
            <ol className="space-y-6 border-l border-[var(--color-border-strong)] pl-6">
              {timeline.map((t, i) => (
                <li key={i} className="relative">
                  <span
                    aria-hidden
                    className={`absolute -left-[27px] top-2 h-2 w-2 rounded-full ${
                      t.type === "merger" || t.type === "acquisition"
                        ? "bg-[var(--color-accent)]"
                        : "bg-[var(--color-text)]"
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-mono text-[12px] text-[var(--color-text-muted)] tabular">
                      {t.date ? formatDate(t.date) : t.year}
                    </span>
                    <Pill variant="outline">{TYPE_LABEL[t.type]}</Pill>
                  </div>
                  <div className="mt-2 font-display text-[18px] leading-tight">
                    {t.title}
                  </div>
                  <p className="mt-1 text-[14px] leading-[1.6] text-[var(--color-text-secondary)]">
                    {t.body}
                  </p>
                  {t.source && (
                    <a
                      href={t.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-[12px] text-[var(--color-text-muted)] underline decoration-[var(--color-border-strong)] underline-offset-[3px] hover:text-[var(--color-accent)]"
                    >
                      Source ↗
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </Section>
        )}

        <Section eyebrow="Strategic posture">
          <EditorialProse text={h.strategicPosture} />
        </Section>

        <div className="mt-20 flex flex-col gap-3 border-t border-[var(--color-border)] pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>Profile last reviewed {formatDate("2026-05-12")}</span>
          <Link
            href="/holding-companies"
            className="group inline-flex items-center gap-2 hover:text-[var(--color-accent)]"
          >
            <ArrowLeft
              size={12}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            All holding companies
          </Link>
        </div>
      </Container>
    </article>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <div className="tracked-label">{label}</div>
      <div className="mt-2 font-display text-[20px] leading-tight font-medium md:text-[22px]">
        {value}
      </div>
      {sub && (
        <div className="mt-1 text-[12px] text-[var(--color-text-muted)]">
          {sub}
        </div>
      )}
    </div>
  );
}

function Section({
  eyebrow,
  subtitle,
  children,
}: {
  eyebrow: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mt-16 lg:mt-20">
      <div className="mb-8 border-b border-[var(--color-border-strong)] pb-3">
        <Eyebrow>{eyebrow}</Eyebrow>
        {subtitle && (
          <p className="mt-2 max-w-[60ch] text-[13px] text-[var(--color-text-muted)]">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function InsideCard({ agency }: { agency: Agency }) {
  const founded = agency.founded ? `est. ${agency.founded}` : null;
  const city = agency.headquarters.split(",")[0]?.trim() ?? agency.headquarters;
  const meta = [city, `${agency.regionalOffices.length} ${agency.regionalOffices.length === 1 ? "office" : "offices"}`];
  if (founded) meta.push(founded);

  return (
    <Link
      href={`/agencies/${agency.slug}`}
      className="group flex h-full flex-col gap-3 border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-200 hover:border-[var(--color-text)] hover:shadow-[0_1px_0_var(--color-text)]"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-[22px] leading-[1.05] font-medium tracking-[-0.01em]">
          {agency.name}
        </h3>
        <ArrowUpRight
          size={14}
          className="text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-accent)]"
        />
      </div>
      <p className="font-mono text-[11px] text-[var(--color-text-muted)] tabular">
        {meta.join(" · ")}
      </p>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {agency.practiceAreas.slice(0, 3).map((p) => (
          <Pill key={p} variant="outline">
            {p}
          </Pill>
        ))}
      </div>
    </Link>
  );
}

