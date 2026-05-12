import type { Agency } from "./types";

export const edelman: Agency = {
  slug: "edelman",
  name: "Edelman",
  legalName: "Edelman Middle East",
  parentCompany: "Independent",
  foundedGlobal: 1952,
  headquarters: "Abu Dhabi, UAE",
  regionalOffices: ["Abu Dhabi", "Dubai", "Riyadh"],
  leadership: [{ role: "CEO, Middle East", name: "Omar Qirem", appointedYear: 2022 }],
  headcountEstimate: {
    range: "100-250",
    asOf: "2025-01-01",
    source:
      "Agency statement: 200+ professionals across 3 wholly-owned offices and 9 affiliate offices",
  },
  practiceAreas: [
    "Corporate",
    "Public Affairs",
    "Crisis",
    "Reputation",
    "Healthcare",
    "Technology",
    "Financial",
    "Strategic Communications",
    "Government",
  ],
  practiceMix: [
    { practice: "Corporate", percentage: 30 },
    { practice: "Strategic Communications", percentage: 20 },
    { practice: "Public Affairs", percentage: 15 },
    { practice: "Crisis", percentage: 10 },
    { practice: "Healthcare", percentage: 10 },
    { practice: "Technology", percentage: 10 },
    { practice: "Financial", percentage: 5 },
  ],
  knownClients: [
    {
      name: "DP World",
      sector: "Logistics",
      publiclyAnnounced: true,
    },
    {
      name: "Abu Dhabi Businesswomen Council",
      sector: "Government / Foundation",
      publiclyAnnounced: true,
    },
    {
      name: "Dubai Businesswomen Council",
      sector: "Government / Foundation",
      publiclyAnnounced: true,
    },
    {
      name: "COP28 Presidency",
      sector: "Government / Events",
      publiclyAnnounced: true,
    },
  ],
  signatureCampaigns: [
    {
      title: "COP28 Strategic Communications",
      client: "COP28 Presidency",
      year: 2023,
      summary:
        "Spearheaded strategic communications and media relations for the United Arab Emirates' presidency of COP28 — the largest climate summit ever held, with a press corps numbering in the thousands and political stakes that made every public statement load-bearing.",
    },
    {
      title: "Move to Minus 15",
      client: "DP World",
      year: 2024,
      summary:
        "Supported DP World's industry coalition to lower the standard temperature of frozen food logistics from minus eighteen to minus fifteen degrees, framing the case as a measurable cut in supply-chain emissions. The campaign moved a technical operations question into mainstream business press.",
    },
    {
      title: "Edelman Trust Barometer — MENA cut",
      client: "Edelman (proprietary research)",
      year: 2024,
      summary:
        "Annual study of trust in business, government, media and NGOs. The MENA regional cut has become a reference point cited in regional press and used by clients in stakeholder briefings each spring.",
    },
  ],
  recentAwards: [
    {
      name: "MEPRA — Young Communicator of the Year (Rebecca Rego)",
      year: 2024,
      category: "Individual",
    },
  ],
  notableMoves: [
    {
      type: "hire",
      description:
        "Omar Qirem rejoined Edelman as CEO of the Middle East, having previously led Edelman Saudi Arabia between 2012 and 2016.",
      date: "2022-01-01",
      source:
        "https://www.consultancy-me.com/news/1052/omar-qirem-rejoins-edelman-in-emirates-as-new-ceo-for-middle-east",
    },
    {
      type: "hire",
      description:
        "Signed an MoU with the Abu Dhabi Businesswomen Council to support Emirati female entrepreneurs, alongside a parallel MoU with the Dubai Businesswomen Council.",
      date: "2024-06-01",
      source: "https://www.edelman.com/ae",
    },
    {
      type: "office_open",
      description:
        "Continued investment in Riyadh and Abu Dhabi offices as the firm doubled down on its regional headquarters posture — the only international communications firm with its MENA HQ in Abu Dhabi, not Dubai.",
      date: "2024-01-01",
    },
  ],
  website: "https://www.edelman.com/ae",
  linkedin: "https://www.linkedin.com/company/edelman",
  editorialNote: `Edelman is the largest independent PR firm in the world and the only international communications firm to put its regional headquarters in Abu Dhabi rather than Dubai — a choice that reflects, and reinforces, its relationships with UAE federal and Abu Dhabi government stakeholders. The firm runs wholly-owned offices in Abu Dhabi, Dubai and Riyadh, supported by a network of nine affiliates across the broader region, and counts more than two hundred professionals in the regional bench.

Independence matters here. Edelman is not part of a holding-company roster, so the firm can sign accounts that would conflict inside WPP, Omnicom, IPG or Publicis. For mandates with cross-holding-company sensitivities, that is a real advantage. The annual Trust Barometer — the firm's proprietary global research — gives the team a reliable, press-friendly hook each spring, and the MENA cut of the study has earned a place in regional stakeholder briefings on its own merits.

Omar Qirem returned to lead the region in 2022 after an earlier stint running Saudi Arabia for the firm. Under his tenure the visible work has tilted toward heavyweight government and corporate mandates — COP28 strategic communications and media relations being the most consequential, followed by DP World's _Move to Minus 15_ industry-coalition campaign and a pair of MoUs supporting the Abu Dhabi and Dubai Businesswomen Councils.

The 2024 MEPRA Awards delivered a strong individual win in Young Communicator of the Year for Rebecca Rego. Where Edelman does not always lead in the Gulf: pure consumer brand work and influencer programs, which sit closer to network advertising agencies in the regional ecosystem. Where it does: anything that requires a senior, government-credentialed bench with an independent reputation behind it.`,
  sources: [
    {
      label: "Omar Qirem rejoins Edelman as CEO Middle East",
      url: "https://www.consultancy-me.com/news/1052/omar-qirem-rejoins-edelman-in-emirates-as-new-ceo-for-middle-east",
    },
    {
      label: "Edelman Middle East",
      url: "https://www.edelman.com/ae",
    },
    {
      label: "Edelman — US-UAE Business Council member spotlight 2025",
      url: "https://usuaebusiness.org/wp-content/uploads/2025/02/MemberSpotlight_Edelman_Web.pdf",
    },
    {
      label: "MEPRA Awards 2024 winners",
      url: "https://www.mepra.org/wp-content/uploads/2024/11/2024-MEPRA-AWARDS-Winners.pdf",
    },
  ],
  lastUpdated: "2026-05-12",
  featured: true,
};
