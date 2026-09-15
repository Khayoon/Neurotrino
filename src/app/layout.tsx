import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';
import '@/components/explorer.css';
export const dynamic='force-dynamic';
export const metadata: Metadata={title:{default:'Neurotrino — A world to discover',template:'%s · Neurotrino'},description:'Build a visual supplement collection. Explore an interactive body, follow the connections, and discover the science in small things.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en" data-scroll-behavior="smooth"><body><Providers initialNow={Date.now()}><a className="skip-link" href="#main">Skip to content</a><Header/>{children}<Footer/></Providers></body></html>;}
