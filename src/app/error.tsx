'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main id="main" className="wrap empty-state"><h1>We couldn’t load this page.</h1><p>Your saved collection is still in this browser. Please try again.</p><button className="button" onClick={reset}>Try again</button></main>;}
