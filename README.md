# Gulf PR Atlas

**An open reference for the Gulf communications industry.** Live at [gulfpr.org](https://gulfpr.org).

Profiles of 20 PR agencies operating in the Gulf and the holding companies that own them, with maps of their offices, a network graph of ownership, a practice-area heatmap and distribution charts. Editorial rule: nothing is published without a source, and every fact links to it. Content is licensed CC BY 4.0.

## Stack

- **Next.js 16** (App Router, static generation), **React 19**, **TypeScript**
- **D3** for the maps, the holding-company network graph, the practice heatmap and the distribution charts
- **Motion** for transitions, **Tailwind CSS**
- Deployed on **Vercel**

## How it is built

- **Content as typed data.** Each agency and holding company is a TypeScript module in `content/` with a shared type, so a missing field or a broken relationship fails the build instead of shipping. Pages are generated from these files at build time.
- **Aggregations in one place.** `lib/aggregations.ts` derives the network and heatmap data from the content, so the maps and charts can never disagree with the profiles.
- **Charts as client components.** The D3 visualisations run in the browser on top of statically generated pages.
- **Roadmap in the navigation.** Sections not yet published (campaigns, media, practice, career) are listed as "soon" from a single config in `lib/site.ts`.

## Running it

```bash
pnpm install
pnpm dev
```

---

*Référentiel ouvert sur les agences de relations publiques du Golfe : profils sourcés, graphe de réseau des groupes propriétaires et heatmap des expertises, en Next.js, TypeScript et D3.*

Edited and built by **Nasim Sawalma** · [GitHub](https://github.com/Nomac09) · [LinkedIn](https://www.linkedin.com/in/nasim-sawalma)
