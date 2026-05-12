import type { Agency } from "./types";

export const burson: Agency = {
  slug: "burson",
  name: "Burson",
  legalName: "Burson Global",
  parentCompany: "WPP",
  parentSlug: "wpp",
  founded: 2024,
  foundedGlobal: 2024,
  headquarters: "Dubai, UAE",
  regionalOffices: ["Dubai", "Abu Dhabi", "Riyadh", "Doha", "Manama"],
  leadership: [
    {
      role: "CEO, Middle East, North Africa & Turkey",
      name: "Fouad Bou Mansour",
      appointedYear: 2025,
    },
    {
      role: "Chief Client Officer, MENA",
      name: "Sana Ali Khan",
      appointedYear: 2025,
    },
    {
      role: "Head of Burson Dubai",
      name: "Claire Lawson",
      appointedYear: 2025,
    },
    {
      role: "CEO, EMEAx (incl. Middle East, India, Africa)",
      name: "Bashar AlKadhi",
    },
  ],
  headcountEstimate: {
    range: "250+",
    asOf: "2024-07-01",
    source:
      "WPP merger announcement: 6,000+ Burson employees globally across 43 markets",
  },
  practiceAreas: [
    "Corporate",
    "Public Affairs",
    "Crisis",
    "Reputation",
    "Healthcare",
    "Technology",
    "Financial",
    "Government",
  ],
  practiceMix: [
    { practice: "Corporate", percentage: 30 },
    { practice: "Public Affairs", percentage: 20 },
    { practice: "Crisis", percentage: 15 },
    { practice: "Healthcare", percentage: 10 },
    { practice: "Technology", percentage: 10 },
    { practice: "Financial", percentage: 10 },
    { practice: "Reputation", percentage: 5 },
  ],
  knownClients: [
    { name: "Mastercard", sector: "Financial Services", publiclyAnnounced: true },
    { name: "Reckitt", sector: "Consumer Goods", publiclyAnnounced: true },
    { name: "Heineken", sector: "Consumer Goods", publiclyAnnounced: true },
  ],
  signatureCampaigns: [
    {
      title: "I Care",
      client: "Government communications mandate",
      year: 2024,
      summary:
        "Won Gold at the MEPRA Awards 2024 for Best Government Communications and Public Affairs Campaign — one of the most contested categories in the regional cycle.",
      awards: ["MEPRA Gold 2024 — Best Government Communications and Public Affairs"],
    },
  ],
  recentAwards: [
    {
      name: "MEPRA — Best Government Communications and Public Affairs (Gold)",
      year: 2024,
      category: "Government / Public Affairs",
    },
    {
      name: "MEPRA — Best Communicator of the Year (Iman Isa)",
      year: 2024,
      category: "Individual",
    },
  ],
  notableMoves: [
    {
      type: "acquisition",
      description:
        "Created by the merger of BCW and Hill & Knowlton, operational from July 1, 2024. Globally the largest PR network by revenue ($1.3bn), ahead of Edelman.",
      date: "2024-07-01",
      source:
        "https://www.wpp.com/en/news/2024/01/wpp-unites-bcw-and-hill-knowlton-to-create-burson",
    },
    {
      type: "hire",
      description:
        "Fouad Bou Mansour joined as MENAT CEO, coming from the Saudi Tourism Authority where he was VP Creative Studio, and prior to that COO of Impact BBDO Group UAE.",
      date: "2025-09-01",
      source:
        "https://www.bursonglobal.com/newsroom/emea/fouad-bou-mansour-to-join-burson-as-ceo-for-middle-east-north-africa-and-turkey",
    },
    {
      type: "hire",
      description:
        "Sana Ali Khan appointed Chief Client Officer MENA (from Amazon, where she led Policy and Crisis Communications for MEA and Turkey). Claire Lawson named Head of Burson Dubai, joining from a fifteen-year run across Impact Porter Novelli, Edelman, APCO and Text100.",
      date: "2025-05-01",
      source:
        "https://campaignme.com/burson-appoints-sana-ali-khan-and-claire-lawson-to-senior-leadership-roles/",
    },
  ],
  website: "https://www.bursonglobal.com/locations/mena",
  linkedin: "https://www.linkedin.com/company/burson-global",
  editorialNote: `Burson is the post-merger WPP PR network — formed in July 2024 by combining BCW and Hill & Knowlton into a single global firm of around six thousand staff across forty-three markets. In the Gulf, it now houses what were the regional operations of two of the four largest networks, plus the long-standing Asda'a brand that BCW had absorbed in 2008.

The proposition is scale. Burson can field a healthcare specialist out of New York, a public affairs lead out of Brussels, and an Arabic-language crisis team out of Riyadh on the same mandate. For corporate and sovereign clients running multi-market programs, that integrated bench is the case for hiring the network over a boutique. The 2024 MEPRA Awards already produced confirmation that the integrated team can win the work — Gold in the Best Government Communications and Public Affairs category, plus Best Communicator of the Year for Iman Isa.

Two things to watch. First, the cultural absorption of Asda'a's research-led, Gulf-native posture into a larger international PR brand — Asda'a's franchise was built on local trust, and that does not survive automatic centralization. Second, the Hill & Knowlton sub-brand persists for clients where conflicts require a wall, which gives Burson rare latitude to staff competing accounts.

The September 2025 hire of Fouad Bou Mansour as MENAT CEO signals the next chapter. Bou Mansour comes from the Saudi Tourism Authority by way of Impact BBDO Group UAE — a sovereign-and-network double background, which is the right CV for a region where the largest mandates increasingly involve both. Sana Ali Khan and Claire Lawson, also brought in during 2025, give Burson Dubai a client-services and account-leadership bench it had been visibly rebuilding since the merger.`,
  sources: [
    {
      label: "WPP unites BCW and Hill & Knowlton to create Burson",
      url: "https://www.wpp.com/en/news/2024/01/wpp-unites-bcw-and-hill-knowlton-to-create-burson",
    },
    {
      label: "Burson MENA location",
      url: "https://www.bursonglobal.com/locations/mena",
    },
    {
      label: "Fouad Bou Mansour MENAT CEO appointment",
      url: "https://www.bursonglobal.com/newsroom/emea/fouad-bou-mansour-to-join-burson-as-ceo-for-middle-east-north-africa-and-turkey",
    },
    {
      label: "Sana Ali Khan and Claire Lawson appointments — Campaign Middle East",
      url: "https://campaignme.com/burson-appoints-sana-ali-khan-and-claire-lawson-to-senior-leadership-roles/",
    },
    {
      label: "MEPRA Awards 2024 winners",
      url: "https://www.mepra.org/wp-content/uploads/2024/11/2024-MEPRA-AWARDS-Winners.pdf",
    },
  ],
  lastUpdated: "2026-05-12",
  featured: true,
};
