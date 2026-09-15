'use client';
import { useSearchParams } from 'next/navigation';
import { SupplementExplorer } from './supplement-explorer';
import { Comparison } from './comparison';
import type { Product } from '@/lib/types';

export function ExplorerEntry() {
  const mine = useSearchParams().get('view') === 'collection';
  return <SupplementExplorer key={mine ? 'mine' : 'all'} initialCollection={mine}/>;
}

export function ComparisonEntry({ products }: { products: Product[] }) {
  const value = useSearchParams().get('ids');
  const requested = value === null ? undefined : [...new Set(value.split(',').filter(id => /^\d{8}$/.test(id)))].slice(0, 3);
  return <Comparison products={products} requested={requested}/>;
}
