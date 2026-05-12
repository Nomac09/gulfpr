import type { Agency, HoldingCompany, PracticeArea } from "@/content/agencies/types";

export type HoldingDistribution = {
  parent: HoldingCompany;
  count: number;
  percentage: number;
};

export function getHoldingDistribution(agencies: Agency[]): HoldingDistribution[] {
  const counts = new Map<HoldingCompany, number>();
  for (const a of agencies) {
    counts.set(a.parentCompany, (counts.get(a.parentCompany) ?? 0) + 1);
  }
  const order: HoldingCompany[] = ["WPP", "Omnicom", "IPG", "Publicis", "Independent"];
  const total = agencies.length || 1;
  return order
    .filter((p) => counts.has(p))
    .map((p) => ({
      parent: p,
      count: counts.get(p) ?? 0,
      percentage: ((counts.get(p) ?? 0) / total) * 100,
    }));
}

export const HOLDING_COLOR: Record<HoldingCompany, string> = {
  WPP: "#0a0a0a",
  Omnicom: "#525252",
  IPG: "#a3a3a3",
  Publicis: "#737373",
  Independent: "#ff5500",
};

export type CityFootprint = {
  city: string;
  country: string;
  officeCount: number;
  agencies: { slug: string; name: string }[];
};

const CITY_COUNTRY: Record<string, string> = {
  Dubai: "United Arab Emirates",
  "Abu Dhabi": "United Arab Emirates",
  Sharjah: "United Arab Emirates",
  Riyadh: "Saudi Arabia",
  Jeddah: "Saudi Arabia",
  Doha: "Qatar",
  Manama: "Bahrain",
  "Kuwait City": "Kuwait",
  Muscat: "Oman",
  Cairo: "Egypt",
  Beirut: "Lebanon",
  Casablanca: "Morocco",
  "Nicosia, Cyprus (MENA hub: Dubai)": "Cyprus",
  Nicosia: "Cyprus",
};

export function getCityFootprints(agencies: Agency[]): CityFootprint[] {
  const map = new Map<string, CityFootprint>();
  for (const a of agencies) {
    const offices = a.regionalOffices;
    const unique = new Set<string>();
    for (const office of offices) {
      const city = office.split(",")[0]?.trim();
      if (!city) continue;
      if (unique.has(city)) continue;
      unique.add(city);
      const entry =
        map.get(city) ??
        ({
          city,
          country: CITY_COUNTRY[city] ?? "Other",
          officeCount: 0,
          agencies: [],
        } as CityFootprint);
      entry.officeCount += 1;
      entry.agencies.push({ slug: a.slug, name: a.name });
      map.set(city, entry);
    }
  }
  return [...map.values()].sort((a, b) => b.officeCount - a.officeCount);
}

export type PracticeCoverage = {
  practice: PracticeArea;
  agencyCount: number;
};

export function getPracticeCoverage(agencies: Agency[]): PracticeCoverage[] {
  const counts = new Map<PracticeArea, number>();
  for (const a of agencies) {
    for (const p of a.practiceAreas) {
      counts.set(p, (counts.get(p) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([practice, agencyCount]) => ({ practice, agencyCount }))
    .sort((a, b) => b.agencyCount - a.agencyCount);
}

/** Practice areas, sorted by coverage descending, for heatmap columns. */
export function orderedPracticesForHeatmap(agencies: Agency[]): PracticeArea[] {
  const coverage = getPracticeCoverage(agencies);
  return coverage.map((c) => c.practice);
}
