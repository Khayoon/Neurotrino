'use client';
import { Bookmark, Check, Plus, Minus } from 'lucide-react';
import { useCollection } from './providers';
export function CollectButton({id,name,compact=false}:{id:string;name:string;compact?:boolean}) {
  const {shelf,toggleShelf,hydrated}=useCollection(); const saved=shelf.includes(id);
  return <button disabled={!hydrated} className={compact?`collect-button ${saved?'saved':''}`:`button ${saved?'secondary':'primary'}`} onClick={()=>toggleShelf(id)} aria-pressed={saved} aria-label={`${saved?'Remove':'Save'} ${name} ${saved?'from':'to'} collection`}>
    {saved?<Check size={compact?18:17}/>:<Bookmark size={compact?18:17}/>} {!compact&&(saved?'In your collection':'Add to collection')}
  </button>;
}
export function CompareButton({id,name}:{id:string;name:string}) {
  const {compared,toggleCompare,hydrated}=useCollection(); const selected=compared.includes(id);
  return <button disabled={!hydrated} className={`button small ${selected?'selected':'secondary'}`} onClick={()=>toggleCompare(id)} aria-pressed={selected} aria-label={`${selected?'Remove':'Compare'} ${name}`}>{selected?<Minus size={14}/>:<Plus size={14}/>} {selected?'Selected':'Compare'}</button>;
}
