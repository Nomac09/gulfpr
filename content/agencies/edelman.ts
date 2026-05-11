import type { Agency } from "./types";

export const edelman: Agency = {
  slug: "edelman",
  name: "Edelman",
  legalName: "Edelman Middle East",
  parentCompany: "Independent",
  headquarters: "Abu Dhabi, UAE",
  regionalOffices: ["Abu Dhabi", "Dubai", "Riyadh"],
  leadership: [
    { role: "CEO, Middle East", name: "Omar Qirem" },
  ],
  practiceAreas: [
    "Corporate",
    "Public Affairs",
    "Crisis",
    "Reputation",
    "Healthcare",
    "Technology",
    "Financial",
    "Strategic Communications",
  ],
  knownClients: [],
  signatureCampaigns: [
    {
      title: "Edelman Trust Barometer (regional cut)",
      client: "Edelman (proprietary research)",
      year: 2024,
      summary:
        "Annual study of trust in business, government, media and NGOs. The MENA regional cut has become a reference point cited in regional press and used by clients in stakeholder briefings.",
    },
  ],
  recentAwards: [],
  notableMoves: [
    {
      type: "hire",
      description:
        "Omar Qirem rejoined Edelman as CEO of the Middle East, having previously led Edelman Saudi Arabia between 2012 and 2016.",
      date: "2022-01-01",
      source:
        "https://www.consultancy-me.com/news/1052/omar-qirem-rejoins-edelman-in-emirates-as-new-ceo-for-middle-east",
    },
  ],
  website: "https://www.edelman.com/ae",
  editorialNote: `Edelman is the largest independent PR firm in the world and the only international communications firm to put its regional headquarters in Abu Dhabi rather than Dubai — a choice that reflects, and reinforces, its relationships with UAE federal and Abu Dhabi government stakeholders. The firm runs wholly-owned offices in Abu Dhabi, Dubai and Riyadh and a network of affiliates beyond.

Independence matters here. Edelman is not part of a holding-company roster, so the firm can sign accounts that would conflict inside WPP, Omnicom, IPG or Publicis. For mandates with cross-holding-company sensitivities, that is a real advantage. The annual Trust Barometer — the firm's proprietary global research — gives the team a reliable, press-friendly hook each spring.

Omar Qirem returned to lead the region in the early 2020s after an earlier stint running Saudi Arabia for the firm. The bench under him skews senior and trilingual, with strength in corporate reputation and financial communications. Where Edelman does not always lead in the Gulf: pure consumer brand work and influencer programs, which sit closer to network advertising agencies in the regional ecosystem.`,
  sources: [
    {
      label: "Omar Qirem rejoins Edelman as CEO Middle East",
      url: "https://www.consultancy-me.com/news/1052/omar-qirem-rejoins-edelman-in-emirates-as-new-ceo-for-middle-east",
    },
    {
      label: "Edelman Middle East",
      url: "https://www.edelman.com/ae",
    },
  ],
  lastUpdated: "2026-05-11",
  featured: true,
};
