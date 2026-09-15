'use client';
import { useState } from 'react';
import { Search, SlidersHorizontal, ArrowRight, X, Bookmark, Download } from 'lucide-react';
import Link from 'next/link';
import { ingredients } from '@/data/ingredients';
import { IngredientCard } from './ingredient-card';
import { useCollection } from './providers';
export function Discover({counts,collection=false}:{counts:Record<string,number>;collection?:boolean}) {
  const {shelf,hydrated}=useCollection(); const [query,setQuery]=useState(''); const [category,setCategory]=useState('All discoveries');
  const categories=['All discoveries',...new Set(ingredients.map(item=>item.category))];
  const shown=ingredients.filter(i=>(!collection||shelf.includes(i.slug))&&(category==='All discoveries'||i.category===category)&&`${i.name} ${i.tags.join(' ')} ${i.subtitle} ${i.tidbit}`.toLowerCase().includes(query.toLowerCase()));
  function exportShelf(){const blob=new Blob([JSON.stringify({app:'Neurotrino',version:1,exportedAt:new Date().toISOString(),collection:ingredients.filter(i=>shelf.includes(i.slug)).map(i=>({slug:i.slug,name:i.name,sources:i.sources})),note:'A reading collection, not a supplement regimen.'},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='my-neurotrino-collection.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  return <section id="discover" className="discover-section">
    <div className="section-heading"><div><div className="eyebrow">{collection?'A SHELF OF YOUR OWN':'FOLLOW YOUR CURIOSITY'}</div><h2>{collection?'Your collection.':'Small things. Fascinating science.'}</h2></div>{collection?<button className="text-button" disabled={!shelf.length} onClick={exportShelf}><Download size={17}/>Export collection</button>:<p>Get to know an ingredient.<br/>Find the details worth keeping.</p>}</div>
    {collection&&<p className="section-intro">Save what interests you and pick up where you left off. This is your reading shelf, not a recommendation to take these together. Saved on this browser.</p>}
    <div className="discovery-tools"><div className="filter-chips" aria-label="Filter by topic">{categories.map(c=><button className={c===category?'active':''} key={c} onClick={()=>setCategory(c)} aria-pressed={c===category}>{c}</button>)}</div><label className="search-field"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a supplement…" aria-label="Search supplements"/>{query&&<button onClick={()=>setQuery('')} aria-label="Clear search"><X size={15}/></button>}</label></div>
    <div className="results-meta" aria-live="polite"><span>{collection&&!hydrated?'Loading your collection…':`${shown.length} ${shown.length===1?'discovery':'discoveries'}`}</span><span><SlidersHorizontal size={13}/>Curated, with sources</span></div>
    {shown.length>0?<div className="ingredient-grid">{shown.map(i=><IngredientCard key={i.slug} ingredient={i} productCount={counts[i.slug]||0}/>)}</div>:<div className="empty-state"><Bookmark size={30}/><h3>{collection&&!shelf.length?'Your curiosity goes here.':'Nothing on this shelf yet.'}</h3><p>{collection&&!shelf.length?'Tap the bookmark on any supplement card to make it yours.':'Try another topic or search term.'}</p>{collection&&!shelf.length?<Link className="button" href="/">Discover supplements <ArrowRight size={16}/></Link>:<button className="button secondary" onClick={()=>{setQuery('');setCategory('All discoveries');}}>Reset filters</button>}</div>}
  </section>;
}
