import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { Pill } from "@/components/pill";
import { HoldingPill } from "@/components/holding-pill";
import { AgencyCard } from "@/components/agency-card";
import { EditorialProse } from "@/components/editorial-prose";
import { PracticeMixDonut } from "@/components/charts/practice-mix-donut";
import { AgencyMap } from "@/components/charts/agency-map";
import {
  getAgencyBySlug,
  getAllAgencies,
  getRelatedAgencies,
  getSisterAgencies,
} from "@/lib/agencies";
import { formatDate } from "@/lib/format";

type Params = { slug: string };

// Known city set covered by the mini map's coordinate table.
const MAPPABLE_CITIES = new Set([
  "Casablanca",
  "Nicosia",
  "Beirut",
  "Cairo",
  "Riyadh",
  "Jeddah",
  "Kuwait City",
  "Manama",
  "Doha",
  "Dubai",
  "Abu Dhabi",
  "Muscat",
  "Sharjah",
]);

export function generateStaticParams() {
  return getAllAgencies().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agency = getAgencyBySlug(slug);
  if (!agency) return {};
  return {
    title: agency.name,
    description: `${agency.name} — ${agency.parentCompany}, headquartered in ${agency.headquarters}. Profile in the Gulf PR Atlas.`,
  };
}

export default async function AgencyProfilePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const agency = getAgencyBySlug(slug);
  if (!agency) notFound();

  const related = getRelatedAgencies(agency.slug, 3);
  const sisters = getSisterAgencies(agency.slug, 3);

  // Group clients by sector
  const clientsBySector = agency.knownClients.reduce<
    Record<string, typeof agency.knownClients>
  >((acc, c) => {
    (acc[c.sector] ||= []).push(c);
    return acc;
  }, {});
  const clientSectors = Object.keys(clientsBySector).sort();

  const hasPracticeMix = !!agency.practiceMix && agency.practiceMix.length > 0;
  const mappableOffices = agency.regionalOffices
    .map((o) => o.split(",")[0]?.trim())
    .filter((c): c is string => !!c && MAPPABLE_CITIES.has(c));
  const hasMappableOffices = mappableOffices.length > 0;

  return (
    <article className="pb-32">
      <Container>
        <nav className="pt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
          <Link href="/" className="hover:text-[var(--color-text)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/agencies" className="hover:text-[var(--color-text)]">
            Agencies
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-text-secondary)]">
            {agency.name}
          </span>
        </nav>

        {/* Profile hero */}
        <header className="mt-10 border-b border-[var(--color-border-strong)] pb-12">
          <div className="flex flex-wrap items-center gap-2">
            <HoldingPill parent={agency.parentCompany} />
            {agency.featured && <Pill variant="accent">Featured profile</Pill>}
          </div>
          <h1 className="mt-5 font-display text-[48px] leading-[0.98] font-medium tracking-[-0.025em] sm:text-[72px] lg:text-[96px]">
            {agency.name}
          </h1>
          {agency.legalName && agency.legalName !== agency.name && (
            <p className="mt-2 text-[14px] text-[var(--color-text-muted)] font-mono">
              {agency.legalName}
            </p>
          )}

          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
            <StatBlock label="Headquarters" value={agency.headquarters} />
            <StatBlock
              label="Founded"
              value={agency.founded ? String(agency.founded) : "—"}
              sub={
                agency.foundedGlobal &&
                agency.foundedGlobal !== agency.founded
                  ? `Global: ${agency.foundedGlobal}`
                  : undefined
              }
            />
            <StatBlock
              label="Regional offices"
              value={String(agency.regionalOffices.length)}
              sub={agency.regionalOffices.slice(0, 3).join(", ")}
            />
            <StatBlock
              label="Headcount"
              value={agency.headcountEstimate?.range ?? "—"}
              sub={
                agency.headcountEstimate
                  ? `as of ${formatDate(agency.headcountEstimate.asOf)}`
                  : "Not disclosed"
              }
            />
          </div>
        </header>

        {/* Editorial framing */}
        <Section eyebrow="What to know">
          <EditorialProse text={agency.editorialNote} />
        </Section>

        {/* At a glance — mini charts + by-the-numbers */}
        {(hasPracticeMix || hasMappableOffices) && (
          <Section eyebrow="At a glance">
            <ByTheNumbers agency={agency} />
            {(hasPracticeMix || hasMappableOffices) && (
              <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
                {hasPracticeMix && (
                  <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                    <div className="tracked-label mb-4">Practice mix</div>
                    <PracticeMixDonut mix={agency.practiceMix!} />
                    <p className="mt-5 text-[11px] text-[var(--color-text-muted)]">
                      Approximate share of practice areas; based on public
                      positioning and category disclosure.
                    </p>
                  </div>
                )}
                {hasMappableOffices && (
                  <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                    <div className="tracked-label mb-4">Office footprint</div>
                    <AgencyMap offices={agency.regionalOffices} />
                    <p className="mt-3 text-[11px] text-[var(--color-text-muted)]">
                      Cities with a wholly-owned office. Affiliate-only markets
                      are not shown.
                    </p>
                  </div>
                )}
              </div>
            )}
          </Section>
        )}

        {/* If no mini-charts available, still surface the numbers */}
        {!hasPracticeMix && !hasMappableOffices && (
          <Section eyebrow="At a glance">
            <ByTheNumbers agency={agency} />
          </Section>
        )}

        {/* Leadership */}
        {agency.leadership.length > 0 && (
          <Section eyebrow="Leadership">
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
                  {agency.leadership.map((l, i) => (
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
                        {l.appointedYear ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* Practice areas + offices side by side */}
        <Section eyebrow="Footprint">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h3 className="font-display text-[20px] mb-4 font-medium">
                Practice areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {agency.practiceAreas.map((p) => (
                  <Pill key={p} variant="default">
                    {p}
                  </Pill>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-[20px] mb-4 font-medium">
                Regional offices
              </h3>
              <ul className="space-y-1.5 font-mono text-[13px] text-[var(--color-text-secondary)] tabular">
                {agency.regionalOffices.map((o) => (
                  <li key={o} className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="inline-block h-[6px] w-[6px] rounded-full bg-[var(--color-accent)]/80"
                    />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Known clients */}
        {agency.knownClients.length > 0 && (
          <Section
            eyebrow="Known clients"
            subtitle="Publicly announced relationships only. Inclusion does not imply current engagement."
          >
            <div className="space-y-8">
              {clientSectors.map((sector) => (
                <div key={sector}>
                  <h3 className="tracked-label mb-3">{sector}</h3>
                  <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                    {clientsBySector[sector].map((c) => (
                      <li
                        key={c.name}
                        className="flex items-center justify-between border-b border-[var(--color-border)] py-2 text-[15px]"
                      >
                        <span>{c.name}</span>
                        {c.source && (
                          <a
                            href={c.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
                            aria-label={`Source for ${c.name}`}
                          >
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Signature campaigns */}
        {agency.signatureCampaigns.length > 0 && (
          <Section eyebrow="Signature work">
            <div className="space-y-4">
              {agency.signatureCampaigns.map((c, i) => (
                <div
                  key={i}
                  className="border border-[var(--color-border)] bg-[var(--color-surface)] p-7"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-[22px] leading-tight font-medium">
                      {c.title}
                    </h3>
                    <span className="font-mono text-[12px] text-[var(--color-text-muted)] tabular">
                      {c.year}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
                    For {c.client}
                  </p>
                  <p className="mt-4 text-[15px] leading-[1.6] text-[var(--color-text-secondary)]">
                    {c.summary}
                  </p>
                  {c.awards && c.awards.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {c.awards.map((a) => (
                        <Pill key={a} variant="accent">
                          {a}
                        </Pill>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Recent awards */}
        {agency.recentAwards.length > 0 && (
          <Section eyebrow="Recent awards">
            <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {agency.recentAwards.map((a, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[60px_1fr_auto] items-center gap-4 py-3 text-[15px]"
                >
                  <span className="font-mono text-[12px] text-[var(--color-text-muted)] tabular">
                    {a.year}
                  </span>
                  <span>{a.name}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                    {a.category}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Notable moves */}
        {agency.notableMoves.length > 0 && (
          <Section eyebrow="Recent moves">
            <ul className="space-y-5 border-l border-[var(--color-border-strong)] pl-6">
              {agency.notableMoves.map((m, i) => (
                <li key={i} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[27px] top-2 h-2 w-2 rounded-full bg-[var(--color-accent)]"
                  />
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-mono text-[12px] text-[var(--color-text-muted)] tabular">
                      {formatDate(m.date)}
                    </span>
                    <Pill variant="outline">{moveLabel(m.type)}</Pill>
                  </div>
                  <p className="mt-2 text-[15px] leading-[1.6] text-[var(--color-text)]">
                    {m.description}
                  </p>
                  {m.source && (
                    <a
                      href={m.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-[12px] text-[var(--color-text-muted)] underline decoration-[var(--color-border-strong)] underline-offset-[3px] hover:text-[var(--color-accent)]"
                    >
                      Source <ExternalLink size={10} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Sources */}
        {agency.sources && agency.sources.length > 0 && (
          <Section eyebrow="Sources">
            <ol className="space-y-2 text-[14px]">
              {agency.sources.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)] tabular pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-text)] underline decoration-[var(--color-border-strong)] underline-offset-[4px] hover:text-[var(--color-accent)] hover:decoration-[var(--color-accent)]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Footer metadata */}
        <div className="mt-20 flex flex-col gap-3 border-t border-[var(--color-border)] pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>Last reviewed {formatDate(agency.lastUpdated)}</span>
          <div className="flex gap-4">
            {agency.website && (
              <a
                href={agency.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent)]"
              >
                Website ↗
              </a>
            )}
            {agency.linkedin && (
              <a
                href={agency.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent)]"
              >
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>

        {/* Sister agencies (same parent) */}
        {sisters.length > 0 && (
          <section className="mt-24">
            <div className="mb-6 flex items-baseline justify-between border-b border-[var(--color-border-strong)] pb-3">
              <Eyebrow>Other {agency.parentCompany} agencies</Eyebrow>
              <Link
                href={{ pathname: "/agencies", query: { holding: agency.parentCompany } }}
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
              >
                View all {agency.parentCompany} →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sisters.map((r) => (
                <AgencyCard key={r.slug} agency={r} />
              ))}
            </div>
          </section>
        )}

        {/* Related (different parent / overlapping practice) */}
        {related.length > 0 && (
          <section className="mt-20">
            <Eyebrow>Related agencies</Eyebrow>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <AgencyCard key={r.slug} agency={r} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            href="/agencies"
            className="group inline-flex items-center gap-2 text-[14px] font-medium underline decoration-[var(--color-border-strong)] underline-offset-[6px] hover:decoration-[var(--color-accent)]"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            All agencies
          </Link>
          {agency.parentCompany !== "Independent" && (
            <Link
              href={{ pathname: "/agencies", query: { holding: agency.parentCompany } }}
              className="group inline-flex items-center gap-1.5 text-[14px] font-medium underline decoration-[var(--color-border-strong)] underline-offset-[6px] hover:decoration-[var(--color-accent)]"
            >
              Other {agency.parentCompany} agencies
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </div>
      </Container>
    </article>
  );
}

function ByTheNumbers({
  agency,
}: {
  agency: ReturnType<typeof getAgencyBySlug> & object;
}) {
  if (!agency) return null;
  const stats: { label: string; value: string }[] = [
    {
      label: "Practice areas",
      value: String(agency.practiceAreas.length),
    },
    {
      label: "Clients tracked",
      value: agency.knownClients.length > 0 ? String(agency.knownClients.length) : "—",
    },
    {
      label: "Signature campaigns",
      value:
        agency.signatureCampaigns.length > 0
          ? String(agency.signatureCampaigns.length)
          : "—",
    },
    {
      label: "Recent awards",
      value: agency.recentAwards.length > 0 ? String(agency.recentAwards.length) : "—",
    },
    {
      label: "Recent moves",
      value: agency.notableMoves.length > 0 ? String(agency.notableMoves.length) : "—",
    },
    { label: "Last reviewed", value: formatDate(agency.lastUpdated) },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-y border-[var(--color-border)] py-6 sm:grid-cols-3 lg:grid-cols-6">
      {stats.map((s) => (
        <div key={s.label}>
          <div className="tracked-label">{s.label}</div>
          <div className="mt-1 font-display text-[22px] font-medium tracking-[-0.005em] tabular">
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function StatBlock({
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
  children: React.ReactNode;
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

function moveLabel(type: string): string {
  return type
    .split("_")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}
