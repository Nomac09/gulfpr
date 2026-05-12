import type { Agency } from "./types";

export const houbara: Agency = {
  slug: "houbara",
  name: "Houbara Communications",
  parentCompany: "Independent",
  founded: 2019,
  headquarters: "Dubai, UAE",
  regionalOffices: ["Dubai"],
  leadership: [
    {
      role: "Founder and CEO",
      name: "Loretta Ahmed",
      appointedYear: 2019,
    },
  ],
  headcountEstimate: {
    range: "<50",
    asOf: "2024-01-01",
    source: "Agency public statement: 20+ consultants",
  },
  practiceAreas: [
    "Corporate",
    "Reputation",
    "Strategic Communications",
    "Financial",
    "Technology",
  ],
  practiceMix: [
    { practice: "Corporate", percentage: 35 },
    { practice: "Reputation", percentage: 20 },
    { practice: "Strategic Communications", percentage: 15 },
    { practice: "Financial", percentage: 15 },
    { practice: "Technology", percentage: 15 },
  ],
  knownClients: [
    {
      name: "INSEAD",
      sector: "Education",
      publiclyAnnounced: true,
      source:
        "https://campaignme.com/insead-reappoints-houbara-communications-as-pr-partner/",
    },
  ],
  signatureCampaigns: [],
  recentAwards: [
    {
      name: "PRCA MENA — Middle East PR Leader of the Year (Loretta Ahmed)",
      year: 2020,
      category: "Individual",
    },
  ],
  notableMoves: [
    {
      type: "office_open",
      description:
        "Founded by Loretta Ahmed following a local management buyout of Grayling Dubai from parent company Huntsworth plc.",
      date: "2019-01-01",
    },
    {
      type: "hire",
      description:
        "INSEAD reappointed Houbara as PR partner, extending the long-running relationship around the school's Abu Dhabi-based Middle East Campus.",
      date: "2024-01-01",
      source:
        "https://campaignme.com/insead-reappoints-houbara-communications-as-pr-partner/",
    },
  ],
  website: "https://www.houbaracomms.agency",
  linkedin: "https://www.linkedin.com/company/houbaracomms",
  editorialNote: `Houbara was founded in 2019 by Loretta Ahmed after a management buyout of Grayling Dubai from then-parent Huntsworth. The name is intentional — a houbara is a slow, deliberate desert bird associated with traditional Emirati falconry, and the brand reads as an intentional contrast to the high-tempo brand-side work that dominates the Dubai independent scene.

The team runs around twenty-plus consultants, with nearly half speaking Arabic as a first language — a deliberately bilingual bench that maps to the firm's chosen positioning in corporate reputation, thought leadership, sustainability communications, financial communications and fintech. Education and university-sector work is a notable specialism: the firm has worked with INSEAD around its Abu Dhabi Middle East Campus since the school's regional build-out, with the relationship publicly reappointed in 2024.

Loretta Ahmed was named PRCA MENA Middle East PR Leader of the Year in 2020 — a year after founding — which signalled industry recognition that the firm was credible enough to win the kinds of accounts that had previously sat with networks. The boutique posture and senior-led team are the proposition; for clients who do not want their work staffed by junior account executives buried inside a network roster, this is the alternative.

Houbara is not visible in the awards leaderboards the way Current Global or Memac Ogilvy are. That is partly scale and partly category — corporate reputation and thought-leadership work does not always translate into the same kind of consumer-led campaign awards cycle.`,
  sources: [
    {
      label: "Houbara Communications — Campaign Middle East",
      url: "https://campaignme.com/agency/houbara-communications/",
    },
    {
      label: "INSEAD reappoints Houbara as PR partner",
      url: "https://campaignme.com/insead-reappoints-houbara-communications-as-pr-partner/",
    },
    {
      label: "Loretta Ahmed — Lomond Group bio",
      url: "https://lomond-group.com/team/senior-advisory-board/loretta-ahmed.html",
    },
  ],
  lastUpdated: "2026-05-12",
};
