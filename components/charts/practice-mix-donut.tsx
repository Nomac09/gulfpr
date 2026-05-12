"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import type { PracticeMixEntry } from "@/content/agencies/types";

const COLORS = [
  "#0a0a0a",
  "#525252",
  "#737373",
  "#a3a3a3",
  "#ff5500",
  "#cc3d00",
  "#d4d4d4",
];

const SIZE = 200;
const R_OUTER = 85;
const R_INNER = 52;
const CX = SIZE / 2;
const CY = SIZE / 2;

function polar(cx: number, cy: number, r: number, angleRad: number) {
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

function arcPath(
  startAngle: number,
  endAngle: number,
  rOuter: number,
  rInner: number
) {
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  const so = polar(CX, CY, rOuter, startAngle);
  const eo = polar(CX, CY, rOuter, endAngle);
  const si = polar(CX, CY, rInner, endAngle);
  const ei = polar(CX, CY, rInner, startAngle);
  return [
    `M ${so.x} ${so.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${eo.x} ${eo.y}`,
    `L ${si.x} ${si.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${ei.x} ${ei.y}`,
    "Z",
  ].join(" ");
}

export function PracticeMixDonut({ mix }: { mix: PracticeMixEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  if (!mix.length) return null;

  // Sort by percentage descending and take top entries (sum the rest as "Other")
  const sorted = [...mix].sort((a, b) => b.percentage - a.percentage);
  const top = sorted.slice(0, 6);
  const rest = sorted.slice(6).reduce((sum, e) => sum + e.percentage, 0);

  const slices: { label: string; pct: number; color: string }[] = top.map(
    (e, i) => ({
      label: e.practice,
      pct: e.percentage,
      color: COLORS[i % COLORS.length],
    })
  );
  if (rest > 0) {
    slices.push({ label: "Other", pct: rest, color: "#d4d4d4" });
  }

  let cursor = -Math.PI / 2;
  const segments = slices.map((s) => {
    const sweep = (s.pct / 100) * Math.PI * 2;
    const startAngle = cursor;
    const endAngle = cursor + sweep;
    cursor = endAngle;
    return { ...s, startAngle, endAngle };
  });

  return (
    <div ref={ref} className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-[180px] w-[180px] shrink-0"
        role="img"
        aria-label="Practice mix breakdown"
      >
        {segments.map((seg, i) => (
          <motion.path
            key={i}
            d={arcPath(seg.startAngle, seg.endAngle, R_OUTER, R_INNER)}
            fill={seg.color}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1 + i * 0.06,
              ease: [0.2, 0.65, 0.3, 0.95],
            }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />
        ))}
        <text
          x={CX}
          y={CY - 4}
          textAnchor="middle"
          className="font-mono fill-[var(--color-text-muted)]"
          fontSize="10"
          letterSpacing="0.14em"
        >
          PRACTICE
        </text>
        <text
          x={CX}
          y={CY + 12}
          textAnchor="middle"
          className="font-mono fill-[var(--color-text-muted)]"
          fontSize="10"
          letterSpacing="0.14em"
        >
          MIX
        </text>
      </svg>

      <ul className="grid w-full grid-cols-1 gap-y-1.5 text-[12px]">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="inline-block h-2.5 w-2.5 shrink-0"
              style={{ backgroundColor: s.color }}
            />
            <span className="flex-1 truncate text-[var(--color-text)]">
              {s.label}
            </span>
            <span className="font-mono text-[11px] text-[var(--color-text-muted)] tabular">
              {Math.round(s.pct)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
