import type { Agency } from "./types";

export const actionGlobal: Agency = {
  slug: "action-global",
  name: "Action Global Communications",
  parentCompany: "Independent",
  founded: 1971,
  headquarters: "Nicosia, Cyprus (MENA hub: Dubai)",
  regionalOffices: ["Dubai", "Abu Dhabi"],
  leadership: [
    { role: "Managing Director, UAE", name: "Camilla d'Abo", appointedYear: 2025 },
  ],
  headcountEstimate: {
    range: "50-100",
    asOf: "2025-09-01",
    source: "Action UAE: 40+ staff per agency public statement",
  },
  practiceAreas: [
    "Consumer",
    "Corporate",
    "Hospitality",
    "Digital",
    "Influencer",
    "Reputation",
  ],
  knownClients: [
    {
      name: "Globe Soccer",
      sector: "Sport",
      publiclyAnnounced: true,
      source:
        "https://campaignme.com/action-retains-globe-soccer-and-dubai-duty-free-tennis/",
    },
    {
      name: "Dubai Duty Free Tennis Championships",
      sector: "Sport",
      publiclyAnnounced: true,
      source:
        "https://campaignme.com/action-retains-globe-soccer-and-dubai-duty-free-tennis/",
    },
  ],
  signatureCampaigns: [],
  recentAwards: [
    {
      name: "PR Week Global Awards — Best Agency Middle East",
      year: 2024,
      category: "Regional",
    },
  ],
  notableMoves: [
    {
      type: "hire",
      description:
        "Camilla d'Abo appointed Managing Director of Action UAE.",
      date: "2025-09-01",
      source:
        "https://prca.mena.global/action-global-communications-names-camilla-dabo-as-new-uae-managing-director/",
    },
  ],
  website: "https://actionprgroup.com/location/action-uae/",
  editorialNote: `Action Global is a Cyprus-headquartered independent network founded in 1971, with a substantial MENA presence run out of Dubai and Abu Dhabi. The UAE operation runs around forty staff and has built a steady book in sport, hospitality, education and tourism — the categories where regional brands invest most consistently in earned media.

The firm picked up PR Week's Best Agency Middle East at the 2024 Global Awards and has been visible on long-running sports accounts including Globe Soccer and the Dubai Duty Free Tennis Championships. Camilla d'Abo took over the UAE managing director role in September 2025.`,
  sources: [
    {
      label: "Action UAE",
      url: "https://actionprgroup.com/location/action-uae/",
    },
    {
      label: "Camilla d'Abo appointed UAE MD",
      url: "https://prca.mena.global/action-global-communications-names-camilla-dabo-as-new-uae-managing-director/",
    },
  ],
  lastUpdated: "2026-05-11",
};
