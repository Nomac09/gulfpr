"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import type { HoldingDistribution } from "@/lib/aggregations";
import { HOLDING_COLOR } from "@/lib/aggregations";
import { cn } from "@/lib/cn";

export function HoldingDistributionChart({
  data,
  totalAgencies,
}: {
  data: HoldingDistribution[];
  totalAgencies: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-[20px] font-medium tracking-[-0.01em]">
          Twenty agencies, four holding companies, nine independents
        </h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)] tabular">
          n={totalAgencies}
        </span>
      </div>

      {/* Bar */}
      <div className="relative mt-6 h-[56px] w-full overflow-hidden border border-[var(--color-border-strong)] bg-[var(--color-surface)]">
        <div className="flex h-full w-full">
          {data.map((d, i) => (
            <motion.div
              key={d.parent}
              initial={{ flexBasis: "0%" }}
              animate={
                inView
                  ? { flexBasis: `${d.percentage}%` }
                  : { flexBasis: "0%" }
              }
              transition={{
                duration: 1.2,
                delay: 0.1 + i * 0.08,
                ease: [0.2, 0.65, 0.3, 0.95],
              }}
              onHoverStart={() => setHovered(d.parent)}
              onHoverEnd={() => setHovered(null)}
              className={cn(
                "group relative flex items-center justify-center transition-[filter] duration-200",
                hovered === d.parent ? "brightness-90" : "",
                i > 0 ? "border-l border-white/15" : ""
              )}
              style={{ backgroundColor: HOLDING_COLOR[d.parent] }}
              aria-label={`${d.parent}: ${d.count} agencies (${Math.round(d.percentage)}%)`}
            >
              <span className="font-mono text-[13px] font-semibold text-white tabular">
                {d.count}
              </span>
              {/* Tooltip */}
              <div className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap border border-[var(--color-text)] bg-[var(--color-text)] px-2 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-white opacity-0 transition-opacity group-hover:opacity-100">
                {d.count} {d.count === 1 ? "agency" : "agencies"} · {Math.round(d.percentage)}%
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
        {data.map((d) => (
          <button
            key={d.parent}
            type="button"
            onMouseEnter={() => setHovered(d.parent)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "group flex items-center gap-2 text-left transition-opacity",
              hovered && hovered !== d.parent ? "opacity-40" : "opacity-100"
            )}
          >
            <span
              aria-hidden
              className="inline-block h-2.5 w-2.5 shrink-0"
              style={{ backgroundColor: HOLDING_COLOR[d.parent] }}
            />
            <div className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text)]">
                {d.parent}
              </span>
              <span className="font-mono text-[11px] text-[var(--color-text-muted)] tabular">
                {d.count} · {Math.round(d.percentage)}%
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
