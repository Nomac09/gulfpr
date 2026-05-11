import type {
  Agency,
  HoldingCompany,
  PracticeArea,
} from "@/content/agencies/types";

import { burson } from "@/content/agencies/burson";
import { hillKnowlton } from "@/content/agencies/hill-knowlton";
import { memacOgilvy } from "@/content/agencies/memac-ogilvy";
import { fleishmanHillard } from "@/content/agencies/fleishmanhillard";
import { ketchum } from "@/content/agencies/ketchum";
import { msl } from "@/content/agencies/msl";
import { edelman } from "@/content/agencies/edelman";
import { weberShandwick } from "@/content/agencies/weber-shandwick";
import { golin } from "@/content/agencies/golin";
import { brunswick } from "@/content/agencies/brunswick";
import { teneo } from "@/content/agencies/teneo";
import { asdaaBcw } from "@/content/agencies/asdaa-bcw";
import { bpgGroup } from "@/content/agencies/bpg-group";
import { actionGlobal } from "@/content/agencies/action-global";
import { currentGlobal } from "@/content/agencies/current-global";
import { vianova } from "@/content/agencies/vianova";
import { houbara } from "@/content/agencies/houbara";
import { capitalMsl } from "@/content/agencies/capital-msl";
import { secNewgate } from "@/content/agencies/sec-newgate";
import { tonic } from "@/content/agencies/tonic";

const AGENCIES: Agency[] = [
  burson,
  hillKnowlton,
  memacOgilvy,
  fleishmanHillard,
  ketchum,
  msl,
  edelman,
  weberShandwick,
  golin,
  brunswick,
  teneo,
  asdaaBcw,
  bpgGroup,
  actionGlobal,
  currentGlobal,
  vianova,
  houbara,
  capitalMsl,
  secNewgate,
  tonic,
];

export function getAllAgencies(): Agency[] {
  return [...AGENCIES].sort((a, b) => a.name.localeCompare(b.name));
}

export function getAgencyBySlug(slug: string): Agency | undefined {
  return AGENCIES.find((a) => a.slug === slug);
}

export function getAgenciesByParent(parent: HoldingCompany): Agency[] {
  return AGENCIES.filter((a) => a.parentCompany === parent);
}

export function getAgenciesByPracticeArea(area: PracticeArea): Agency[] {
  return AGENCIES.filter((a) => a.practiceAreas.includes(area));
}

export function getAgenciesByCity(city: string): Agency[] {
  return AGENCIES.filter(
    (a) =>
      a.headquarters.toLowerCase().includes(city.toLowerCase()) ||
      a.regionalOffices.some((o) =>
        o.toLowerCase().includes(city.toLowerCase())
      )
  );
}

export function getFeaturedAgencies(): Agency[] {
  const featured = AGENCIES.filter((a) => a.featured);
  return featured.length > 0 ? featured : AGENCIES.slice(0, 8);
}

export function getRelatedAgencies(slug: string, limit = 3): Agency[] {
  const target = getAgencyBySlug(slug);
  if (!target) return [];
  const score = (other: Agency) => {
    if (other.slug === slug) return -1;
    let s = 0;
    if (other.parentCompany === target.parentCompany) s += 3;
    if (other.headquarters === target.headquarters) s += 2;
    const overlap = other.practiceAreas.filter((p) =>
      target.practiceAreas.includes(p)
    ).length;
    s += overlap;
    return s;
  };
  return [...AGENCIES]
    .map((a) => ({ a, s: score(a) }))
    .filter((x) => x.s > 0)
    .sort((x, y) => y.s - x.s)
    .slice(0, limit)
    .map((x) => x.a);
}

export function getAllCities(): string[] {
  const set = new Set<string>();
  for (const a of AGENCIES) {
    const hqCity = a.headquarters.split(",")[0]?.trim();
    if (hqCity) set.add(hqCity);
    for (const o of a.regionalOffices) {
      const c = o.split(",")[0]?.trim();
      if (c) set.add(c);
    }
  }
  return [...set].sort();
}

export function getAllParents(): HoldingCompany[] {
  const set = new Set<HoldingCompany>();
  for (const a of AGENCIES) set.add(a.parentCompany);
  const order: HoldingCompany[] = ["WPP", "Omnicom", "IPG", "Publicis", "Independent"];
  return order.filter((p) => set.has(p));
}

export function getAllPracticeAreas(): PracticeArea[] {
  const set = new Set<PracticeArea>();
  for (const a of AGENCIES) for (const p of a.practiceAreas) set.add(p);
  return [...set].sort();
}

export function getAtlasStats() {
  return {
    agencyCount: AGENCIES.length,
    holdingCompanyCount: new Set(
      AGENCIES.filter((a) => a.parentCompany !== "Independent").map(
        (a) => a.parentCompany
      )
    ).size,
    cityCount: getAllCities().length,
    independentCount: AGENCIES.filter((a) => a.parentCompany === "Independent")
      .length,
  };
}
