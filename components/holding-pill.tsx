import Link from "next/link";
import type { HoldingCompany } from "@/content/agencies/types";
import { HOLDING_COLOR } from "@/lib/aggregations";
import { cn } from "@/lib/cn";

const SLUG: Record<Exclude<HoldingCompany, "Independent">, string> = {
  WPP: "wpp",
  Omnicom: "omnicom",
  IPG: "ipg",
  Publicis: "publicis",
};

const PILL_BASE =
  "relative inline-flex items-center gap-1.5 rounded-[3px] border-[1.5px] border-[var(--color-text)] bg-transparent pl-2.5 pr-2 py-0.5 font-mono text-[11px] font-medium leading-none tracking-[0.08em] text-[var(--color-text)]";

export function HoldingPill({
  parent,
  className,
  asLink = true,
}: {
  parent: HoldingCompany;
  className?: string;
  asLink?: boolean;
}) {
  const accent = (
    <span
      aria-hidden
      className="absolute left-0 top-0 h-full w-[3px]"
      style={{ backgroundColor: HOLDING_COLOR[parent] }}
    />
  );

  const inner = (
    <>
      {accent}
      <span className="pl-1">{parent}</span>
    </>
  );

  if (asLink && parent !== "Independent") {
    return (
      <Link
        href={`/holding-companies/${SLUG[parent]}`}
        className={cn(
          PILL_BASE,
          "transition-colors hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]",
          className
        )}
      >
        {inner}
      </Link>
    );
  }

  return <span className={cn(PILL_BASE, className)}>{inner}</span>;
}
