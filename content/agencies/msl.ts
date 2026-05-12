import type { Agency } from "./types";

export const msl: Agency = {
  slug: "msl",
  name: "MSL",
  legalName: "MSL Group",
  parentCompany: "Publicis",
  parentSlug: "publicis",
  headquarters: "Dubai, UAE",
  regionalOffices: ["Dubai", "Riyadh"],
  leadership: [],
  practiceAreas: [
    "Corporate",
    "Consumer",
    "Public Affairs",
    "Digital",
    "Influencer",
    "Reputation",
  ],
  practiceMix: [
    { practice: "Corporate", percentage: 25 },
    { practice: "Consumer", percentage: 25 },
    { practice: "Digital", percentage: 20 },
    { practice: "Public Affairs", percentage: 15 },
    { practice: "Influencer", percentage: 10 },
    { practice: "Reputation", percentage: 5 },
  ],
  knownClients: [],
  signatureCampaigns: [],
  recentAwards: [],
  notableMoves: [],
  website: "https://mslgroup.com",
  linkedin: "https://www.linkedin.com/company/mslgroup",
  editorialNote: `MSL is Publicis Groupe's principal PR network globally and the holding company's main PR foothold in the Gulf. The regional operation is smaller than the WPP and Omnicom benches but plays to Publicis's broader strength in integrated marketing — PR sitting alongside media buying, creative and data inside the group's "Power of One" client model.

That positioning shapes the work. MSL in the region tends to draw mandates where comms is one part of a larger Publicis assignment, more than standalone reputation briefs that lead with PR. The Capital MSL sub-brand serves the financial communications segment under the same roof.

Public information on the Gulf bench, leadership and account roster is limited in the trade press, which is a clue to how the firm operates: most often as part of a larger Publicis client engagement rather than as a standalone PR pitch. PRCA MENA welcomed MSL to its regional membership, which formalized the firm's institutional presence in the local industry body.`,
  sources: [
    {
      label: "PRCA MENA welcomes MSL — Zawya",
      url: "https://www.zawya.com/en/press-release/companies-news/prca-mena-welcomes-global-communications-network-msl-to-its-membership-y6zjloca",
    },
  ],
  lastUpdated: "2026-05-12",
};
