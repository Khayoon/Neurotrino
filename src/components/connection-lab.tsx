'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, FlaskConical, Link2 } from 'lucide-react';
import { ingredientBySlug } from '@/data/ingredients';
import { collagenForms, ingredientPairs, type IngredientPair } from '@/data/connections';
import { collagenFormsStudy, collagenMonograph, nativeCollagenStudy } from '@/data/more-ingredients';
import { SupplementArt } from './art';

export function ConnectionLab({ pairId = 'collagen-c', onPair }: { pairId?: string; onPair?: (pair: IngredientPair) => void }) {
  const [localPair, setLocalPair] = useState(pairId);
  const [formId, setFormId] = useState<string>('powder');
  const [grams, setGrams] = useState('10');
  const [milligrams, setMilligrams] = useState('500');
  const pair = ingredientPairs.find(item => item.id === (onPair ? pairId : localPair)) || ingredientPairs[0];
  const form = collagenForms.find(item => item.id === formId) || collagenForms[0];
  const equivalent = Number(grams) * 1000 / Number(milligrams);
  const validAmount = Number(grams) > 0 && Number(milligrams) > 0 && Number.isFinite(equivalent);
  return <section className="connection-lab" id="connection-lab" aria-label="Ingredient connections and collagen forms">
    <div className="lab-heading"><div><span className="eyebrow"><Link2 size={14}/>THE CONNECTION LAB</span><h2>Some things make more sense together.</h2></div><p>Follow a relationship.<br/>Look a little closer at the label.</p></div>
    <div className="lab-grid">
      <article className="pair-card" aria-label="Pair explorer">
        <div className="lab-card-top"><span className="workbench-label">01 / PAIR EXPLORER</span><Link2 size={17}/></div>
        <div className="lab-tabs" aria-label="Choose an ingredient pair">{ingredientPairs.map(item => <button key={item.id} aria-pressed={pair.id === item.id} onClick={() => { setLocalPair(item.id); onPair?.(item); }}>{item.label}</button>)}</div>
        <div className="pair-art" aria-hidden="true"><SupplementArt slug={pair.items[0]}/><span>＋</span><SupplementArt slug={pair.items[1]}/></div>
        <div className="pair-story" aria-live="polite"><span className="lab-evidence">{pair.evidence}</span><h3>{pair.title}</h3><p>{pair.explanation}</p><ol className="relationship-steps">{pair.steps.map((step, index) => <li key={step}><span>{step}</span>{index < 2 && <ArrowRight size={15}/>}</li>)}</ol><p className="lab-limit">{pair.limit}</p><div className="lab-sources">{pair.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.publisher}<ArrowUpRight size={12}/></a>)}</div></div>
        <p className="lab-footnote">{onPair ? 'Pair selection highlights the relevant topics above. ' : ''}This explains a relationship; it is not a check that a combination is safe for you.</p>
        <div className="pair-guide-links">{pair.items.map(slug => <Link key={slug} href={`/supplements/${slug}`}>{ingredientBySlug(slug)?.name} field note <ArrowUpRight size={12}/></Link>)}</div>
      </article>
      <article className="form-card" aria-label="Collagen form comparison">
        <div className="lab-card-top"><span className="workbench-label">02 / SAME NAME, DIFFERENT LABELS</span><FlaskConical size={17}/></div>
        <div className="lab-tabs" aria-label="Choose a collagen form">{collagenForms.map(item => <button key={item.id} aria-pressed={form.id === item.id} onClick={() => setFormId(item.id)}>{item.name}</button>)}</div>
        <div className="form-art"><SupplementArt slug={form.art}/><span>COLLAGEN<br/><strong>{form.name}</strong><small>Format ≠ better effect</small></span></div>
        <div className="form-story" aria-live="polite"><span className="lab-evidence">A label-reading comparison</span><h3>{form.title}</h3><p>{form.description}</p><p className="form-check">{form.check}</p></div>
        <details className="label-maths"><summary>Try the grams-per-serving maths <span>＋</span></summary><p>Use the collagen amount on each label. These starting values are illustrative, not product data or recommended doses.</p><div className="math-inputs"><label>Powder: collagen g / serving<input type="number" min="0.001" step="any" value={grams} onChange={event => setGrams(event.target.value)}/></label><label>Capsule: collagen mg / capsule<input type="number" min="0.001" step="any" value={milligrams} onChange={event => setMilligrams(event.target.value)}/></label></div><output aria-live="polite">{validAmount ? `${Number(equivalent.toFixed(2))} capsules contain the same collagen mass.` : 'Enter two positive amounts to compare.'}</output><p>Mass equivalence only. Different collagen ingredients are not interchangeable, and this is not a number of capsules to take.</p></details>
        <div className="lab-sources"><a href={collagenFormsStudy.url} target="_blank" rel="noopener noreferrer">Collagen-derivative study <ArrowUpRight size={12}/></a><a href={collagenMonograph.url} target="_blank" rel="noopener noreferrer">Health Canada monograph <ArrowUpRight size={12}/></a>{form.id === 'capsules' && <a href={nativeCollagenStudy.url} target="_blank" rel="noopener noreferrer">Undenatured type II: trial methods <ArrowUpRight size={12}/></a>}</div><p className="lab-footnote">The derivative study involved 10 men and found no statistically significant change in the collagen-synthesis marker. It cannot establish that all formats work equally or that an “enhanced” blend works better.</p>
      </article>
    </div>
  </section>;
}
