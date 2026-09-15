import { Suspense } from 'react';
import { ExplorerEntry } from '@/components/query-entry';
import { Discover } from '@/components/discover';
import { getProducts } from '@/lib/db';

export default async function Home() {
  const products = await getProducts();
  const counts: Record<string, number> = {};
  for (const product of products) counts[product.ingredient_slug] = (counts[product.ingredient_slug] || 0) + 1;
  return <main id="main"><Suspense fallback={<p className="wrap section-intro">Opening the collection…</p>}><ExplorerEntry/></Suspense><div className="wrap explore-catalogue"><Discover counts={counts}/></div></main>;
}
