export type HoldingCompany =
  | "WPP"
  | "Omnicom"
  | "IPG"
  | "Publicis"
  | "Independent";

export type PracticeArea =
  | "Corporate"
  | "Consumer"
  | "Public Affairs"
  | "Healthcare"
  | "Crisis"
  | "Influencer"
  | "Digital"
  | "Investor Relations"
  | "Financial"
  | "Strategic Communications"
  | "Reputation"
  | "Government"
  | "Technology"
  | "Hospitality"
  | "Real Estate";

export type MoveType =
  | "hire"
  | "exit"
  | "acquisition"
  | "office_open"
  | "office_close";

export type Leader = {
  role: string;
  name: string;
  appointedYear?: number;
};

export type HeadcountEstimate = {
  range: "<50" | "50-100" | "100-250" | "250+";
  asOf: string;
  source: string;
};

export type KnownClient = {
  name: string;
  sector: string;
  publiclyAnnounced: boolean;
  source?: string;
};

export type SignatureCampaign = {
  title: string;
  client: string;
  year: number;
  summary: string;
  awards?: string[];
};

export type Award = {
  name: string;
  year: number;
  category: string;
};

export type NotableMove = {
  type: MoveType;
  description: string;
  date: string;
  source?: string;
};

export type Source = {
  label: string;
  url: string;
};

export type PracticeMixEntry = {
  practice: PracticeArea;
  /** Approximate share of practice area within the agency's mix. Should sum to ~100 across the array. */
  percentage: number;
};

export type EstimatedRevenue = {
  range: string;
  asOf: string;
  source: string;
};

export type Agency = {
  slug: string;
  name: string;
  legalName?: string;
  parentCompany: HoldingCompany;
  parentSlug?: string;
  /** Year the regional (Gulf) office opened. May differ from the global founding year. */
  founded?: number;
  /** Year the brand was founded globally, if meaningfully different from regional founding. */
  foundedGlobal?: number;
  headquarters: string;
  regionalOffices: string[];
  leadership: Leader[];
  headcountEstimate?: HeadcountEstimate;
  /** Optional: only when publicly disclosed. */
  estimatedRevenue?: EstimatedRevenue;
  practiceAreas: PracticeArea[];
  /** Optional: per-practice share of the agency's mix. Leave undefined when not reliably sourceable. */
  practiceMix?: PracticeMixEntry[];
  knownClients: KnownClient[];
  signatureCampaigns: SignatureCampaign[];
  recentAwards: Award[];
  notableMoves: NotableMove[];
  website?: string;
  linkedin?: string;
  /** Senior-practitioner editorial framing. Plain text, paragraphs separated by blank lines. Italicized publication names with _underscores_. */
  editorialNote: string;
  /** External sources cited in the profile. */
  sources?: Source[];
  lastUpdated: string;
  featured?: boolean;
};

/** Convenience: years active in Gulf, derived from founded year. */
export function yearsActiveInGulf(agency: Agency, asOfYear: number): number | undefined {
  if (!agency.founded) return undefined;
  return Math.max(0, asOfYear - agency.founded);
}
