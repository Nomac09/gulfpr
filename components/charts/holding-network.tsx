"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceX,
  forceY,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from "d3";
import { useRouter } from "next/navigation";
import type { Agency } from "@/content/agencies/types";
import type { HoldingCompany } from "@/content/holding-companies/types";
import { cn } from "@/lib/cn";

type NodeKind = "holding" | "agency" | "independent";

type GraphNode = SimulationNodeDatum & {
  id: string;
  label: string;
  kind: NodeKind;
  holdingSlug?: string;
  agencySlug?: string;
  radius: number;
};

type GraphLink = SimulationLinkDatum<GraphNode> & {
  kind: "ownership" | "secondary";
  rationale?: string;
};

const W = 1100;
const H = 600;

const HOLDING_FILL: Record<string, string> = {
  wpp: "#0a0a0a",
  omnicom: "#525252",
  ipg: "#a3a3a3",
  publicis: "#ffffff",
};
const HOLDING_STROKE: Record<string, string> = {
  wpp: "#0a0a0a",
  omnicom: "#525252",
  ipg: "#a3a3a3",
  publicis: "#0a0a0a",
};
const INDEPENDENT_COLOR = "#ff5500";

// Anchor positions for the four holding-company nodes (loose grid, left/centre).
const HOLDING_ANCHOR: Record<string, { x: number; y: number }> = {
  wpp: { x: 240, y: 180 },
  omnicom: { x: 520, y: 180 },
  ipg: { x: 520, y: 420 },
  publicis: { x: 240, y: 420 },
};

// Independents cluster to the right.
const INDEPENDENTS_CLUSTER_X = 920;
const INDEPENDENTS_CLUSTER_Y = 300;

// Secondary-edge rationales keyed by agency-slug pairs (unordered).
const SECONDARY_PAIRS: { a: string; b: string; rationale: string }[] = [
  { a: "asdaa-bcw", b: "hill-knowlton", rationale: "Conflict-shop dynamic inside Burson" },
  { a: "asdaa-bcw", b: "memac-ogilvy", rationale: "Both WPP, Dubai-headquartered, different practice mixes" },
  { a: "burson", b: "hill-knowlton", rationale: "Hill & Knowlton folded into Burson as conflict shop" },
  { a: "weber-shandwick", b: "golin", rationale: "IPG deliberately differentiated sister agencies" },
  { a: "msl", b: "capital-msl", rationale: "Same Publicis brand, different positioning" },
  { a: "fleishmanhillard", b: "brunswick", rationale: "Omnicom-adjacent on financial communications" },
  { a: "edelman", b: "asdaa-bcw", rationale: "Peer competitors on thought-leadership research" },
  { a: "bpg-group", b: "action-global", rationale: "Major independents competing on Saudi government and corporate" },
  { a: "houbara", b: "brunswick", rationale: "Independent advisory shops competing on senior corporate counsel" },
];

export function HoldingNetwork({
  holdings,
  agencies,
}: {
  holdings: HoldingCompany[];
  agencies: Agency[];
}) {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [hovered, setHovered] = useState<string | null>(null);

  const { nodes, links } = useMemo(() => {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];

    // Holding company nodes (fixed anchors).
    for (const h of holdings) {
      const anchor = HOLDING_ANCHOR[h.slug] ?? { x: W / 2, y: H / 2 };
      nodes.push({
        id: `holding:${h.slug}`,
        label: h.name,
        kind: "holding",
        holdingSlug: h.slug,
        radius: 26,
        fx: anchor.x,
        fy: anchor.y,
      });
    }

    // Agency + independent nodes.
    for (const a of agencies) {
      const isIndependent = a.parentCompany === "Independent";
      const node: GraphNode = {
        id: `agency:${a.slug}`,
        label: a.name,
        kind: isIndependent ? "independent" : "agency",
        holdingSlug: a.parentSlug,
        agencySlug: a.slug,
        radius: 11,
      };
      nodes.push(node);

      if (!isIndependent && a.parentSlug) {
        links.push({
          source: `holding:${a.parentSlug}`,
          target: `agency:${a.slug}`,
          kind: "ownership",
        });
      }
    }

    // Secondary edges.
    const agencyIds = new Set(nodes.map((n) => n.id));
    for (const pair of SECONDARY_PAIRS) {
      const s = `agency:${pair.a}`;
      const t = `agency:${pair.b}`;
      if (agencyIds.has(s) && agencyIds.has(t)) {
        links.push({
          source: s,
          target: t,
          kind: "secondary",
          rationale: pair.rationale,
        });
      }
    }

    return { nodes, links };
  }, [holdings, agencies]);

  useEffect(() => {
    const simulation = forceSimulation<GraphNode>(nodes)
      .force(
        "link",
        forceLink<GraphNode, GraphLink>(links)
          .id((d) => d.id)
          .distance((l) => (l.kind === "ownership" ? 90 : 140))
          .strength((l) => (l.kind === "ownership" ? 0.7 : 0.12))
      )
      .force("charge", forceManyBody().strength(-220))
      .force("collide", forceCollide<GraphNode>().radius((d) => d.radius + 6))
      .force("center", forceCenter(W / 2, H / 2).strength(0.02))
      .force(
        "x",
        forceX<GraphNode>().strength((d) => {
          if (d.kind === "holding") return 1;
          if (d.kind === "independent") return 0.25;
          return 0.04;
        }).x((d) => {
          if (d.kind === "independent") return INDEPENDENTS_CLUSTER_X;
          return W / 2;
        })
      )
      .force(
        "y",
        forceY<GraphNode>().strength((d) => {
          if (d.kind === "holding") return 1;
          if (d.kind === "independent") return 0.18;
          return 0.04;
        }).y((d) => {
          if (d.kind === "independent") return INDEPENDENTS_CLUSTER_Y;
          return H / 2;
        })
      )
      .stop();

    for (let i = 0; i < 280; i++) simulation.tick();

    const next: Record<string, { x: number; y: number }> = {};
    for (const n of nodes) {
      next[n.id] = { x: n.x ?? W / 2, y: n.y ?? H / 2 };
    }
    setPositions(next);
  }, [nodes, links]);

  const adjacency = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const l of links) {
      const s = typeof l.source === "object" ? (l.source as GraphNode).id : (l.source as string);
      const t = typeof l.target === "object" ? (l.target as GraphNode).id : (l.target as string);
      if (!map.has(s)) map.set(s, new Set());
      if (!map.has(t)) map.set(t, new Set());
      map.get(s)!.add(t);
      map.get(t)!.add(s);
    }
    return map;
  }, [links]);

  function nodeFill(n: GraphNode): string {
    if (n.kind === "holding") return HOLDING_FILL[n.holdingSlug ?? ""] ?? "#0a0a0a";
    if (n.kind === "independent") return INDEPENDENT_COLOR;
    return HOLDING_FILL[n.holdingSlug ?? ""] ?? "#525252";
  }
  function nodeStroke(n: GraphNode): string {
    if (n.kind === "holding") return HOLDING_STROKE[n.holdingSlug ?? ""] ?? "#0a0a0a";
    if (n.kind === "independent") return INDEPENDENT_COLOR;
    return HOLDING_STROKE[n.holdingSlug ?? ""] ?? "#525252";
  }

  function isDimmed(id: string): boolean {
    if (!hovered) return false;
    if (id === hovered) return false;
    const neighbours = adjacency.get(hovered);
    if (neighbours?.has(id)) return false;
    return true;
  }

  function isLinkDimmed(l: GraphLink): boolean {
    if (!hovered) return false;
    const s = typeof l.source === "object" ? (l.source as GraphNode).id : (l.source as string);
    const t = typeof l.target === "object" ? (l.target as GraphNode).id : (l.target as string);
    return s !== hovered && t !== hovered;
  }

  function handleClick(n: GraphNode) {
    if (n.kind === "holding" && n.holdingSlug) {
      router.push(`/holding-companies/${n.holdingSlug}`);
    } else if (n.agencySlug) {
      router.push(`/agencies/${n.agencySlug}`);
    }
  }

  return (
    <figure className="border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="w-full overflow-hidden">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Network of Gulf PR agencies grouped by holding company"
        >
          {/* Links */}
          <g>
            {links.map((l, i) => {
              const s = typeof l.source === "object" ? (l.source as GraphNode).id : (l.source as string);
              const t = typeof l.target === "object" ? (l.target as GraphNode).id : (l.target as string);
              const sp = positions[s];
              const tp = positions[t];
              if (!sp || !tp) return null;
              const dimmed = isLinkDimmed(l);
              return (
                <line
                  key={i}
                  x1={sp.x}
                  y1={sp.y}
                  x2={tp.x}
                  y2={tp.y}
                  stroke={l.kind === "ownership" ? "#0a0a0a" : "#a3a3a3"}
                  strokeWidth={l.kind === "ownership" ? 1 : 1}
                  strokeDasharray={l.kind === "secondary" ? "4 4" : undefined}
                  opacity={dimmed ? 0.08 : l.kind === "ownership" ? 0.55 : 0.7}
                  className="transition-opacity duration-200"
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g>
            {nodes.map((n) => {
              const p = positions[n.id];
              if (!p) return null;
              const dimmed = isDimmed(n.id);
              const isHover = hovered === n.id;
              return (
                <g
                  key={n.id}
                  transform={`translate(${p.x}, ${p.y})`}
                  className="cursor-pointer transition-opacity duration-200"
                  style={{ opacity: dimmed ? 0.25 : 1 }}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(n.id)}
                  onBlur={() => setHovered(null)}
                  onClick={() => handleClick(n)}
                  tabIndex={0}
                  role="link"
                  aria-label={
                    n.kind === "holding"
                      ? `${n.label} holding company`
                      : `${n.label} agency`
                  }
                >
                  <circle
                    r={n.radius + (isHover ? 2 : 0)}
                    fill={nodeFill(n)}
                    stroke={nodeStroke(n)}
                    strokeWidth={n.kind === "holding" ? 2 : 1}
                  />
                  {n.kind === "holding" ? (
                    <text
                      y={n.radius + 18}
                      textAnchor="middle"
                      className="font-mono fill-[var(--color-text)]"
                      fontSize="13"
                      fontWeight={600}
                      letterSpacing="0.06em"
                    >
                      {n.label.toUpperCase()}
                    </text>
                  ) : (
                    <text
                      y={n.radius + 13}
                      textAnchor="middle"
                      className="fill-[var(--color-text-secondary)]"
                      fontSize="10.5"
                      opacity={isHover || !hovered ? 1 : 0.4}
                    >
                      {n.label}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          {/* Legend */}
          <g transform={`translate(24, ${H - 92})`}>
            <rect
              x={-8}
              y={-18}
              width={260}
              height={92}
              fill="#ffffff"
              stroke="#e5e5e5"
            />
            <LegendRow y={0} swatch={<circle r={6} fill="#0a0a0a" />} label="Holding company" />
            <LegendRow y={20} swatch={<circle r={5} fill="#525252" />} label="Network agency" />
            <LegendRow y={40} swatch={<circle r={5} fill={INDEPENDENT_COLOR} />} label="Independent" />
            <LegendRow
              y={60}
              swatch={<line x1={-8} y1={0} x2={8} y2={0} stroke="#a3a3a3" strokeDasharray="3 3" />}
              label="Secondary relationship"
            />
          </g>
        </svg>
      </div>
      <figcaption className={cn(
        "border-t border-[var(--color-border)] px-5 py-3 font-mono text-[11px] text-[var(--color-text-muted)]"
      )}>
        Network shows ownership (solid lines) and secondary relationships (dashed lines) — sister-agency positioning, conflict shops, peer competitors. Hover a node to focus.
      </figcaption>
    </figure>
  );
}

function LegendRow({
  y,
  swatch,
  label,
}: {
  y: number;
  swatch: React.ReactNode;
  label: string;
}) {
  return (
    <g transform={`translate(0, ${y})`}>
      <g transform="translate(8, 0)">{swatch}</g>
      <text
        x={24}
        y={4}
        className="font-mono fill-[var(--color-text-secondary)]"
        fontSize="11"
      >
        {label}
      </text>
    </g>
  );
}
