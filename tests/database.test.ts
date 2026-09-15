import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { getDb,getProducts,getAudit,saveEvidence } from '../src/lib/db';
import { refreshProducts,fetchSnapshot } from '../src/lib/health-canada';
import { evaluateEvidence } from '../src/lib/rating';

test('persistent PostgreSQL, review transactions, and failure preservation',async t=>{
  process.env.NEUROTRINO_DATA_DIR=resolve('.data',`unit-${randomUUID()}`);delete process.env.DATABASE_URL;
  const db=await getDb();
  try{
    const products=await getProducts();const product=products.find(p=>p.npn==='80005079')!;
    await t.test('real seed identities and original product categories are present',()=>{assert.ok(products.length>=17);assert.equal(new Set(products.map(p=>p.ingredient_slug)).size,6);assert.equal(new Set(products.map(p=>p.npn)).size,products.length);assert.ok(products.every(p=>/^\d{8}$/.test(p.npn)));});
    await t.test('missing formulation records are disclosed and do not earn traceability points',()=>{const sparse=products.find(p=>p.npn==='80079431')!;assert.equal(sparse.medicinal.length,0);assert.equal(sparse.evidence.find(e=>e.kind==='transparency')?.verdict,'unknown');assert.equal(sparse.evidence.find(e=>e.kind==='testing')?.verdict,'verified');assert.ok(sparse.evidence.find(e=>e.kind==='testing')?.scope.includes('inference'));});
    const input={kind:'testing' as const,verdict:'unknown' as const,summary:'Automated test: no independent evidence has been established.',source_url:'https://example.org/test-fixture',source_title:'Isolated test fixture',publisher:'Test runner',scope:'Isolated test database only, not published evidence.',checked_at:new Date().toISOString()};
    await t.test('a saved review is persisted and auditable',async()=>{const saved=await saveEvidence(product.id,input,0);assert.equal(saved.revision,1);assert.ok((await getAudit(product.id)).some(a=>a.action==='evidence-reviewed'));assert.equal((await getProducts()).find(p=>p.id===product.id)?.evidence.find(e=>e.kind==='testing')?.summary,input.summary);});
    await t.test('stale editor revision cannot overwrite a newer review',async()=>{await assert.rejects(()=>saveEvidence(product.id,{...input,summary:'This stale edit must never replace the current assessment.'},0),/CONFLICT/);assert.equal((await getProducts()).find(p=>p.id===product.id)?.evidence.find(e=>e.kind==='testing')?.revision,1);});
    await t.test('a transaction rollback leaves no partial audit',async()=>{const before=(await getAudit(product.id)).length;await assert.rejects(()=>db.transaction(async tx=>{await tx.query('INSERT INTO nt_audit(id,action,actor,created_at) VALUES($1,$2,$3,$4)',[randomUUID(),'should-roll-back','test',new Date().toISOString()]);throw new Error('rollback');}));assert.equal((await getAudit(product.id)).length,before);});
    await t.test('an upstream failure preserves last-known record and freshness dates',async()=>{const original=globalThis.fetch;globalThis.fetch=async()=>new Response('Unavailable',{status:503});try{const before=(await getProducts()).find(p=>p.id===product.id)!;const result=await refreshProducts(product.npn);const after=(await getProducts()).find(p=>p.id===product.id)!;assert.equal(result.status,'failed');assert.equal(result.succeeded,0);assert.equal(after.checked_at,before.checked_at);assert.deepEqual(after.evidence,before.evidence);assert.equal(evaluateEvidence(after.evidence).score,evaluateEvidence(before.evidence).score);}finally{globalThis.fetch=original;}});
    await t.test('a wrong upstream NPN is rejected before storage',async()=>{const original=globalThis.fetch;globalThis.fetch=async()=>Response.json([{lnhpd_id:1,licence_number:'99999999',product_name:'Wrong record',company_name:'Fixture',licence_date:'2020-01-01',dosage_form:'Capsule',flag_product_status:1}]);try{await assert.rejects(()=>fetchSnapshot(product.npn,product.ingredient_slug),/different licence identity/);}finally{globalThis.fetch=original;}});
  }finally{await db.close();globalThis.neurotrinoDb=undefined;}
});
