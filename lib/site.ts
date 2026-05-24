export type NavItem = {
  label: string;
  href: string;
  status: "available" | "soon";
};

export const NAV: NavItem[] = [
  { label: "Agencies", href: "/agencies", status: "available" },
  { label: "Holding Companies", href: "/holding-companies", status: "available" },
  { label: "Campaigns", href: "/campaigns", status: "soon" },
  { label: "Media", href: "/media", status: "soon" },
  { label: "Practice", href: "/practice", status: "soon" },
  { label: "Career", href: "/career", status: "soon" },
  { label: "About", href: "/about", status: "available" },
];

export const SITE = {
  name: "Gulf PR Atlas",
  tagline: "An open reference for the Gulf communications industry",
  domain: "gulfpr.org",
  editor: "Nasim Sawalma",
  editorEmail: "nasim.sawalma@gmail.com",
  license: "CC BY 4.0",
  lastUpdated: "2026-05-12",
  version: "v0.3 · Phase 2",
} as const;
