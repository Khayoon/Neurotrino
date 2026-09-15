'use client';
import { CircleCheck, CircleHelp, Clock3, AlertTriangle, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEvidenceTime } from './providers';
import { evaluateEvidence, formatDate } from '@/lib/rating';
import type { Product } from '@/lib/types';
export function EvidencePanel({product}:{product:Product}){
  const now=useEvidenceTime();
  const rating=evaluateEvidence(product.evidence,now);
  return <section className="evidence-panel" id="evidence"><div className="evidence-panel-heading"><div><span className="eyebrow">THE PRODUCT TRUST PROFILE</span><h2>See what stands behind it.</h2><p>Documented checks, visible gaps, and a source for every assessment.</p></div><div className={`evidence-score ${rating.blocked?'blocked':''}`}><strong>{rating.score??'—'}<small>{rating.score!==null?'/100':''}</small></strong><span>Evidence coverage</span></div></div>
    <div className="coverage-track" aria-label={`Evidence coverage ${rating.score??'withheld'}`}><span style={{width:`${rating.score??0}%`}}/></div><div className="coverage-caption"><strong>{rating.label}</strong><span>{rating.verifiedCount} of 5 checks documented</span></div><p className="coverage-explanation">This score measures documented evidence, not safety, effectiveness, or a probability of quality. Unknown checks earn no coverage points; they do not prove poor quality. {rating.blocked?'An unresolved concern withholds the score.':''}</p>
    <div className="evidence-checks">{rating.rows.map(row=>{const Icon=row.status==='verified'?CircleCheck:row.status==='concern'?AlertTriangle:row.status==='stale'?Clock3:CircleHelp;return <details key={row.kind} className={`evidence-check status-${row.status}`} open={row.status==='concern'}><summary><Icon size={19}/><span>{row.title}<small>{row.status==='verified'?'Documented':row.status==='stale'?'Refresh needed':row.status==='concern'?'Unresolved concern':'Not yet verified'}</small></span><b>{row.points}/{row.weight}</b></summary><div className="check-detail"><p>{row.record?.summary||row.description}</p>{row.record?<><p className="meta-text">Scope: {row.record.scope}</p><p className="meta-text">Reviewed {formatDate(row.record.checked_at)} · Review due {formatDate(row.record.expires_at)}</p><a href={row.record.source_url} target="_blank" rel="noopener noreferrer" className="source-link">{row.record.source_title} <ArrowUpRight size={14}/></a><small className="source-publisher">{row.record.publisher}</small></>:<p className="meta-text">No reviewed evidence has been added for this check. An absent record is not a passing result.</p>}</div></details>;})}</div>
    <Link href="/methodology" className="text-link">Read methodology v{rating.version} <ArrowRightIcon/></Link>
  </section>;
}
function ArrowRightIcon(){return <span aria-hidden="true">→</span>;}
