export type EvidenceKind = 'licence' | 'testing' | 'manufacturing' | 'recalls' | 'transparency';
export type Verdict = 'verified' | 'concern' | 'unknown';
export interface Evidence {
  id: string; product_id: string; kind: EvidenceKind; verdict: Verdict;
  summary: string; source_url: string; source_title: string; publisher: string;
  scope: string; checked_at: string; expires_at: string; revision: number;
}
export interface Product {
  id: string; slug: string; name: string; brand_id: string; brand: string;
  ingredient_slug: string; npn: string; form: string; licence_holder: string;
  licence_date: string; licence_status: string; checked_at: string;
  manufacturer_url: string; aliases: string[];
  medicinal: Record<string, unknown>[]; purposes: string[]; risks: string[];
  evidence: Evidence[];
}
export interface Source { title: string; publisher: string; url: string }
export interface Ingredient {
  kind?: 'supplement' | 'research';
  slug: string; name: string; subtitle: string; number: string; category: string;
  theme: string; symbol: string; tags: string[]; tidbit: string; summary: string;
  role: string; limitation: string; caution: string;
  facts: { title: string; body: string; source: number }[];
  sources: Source[];
}
export interface Snapshot {
  npn: string; ingredient: string; brand: string; manufacturerUrl: string;
  sourceUrl: string; checkedAt: string;
  licence: { lnhpd_id: number; licence_number: string; product_name: string; company_name: string; licence_date: string; dosage_form: string; flag_product_status: number };
  aliases: string[];
  medicinalingredient: unknown; productpurpose: unknown; productrisk: unknown; productdose: unknown;
}
