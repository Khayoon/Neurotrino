'use client';
import Link from 'next/link';
import { useEvidenceTime } from './providers';
import { useState } from 'react';
import { Search, ArrowUpRight, ShieldCheck, CircleHelp, AlertTriangle } from 'lucide-react';
import { ingredients } from '@/data/ingredients';
import type { Product } from '@/lib/types';
import { evaluateEvidence, formatDate } from '@/lib/rating';
import { CompareButton } from './collection-button';
export function EvidenceBadge({product}:{product:Product}) {
  const now=useEvidenceTime();
  const rating=evaluateEvidence(product.evidence,now);
  return <span className={`evidence-badge ${rating.blocked?'concern':''}`}>{rating.blocked?<AlertTriangle size={14}/>:rating.complete?<ShieldCheck size={14}/>:<CircleHelp size={14}/>} {rating.label}</span>;
}
export function ProductBrowser({products,compact=false}:{products:Product[];compact?:boolean}) {
  const now=useEvidenceTime();
  const [query,setQuery]=useState('');const [ingredient,setIngredient]=useState('all');const [sort,setSort]=useState('brand');const [status,setStatus]=useState('all');
  const shown=products.filter(p=>{
    const rating=evaluateEvidence(p.evidence,now);
    return `${p.name} ${p.brand} ${p.npn} ${p.aliases.join(' ')}`.toLowerCase().includes(query.toLowerCase())&&(ingredient==='all'||p.ingredient_slug===ingredient)&&(status==='all'||(status==='concern'?rating.blocked:status==='stale'?rating.stale:rating.rows.find(r=>r.kind==='licence')?.status==='verified'));
  }).sort((a,b)=>sort==='evidence'?(evaluateEvidence(b.evidence,now).score??-1)-(evaluateEvidence(a.evidence,now).score??-1)||a.brand.localeCompare(b.brand):sort==='name'?a.name.localeCompare(b.name):a.brand.localeCompare(b.brand)||a.name.localeCompare(b.name));
  return <div className="product-browser"><div className="product-tools"><label className="search-field"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search a brand, product, or NPN…" aria-label="Search products"/></label>{!compact&&<label>Supplement<select aria-label="Filter products by supplement" value={ingredient} onChange={e=>setIngredient(e.target.value)}><option value="all">All supplements</option>{ingredients.filter(item=>item.kind!=='research').map(i=><option value={i.slug} key={i.slug}>{i.name}</option>)}</select></label>}<label>Show<select value={status} onChange={e=>setStatus(e.target.value)} aria-label="Filter by review status"><option value="all">All evidence states</option><option value="licensed">Licence verified</option><option value="concern">Review needed</option><option value="stale">Refresh needed</option></select></label><label>Sort<select aria-label="Sort products" value={sort} onChange={e=>setSort(e.target.value)}><option value="brand">Brand A–Z</option><option value="evidence">Most documented</option><option value="name">Product A–Z</option></select></label></div>
    <div className="results-meta"><span aria-live="polite">{shown.length} Canadian product records</span><span>Compare up to 3 products</span></div>
    {shown.length?<div className="product-list">{shown.map(p=>{const guide=ingredients.find(i=>i.slug===p.ingredient_slug)!;const rating=evaluateEvidence(p.evidence,now);return <article key={p.id} className="product-row"><div className={`product-monogram theme-${guide.theme}`}>{guide.symbol}</div><div className="product-row-title"><Link href={`/brands/${p.brand_id}`} className="product-brand">{p.brand}</Link><h3><Link href={`/products/${p.slug}`}>{p.name}</Link></h3><p>{p.form} <span>·</span> NPN {p.npn}</p></div><div className="product-row-evidence"><EvidenceBadge product={p}/><span>{rating.verifiedCount}/5 checks documented · Checked {formatDate(p.checked_at)}</span></div><div className="product-row-actions"><CompareButton id={p.id} name={`${p.brand} ${p.name}`}/><Link className="icon-button outlined" href={`/products/${p.slug}`} aria-label={`View ${p.brand} ${p.name}`}><ArrowUpRight size={18}/></Link></div></article>;})}</div>:<div className="empty-state"><Search size={27}/><h3>No products match.</h3><p>Try a different name, NPN, or evidence filter.</p><button className="button secondary" onClick={()=>{setQuery('');setIngredient('all');setStatus('all');}}>Clear filters</button></div>}
  </div>;
}
