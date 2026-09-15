export function unwrapRecords(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) return value as Record<string, unknown>[];
  if (value && typeof value === 'object') {
    const object=value as Record<string, unknown>;
    for (const key of ['data', 'results', 'result']) if (Array.isArray(object[key])) return object[key] as Record<string, unknown>[];
  }
  return [];
}
export function readable(value: unknown): string {
  return typeof value === 'string' ? value.replace(/<[^>]+>/g, '').trim() : value == null ? '' : String(value);
}
export function slugify(value: string) { return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
