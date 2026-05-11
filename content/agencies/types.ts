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

export type Agency = {
  slug: string;
  name: string;
  legalName?: string;
  parentCompany: HoldingCompany;
  parentSlug?: string;
  founded?: number;
  headquarters: string;
  regionalOffices: string[];
  leadership: Leader[];
  headcountEstimate?: HeadcountEstimate;
  practiceAreas: PracticeArea[];
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
