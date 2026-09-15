'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Leaf, Menu, X, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { useCollection } from './providers';
export function Header() {
  const path=usePathname(); const {shelf}=useCollection(); const [open,setOpen]=useState(false);
  const links=[['/','Explore the body'],['/collection','My collection'],['/#discover','All discoveries']];
  return <header className="site-header"><div className="header-inner">
    <Link className="wordmark" href="/" aria-label="Neurotrino home"><span className="brand-mark"><Leaf size={22}/></span>neurotrino<span className="brand-dot">.</span></Link>
    <nav className={open?'main-nav open':'main-nav'} aria-label="Main navigation">{links.map(([href,label])=><Link key={href} href={href} aria-current={path===href?'page':undefined} onClick={()=>setOpen(false)}>{label}{href==='/collection'&&shelf.length>0&&<span className="nav-count">{shelf.length}</span>}</Link>)}</nav>
    <Link className="header-collection" href="/collection"><Bookmark size={16}/>Your shelf <ArrowUpRight size={15}/></Link>
    <button className="mobile-menu icon-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={open?'Close menu':'Open menu'}>{open?<X/>:<Menu/>}</button>
  </div></header>;
}
