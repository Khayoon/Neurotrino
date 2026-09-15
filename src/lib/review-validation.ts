import { z } from 'zod';
export const evidenceInput=z.object({
  kind:z.enum(['licence','testing','manufacturing','recalls','transparency']),verdict:z.enum(['verified','concern','unknown']),
  summary:z.string().trim().min(30).max(2500),source_url:z.url().refine(url=>new URL(url).protocol==='https:','Use an HTTPS source'),
  source_title:z.string().trim().min(5).max(200),publisher:z.string().trim().min(2).max(150),scope:z.string().trim().min(15).max(1000),
  checked_at:z.iso.datetime().refine(value=>Date.parse(value)<=Date.now()+1000,'Review date cannot be in the future'),
  revision:z.number().int().min(0),attested:z.literal(true),
});
