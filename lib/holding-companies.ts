import type {
  HoldingCompany,
  HoldingCompanySlug,
} from "@/content/holding-companies/types";
import { wpp } from "@/content/holding-companies/wpp";
import { omnicom } from "@/content/holding-companies/omnicom";
import { ipg } from "@/content/holding-companies/ipg";
import { publicis } from "@/content/holding-companies/publicis";

const HOLDING_COMPANIES: HoldingCompany[] = [wpp, omnicom, ipg, publicis];

export function getAllHoldingCompanies(): HoldingCompany[] {
  return HOLDING_COMPANIES;
}

export function getHoldingCompanyBySlug(
  slug: string
): HoldingCompany | undefined {
  return HOLDING_COMPANIES.find((h) => h.slug === slug);
}

export const HOLDING_SLUGS: HoldingCompanySlug[] = HOLDING_COMPANIES.map(
  (h) => h.slug
);
