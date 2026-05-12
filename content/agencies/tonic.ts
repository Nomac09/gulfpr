import type { Agency } from "./types";

export const tonic: Agency = {
  slug: "tonic",
  name: "Tonic Communications",
  legalName: "Tonic International",
  parentCompany: "Independent",
  founded: 2004,
  headquarters: "Dubai, UAE",
  regionalOffices: ["Dubai"],
  leadership: [
    { role: "Co-Founder", name: "Khaled Gadallah", appointedYear: 2004 },
    { role: "Co-Founder", name: "Arnaud Verchère", appointedYear: 2004 },
  ],
  practiceAreas: [
    "Consumer",
    "Hospitality",
    "Influencer",
    "Digital",
    "Reputation",
    "Technology",
  ],
  practiceMix: [
    { practice: "Consumer", percentage: 35 },
    { practice: "Digital", percentage: 25 },
    { practice: "Influencer", percentage: 15 },
    { practice: "Hospitality", percentage: 15 },
    { practice: "Technology", percentage: 10 },
  ],
  knownClients: [
    { name: "Audi Middle East", sector: "Automotive", publiclyAnnounced: true },
    { name: "Roshan Telecom", sector: "Telecom", publiclyAnnounced: true },
    {
      name: "Dubai Waste Management Center",
      sector: "Government / Sustainability",
      publiclyAnnounced: true,
    },
  ],
  signatureCampaigns: [
    {
      title: "Audi e-tron GT — regional launch",
      client: "Audi Middle East",
      year: 2022,
      summary:
        "Regional launch communications for Audi's electric performance flagship, focused on building category narrative around EV adoption in the Gulf.",
    },
  ],
  recentAwards: [],
  notableMoves: [],
  website: "https://tonicinternational.com",
  linkedin: "https://www.linkedin.com/company/tonicinternational",
  editorialNote: `Tonic — operating as Tonic International — is a Dubai-founded full-service creative and communications agency, established in 2004 by Khaled Gadallah and Arnaud Verchère. Strictly speaking it is broader than a pure PR shop: the firm runs creative advertising, branding, digital marketing and media buying alongside its communications work, and the PR practice sits inside that integrated proposition.

The founder backgrounds shape the firm's lane. Verchère brings three decades of international brand work for Audi, GM, Pepsi, Coca-Cola, Unilever, Nestlé, Sony and Microsoft across multiple regions. Gadallah's career spans advertising and journalism across the GCC and Egypt. The integrated multilingual posture maps to the consumer-and-hospitality categories the firm services, with notable work for Audi Middle East and the Dubai Waste Management Center on the public-sector side.

For clients who want PR sitting next to creative and brand under one Dubai roof, Tonic is one of the more established options. The PR-only proposition is less prominent in the firm's positioning than the integrated story, and the agency does not generally compete with the corporate-reputation specialists at the high end of the regional advisory market.`,
  sources: [
    {
      label: "Tonic International — Campaign Middle East",
      url: "https://campaignme.com/agency/tonic-international/",
    },
    {
      label: "About Tonic International",
      url: "https://tonicinternational.com/about-us/",
    },
  ],
  lastUpdated: "2026-05-12",
};
