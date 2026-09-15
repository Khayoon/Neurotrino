'use client';
import { ArrowUpRight } from 'lucide-react';
import { evaluateEvidence } from '@/lib/rating';
import type { Product } from '@/lib/types';

export function EvidenceExport({ product, history }: { product: Product; history: unknown[] }) {
  function download() {
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), product,
      rating: evaluateEvidence(product.evidence), history,
      note: 'Evidence coverage is not a safety or efficacy rating. Source retrieval dates are preserved.' }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `neurotrino-${product.npn}-evidence.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <button className="text-button" onClick={download}>Export evidence JSON <ArrowUpRight size={14}/></button>;
}
