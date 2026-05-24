export type HoldingCompanySlug = "wpp" | "omnicom" | "ipg" | "publicis";

export type TimelineEventType =
  | "acquisition"
  | "merger"
  | "restructure"
  | "leadership"
  | "strategic"
  | "entry";

export type HoldingCompanyLeader = {
  name: string;
  role: string;
  /** Year appointed, or null if not publicly confirmable. */
  appointed: number | null;
  notes?: string;
};

export type HoldingCompanyTimelineEvent = {
  year: number;
  type: TimelineEventType;
  title: string;
  body: string;
};

export type HoldingCompany = {
  slug: HoldingCompanySlug;
  /** Display name as commonly used. */
  name: string;
  /** Short brand name (often equal to name). */
  shortName: string;
  /** Full legal entity name. */
  fullLegalName: string;
  /** Global headquarters city. */
  hqGlobal: string;
  /** Regional (Gulf / MENA) headquarters city. */
  hqRegional: string;
  /** Year the holding company first established a Gulf presence. */
  yearEnteredGulf: number | null;
  /** Agency slugs that operationally sit under this holding company. */
  agencies: string[];
  /** Regional leadership at the holding-company level (not agency-level). Empty if not publicly attributable. */
  regionalLeadership: HoldingCompanyLeader[];
  timeline: HoldingCompanyTimelineEvent[];
  /** 3-4 paragraphs of opening editorial prose. Plain text, paragraphs separated by blank lines. */
  editorialIntro: string;
  /** 2-3 paragraphs of strategic posture analysis. */
  strategicPosture: string;
  /** Optional honest note acknowledging public-data limitations for this holding company. */
  thinDataNote?: string;
  /** Optional accent color hex for graph visualization. */
  accentColor?: string;
};
