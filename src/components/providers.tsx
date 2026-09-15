'use client';
import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { Check, X, ArrowRight, Layers3 } from 'lucide-react';
import Link from 'next/link';
import { ingredients } from '@/data/ingredients';

interface CollectionState { shelf:string[]; compared:string[]; hydrated:boolean; toggleShelf:(id:string)=>void; toggleCompare:(id:string)=>void; clearCompare:()=>void; notify:(message:string)=>void; }
const EvidenceTimeContext=createContext(new Date(0));
export const useEvidenceTime=()=>useContext(EvidenceTimeContext);
const CollectionContext=createContext<CollectionState>({shelf:[],compared:[],hydrated:false,toggleShelf:()=>{},toggleCompare:()=>{},clearCompare:()=>{},notify:()=>{}});
export const useCollection=()=>useContext(CollectionContext);
export function Providers({children,initialNow}:{children:ReactNode;initialNow:number}) {
  const [now,setNow]=useState(()=>new Date(initialNow));
  useEffect(()=>{setNow(new Date());const interval=setInterval(()=>setNow(new Date()),60000);return()=>clearInterval(interval);},[]);
  const [shelf,setShelf]=useState<string[]>([]); const [compared,setCompared]=useState<string[]>([]); const [hydrated,setHydrated]=useState(false); const [message,setMessage]=useState('');
  useEffect(()=>{
    try { const value=JSON.parse(localStorage.getItem('neurotrino-collection-v1')||'{}'); setShelf(Array.isArray(value.shelf)?value.shelf.filter((s:unknown)=>typeof s==='string'&&ingredients.some(i=>i.slug===s)):[]); setCompared(Array.isArray(value.compared)?value.compared.filter((s:unknown)=>typeof s==='string'&&/^\d{8}$/.test(s)).slice(0,3):[]); } catch { /* Invalid storage starts a fresh collection. */ }
    setHydrated(true);
  },[]);
  useEffect(()=>{ if(hydrated) { try{localStorage.setItem('neurotrino-collection-v1',JSON.stringify({shelf,compared}));}catch{setMessage('Your browser could not save this collection. It will last for this visit.');} } },[shelf,compared,hydrated]);
  useEffect(()=>{if(message){const timeout=setTimeout(()=>setMessage(''),3800);return()=>clearTimeout(timeout);}},[message]);
  const notify=useCallback((value:string)=>setMessage(value),[]);
  function toggleShelf(id:string) { setShelf(prev=>prev.includes(id)?prev.filter(s=>s!==id):[...prev,id]); notify(shelf.includes(id)?'Removed from your collection':'Added to your collection'); }
  function toggleCompare(id:string) {
    if(!compared.includes(id)&&compared.length>=3) {notify('Compare up to 3 products. Remove one to make room.');return;}
    setCompared(prev=>prev.includes(id)?prev.filter(s=>s!==id):[...prev,id]);
  }
  return <EvidenceTimeContext.Provider value={now}><CollectionContext.Provider value={{shelf,compared,hydrated,toggleShelf,toggleCompare,clearCompare:()=>setCompared([]),notify}}><span hidden data-testid="app-ready" data-ready={hydrated}/>{children}
    {message&&<div className="toast" role="status"><Check size={17}/>{message}<button aria-label="Dismiss notification" onClick={()=>setMessage('')}><X size={16}/></button></div>}
    {compared.length>0&&<div className="compare-tray"><span><Layers3 size={19}/><b>{compared.length}</b> of 3 products</span><Link className="button small" href={`/compare?ids=${compared.join(',')}`}>Compare evidence <ArrowRight size={16}/></Link><button className="icon-button" onClick={()=>setCompared([])} aria-label="Clear comparison"><X size={18}/></button></div>}
  </CollectionContext.Provider></EvidenceTimeContext.Provider>;
}
