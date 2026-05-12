import type { HoldingCompany } from "@/content/agencies/types";
import { HOLDING_COLOR } from "@/lib/aggregations";
import { cn } from "@/lib/cn";

export function HoldingPill({
  parent,
  className,
}: {
  parent: HoldingCompany;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-1.5 rounded-[3px] border-[1.5px] border-[var(--color-text)] bg-transparent pl-2.5 pr-2 py-0.5 font-mono text-[11px] font-medium leading-none tracking-[0.08em] text-[var(--color-text)]",
        className
      )}
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[3px]"
        style={{ backgroundColor: HOLDING_COLOR[parent] }}
      />
      <span className="pl-1">{parent}</span>
    </span>
  );
}
