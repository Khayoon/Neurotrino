import Link from 'next/link';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import type { Ingredient } from '@/lib/types';
import { SupplementArt } from './art';
import { CollectButton } from './collection-button';
export function IngredientCard({ingredient,productCount}:{ingredient:Ingredient;productCount:number}) {
  return <article className={`ingredient-card theme-${ingredient.theme}`}>
    <div className="card-art-panel"><span className="card-number">FIELD NOTE / {ingredient.number}</span><CollectButton compact id={ingredient.slug} name={ingredient.name}/><Link href={`/supplements/${ingredient.slug}`} className="art-link" aria-label={`Explore ${ingredient.name}`}><SupplementArt slug={ingredient.slug}/></Link><span className="specimen-symbol">{ingredient.symbol}</span><span className="card-category">{ingredient.category}</span></div>
    <div className="card-copy"><div className="card-title-row"><h3><Link href={`/supplements/${ingredient.slug}`}>{ingredient.name}</Link></h3><Link className="card-arrow" href={`/supplements/${ingredient.slug}`} aria-label={`${ingredient.name} field guide`}><ArrowUpRight size={21}/></Link></div><p className="card-subtitle">{ingredient.subtitle}</p><p className="card-tidbit">{ingredient.tidbit}</p><div className="card-tags">{ingredient.tags.slice(0,2).map(tag=><span key={tag}>{tag}</span>)}</div><Link className="card-evidence-link" href={`/supplements/${ingredient.slug}${productCount ? "#brands" : ""}`}><BookOpen size={14}/>{productCount ? `${productCount} product${productCount===1?'':'s'} to explore` : ingredient.kind === 'research' ? 'Explore the research' : 'Read the field note'}<span>→</span></Link></div>
  </article>;
}
