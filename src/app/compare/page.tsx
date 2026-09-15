import { Suspense } from 'react';
import { ComparisonEntry } from '@/components/query-entry';
import { getProducts } from '@/lib/db';
export const metadata={title:'Compare product evidence'};
export default async function Compare(){return <main id="main" className="wrap directory-page"><div className="page-heading"><span className="eyebrow">SIDE BY SIDE, SOURCE BY SOURCE</span><h1>A clearer <em>comparison.</em></h1><p>See the checks behind each product. A number matters more when you can see where it came from.</p></div><Suspense fallback={<p>Loading your comparison…</p>}><ComparisonEntry products={await getProducts()}/></Suspense></main>;}
