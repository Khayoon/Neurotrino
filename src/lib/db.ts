import { mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { PGlite } from '@electric-sql/pglite';
import { Pool } from 'pg';
import snapshots from '../data/product-snapshots.json';
import { ingredients } from '../data/ingredients';
import { editorialEvidence } from '../data/editorial-evidence';
import { brandHistory } from '../data/brand-history';
import { readable, slugify, unwrapRecords } from './normalise';
import { criteria } from './rating';
import type { Evidence, Product, Snapshot } from './types';

export interface Queryable { query<T = Record<string, unknown>>(text: string, values?: unknown[]): Promise<{ rows: T[] }> }
export interface Database extends Queryable { transaction<T>(fn: (db: Queryable) => Promise<T>): Promise<T>; close(): Promise<void> }
declare global { var neurotrinoDb: Promise<Database> | undefined }
export const dataDir = () => resolve(process.env.NEUROTRINO_DATA_DIR || '.data');

async function connect(): Promise<Database> {
  let db: Database;
  const schema = await readFile(resolve('sql/001-initial.sql'), 'utf8');
  if (process.env.DATABASE_URL) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
    db = {
      query: async <T>(sql: string, values?: unknown[]) => ({ rows: (await pool.query(sql,values)).rows as T[] }),
      transaction: async fn => {
        const client = await pool.connect();
        try { await client.query('BEGIN'); const value = await fn({ query: async <T>(sql: string, values?: unknown[]) => ({ rows: (await client.query(sql,values)).rows as T[] }) }); await client.query('COMMIT'); return value; }
        catch (error) { await client.query('ROLLBACK'); throw error; }
        finally { client.release(); }
      },
      close: () => pool.end(),
    };
    await pool.query(schema);
  } else {
    await mkdir(dataDir(), { recursive: true });
    const pg = new PGlite(resolve(dataDir(), 'postgres'));
    await pg.exec(schema);
    db = {
      query: async <T>(sql: string, values?: unknown[]) => ({ rows: (await pg.query(sql,values)).rows as T[] }),
      transaction: fn => pg.transaction(tx => fn({ query: async <T>(sql: string, values?: unknown[]) => ({ rows: (await tx.query(sql,values)).rows as T[] }) })),
      close: () => pg.close(),
    };
  }
  await db.transaction(async tx => {
    for (const ingredient of ingredients) await tx.query('INSERT INTO nt_ingredients(slug,name) VALUES($1,$2) ON CONFLICT DO NOTHING',[ingredient.slug,ingredient.name]);
    for (const snapshot of snapshots as Snapshot[]) {
      const existing = await tx.query('SELECT id FROM nt_products WHERE npn=$1',[snapshot.npn]);
      if (!existing.rows.length) await storeSnapshot(tx,snapshot,'seed');
    }
    for(const history of brandHistory){
      const saved=await tx.query('UPDATE nt_brands SET founded_year=$1,history_source=$2,history_note=$3 WHERE id=$4 AND history_source IS NULL AND history_note IS NULL AND founded_year IS NULL RETURNING id',[history.year,history.source,history.note,history.id]);
      if(saved.rows.length)await tx.query('INSERT INTO nt_audit(id,action,actor,created_at,after_data) VALUES($1,$2,$3,$4,$5::jsonb)',[randomUUID(),'brand-history-reviewed','source-research','2026-09-14T00:00:00.000Z',JSON.stringify(history)]);
    }
    for(const item of editorialEvidence){
      const exists=await tx.query('SELECT id FROM nt_evidence WHERE product_id=$1 AND kind=$2',[item.product_id,item.kind]);
      if(exists.rows.length)continue;
      await tx.query('INSERT INTO nt_evidence(id,product_id,kind,verdict,summary,source_url,source_title,publisher,scope,checked_at,expires_at,revision) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',[item.id,item.product_id,item.kind,item.verdict,item.summary,item.source_url,item.source_title,item.publisher,item.scope,item.checked_at,item.expires_at,item.revision]);
      await tx.query('INSERT INTO nt_audit(id,product_id,action,actor,created_at,after_data) VALUES($1,$2,$3,$4,$5,$6::jsonb)',[randomUUID(),item.product_id,'certification-reviewed','source-research',item.checked_at,JSON.stringify(item)]);
    }
  });
  return db;
}
export async function getDb() {
  if (!globalThis.neurotrinoDb) globalThis.neurotrinoDb=connect().catch(error => { globalThis.neurotrinoDb=undefined; throw error; });
  return globalThis.neurotrinoDb;
}

export async function storeSnapshot(db: Queryable, snapshot: Snapshot, actor: string) {
  const licence=snapshot.licence;
  if (snapshot.npn !== licence.licence_number || !/^\d{8}$/.test(snapshot.npn)) throw new Error('Licence identity mismatch');
  const id=snapshot.npn;
  const prior=await db.query('SELECT * FROM nt_products WHERE id=$1',[id]);
  const brandId=slugify(snapshot.brand);
  const medicinal=unwrapRecords(snapshot.medicinalingredient);
  const purposes=unwrapRecords(snapshot.productpurpose).map(x=>readable(x.purpose)).filter(Boolean);
  const risks=unwrapRecords(snapshot.productrisk).map(x=>[readable(x.risk_type_desc),readable(x.risk_text)].filter(Boolean).join(': ')).filter(Boolean);
  await db.query('INSERT INTO nt_brands(id,name) VALUES($1,$2) ON CONFLICT DO NOTHING',[brandId,snapshot.brand]);
  await db.query(`INSERT INTO nt_products(id,slug,name,brand_id,ingredient_slug,npn,form,licence_holder,licence_date,licence_status,checked_at,manufacturer_url,aliases,medicinal,purposes,risks)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13::jsonb,$14::jsonb,$15::jsonb,$16::jsonb)
    ON CONFLICT(id) DO UPDATE SET name=EXCLUDED.name,form=EXCLUDED.form,licence_holder=EXCLUDED.licence_holder,licence_date=EXCLUDED.licence_date,licence_status=EXCLUDED.licence_status,checked_at=EXCLUDED.checked_at,aliases=EXCLUDED.aliases,medicinal=EXCLUDED.medicinal,purposes=EXCLUDED.purposes,risks=EXCLUDED.risks`,
    [id,`${slugify(snapshot.brand)}-${snapshot.npn}`,licence.product_name,brandId,snapshot.ingredient,id,licence.dosage_form,licence.company_name,licence.licence_date,licence.flag_product_status===1?'active':'inactive',snapshot.checkedAt,snapshot.manufacturerUrl,JSON.stringify(snapshot.aliases),JSON.stringify(medicinal),JSON.stringify(purposes),JSON.stringify(risks)]);
  for (const kind of ['licence','transparency'] as const) {
    const expires=new Date(Date.parse(snapshot.checkedAt)+30*86400000).toISOString();
    const verdict=kind==='licence'?(licence.flag_product_status!==1?'concern':'verified'):(medicinal.length?'verified':'unknown');
    const summary=kind==='licence' ? `NPN ${id} matches this record. Health Canada reports ${licence.flag_product_status===1?'an active':'a non-active'} licence. This is a product licence, not a brand endorsement.` : medicinal.length?'The licence holder, product identity, and medicinal ingredient record are publicly traceable through Health Canada. This does not establish independent testing.':'The licence and holder are traceable, but the ingredient endpoint returned no entries. Formulation transparency remains unverified; consult the current label and licence monograph.';
    await db.query(`INSERT INTO nt_evidence(id,product_id,kind,verdict,summary,source_url,source_title,publisher,scope,checked_at,expires_at)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      ON CONFLICT(product_id,kind) DO UPDATE SET verdict=EXCLUDED.verdict,summary=EXCLUDED.summary,source_url=EXCLUDED.source_url,checked_at=EXCLUDED.checked_at,expires_at=EXCLUDED.expires_at,revision=nt_evidence.revision+1`,
      [`${id}-${kind}`,id,kind,verdict,summary,`https://health-products.canada.ca/lnhpd-bdpsnh/info?licence=${id}`,'Licensed Natural Health Products Database','Health Canada',`Canadian licence ${id}; no batch testing assertion`,snapshot.checkedAt,expires]);
  }
  await db.query('INSERT INTO nt_snapshots(id,product_id,source_url,retrieved_at,content) VALUES($1,$2,$3,$4,$5::jsonb)',[randomUUID(),id,snapshot.sourceUrl,snapshot.checkedAt,JSON.stringify(snapshot)]);
  await db.query('INSERT INTO nt_audit(id,product_id,action,actor,created_at,before_data,after_data) VALUES($1,$2,$3,$4,$5,$6::jsonb,$7::jsonb)',[randomUUID(),id,prior.rows.length?'licence-refreshed':'product-imported',actor,snapshot.checkedAt,JSON.stringify(prior.rows[0]??null),JSON.stringify({npn:id,status:licence.flag_product_status})]);
}

export async function getProducts(): Promise<Product[]> {
  const db=await getDb();
  const [products,evidence]=await Promise.all([
    db.query<Omit<Product,'evidence'>>('SELECT p.*,b.name AS brand FROM nt_products p JOIN nt_brands b ON b.id=p.brand_id ORDER BY b.name,p.name'),
    db.query<Evidence>('SELECT * FROM nt_evidence'),
  ]);
  return products.rows.map(product=>({...product,evidence:evidence.rows.filter(e=>e.product_id===product.id)}));
}
export async function getProduct(slug: string) { return (await getProducts()).find(p=>p.slug===slug||p.npn===slug); }
export async function getAudit(productId?: string) {
  const db=await getDb();
  return (await db.query<{id:string;product_id:string;action:string;actor:string;created_at:string;before_data:unknown;after_data:unknown}>(`SELECT * FROM nt_audit ${productId?'WHERE product_id=$1':''} ORDER BY created_at DESC LIMIT 50`,productId?[productId]:[])).rows;
}
export async function getSyncRuns() {
  return (await (await getDb()).query<{id:string;started_at:string;finished_at:string;status:string;succeeded:number;failed:number;message:string}>('SELECT * FROM nt_sync_runs ORDER BY started_at DESC LIMIT 8')).rows;
}
export interface BrandHistory { id:string;name:string;founded_year:number|null;history_source:string|null;history_note:string|null }
export async function getBrands() { return (await (await getDb()).query<BrandHistory>('SELECT * FROM nt_brands ORDER BY name')).rows; }
export async function saveBrandHistory(id:string,year:number|null,source:string,note:string){
  const db=await getDb();return db.transaction(async tx=>{
    const prior=(await tx.query<BrandHistory>('SELECT * FROM nt_brands WHERE id=$1 FOR UPDATE',[id])).rows[0];if(!prior)throw new Error('Brand not found');
    await tx.query('UPDATE nt_brands SET founded_year=$1,history_source=$2,history_note=$3 WHERE id=$4',[year,source,note,id]);
    await tx.query('INSERT INTO nt_audit(id,action,actor,created_at,before_data,after_data) VALUES($1,$2,$3,$4,$5::jsonb,$6::jsonb)',[randomUUID(),'brand-history-reviewed','editor',new Date().toISOString(),JSON.stringify(prior),JSON.stringify({id,founded_year:year,history_source:source,history_note:note})]);
  });
}
export async function saveEvidence(productId: string, input: Omit<Evidence,'id'|'product_id'|'expires_at'|'revision'>, expectedRevision: number) {
  const db=await getDb();
  return db.transaction(async tx=>{
    const prior=(await tx.query<Evidence>('SELECT * FROM nt_evidence WHERE product_id=$1 AND kind=$2 FOR UPDATE',[productId,input.kind])).rows[0];
    if ((prior?.revision??0)!==expectedRevision) throw new Error('CONFLICT');
    const criterion=criteria.find(c=>c.kind===input.kind)!;
    const next={...input,id:`${productId}-${input.kind}`,product_id:productId,expires_at:new Date(Date.parse(input.checked_at)+criterion.days*86400000).toISOString(),revision:expectedRevision+1};
    const saved=await tx.query(`INSERT INTO nt_evidence(id,product_id,kind,verdict,summary,source_url,source_title,publisher,scope,checked_at,expires_at,revision)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      ON CONFLICT(product_id,kind) DO UPDATE SET verdict=EXCLUDED.verdict,summary=EXCLUDED.summary,source_url=EXCLUDED.source_url,source_title=EXCLUDED.source_title,publisher=EXCLUDED.publisher,scope=EXCLUDED.scope,checked_at=EXCLUDED.checked_at,expires_at=EXCLUDED.expires_at,revision=EXCLUDED.revision WHERE nt_evidence.revision=$13 RETURNING id`,
      [next.id,productId,next.kind,next.verdict,next.summary,next.source_url,next.source_title,next.publisher,next.scope,next.checked_at,next.expires_at,next.revision,expectedRevision]);
    if(!saved.rows.length)throw new Error('CONFLICT');
    await tx.query('INSERT INTO nt_audit(id,product_id,action,actor,created_at,before_data,after_data) VALUES($1,$2,$3,$4,$5,$6::jsonb,$7::jsonb)',[randomUUID(),productId,'evidence-reviewed','editor',new Date().toISOString(),JSON.stringify(prior??null),JSON.stringify(next)]);
    return next;
  });
}
