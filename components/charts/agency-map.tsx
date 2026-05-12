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

/** Mini map showing this agency's office cities highlighted.
 *  Labels are hidden by default and appear in a strip below the SVG on hover,
 *  avoiding collision in dense Gulf clusters (Manama / Doha / Dubai / Abu Dhabi). */
export function AgencyMap({ offices }: { offices: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [hovered, setHovered] = useState<string | null>(null);

  const uniqueCities = Array.from(
    new Set(offices.map((o) => o.split(",")[0]?.trim()).filter(Boolean) as string[])
  );
  const placed = uniqueCities
    .filter((c) => CITY_COORDS[c])
    .map((c) => ({ city: c, ...project(CITY_COORDS[c].lng, CITY_COORDS[c].lat) }));

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
        {/* Faint background dots — unlabelled context dots */}
        {allKnown.map((c) =>
          c.highlighted ? null : (
            <circle
              key={c.city}
              cx={c.x}
              cy={c.y}
              r={2}
              fill="var(--color-border-strong)"
            />
          )
        )}

        {/* Highlighted office cities — dots only, no inline labels */}
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
            {/* Larger invisible hit area for easy hover */}
            <circle
              cx={p.x}
              cy={p.y}
              r={10}
              fill="transparent"
              className="cursor-default"
            />
            {/* Halo ring on hover */}
            <circle
              cx={p.x}
              cy={p.y}
              r={9}
              fill="var(--color-accent)"
              fillOpacity={hovered === p.city ? 0.2 : 0.12}
              className="transition-[fill-opacity]"
            />
            {/* Solid dot */}
            <circle
              cx={p.x}
              cy={p.y}
              r={hovered === p.city ? 5 : 4}
              fill="var(--color-accent)"
              className="transition-[r]"
            />
            <title>{p.city}</title>
          </motion.g>
        ))}
      </svg>

      {/* Label strip below the SVG — shows hovered city name */}
      <div className="flex h-5 items-center border-t border-[var(--color-border)] pt-2">
        {hovered ? (
          <span className="font-mono text-[11px] text-[var(--color-accent)] uppercase tracking-[0.12em]">
            {hovered}
          </span>
        ) : (
          <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
            {placed.length === 0
              ? "No mapped offices"
              : `${placed.length} ${placed.length === 1 ? "office" : "offices"} — hover a dot`}
          </span>
        )}
      </div>
    </div>
  );
}
