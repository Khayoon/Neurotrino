import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import type { Snapshot } from './types';
import { unwrapRecords } from './normalise';
import { getDb, getProducts, storeSnapshot } from './db';
const licenceSchema=z.object({lnhpd_id:z.number().int(),licence_number:z.string().regex(/^\d{8}$/),product_name:z.string().min(1),company_name:z.string().min(1),licence_date:z.string(),dosage_form:z.string(),flag_product_status:z.number().int(),flag_primary_name:z.number().optional()}).passthrough();
const base='https://health-products.canada.ca/api/natural-licences/';
async function fetchJson(url:string) { const response=await fetch(url,{signal:AbortSignal.timeout(20000),cache:'no-store',headers:{Accept:'application/json'}});if(!response.ok)throw new Error(`Health Canada returned HTTP ${response.status}`);return response.json(); }
export async function fetchSnapshot(npn:string,ingredient:string,brand?:string,manufacturerUrl=''):Promise<Snapshot>{
  if(!/^\d{8}$/.test(npn))throw new Error('NPN must contain exactly eight digits');
  const sourceUrl=`${base}productlicence/?lang=en&type=json&id=${npn}`;
  const response=await fetchJson(sourceUrl);const raw=unwrapRecords(response);const licences=z.array(licenceSchema).min(1).parse(raw);
  if(licences.some(l=>l.licence_number!==npn))throw new Error('Health Canada returned a different licence identity');
  const licence=licences.find(l=>l.flag_primary_name===1)??licences[0];
  const endpoints=['medicinalingredient','productpurpose','productrisk','productdose'] as const;
  const detail:Record<string,unknown>={};
  for(const endpoint of endpoints){
    const value=await fetchJson(`${base}${endpoint}/?lang=en&type=json&id=${licence.lnhpd_id}`);
    if(!Array.isArray(value)&&!(value&&typeof value==='object'&&Array.isArray(value.data)))throw new Error(`Unexpected ${endpoint} response`);
    if(unwrapRecords(value).some(row=>row.lnhpd_id!==licence.lnhpd_id))throw new Error(`${endpoint} identity mismatch`);
    detail[endpoint]=value;
  }
  return {npn,ingredient,brand:brand||licence.company_name,manufacturerUrl,sourceUrl,checkedAt:new Date().toISOString(),licence,aliases:licences.map(l=>l.product_name),medicinalingredient:detail.medicinalingredient,productpurpose:detail.productpurpose,productrisk:detail.productrisk,productdose:detail.productdose};
}
export async function refreshProducts(npn?:string){
  const db=await getDb();const runId=randomUUID();const started=new Date().toISOString();
  await db.query('INSERT INTO nt_sync_runs(id,started_at,status) VALUES($1,$2,$3)',[runId,started,'running']);
  let succeeded=0;let failed=0;const errors:string[]=[];
  try{
    const products=(await getProducts()).filter(p=>!npn||p.npn===npn);
    if(!products.length)throw new Error('No matching product to refresh');
    for(const product of products){
      try{const snapshot=await fetchSnapshot(product.npn,product.ingredient_slug,product.brand,product.manufacturer_url);if(product.medicinal.length&&!unwrapRecords(snapshot.medicinalingredient).length)throw new Error('Ingredient response unexpectedly empty; previous record retained');await db.transaction(tx=>storeSnapshot(tx,snapshot,'health-canada-sync'));succeeded++;}
      catch(error){failed++;errors.push(`${product.npn}: ${error instanceof Error?error.message:'Retrieval failed'}`);}
    }
  }catch(error){failed++;errors.push(error instanceof Error?error.message:'Refresh failed');}
  const status=failed?(succeeded?'partial':'failed'):'complete';const message=errors.join('; ')||'Licence records refreshed. Testing, manufacturing, and recall reviews are unchanged.';
  await db.query('UPDATE nt_sync_runs SET finished_at=$1,status=$2,succeeded=$3,failed=$4,message=$5 WHERE id=$6',[new Date().toISOString(),status,succeeded,failed,message,runId]);
  return {runId,status,succeeded,failed,message};
}
