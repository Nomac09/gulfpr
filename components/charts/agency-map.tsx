"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

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

const W = 360;
const H = 200;
const X_MIN = -10;
const X_MAX = 60;
const Y_MIN = 20;
const Y_MAX = 36;
const PAD = 18;

function project(lng: number, lat: number) {
  const x = PAD + ((lng - X_MIN) / (X_MAX - X_MIN)) * (W - PAD * 2);
  const y = PAD + ((Y_MAX - lat) / (Y_MAX - Y_MIN)) * (H - PAD * 2);
  return { x, y };
}

/** Alternates label placement above/below for cities sorted left-to-right,
 *  reducing collisions in dense Gulf clusters. */
function labelOffsetY(sortedIndex: number): number {
  return sortedIndex % 2 === 0 ? -13 : 17;
}

export function AgencyMap({ offices }: { offices: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [hovered, setHovered] = useState<string | null>(null);

  const uniqueCities = Array.from(
    new Set(offices.map((o) => o.split(",")[0]?.trim()).filter(Boolean) as string[])
  );

  // Sort by x position so label alternation tracks left-to-right
  const placed = uniqueCities
    .filter((c) => CITY_COORDS[c])
    .map((c) => ({ city: c, ...project(CITY_COORDS[c].lng, CITY_COORDS[c].lat) }))
    .sort((a, b) => a.x - b.x);

  const allKnown = Object.entries(CITY_COORDS).map(([city, coord]) => ({
    city,
    ...project(coord.lng, coord.lat),
    highlighted: uniqueCities.includes(city),
  }));

  return (
    <div ref={ref} className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Office locations: ${uniqueCities.join(", ")}`}
      >
        {/* Faint background context dots */}
        {allKnown.map((c) =>
          c.highlighted ? null : (
            <circle key={c.city} cx={c.x} cy={c.y} r={2} fill="var(--color-border-strong)" />
          )
        )}

        {/* Highlighted office cities — always-visible labels, alternating above/below */}
        {placed.map((p, i) => (
          <motion.g
            key={p.city}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.15 + i * 0.06,
              ease: [0.2, 0.65, 0.3, 0.95],
            }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            onMouseEnter={() => setHovered(p.city)}
            onMouseLeave={() => setHovered(null)}
          >
            <circle cx={p.x} cy={p.y} r={10} fill="transparent" className="cursor-default" />
            <circle
              cx={p.x}
              cy={p.y}
              r={9}
              fill="var(--color-accent)"
              fillOpacity={hovered === p.city ? 0.22 : 0.12}
              className="transition-[fill-opacity]"
            />
            <circle
              cx={p.x}
              cy={p.y}
              r={hovered === p.city ? 5 : 4}
              fill="var(--color-accent)"
              className="transition-[r]"
            />
            <text
              x={p.x}
              y={p.y + labelOffsetY(i)}
              textAnchor="middle"
              className="fill-[var(--color-text)] font-mono"
              fontSize="8"
              fontWeight="600"
            >
              {p.city}
            </text>
            <title>{p.city}</title>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
