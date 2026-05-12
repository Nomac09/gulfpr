import type { Agency } from "./types";

export const weberShandwick: Agency = {
  slug: "weber-shandwick",
  name: "Weber Shandwick",
  legalName: "Weber Shandwick MENAT",
  parentCompany: "IPG",
  parentSlug: "ipg",
  headquarters: "Dubai, UAE",
  regionalOffices: [
    "Dubai",
    "Abu Dhabi",
    "Riyadh",
    "Jeddah",
    "Doha",
    "Manama",
    "Kuwait City",
    "Cairo",
  ],
  leadership: [
    { role: "CEO, MENAT", name: "Ziad Hasbani" },
    { role: "Head of Dubai & Abu Dhabi", name: "Ghaleb Zeidan" },
  ],
  headcountEstimate: {
    range: "100-250",
    asOf: "2025-01-01",
    source: "12 offices and affiliates across 11 markets per agency profile",
  },
  practiceAreas: [
    "Corporate",
    "Consumer",
    "Public Affairs",
    "Government",
    "Financial",
    "Reputation",
    "Healthcare",
    "Technology",
    "Crisis",
  ],
  practiceMix: [
    { practice: "Corporate", percentage: 30 },
    { practice: "Consumer", percentage: 20 },
    { practice: "Government", percentage: 15 },
    { practice: "Financial", percentage: 10 },
    { practice: "Public Affairs", percentage: 10 },
    { practice: "Crisis", percentage: 8 },
    { practice: "Healthcare", percentage: 7 },
  ],
  knownClients: [
    {
      name: "Snap Inc.",
      sector: "Technology / Platforms",
      publiclyAnnounced: true,
    },
    {
      name: "Careem Kuwait",
      sector: "Mobility / Technology",
      publiclyAnnounced: true,
    },
  ],
  signatureCampaigns: [
    {
      title: "TASAWAR — Taking the Runway",
      client: "Snap Inc.",
      year: 2024,
      summary:
        "Integrated campaign tying Snapchat's AR try-on technology to a regional fashion narrative. Won double Gold at the 2024 MEPRA Awards in Best Fashion Campaign and Best Technology Campaign — categories rarely won by the same piece of work.",
      awards: [
        "MEPRA Gold 2024 — Best Fashion Campaign",
        "MEPRA Gold 2024 — Best Technology Campaign",
      ],
    },
    {
      title: "Careem Kuwait Consumer Services",
      client: "Careem Kuwait",
      year: 2024,
      summary:
        "Consumer services campaign for the regional ride-hailing platform's Kuwait operation, recognized at MEPRA 2024 with Gold in Best Consumer Services Campaign.",
      awards: ["MEPRA Gold 2024 — Best Consumer Services Campaign"],
    },
  ],
  recentAwards: [
    {
      name: "MEPRA Awards 2024 — 16 total wins (third-highest agency count)",
      year: 2024,
      category: "Agency total",
    },
    {
      name: "MEPRA — Best Fashion Campaign (Gold)",
      year: 2024,
      category: "Consumer / Fashion",
    },
    {
      name: "MEPRA — Best Technology Campaign (Gold)",
      year: 2024,
      category: "Technology",
    },
    {
      name: "MEPRA — Best Consumer Services Campaign (Gold)",
      year: 2024,
      category: "Consumer",
    },
    {
      name: "EMEA SABRE Awards — Middle East Consultancy of the Year",
      year: 2023,
      category: "Regional",
    },
    {
      name: "MEPRA — Agency of the Year",
      year: 2023,
      category: "Agency",
    },
  ],
  notableMoves: [
    {
      type: "office_open",
      description:
        "Returned as MEPRA Awards Diamond Partner for a third consecutive year — the highest sponsorship tier, signalling continued institutional investment in the regional awards ecosystem.",
      date: "2024-09-01",
    },
  ],
  website: "https://webershandwickmenat.com",
  linkedin: "https://www.linkedin.com/company/weber-shandwick",
  editorialNote: `Weber Shandwick MENAT — the regional brand stretches the acronym to include Turkey — is IPG's principal PR network in the Gulf. The agency runs out of Dubai under Ziad Hasbani, with Ghaleb Zeidan heading the UAE offices, and reaches twelve offices and affiliates across eleven markets in the wider region.

The shop has earned its standing in the regional awards cycle and then defended it. The EMEA SABRE Middle East Consultancy of the Year and the MEPRA Agency of the Year sat on the shelf going into 2024, and the firm followed up with sixteen MEPRA wins that year — the third-highest agency count, behind only Memac Ogilvy and Gambit Communications. The TASAWAR work for Snap Inc. took the rare double of Best Fashion and Best Technology Gold, and Careem Kuwait took Best Consumer Services Gold.

Hasbani has also been publicly recognized for what he has done with the bench. He was named Best PR Professional in the Middle East at the PR Week Global Awards, and the firm has been the Diamond Partner of the MEPRA Awards for three consecutive years — the highest institutional sponsorship rung in regional PR.

Where Weber Shandwick tends to be considered alongside the WPP shops: large multi-market corporate mandates, financial communications, integrated reputation programs, and the kind of consumer-meets-technology brief that the TASAWAR work modeled. The roster mixes platform clients (Snap, Careem) with the broader corporate and financial bench typical of the network.`,
  sources: [
    {
      label: "Weber Shandwick MENA leadership structure",
      url: "https://campaignme.com/weber-shandwick-mena-new-leadership-structure/",
    },
    {
      label: "Weber Shandwick MENAT — official site",
      url: "https://webershandwickmenat.com",
    },
    {
      label: "MEPRA Awards 2024 winners",
      url: "https://www.mepra.org/wp-content/uploads/2024/11/2024-MEPRA-AWARDS-Winners.pdf",
    },
    {
      label: "Memac Ogilvy, Gambit, Weber Shandwick take home 2024 MEPRA Awards — PR Week",
      url: "https://www.prweek.co.uk/article/1898174/memac-ogilvy-gambit-weber-shandwick-home-2024-mepra-awards",
    },
  ],
  lastUpdated: "2026-05-12",
  featured: true,
};
