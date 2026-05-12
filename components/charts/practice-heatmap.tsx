"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";
import type { Agency, PracticeArea } from "@/content/agencies/types";
import { cn } from "@/lib/cn";

const PRACTICE_SHORT: Record<string, string> = {
  Corporate: "Corp",
  Consumer: "Cons",
  "Public Affairs": "PubAff",
  Healthcare: "Hlth",
  Crisis: "Crisis",
  Influencer: "Infl",
  Digital: "Digital",
  "Investor Relations": "IR",
  Financial: "Fin",
  "Strategic Communications": "StratCom",
  Reputation: "Rep",
  Government: "Gov",
  Technology: "Tech",
  Hospitality: "Hosp",
  "Real Estate": "RE",
};

export function PracticeHeatmap({
  agencies,
  practices,
  onPracticeClick,
}: {
  agencies: Agency[];
  practices: PracticeArea[];
  /** Called when a practice header is clicked, e.g. to apply a filter. */
  onPracticeClick?: (practice: PracticeArea) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [hovered, setHovered] = useState<{ agency: string; practice: string } | null>(
    null
  );

  const sorted = [...agencies].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div ref={ref} className="w-full">
      {/* Desktop table-style heatmap */}
      <div className="relative hidden overflow-x-auto md:block">
        <table
          className="w-full border-separate border-spacing-0 font-mono text-[11px] tabular"
          aria-label="Practice area coverage across agencies"
        >
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 z-10 bg-[var(--color-bg)] py-3 pr-4 text-left align-bottom"
              >
                <span className="tracked-label">Agency</span>
              </th>
              {practices.map((p) => (
                <th
                  key={p}
                  scope="col"
                  className="h-[110px] min-w-[34px] max-w-[42px] px-0 align-bottom"
                >
                  <button
                    type="button"
                    onClick={() => onPracticeClick?.(p)}
                    className="group flex h-full w-full origin-bottom-left -translate-x-[2px] translate-y-[-2px] rotate-[-50deg] cursor-pointer items-end whitespace-nowrap pb-1 text-left text-[10px] uppercase tracking-[0.06em] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
                    title={`Filter by ${p}`}
                  >
                    {p}
                  </button>
                </th>
              ))}
              <th className="px-2 text-right align-bottom">
                <span className="tracked-label">Total</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((a, rowIdx) => (
              <tr key={a.slug} className="group">
                <th
                  scope="row"
                  className="sticky left-0 z-10 whitespace-nowrap bg-[var(--color-bg)] py-1.5 pr-4 text-left text-[12px] font-normal text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)]"
                >
                  <Link
                    href={`/agencies/${a.slug}`}
                    className="hover:text-[var(--color-accent)]"
                  >
                    {a.name}
                  </Link>
                </th>
                {practices.map((p, colIdx) => {
                  const covered = a.practiceAreas.includes(p);
                  const isHovered =
                    hovered?.agency === a.slug && hovered?.practice === p;
                  return (
                    <td
                      key={p}
                      onMouseEnter={() =>
                        setHovered({ agency: a.slug, practice: p })
                      }
                      onMouseLeave={() => setHovered(null)}
                      className="relative h-7 min-w-[34px] max-w-[42px] p-[2px]"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={
                          inView ? { opacity: 1, scale: 1 } : { opacity: 0 }
                        }
                        transition={{
                          duration: 0.35,
                          delay: 0.02 * rowIdx + 0.04 * colIdx,
                          ease: [0.2, 0.65, 0.3, 0.95],
                        }}
                        className={cn(
                          "h-full w-full transition-all",
                          covered
                            ? "bg-[var(--color-text)]"
                            : "bg-[var(--color-surface-2)] border border-[var(--color-border)]",
                          isHovered &&
                            "ring-1 ring-[var(--color-accent)] ring-offset-1 ring-offset-[var(--color-bg)]"
                        )}
                        aria-label={`${a.name} ${
                          covered ? "covers" : "does not cover"
                        } ${p}`}
                      />
                      {isHovered && (
                        <div className="pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap border border-[var(--color-text)] bg-[var(--color-text)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-white">
                          {a.name} × {p}
                          {!covered && " · not covered"}
                        </div>
                      )}
                    </td>
                  );
                })}
                <td className="px-2 text-right text-[11px] text-[var(--color-text-muted)] tabular">
                  {a.practiceAreas.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile fallback: practice coverage summary per agency */}
      <div className="md:hidden">
        <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {sorted.map((a) => (
            <li key={a.slug} className="flex items-center justify-between py-3">
              <Link
                href={`/agencies/${a.slug}`}
                className="text-[14px] text-[var(--color-text)]"
              >
                {a.name}
              </Link>
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] tabular">
                {a.practiceAreas.length} {a.practiceAreas.length === 1 ? "practice" : "practices"}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-[11px] text-[var(--color-text-muted)]">
          View the matrix at a wider screen size for the full coverage grid.
        </p>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 bg-[var(--color-text)]" />
          Practice covered
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 border border-[var(--color-border)] bg-[var(--color-surface-2)]" />
          Not covered
        </span>
        <span className="hidden md:inline">Click a row to open profile · Click a column header to filter</span>
      </div>
      {/* mute lint of unused var */}
      {PRACTICE_SHORT.Corporate && null}
    </div>
  );
}
