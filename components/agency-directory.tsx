"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import { Search, X } from "lucide-react";
import type {
  Agency,
  HoldingCompany,
  PracticeArea,
} from "@/content/agencies/types";
import { AgencyCard } from "@/components/agency-card";
import { cn } from "@/lib/cn";

type SortKey = "name" | "founded" | "yearsInGulf" | "offices";

const SORT_OPTIONS: [SortKey, string][] = [
  ["name", "A–Z"],
  ["founded", "Founded"],
  ["yearsInGulf", "Years in Gulf"],
  ["offices", "Office count"],
];

export function AgencyDirectory({
  agencies,
  parents,
  practiceAreas,
  cities,
}: {
  agencies: Agency[];
  parents: HoldingCompany[];
  practiceAreas: PracticeArea[];
  cities: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [parent, setParent] = useState<HoldingCompany | "all">("all");
  const [area, setArea] = useState<PracticeArea | "all">("all");
  const [city, setCity] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("name");
  const [query, setQuery] = useState("");

  // Sync URL params on mount (and when they change externally, e.g. from map clicks)
  useEffect(() => {
    const sp = searchParams;
    const urlHolding = sp.get("holding");
    const urlPractice = sp.get("practice");
    const urlCity = sp.get("city");
    const urlQ = sp.get("q");
    const urlSort = sp.get("sort");

    if (urlHolding && parents.includes(urlHolding as HoldingCompany)) {
      setParent(urlHolding as HoldingCompany);
    } else if (!urlHolding) {
      setParent("all");
    }
    if (urlPractice && practiceAreas.includes(urlPractice as PracticeArea)) {
      setArea(urlPractice as PracticeArea);
    } else if (!urlPractice) {
      setArea("all");
    }
    if (urlCity && cities.includes(urlCity)) {
      setCity(urlCity);
    } else if (!urlCity) {
      setCity("all");
    }
    if (urlQ !== null) setQuery(urlQ);
    if (urlSort && SORT_OPTIONS.some(([k]) => k === urlSort)) {
      setSort(urlSort as SortKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Push state back to the URL (shallow) so links remain shareable
  function pushUrl(next: {
    parent?: HoldingCompany | "all";
    area?: PracticeArea | "all";
    city?: string;
    query?: string;
    sort?: SortKey;
  }) {
    const params = new URLSearchParams(searchParams.toString());
    const p = next.parent ?? parent;
    const a = next.area ?? area;
    const c = next.city ?? city;
    const q = next.query ?? query;
    const s = next.sort ?? sort;
    if (p !== "all") params.set("holding", p);
    else params.delete("holding");
    if (a !== "all") params.set("practice", a);
    else params.delete("practice");
    if (c !== "all") params.set("city", c);
    else params.delete("city");
    if (q) params.set("q", q);
    else params.delete("q");
    if (s !== "name") params.set("sort", s);
    else params.delete("sort");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = agencies.filter((a) => {
      if (parent !== "all" && a.parentCompany !== parent) return false;
      if (area !== "all" && !a.practiceAreas.includes(area)) return false;
      if (city !== "all") {
        const inHq = a.headquarters.toLowerCase().includes(city.toLowerCase());
        const inOffices = a.regionalOffices.some((o) =>
          o.toLowerCase().includes(city.toLowerCase())
        );
        if (!inHq && !inOffices) return false;
      }
      if (q) {
        const hay = [
          a.name,
          a.legalName ?? "",
          a.headquarters,
          a.parentCompany,
          a.practiceAreas.join(" "),
          a.editorialNote,
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    result.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "founded") {
        const af = a.founded ?? 9999;
        const bf = b.founded ?? 9999;
        return af - bf;
      }
      if (sort === "yearsInGulf") {
        const now = new Date().getFullYear();
        const ay = a.founded ? now - a.founded : -1;
        const by = b.founded ? now - b.founded : -1;
        return by - ay;
      }
      if (sort === "offices") {
        return b.regionalOffices.length - a.regionalOffices.length;
      }
      return 0;
    });
    return result;
  }, [agencies, parent, area, city, sort, query]);

  const hasActiveFilters =
    parent !== "all" || area !== "all" || city !== "all" || query !== "";
  const activeFilterCount =
    (parent !== "all" ? 1 : 0) +
    (area !== "all" ? 1 : 0) +
    (city !== "all" ? 1 : 0) +
    (query !== "" ? 1 : 0);

  function reset() {
    setParent("all");
    setArea("all");
    setCity("all");
    setSort("name");
    setQuery("");
    router.replace(pathname, { scroll: false });
  }

  return (
    <div>
      <div className="sticky top-[64px] z-30 -mx-6 border-y border-[var(--color-border)] bg-[var(--color-bg)]/95 px-6 backdrop-blur-md lg:-mx-12 lg:px-12">
        <div className="flex flex-col gap-4 py-5">
          {/* Search row */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  pushUrl({ query: e.target.value });
                }}
                placeholder="Search agencies by name, city, or text..."
                className="w-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] py-2.5 pl-9 pr-9 text-[14px] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-text)] focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    pushUrl({ query: "" });
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            {/* Prominent match indicator */}
            <div
              className={cn(
                "hidden whitespace-nowrap border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em] tabular md:block",
                hasActiveFilters
                  ? "border-[var(--color-text)] bg-[var(--color-text)] text-white"
                  : "border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
              )}
            >
              <span className="font-semibold">{filtered.length}</span>
              <span className="opacity-70"> / {agencies.length} match</span>
              {activeFilterCount > 0 && (
                <span className="ml-2 border-l border-white/30 pl-2 opacity-90">
                  {activeFilterCount} {activeFilterCount === 1 ? "filter" : "filters"}
                </span>
              )}
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={reset}
                className="hidden whitespace-nowrap text-[12px] font-mono uppercase tracking-[0.1em] text-[var(--color-text-secondary)] underline decoration-[var(--color-border-strong)] underline-offset-[4px] hover:text-[var(--color-accent)] md:block"
              >
                Reset
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
            <FilterRow label="Holding">
              <Chip
                active={parent === "all"}
                onClick={() => {
                  setParent("all");
                  pushUrl({ parent: "all" });
                }}
              >
                All
              </Chip>
              {parents.map((p) => (
                <Chip
                  key={p}
                  active={parent === p}
                  onClick={() => {
                    setParent(p);
                    pushUrl({ parent: p });
                  }}
                >
                  {p}
                </Chip>
              ))}
            </FilterRow>

            <FilterRow label="Practice">
              <Chip
                active={area === "all"}
                onClick={() => {
                  setArea("all");
                  pushUrl({ area: "all" });
                }}
              >
                All
              </Chip>
              {practiceAreas.map((p) => (
                <Chip
                  key={p}
                  active={area === p}
                  onClick={() => {
                    setArea(p);
                    pushUrl({ area: p });
                  }}
                >
                  {p}
                </Chip>
              ))}
            </FilterRow>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <FilterRow label="City">
              <Chip
                active={city === "all"}
                onClick={() => {
                  setCity("all");
                  pushUrl({ city: "all" });
                }}
              >
                All
              </Chip>
              {cities.map((c) => (
                <Chip
                  key={c}
                  active={city === c}
                  onClick={() => {
                    setCity(c);
                    pushUrl({ city: c });
                  }}
                >
                  {c}
                </Chip>
              ))}
            </FilterRow>

            <div className="flex items-center gap-2 lg:shrink-0">
              <span className="tracked-label">Sort</span>
              <div className="flex gap-1 overflow-x-auto hide-scrollbar">
                {SORT_OPTIONS.map(([key, label]) => (
                  <Chip
                    key={key}
                    active={sort === key}
                    onClick={() => {
                      setSort(key);
                      pushUrl({ sort: key });
                    }}
                  >
                    {label}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-6 flex items-center justify-between md:hidden">
        <p className="font-mono text-[12px] text-[var(--color-text-muted)] tabular">
          <span className="font-semibold text-[var(--color-text)]">
            {filtered.length}
          </span>{" "}
          / {agencies.length} match
          {activeFilterCount > 0 && (
            <span className="ml-2 text-[var(--color-text-muted)]">
              · {activeFilterCount} {activeFilterCount === 1 ? "filter" : "filters"}
            </span>
          )}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={reset}
            className="text-[12px] font-mono uppercase tracking-[0.1em] text-[var(--color-text-secondary)] underline decoration-[var(--color-border-strong)] underline-offset-[4px] hover:text-[var(--color-accent)]"
          >
            Reset
          </button>
        )}
      </div>

      <div className="mt-8 hidden md:block" />

      <LayoutGroup>
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((a) => (
                <motion.div
                  key={a.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.65, 0.3, 0.95] }}
                >
                  <AgencyCard agency={a} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface)] p-16 text-center">
            <p className="font-display text-[24px] leading-tight">
              No agencies match those filters.
            </p>
            <p className="mt-3 text-[14px] text-[var(--color-text-secondary)]">
              Try widening the search, or reset to see the full list.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex bg-[var(--color-text)] px-4 py-2 text-[13px] font-medium text-white hover:bg-[var(--color-accent)]"
            >
              Reset filters
            </button>
          </div>
        )}
      </LayoutGroup>
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="tracked-label shrink-0">{label}</span>
      <div className="flex gap-1 overflow-x-auto hide-scrollbar">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-[3px] border px-2.5 py-1 text-[12px] font-medium transition-colors",
        active
          ? "border-[var(--color-text)] bg-[var(--color-text)] text-white"
          : "border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
      )}
    >
      {children}
    </button>
  );
}
