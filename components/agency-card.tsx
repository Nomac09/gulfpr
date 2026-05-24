import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Agency } from "@/content/agencies/types";
import { Pill } from "@/components/pill";
import { HoldingPill } from "@/components/holding-pill";
import { cardExcerpt } from "@/lib/excerpt";

function metadataLine(agency: Agency): string {
  const officeCount = agency.regionalOffices.length;
  const cityRaw = agency.headquarters.split(",")[0]?.trim();
  const city =
    cityRaw && cityRaw.length > 0 ? cityRaw : "Headquarters not disclosed";
  const officePart = `${officeCount} ${officeCount === 1 ? "office" : "offices"}`;
  const parts = [city, officePart];
  if (agency.founded) parts.push(`est. ${agency.founded}`);
  return parts.join(" · ");
}

export function AgencyCard({ agency }: { agency: Agency }) {
  const pull = cardExcerpt(agency.editorialNote);
  const meta = metadataLine(agency);

  return (
    <Link
      href={`/agencies/${agency.slug}`}
      className="group relative flex h-full flex-col gap-5 border border-[var(--color-border)] bg-[var(--color-surface)] p-7 transition-all duration-200 hover:border-[var(--color-text)] hover:shadow-[0_1px_0_var(--color-text)]"
    >
      <div className="flex items-start justify-between gap-3">
        <HoldingPill parent={agency.parentCompany} asLink={false} />
        <ArrowUpRight
          size={16}
          className="text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-accent)]"
        />
      </div>

      <div className="space-y-1.5">
        <h3 className="font-display text-[26px] leading-[1.05] font-medium tracking-[-0.01em]">
          {agency.name}
        </h3>
        <p className="font-mono text-[12px] text-[var(--color-text-muted)] tabular">
          {meta}
        </p>
      </div>

      <p className="flex-1 text-[14px] leading-[1.55] text-[var(--color-text-secondary)]">
        {pull}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {agency.practiceAreas.slice(0, 3).map((p) => (
          <Pill key={p} variant="outline">
            {p}
          </Pill>
        ))}
        {agency.practiceAreas.length > 3 && (
          <Pill variant="outline">+{agency.practiceAreas.length - 3}</Pill>
        )}
      </div>
    </Link>
  );
}
