import type { Agency } from "./types";

export const currentGlobal: Agency = {
  slug: "current-global",
  name: "Current Global",
  legalName: "Current Global MENAT",
  parentCompany: "IPG",
  parentSlug: "ipg",
  headquarters: "Dubai, UAE",
  regionalOffices: ["Dubai"],
  leadership: [
    { role: "Managing Director, MENAT", name: "Peter Jacob" },
    { role: "Senior Director", name: "Sinead O'Connor" },
    {
      role: "Director, Client Experiences",
      name: "Jacquelyn Moulds",
      appointedYear: 2026,
    },
  ],
  practiceAreas: [
    "Consumer",
    "Corporate",
    "Healthcare",
    "Reputation",
    "Digital",
    "Influencer",
    "Hospitality",
  ],
  practiceMix: [
    { practice: "Consumer", percentage: 35 },
    { practice: "Digital", percentage: 20 },
    { practice: "Corporate", percentage: 15 },
    { practice: "Hospitality", percentage: 10 },
    { practice: "Influencer", percentage: 10 },
    { practice: "Healthcare", percentage: 10 },
  ],
  knownClients: [
    { name: "Dubai Airports", sector: "Aviation / Government", publiclyAnnounced: true },
    { name: "OSN", sector: "Media / Entertainment", publiclyAnnounced: true },
    { name: "ŌURA", sector: "Consumer Health Tech", publiclyAnnounced: true },
    { name: "Global Village", sector: "Tourism / Events", publiclyAnnounced: true },
    { name: "Heinz Arabia", sector: "Consumer Goods", publiclyAnnounced: true },
    { name: "Uber", sector: "Mobility", publiclyAnnounced: true },
    { name: "Puck", sector: "Consumer Goods", publiclyAnnounced: true },
    { name: "New Balance", sector: "Consumer / Apparel", publiclyAnnounced: true },
    { name: "Dubai Tourism", sector: "Government / Tourism", publiclyAnnounced: true },
    { name: "Riyadh Air", sector: "Aviation", publiclyAnnounced: true },
    { name: "Dubai Holding Entertainment", sector: "Entertainment", publiclyAnnounced: true },
    { name: "Al Habtoor Motors", sector: "Automotive", publiclyAnnounced: true },
  ],
  signatureCampaigns: [
    {
      title: "Best Use of Social Media — MEPRA 2024 Gold",
      client: "Current Global MENAT and MullenLowe",
      year: 2024,
      summary:
        "Joint campaign with sister IPG agency MullenLowe that took MEPRA Gold in Best Use of Social Media — a category that tests integration between PR, social and creative.",
      awards: ["MEPRA Gold 2024 — Best Use of Social Media"],
    },
    {
      title: "Best Integrated Campaign — MEPRA 2024 Gold",
      client: "Current Global MENAT and FP7",
      year: 2024,
      summary:
        "Integrated campaign with FP7 that won MEPRA Gold in Best Integrated Campaign — recognition for cross-discipline planning and execution.",
      awards: ["MEPRA Gold 2024 — Best Integrated Campaign"],
    },
  ],
  recentAwards: [
    { name: "MEPRA — Best Use of Social Media (Gold)", year: 2024, category: "Digital" },
    { name: "MEPRA — Best Integrated Campaign (Gold)", year: 2024, category: "Integrated" },
    {
      name: "Agency of the Year — MEPRA, PRCA MENA, PRAXIS MENA (x2), PR Week Global, PRCA Platinum",
      year: 2024,
      category: "Agency",
    },
    {
      name: "Great Place to Work Middle East 2024–2025",
      year: 2024,
      category: "Workplace",
    },
  ],
  notableMoves: [
    {
      type: "hire",
      description:
        "Jacquelyn Moulds appointed Director for Client Experiences, bringing nearly two decades of integrated communications and agency leadership.",
      date: "2026-04-01",
      source:
        "https://campaignme.com/current-global-menat-appoints-jacquelyn-moulds-as-director-for-client-experiences/",
    },
    {
      type: "hire",
      description:
        "Dubai Airports appointed Current Global as retained PR agency — a category-defining win in regional aviation comms.",
      date: "2023-09-01",
      source:
        "https://www.zawya.com/en/press-release/companies-news/dubai-airports-appoints-current-global-as-retained-pr-agency-hlgsqwfj",
    },
  ],
  website: "https://currentglobal.com",
  linkedin: "https://www.linkedin.com/company/current-global",
  editorialNote: `Current Global is the IPG PR brand that emerged from the rebranding and refocusing of Cohn & Wolfe's regional inheritance. In the Gulf it operates as Current Global MENAT under managing director Peter Jacob, with the Dubai office anchoring an agency that has visibly outperformed expectations for an IPG second-tier shop.

The 2024 awards run was the proof. The firm took two MEPRA Golds — Best Use of Social Media (with sister IPG agency MullenLowe) and Best Integrated Campaign (with FP7) — and accumulated more than thirty-five industry awards in twelve months. It also pulled a rare combination of Agency of the Year titles from MEPRA, PRCA MENA, PRAXIS MENA (twice), PR Week Global and PRCA Platinum, on top of a Great Place to Work Middle East certification.

The client roster is one of the more visible in the regional independent-sized shops: Dubai Airports, Dubai Tourism, Global Village and Dubai Holding Entertainment on the government and tourism side; OSN and Riyadh Air in media and aviation; ŌURA, Heinz, Uber, New Balance and Puck on the consumer side; plus Al Habtoor Motors in automotive. The Dubai Airports retainer is the kind of long-cycle category-defining win that anchors a Gulf book.

What sets Current Global apart inside IPG: a tight Dubai bench that punches at consumer brand and integrated work in a way that bigger sister Weber Shandwick — playing corporate and financial — does not chase. Peter Jacob's team and the senior bench around him have built the agency into a credible MENA player rather than a regional satellite.`,
  sources: [
    {
      label: "Current Global MENAT — Campaign Middle East",
      url: "https://campaignme.com/agency/current-global-menat/",
    },
    {
      label: "Dubai Airports appoints Current Global",
      url: "https://www.zawya.com/en/press-release/companies-news/dubai-airports-appoints-current-global-as-retained-pr-agency-hlgsqwfj",
    },
    {
      label: "Jacquelyn Moulds appointment",
      url: "https://campaignme.com/current-global-menat-appoints-jacquelyn-moulds-as-director-for-client-experiences/",
    },
    {
      label: "MEPRA Awards 2024 winners",
      url: "https://www.mepra.org/wp-content/uploads/2024/11/2024-MEPRA-AWARDS-Winners.pdf",
    },
  ],
  lastUpdated: "2026-05-12",
  featured: true,
};
