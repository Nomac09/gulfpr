import type { Agency } from "./types";

export const teneo: Agency = {
  slug: "teneo",
  name: "Teneo",
  parentCompany: "Independent",
  headquarters: "Dubai, UAE",
  regionalOffices: ["Dubai", "Abu Dhabi", "Riyadh", "Doha"],
  leadership: [
    {
      role: "Senior Managing Director, Head of Middle East (Strategy & Communications)",
      name: "Nicholas McDonagh",
    },
    {
      role: "Co-Head, Financial Advisory MENA",
      name: "Matthew Wilde",
    },
    {
      role: "Co-Head, Financial Advisory MENA",
      name: "Elie Fakhoury",
    },
    {
      role: "Head, Management Consulting MENA",
      name: "Tim Peters",
    },
    {
      role: "Managing Director, Dubai (Strategy & Communications)",
      name: "Lester Posner",
    },
  ],
  headcountEstimate: {
    range: "100-250",
    asOf: "2025-01-01",
    source: "Agency public statement: 130+ employees across MENA",
  },
  practiceAreas: [
    "Strategic Communications",
    "Financial",
    "Corporate",
    "Crisis",
    "Investor Relations",
    "Public Affairs",
    "Reputation",
  ],
  practiceMix: [
    { practice: "Strategic Communications", percentage: 30 },
    { practice: "Financial", percentage: 25 },
    { practice: "Corporate", percentage: 15 },
    { practice: "Investor Relations", percentage: 10 },
    { practice: "Crisis", percentage: 10 },
    { practice: "Public Affairs", percentage: 10 },
  ],
  knownClients: [],
  signatureCampaigns: [],
  recentAwards: [],
  notableMoves: [
    {
      type: "office_open",
      description:
        "Opened additional Abu Dhabi office at ADGM, expanding MENA footprint to four offices across the region.",
      date: "2023-01-01",
      source:
        "https://www.adgm.com/media/announcements/teneo-expands-mena-footprint-with-additional-new-office-in-abu-dhabis-adgm",
    },
    {
      type: "office_open",
      description:
        "Launched a Capital Projects & Infrastructure advisory business in the Middle East, hiring Stelios Thrasyvoulou as senior managing director.",
      date: "2024-01-01",
      source:
        "https://www.teneo.com/news/press-releases/teneo-launches-capital-projects-infrastructure-business-in-the-middle-east/",
    },
    {
      type: "hire",
      description:
        "Tim Peters joined to lead the regional Management Consulting business, having previously held leadership roles at Arthur D. Little, Kearney and Oliver Wyman.",
      date: "2024-01-01",
    },
    {
      type: "hire",
      description:
        "Lester Posner appointed Managing Director in the Strategy & Communications practice, based in Dubai.",
      date: "2024-06-01",
      source:
        "https://www.consultancy-me.com/news/6892/lester-posner-joins-teneos-strategic-communications-practice",
    },
  ],
  website: "https://www.teneo.com/middle-east/",
  linkedin: "https://www.linkedin.com/company/teneo",
  editorialNote: `Teneo is a global CEO advisory and strategic communications firm that has been steadily building its Gulf bench, structured as an integrated practice across communications, management consulting, financial advisory, capital projects and risk advisory rather than as a pure-play PR shop. Nicholas McDonagh, who previously ran Finsbury's MEA business, leads the regional strategy and communications operation from Dubai.

The firm now has more than 130 employees across four MENA offices — Dubai, Abu Dhabi, Riyadh and Doha — and operates in the same advisory tier as Brunswick: high-end, partner-led, financially-literate work for boards and CEOs. The Abu Dhabi office sits at ADGM, the regional financial centre that has anchored a wave of advisory build-out since 2023.

The 2024 expansions are worth flagging. Teneo launched a Capital Projects & Infrastructure advisory business under Stelios Thrasyvoulou, a category that maps to the region's giga-project pipeline (NEOM, Red Sea, Diriyah and the rest). Tim Peters joined to lead management consulting after senior roles at Arthur D. Little, Kearney and Oliver Wyman, and Lester Posner joined Dubai-based strategy and communications as a managing director.

For working PR professionals, Teneo's regional presence shows up most often on transaction communications, financial reporting briefs, and the kinds of crisis assignments that come through CEO and chair relationships rather than through marketing departments. The capital projects and management consulting verticals widen the conversations the firm can have with the same clients, which is the strategic case for the integrated model.`,
  sources: [
    {
      label: "Teneo Middle East & Africa",
      url: "https://www.teneo.com/office-region/middle-east-africa/",
    },
    {
      label: "Teneo expands MENA footprint to ADGM",
      url: "https://www.adgm.com/media/announcements/teneo-expands-mena-footprint-with-additional-new-office-in-abu-dhabis-adgm",
    },
    {
      label: "Teneo launches Capital Projects & Infrastructure in Middle East",
      url: "https://www.teneo.com/news/press-releases/teneo-launches-capital-projects-infrastructure-business-in-the-middle-east/",
    },
    {
      label: "Lester Posner joins Teneo — Consultancy ME",
      url: "https://www.consultancy-me.com/news/6892/lester-posner-joins-teneos-strategic-communications-practice",
    },
  ],
  lastUpdated: "2026-05-12",
};
