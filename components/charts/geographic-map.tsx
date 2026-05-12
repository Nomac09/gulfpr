"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";
import type { CityFootprint } from "@/lib/aggregations";

// Approximate geographic coordinates for each MENA city we track.
// Hand-tuned for readable layout, not geographic accuracy.
const CITY_COORDS: Record<string, { lng: number; lat: number }> = {
  Casablanca: { lng: -7.6, lat: 33.6 },
  Nicosia: { lng: 33.4, lat: 35.2 },
  Beirut: { lng: 35.5, lat: 33.9 },
  Cairo: { lng: 31.2, lat: 30.0 },
  Riyadh: { lng: 46.7, lat: 24.7 },
  Jeddah: { lng: 39.2, lat: 21.5 },
  "Kuwait City": { lng: 47.9, lat: 29.4 },
  Manama: { lng: 50.6, lat: 26.2 },
  Doha: { lng: 51.5, lat: 25.3 },
  Dubai: { lng: 55.3, lat: 26.2 },
  "Abu Dhabi": { lng: 54.4, lat: 23.5 },
  Muscat: { lng: 58.5, lat: 23.6 },
  Sharjah: { lng: 55.4, lat: 25.4 },
};

// SVG view-box layout
const W = 1000;
const H = 460;
const X_MIN = -10;
const X_MAX = 60;
const Y_MIN = 20;
const Y_MAX = 36;
const PAD_X = 80;
const PAD_Y = 50;

function project(lng: number, lat: number) {
  const x =
    PAD_X +
    ((lng - X_MIN) / (X_MAX - X_MIN)) * (W - PAD_X * 2);
  const y =
    PAD_Y +
    ((Y_MAX - lat) / (Y_MAX - Y_MIN)) * (H - PAD_Y * 2);
  return { x, y };
}

function radiusFor(officeCount: number) {
  // Scale 1 → 12, 8 → 38 (sqrt scale for area perception)
  const min = 12;
  const max = 38;
  return min + Math.sqrt(officeCount / 12) * (max - min);
}

const COUNTRY_CLUSTERS: { label: string; cities: string[]; anchor: { x: number; y: number } }[] = [
  { label: "UAE", cities: ["Dubai", "Abu Dhabi", "Sharjah"], anchor: { x: 0, y: -28 } },
  { label: "Saudi Arabia", cities: ["Riyadh", "Jeddah"], anchor: { x: 0, y: -30 } },
  { label: "Qatar", cities: ["Doha"], anchor: { x: 0, y: -34 } },
  { label: "Bahrain", cities: ["Manama"], anchor: { x: 0, y: -34 } },
  { label: "Kuwait", cities: ["Kuwait City"], anchor: { x: 0, y: -34 } },
  { label: "Egypt", cities: ["Cairo"], anchor: { x: 0, y: -34 } },
  { label: "Lebanon", cities: ["Beirut"], anchor: { x: 0, y: -34 } },
  { label: "Morocco", cities: ["Casablanca"], anchor: { x: 0, y: -34 } },
  { label: "Cyprus", cities: ["Nicosia"], anchor: { x: 0, y: -34 } },
  { label: "Oman", cities: ["Muscat"], anchor: { x: 0, y: -34 } },
];

export function GeographicMap({ cities }: { cities: CityFootprint[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [hovered, setHovered] = useState<string | null>(null);

  // Filter to cities we have coordinates for
  const placedCities = cities
    .filter((c) => CITY_COORDS[c.city])
    .map((c) => {
      const coord = CITY_COORDS[c.city];
      const p = project(coord.lng, coord.lat);
      return { ...c, x: p.x, y: p.y, r: radiusFor(c.officeCount) };
    });

  // Country labels - position once per country cluster, near the first known city
  const countryLabels = COUNTRY_CLUSTERS.map((cluster) => {
    const first = cluster.cities.find((c) => placedCities.some((pc) => pc.city === c));
    if (!first) return null;
    const placed = placedCities.find((pc) => pc.city === first)!;
    return {
      label: cluster.label,
      x: placed.x + cluster.anchor.x,
      y: placed.y + cluster.anchor.y,
    };
  }).filter(Boolean) as { label: string; x: number; y: number }[];

  return (
    <div ref={ref} className="w-full">
      <div className="relative w-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Geographic footprint of Gulf PR agencies"
        >
          {/* Faint grid lines */}
          <g aria-hidden="true">
            {[0.25, 0.5, 0.75].map((t) => (
              <line
                key={`h-${t}`}
                x1={0}
                y1={H * t}
                x2={W}
                y2={H * t}
                stroke="var(--color-border)"
                strokeDasharray="2 6"
                strokeWidth={1}
              />
            ))}
            {[0.25, 0.5, 0.75].map((t) => (
              <line
                key={`v-${t}`}
                x1={W * t}
                y1={0}
                x2={W * t}
                y2={H}
                stroke="var(--color-border)"
                strokeDasharray="2 6"
                strokeWidth={1}
              />
            ))}
          </g>

          {/* Country labels */}
          {countryLabels.map((c) => (
            <text
              key={c.label}
              x={c.x}
              y={c.y}
              textAnchor="middle"
              className="fill-[var(--color-text-muted)] font-mono"
              fontSize="10"
              letterSpacing="0.16em"
              textRendering="optimizeLegibility"
            >
              {c.label.toUpperCase()}
            </text>
          ))}

          {/* City circles */}
          {placedCities.map((c, i) => {
            const isHovered = hovered === c.city;
            const isDubai = c.city === "Dubai";
            const fill = isDubai ? "var(--color-accent)" : "var(--color-text)";
            return (
              <motion.g
                key={c.city}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.05,
                  ease: [0.2, 0.65, 0.3, 0.95],
                }}
                style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                onMouseEnter={() => setHovered(c.city)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link
                  href={{ pathname: "/agencies", query: { city: c.city } }}
                  aria-label={`${c.city}: ${c.officeCount} agency offices — filter directory`}
                >
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={c.r + 4}
                    fill="transparent"
                    className="cursor-pointer"
                  />
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={c.r}
                    fill={fill}
                    fillOpacity={isHovered ? 1 : 0.92}
                    stroke={isHovered ? "var(--color-accent)" : "transparent"}
                    strokeWidth={2}
                    className="cursor-pointer transition-all"
                  />
                  <text
                    x={c.x}
                    y={c.y - 2}
                    textAnchor="middle"
                    className="pointer-events-none fill-white font-mono"
                    fontSize={c.r > 25 ? 12 : 10}
                    fontWeight="600"
                  >
                    {c.city}
                  </text>
                  <text
                    x={c.x}
                    y={c.y + 12}
                    textAnchor="middle"
                    className="pointer-events-none fill-white/85 font-mono tabular"
                    fontSize={c.r > 25 ? 11 : 9}
                  >
                    {c.officeCount}
                  </text>
                </Link>
              </motion.g>
            );
          })}
        </svg>

        {/* Hover detail panel */}
        {hovered && (
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 max-w-[420px] border border-[var(--color-text)] bg-[var(--color-surface)] p-3">
            {(() => {
              const c = placedCities.find((x) => x.city === hovered);
              if (!c) return null;
              return (
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="font-display text-[16px] font-medium">
                      {c.city}
                    </div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                      {c.country}
                    </div>
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)] tabular">
                    {c.officeCount} agency {c.officeCount === 1 ? "office" : "offices"}
                  </div>
                  <div className="flex flex-wrap gap-x-2 gap-y-0.5 pt-1 text-[11px] text-[var(--color-text-muted)]">
                    {c.agencies.slice(0, 6).map((a) => (
                      <span key={a.slug}>{a.name}</span>
                    ))}
                    {c.agencies.length > 6 && (
                      <span>+{c.agencies.length - 6}</span>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-[var(--color-accent)]" />
          Dubai
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-[var(--color-text)]" />
          Other cities (size proportional to office count)
        </span>
        <span>Click a city to filter the directory</span>
      </div>
    </div>
  );
}
