'use client';
import { bodySystems, type BodySystem } from '@/data/explorations';

export function BodyMap({ active, focus, onFocus, zoom, paused, signalPaths, research = false }: {
  active: BodySystem[]; focus: BodySystem | null; onFocus: (system: BodySystem) => void; zoom: boolean; paused: boolean; signalPaths: boolean; research?: boolean;
}) {
  const lit = (id: BodySystem) => `anatomy-layer anatomy-${id} ${active.includes(id) ? 'is-lit' : ''} ${focus === id ? 'is-focused' : ''}`;
  return <div className={`body-map ${zoom ? 'is-zoomed' : ''} ${paused ? 'is-paused' : ''} ${research ? 'is-research' : ''}`} data-focus={focus || 'none'}>
    <svg className="body-illustration" viewBox="0 0 460 530" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="body-clay" x1="158" y1="150" x2="296" y2="450" gradientUnits="userSpaceOnUse"><stop stopColor="#fff4de"/><stop offset=".48" stopColor="#eae5cc"/><stop offset="1" stopColor="#c3cbb7"/></linearGradient>
        <linearGradient id="head-clay" x1="190" y1="37" x2="268" y2="131" gradientUnits="userSpaceOnUse"><stop stopColor="#fff7e5"/><stop offset="1" stopColor="#e3dcc2"/></linearGradient>
        <radialGradient id="body-halo"><stop stopColor="var(--explore-pale)"/><stop offset="1" stopColor="var(--explore-pale)" stopOpacity="0"/></radialGradient>
        <filter id="clay-shadow" x="-30%" y="-15%" width="160%" height="145%"><feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#6a7358" floodOpacity=".13"/></filter>
      </defs>
      <circle cx="230" cy="260" r="220" fill="url(#body-halo)"/>
      <g className="anatomy-orbits" stroke="var(--explore-color)" opacity=".16"><ellipse cx="230" cy="267" rx="158" ry="219"/><ellipse cx="230" cy="265" rx="209" ry="117" transform="rotate(-28 230 265)"/><path strokeDasharray="2 8" d="M29 264H432M230 12V501"/></g>
      <g fill="var(--explore-color)" opacity=".4"><circle cx="100" cy="95" r="3"/><circle cx="381" cy="276" r="4"/><circle cx="115" cy="422" r="3"/><path d="m323 43 2 7 7 2-7 2-2 7-2-7-7-2 7-2Z"/></g>
      <ellipse cx="230" cy="494" rx="86" ry="12" fill="#63755e" opacity=".13"/>
      <g className="anatomy-person" filter="url(#clay-shadow)">
        <path d="M206 124v20l-33 9q-23 7-29 32l-24 88q-5 15 7 20 14 6 22-10l24-58 2 75 12 159q-23 9-16 22 7 12 39 2 13-5 12-22l8-111 8 111q-1 17 12 22 32 10 39-2 7-13-16-22l12-159 2-75 24 58q8 16 22 10 12-5 7-20l-24-88q-6-25-29-32l-33-9v-20" fill="url(#body-clay)" stroke="#879581" strokeWidth="2.5"/>
        <path d="M168 180l-29 94m57 58 7 110m53-108 3 96" stroke="#fff9e7" strokeWidth="8" strokeLinecap="round" opacity=".65"/>
        <path d="M172 192q57-23 116 0l-8 108q-48 35-100 0Z" fill="#f8f1da" fillOpacity=".42" stroke="#c7cbb6" strokeWidth="1.5"/>
        <path d="M179 79q-14-10-15 8-1 16 15 14m102-22q14-10 15 8 1 16-15 14" fill="#e5dfc5" stroke="#98a08a" strokeWidth="2"/>
        <path d="M177 77q-1-49 53-49t53 49v22q-2 39-53 43-51-4-53-43Z" fill="url(#head-clay)" stroke="#8f9c86" strokeWidth="2.5"/>
        <path d="M189 60q15-24 37-23" stroke="#fffdf0" strokeWidth="6" strokeLinecap="round"/>
        <g stroke="#75806f" strokeWidth="2.5" strokeLinecap="round"><path d="M210 109v5m40-5v5M225 124q5 4 10 0"/></g>
        <ellipse cx="195" cy="120" rx="8" ry="4" fill="#dbaaa0" opacity=".6"/><ellipse cx="265" cy="120" rx="8" ry="4" fill="#dbaaa0" opacity=".6"/>
        <g className={lit('bones')} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M230 151v140M221 166l-45 12-14 42-18 48m95-102 45 12 14 42 18 48M200 320l7 49-5 87m58-136-7 49 5 87" strokeWidth="7"/>
          <path d="M193 296q37 23 74 0l-10 28-16 7h-22l-16-7Z" strokeWidth="5"/>
          {[185,200,215].map((y,i)=><path key={y} d={`M221 ${y}q-39-9-30 12l30 10m18-22q39-9 30 12l-30 10`} strokeWidth={3-i*.3}/>)}
          <circle cx="205" cy="380" r="6" fill="#fff5df" strokeWidth="3"/><circle cx="255" cy="380" r="6" fill="#fff5df" strokeWidth="3"/>
        </g>
        <g className={lit('lungs')} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M218 177c-11-8-24 6-29 24-5 14-7 31-3 40 9 9 26-1 34-7l2-43q1-10-4-14Zm24 0c11-8 24 6 29 24 5 14 7 31 3 40-9 9-26-1-34-7l-2-43q-1-10 4-14Z" fill="currentColor" fillOpacity=".16" strokeWidth="2.5"/>
          <path d="M230 146v40m0-5-19 17-8 25m27-42 19 17 8 25M212 198l-14 5m11 3 7 11m-15 5-7 8m8-10 5 11m41-33 14 5m-11 3-7 11m15 5 7 8m-8-10-5 11" strokeWidth="2.3"/>
          <path d="M225 154h10m-10 7h10m-10 7h10" strokeWidth="1.8"/>
          <path d="M196 191l-39-46h-27" strokeWidth="1" strokeDasharray="3 5" opacity=".6"/>
        </g>
        <g className={lit('muscles')} fill="currentColor" stroke="currentColor" strokeWidth="1.5">
          <path d="M169 179q-24 13-24 43 14 11 23-19 9-16 1-24Zm122 0q24 13 24 43-14 11-23-19-9-16-1-24ZM194 328q-18 23 2 49 16-5 15-26l-6-24Zm72 0q18 23-2 49-16-5-15-26l6-24Z"/>
          <path d="M200 396q-12 20-4 43 12-3 14-25Zm60 0q12 20 4 43-12-3-14-25Z" fillOpacity=".7"/>
        </g>
        <g className={lit('gut')} stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
          <path d="M237 229q14 0 17 14t-11 17q-20-2-23-13 0-11 11-7" fill="currentColor" fillOpacity=".2"/>
          <path d="M207 265q-13 0-11 16v11q0 12 13 12h39q16-1 16-14v-11q0-14-12-13M211 271h32q11 5 0 11h-32q-11 5 0 11h32"/>
        </g>
        <g className={lit('blood')}>
          <path d="M230 189c-16-21-37-3-25 14l25 24 25-24c12-17-9-35-25-14Z" fill="currentColor" fillOpacity=".7" stroke="currentColor" strokeWidth="2"/>
          <path d="M229 226v79l-24 39m25-79 26 79m-28-111-57-23m61 16 53-16" stroke="currentColor" strokeWidth="2.5"/>
        </g>
        <g className={lit('brain')}>
          <path d="M227 52q-12-9-21 2-16 0-11 14-10 13 3 20-2 15 16 15 12 3 14-11Zm6 0q12-9 21 2 16 0 11 14 10 13-3 20 2 15-16 15-12 3-14-11Z" fill="currentColor" fillOpacity=".3" stroke="currentColor" strokeWidth="2"/>
          <path d="M214 58q9 9-2 15l9 11-11 10m36-36q-9 9 2 15l-9 11 11 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          {signalPaths && <g><path d="M230 144v152m0-123-57 19-35 88m92-107 57 19 35 88m-92 16-26 48-2 128m28-176 26 48 2 128" stroke="currentColor" strokeWidth="1.5"/><path className="nerve-trace" d="M230 145v28l57 19 35 88m-92-107v123l-26 48-2 128" stroke="currentColor" strokeWidth="3" strokeDasharray="6 34"/></g>}
        </g>
        <g className={lit('clock')}><circle cx="230" cy="76" r="29" fill="var(--explore-pale)" stroke="currentColor" strokeWidth="2.5"/><path d="M230 56v21l12 7M225 40q24-3 37 18m-11-3 12 5-1-13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></g>
        <g className={lit('skin')} stroke="currentColor" strokeWidth="5" strokeLinecap="round"><path d="M176 153q-23 7-29 32l-25 88q-3 12 5 15M284 151q27 8 32 30l25 92"/><path d="M179 80v19q2 36 51 40 49-4 51-40V80" strokeWidth="3"/></g>
        <g className={lit('tendons')} stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path className="tendon-strand" d="M198 439q-5 14 0 24m5-25q-5 14 0 25m-48-239-13 35m18-33-13 35M257 439q-5 14 0 24m5-25q-5 14 0 25m43-239 13 35m-18-33 13 35"/>
          <path d="M270 452l41-31" strokeDasharray="3 5" strokeWidth="1.5"/>
        </g>
      </g>
      <g className={lit('cells')}>
        <path d="M266 292l61 35" stroke="currentColor" strokeDasharray="3 5"/>
        <circle cx="350" cy="341" r="33" fill="var(--explore-pale)" stroke="currentColor" strokeWidth="2"/>
        <path d="M337 321q24-6 34 17 2 24-25 27-26-7-18-26Z" stroke="currentColor" strokeWidth="3"/><circle cx="350" cy="342" r="9" fill="currentColor" fillOpacity=".4"/><circle className="cell-spark" cx="340" cy="330" r="3" fill="currentColor"/>
      </g>
      <g className={lit('tendons')}>
        <circle cx="334" cy="419" r="29" fill="var(--explore-pale)" stroke="currentColor" strokeWidth="1.5" strokeDasharray={research ? '3 5' : undefined}/>
        <g className="tendon-strand" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M320 400c33 12-5 25 25 37m-18-39c33 12-5 25 25 37m-39-33c33 12-5 25 25 37"/></g>
        {research && <text x="335" y="431" textAnchor="middle" fill="currentColor" fontSize="32" fontFamily="Georgia">?</text>}
      </g>
      <g className="anatomy-connectors" stroke="currentColor" strokeWidth="1" opacity=".28"><path d="M264 68h51l16 15M199 65h-65l-23-12M156 202h-44M257 249h62M200 401l-36 17M245 195l75-28M134 283l-33 22"/></g>
    </svg>
    <div className="body-hotspots" aria-label="Explore a body system">
      {bodySystems.map(system => <button key={system.id} className={`body-hotspot ${active.includes(system.id) ? 'is-connected' : ''} ${focus === system.id ? 'is-selected' : ''}`} style={{ left: `${system.x}%`, top: `${system.y}%` }} onClick={() => onFocus(system.id)} aria-label={`Explore ${system.name}`} aria-pressed={focus === system.id}><span className="hotspot-dot"/>{system.name}</button>)}
    </div>
    <span className="map-caption">{research ? 'A research question, still unfolding' : 'A little world, beautifully connected'}</span>
  </div>;
}
