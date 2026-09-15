import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Discover } from '@/components/discover';
import { getProducts } from '@/lib/db';
export const metadata={title:'My collection'};
export default async function Collection(){
  const counts:Record<string,number>={};
  for(const p of await getProducts())counts[p.ingredient_slug]=(counts[p.ingredient_slug]||0)+1;
  return <main id="main" className="wrap collection-page"><div className="collection-explorer-link"><div><strong>Bring your collection to life.</strong><p>Follow your saved supplements through the body and rediscover their connections.</p></div><Link className="button" href="/?view=collection">Explore on the body <ArrowUpRight size={17}/></Link></div><Discover counts={counts} collection/></main>;
}
