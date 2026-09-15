'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Bookmark, Check, ChevronLeft, ChevronRight, Pause, Play, Sparkles, ZoomIn, ZoomOut } from 'lucide-react';
import { ingredients } from '@/data/ingredients';
import { bodySystems, explorations, type BodySystem } from '@/data/explorations';
import { useCollection } from './providers';
import { SupplementArt } from './art';
import { BodyMap } from './body-map';
import { ConnectionLab } from './connection-lab';
import { ingredientPairs, type IngredientPair } from '@/data/connections';

export function SupplementExplorer({ initialCollection = false }: { initialCollection?: boolean }) {
  const { shelf, hydrated, toggleShelf, notify } = useCollection();
  const [mine, setMine] = useState(initialCollection);
  const [selected, setSelected] = useState('magnesium');
  const [focus, setFocus] = useState<BodySystem>('brain');
  const [noteIndex, setNoteIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [pairId, setPairId] = useState('collagen-c');
  const [pairPreview, setPairPreview] = useState(false);
  const [pickerQuery, setPickerQuery] = useState('');
  const pickerRef = useRef<HTMLDivElement>(null);
  const available = ingredients.filter(item => !mine || shelf.includes(item.slug));
  const ingredient = available.find(item => item.slug === selected) || available[0];
  const exploration = ingredient ? explorations[ingredient.slug] : null;
  const connection = exploration?.connections.find(item => item.system === focus) || exploration?.connections[0];
  const saved = ingredient ? shelf.includes(ingredient.slug) : false;
  const fact = ingredient?.facts[noteIndex % ingredient.facts.length];
  const pair = ingredientPairs.find(item => item.id === pairId)!;
  const visibleItems = available.filter(item => `${item.name} ${item.tags.join(' ')}`.toLowerCase().includes(pickerQuery.toLowerCase()));
  const accent = { '--explore-color': exploration?.color || '#7663ab', '--explore-pale': exploration?.pale || '#eee8f7' } as CSSProperties;

  useEffect(() => {
    // Reveal hotspot/surprise selections inside the rail without moving the page.
    const picker = pickerRef.current;
    const option = picker?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!picker || !option) return;
    const rail = picker.getBoundingClientRect();
    const card = option.getBoundingClientRect();
    if (card.top < rail.top) picker.scrollTop -= rail.top - card.top + 4;
    else if (card.bottom > rail.bottom) picker.scrollTop += card.bottom - rail.bottom + 4;
    if (card.left < rail.left) picker.scrollLeft -= rail.left - card.left + 4;
    else if (card.right > rail.right) picker.scrollLeft += card.right - rail.right + 4;
  }, [ingredient?.slug, mine, pickerQuery]);

  function select(slug: string, system?: BodySystem) {
    setPairPreview(false);
    const related = ingredientPairs.find(item => item.items.includes(slug));
    if (related) setPairId(related.id);
    setSelected(slug); setFocus(system || explorations[slug].connections[0].system); setNoteIndex(0);
  }
  function previewPair(item: IngredientPair) {
    setPairId(item.id); setPairPreview(true); setMine(false); setPickerQuery('');
    setSelected(item.items[0]); setFocus(item.systems[0]); setNoteIndex(0);
  }
  function followSystem(system: BodySystem) {
    setPairPreview(false);
    if (exploration?.connections.some(item => item.system === system)) { setFocus(system); return; }
    const match = available.find(item => explorations[item.slug].connections.some(link => link.system === system));
    if (match) select(match.slug, system);
    else notify('No supplement in this collection is mapped here yet. Switch to All discoveries to explore.');
  }
  function surprise() {
    const candidates = available.filter(item => item.slug !== ingredient?.slug);
    if (candidates.length) select(candidates[Math.floor(Math.random() * candidates.length)].slug);
    else notify('Switch to All discoveries to discover something new.');
  }

  return <section className="supplement-explorer wrap" id="explore" style={accent} data-supplement={ingredient?.slug || 'none'}>
    <div className="explorer-heading"><div><span className="eyebrow"><Sparkles size={15}/>A SMALL COLLECTION. A WHOLE WORLD INSIDE.</span><h1>Your body.<br/><em>A world to discover.</em></h1></div><div className="explorer-invitation"><p>Pick something that makes you curious.<br/>See where it connects. Make it yours.</p><button className="text-button" onClick={surprise}><Sparkles size={15}/>Surprise me</button></div></div>
    <div className="explorer-toolbar"><div className="explorer-filter" aria-label="Choose an exploration collection"><button aria-pressed={!mine} onClick={() => { setMine(false); setPairPreview(false); setPickerQuery(''); }}>All discoveries <span>{ingredients.length}</span></button><button aria-pressed={mine} onClick={() => { setMine(true); setPairPreview(false); setPickerQuery(''); }}>My collection <span>{shelf.length}</span></button></div><span className="explorer-instruction"><span/>Tap a supplement or a point on the body</span></div>
    <div className={`explorer-workbench ${paused ? 'motion-paused' : ''}`}>
      <div className="specimen-shelf"><label className="picker-search"><span className="workbench-label">FIND A DISCOVERY</span><input aria-label="Find a body discovery" placeholder="Name or connection…" value={pickerQuery} onChange={event => setPickerQuery(event.target.value)}/></label><div ref={pickerRef} className="specimen-picker" aria-label="Supplements to explore">{visibleItems.map(item => <button key={item.slug} className={`specimen-option theme-${item.theme}`} onClick={() => select(item.slug)} aria-label={`Explore ${item.name} in body`} aria-pressed={ingredient?.slug === item.slug}><SupplementArt slug={item.slug}/><span><strong>{item.name}</strong><small>{item.symbol} / {item.category}</small></span>{shelf.includes(item.slug) && <Check className="specimen-owned" size={13}/>}</button>)}{!visibleItems.length && <p className="picker-empty">{available.length ? 'No matches. Try another name or connection.' : 'Your saved discoveries will appear here.'}</p>}</div><span className="picker-count">{visibleItems.length} discoveries · scroll to explore</span></div>
      <div className="body-stage"><div className="stage-toolbar"><span className="workbench-label">THE WORLD WITHIN</span><div><button className="icon-button" aria-label={paused ? 'Play diagram animation' : 'Pause diagram animation'} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={15}/> : <Pause size={15}/>}</button><button className="icon-button" aria-label={zoom ? 'Zoom out of body' : 'Zoom into body'} aria-pressed={zoom} onClick={() => setZoom(!zoom)}>{zoom ? <ZoomOut size={17}/> : <ZoomIn size={17}/>}</button></div></div><BodyMap active={pairPreview ? pair.systems : exploration?.connections.map(item => item.system) || []} focus={connection?.system || null} onFocus={followSystem} zoom={zoom} paused={paused} signalPaths={ingredient?.slug === 'magnesium'} research={ingredient?.kind === 'research'}/><p className="diagram-key"><span/>{pairPreview ? `Pair spotlight: ${pair.label}` : `Connections for ${ingredient?.name || 'your next discovery'}`}<small>{ingredient?.kind === 'research' ? 'Dotted = preclinical research topic, not proven healing' : pairPreview ? 'Related biological roles · not a simulation of taking both' : 'Illustrated biology · individual responses vary'}</small></p></div>
      <aside className="discovery-panel" aria-label="Selected supplement discovery">
        {ingredient && exploration && connection && fact ? <div key={ingredient.slug} className="discovery-content"><div className="discovery-identity"><span className={`discovery-symbol theme-${ingredient.theme}`}>{ingredient.symbol}</span><span className="eyebrow">DISCOVERY {ingredient.number}<small>{ingredient.role}</small></span></div>{ingredient.kind === 'research' && <div className="research-banner"><strong>Experimental · research only</strong><span>Human tendon benefits are not established. Health Canada warns against unauthorized injectable BPC-157.</span></div>}<h2>{ingredient.name}</h2><p className="discovery-subtitle">{ingredient.subtitle}</p>{ingredient.slug === 'magnesium' && <p className="art-metaphor">A sleepy sheep for the character, not a promise of better sleep.</p>}{ingredient.slug === 'omega-3' && <p className="art-metaphor">Our oil-can mascot nods to fats. Omega-3 is part of membranes, not literal joint lubricant.</p>}<div className="connection-tags" aria-label="Connections for selected supplement">{exploration.connections.map(item => <button key={item.system} onClick={() => setFocus(item.system)} aria-pressed={connection.system === item.system}>{bodySystems.find(system => system.id === item.system)?.name}</button>)}</div>
          <div className="connection-story" aria-live="polite" key={`${ingredient.slug}-${connection.system}`}><span className="workbench-label">FOLLOW THE CONNECTION</span><h3>{connection.title}</h3><p>{connection.text}</p><a href={exploration.source.url} target="_blank" rel="noopener noreferrer" className="discovery-source">{exploration.source.publisher} <ArrowUpRight size={13}/></a></div>
          <div className="pocket-fact"><div><span className="workbench-label">A LITTLE EXTRA</span><span className="fact-pager"><button aria-label="Previous discovery note" onClick={() => setNoteIndex((noteIndex + ingredient.facts.length - 1) % ingredient.facts.length)}><ChevronLeft size={15}/></button>{noteIndex % ingredient.facts.length + 1} / {ingredient.facts.length}<button aria-label="Next discovery note" onClick={() => setNoteIndex((noteIndex + 1) % ingredient.facts.length)}><ChevronRight size={15}/></button></span></div><div aria-live="polite"><h3>{fact.title}</h3><p>{fact.body}</p><a href={ingredient.sources[fact.source].url} target="_blank" rel="noopener noreferrer" className="discovery-source">Read the source <ArrowUpRight size={13}/></a></div></div>
          <button className={`button collect-discovery ${saved ? 'is-collected' : ''}`} aria-pressed={saved} aria-label={saved ? `Remove ${ingredient.name} from body collection` : `Collect ${ingredient.name}`} disabled={!hydrated} onClick={() => toggleShelf(ingredient.slug)}>{saved ? <Check size={18}/> : <Bookmark size={18}/>} {saved ? 'In your collection' : 'Collect this discovery'}{!saved && <span>＋</span>}</button>
          <div className="discovery-links"><Link href={`/supplements/${ingredient.slug}`}>Keep exploring <ArrowRight size={14}/></Link><details><summary>Limits & things to know</summary><p>{ingredient.limitation}</p><p>{ingredient.caution}</p><p>The map shows selected educational associations. It does not simulate a dose, measured neurotransmitter changes, or the combined effects of a collection.</p></details></div>
        </div> : <div className="explorer-empty"><Bookmark size={34}/><h2>A world waiting to be collected.</h2><p>Collect a supplement to bring its connections into your personal explorer.</p><button className="button" onClick={() => setMine(false)}>Find a discovery <ArrowRight size={16}/></button></div>}
      </aside>
    </div>
    <div className="collection-ribbon"><div className="ribbon-heading"><span><Bookmark size={17}/><strong>Your collection</strong><small>{shelf.length} / {ingredients.length}</small></span><Link href="/collection">Open collection <ArrowUpRight size={14}/></Link></div><div className="collection-slots">{ingredients.map(item => { const owned = shelf.includes(item.slug); return <button key={item.slug} className={`collection-slot ${owned ? `is-owned theme-${item.theme}` : ''}`} aria-label={owned ? `Explore collected ${item.name}` : `Discover ${item.name} to collect`} onClick={() => { if (!owned) setMine(false); select(item.slug); }}><span className="slot-art">{owned ? <SupplementArt slug={item.slug}/> : <span className="slot-outline">{item.symbol}</span>}</span><span>{owned ? item.name : 'To discover'}</span>{owned && <Check size={12}/>}</button>; })}</div><p>Keep what sparks your curiosity. Your collection is saved in this browser.</p></div>
    <ConnectionLab pairId={pairId} onPair={previewPair}/>
  </section>;
}
