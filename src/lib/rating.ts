import type { Evidence, EvidenceKind } from './types';
export const METHOD_VERSION = '1.0';
export const criteria: { kind: EvidenceKind; title: string; weight: number; days: number; description: string }[] = [
  { kind: 'licence', title: 'Canadian licence', weight: 20, days: 30, description: 'An exact NPN match with an active status in Health Canada’s records.' },
  { kind: 'testing', title: 'Independent product testing', weight: 30, days: 180, description: 'A current, independently verifiable certification or test tied to this Canadian product or a stated batch.' },
  { kind: 'manufacturing', title: 'Manufacturing oversight', weight: 20, days: 180, description: 'Documented inspection or audit results for a facility demonstrably linked to this product.' },
  { kind: 'recalls', title: 'Recall review', weight: 20, days: 7, description: 'A documented review of official recalls, including product and batch matching, coverage, and unresolved findings.' },
  { kind: 'transparency', title: 'Traceable product identity', weight: 10, days: 30, description: 'An identifiable licence holder, formulation, and publicly retrievable licence record.' },
];
export function evaluateEvidence(evidence: Evidence[], now = new Date()) {
  const rows = criteria.map(criterion => {
    const record = evidence.filter(e => e.kind === criterion.kind).sort((a,b) => b.revision - a.revision || b.checked_at.localeCompare(a.checked_at))[0];
    const checked = record ? Date.parse(record.checked_at) : NaN;
    const expires = record ? Date.parse(record.expires_at) : NaN;
    const fresh = !!record && Number.isFinite(checked) && Number.isFinite(expires) && checked <= now.getTime() && expires > now.getTime();
    // Unresolved concerns persist until an editor explicitly resolves them, even after expiry.
    const status = record?.verdict === 'concern' ? 'concern' : !record || record.verdict === 'unknown' ? 'unknown' : !fresh ? 'stale' : 'verified';
    const points = status === 'verified' ? criterion.weight : 0;
    return { ...criterion, record, status, points, fresh };
  });
  const blocked = rows.some(row => row.status === 'concern');
  const score = rows.reduce((sum,row) => sum + row.points, 0);
  const verifiedCount = rows.filter(row => row.status === 'verified').length;
  const stale = rows.some(row => row.status === 'stale');
  const complete = verifiedCount === criteria.length;
  const label = blocked ? 'Review needed' : complete ? 'Well documented' : stale ? 'Refresh needed' : score >= 60 ? 'Developing evidence' : score > 0 ? 'Partial evidence' : 'Not yet assessed';
  return { score: blocked ? null : score, label, verifiedCount, complete, blocked, stale, rows, version: METHOD_VERSION };
}
export function formatDate(value: string | Date) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Not recorded' : new Intl.DateTimeFormat('en-CA', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
}
