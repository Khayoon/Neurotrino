'use client';
import { formatDate, evaluateEvidence } from '@/lib/rating';
import { useEvidenceTime } from './providers';
import type { Product } from '@/lib/types';
export function SourceStatus({ products }: { products: Product[] }) {
  const now = useEvidenceTime();
  const checked = products.map(p => p.checked_at).sort();
  const stale = products.filter(p => evaluateEvidence(p.evidence, now).stale).length;
  return <div className="source-status-grid"><div className="source-status-card"><span className="eyebrow">PRODUCT RECORDS</span><strong>{products.length}</strong><small>Exact NPN records</small></div><div className="source-status-card"><span className="eyebrow">LATEST RETRIEVAL</span><strong style={{fontSize:21}}>{checked.length ? formatDate(checked.at(-1)!) : 'None'}</strong><small>Successful licence check</small></div><div className="source-status-card"><span className="eyebrow">REFRESH NEEDED</span><strong>{stale}</strong><small>Records with expired checks</small></div></div>;
}
