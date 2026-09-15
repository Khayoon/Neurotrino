// One-time research capture. Runtime refreshes are implemented separately and audited.
import { mkdir, writeFile, readFile } from 'node:fs/promises';
const candidates = [
  ['80079431', 'creatine', 'Blue Star Nutraceuticals', 'https://ca.bluestarnutraceuticals.com/products/creatine-monohydrate'],
  ['80063975', 'magnesium', 'Jamieson', 'https://www.jamiesonvitamins.com/products/magnesium-powder-lemon-lime'],
  ['80005079', 'magnesium', 'Jamieson', 'https://www.jamiesonvitamins.com/products/magnesium-caplets'],
  ['80143940', 'magnesium', 'Jamieson', 'https://www.jamiesonvitamins.com/products/pure-magnesium-l-threonate'],
  ['80102907', 'creatine', 'HD Muscle', ''],
  ['80027038', 'creatine', 'Optimum Nutrition', ''],
  ['80008605', 'creatine', 'NOW', 'https://nowfoods.ca/product/creatine-monohydrate-pure/'],
  ['80142697', 'creatine', 'Landish', 'https://landish.ca/products/creatine'],
  ['80012124', 'vitamin-d', 'Webber Naturals', 'https://webbernaturals.com/products/vitamin-d3-1000-iu-liquid'],
  ['80012207', 'vitamin-d', 'Webber Naturals', ''],
  ['80119840', 'l-theanine', 'Webber Naturals', 'https://webbernaturals.com/products/l-theanine-250-mg'],
  ['80017548', 'l-theanine', 'Pure Encapsulations', 'https://www.atriumpro.ca/media/pdf_upload/LTH6C_V2.pdf'],
  ['80054972', 'melatonin', 'Jamieson', 'https://www.jamiesonvitamins.com/products/melatonin-10-mg-fast-dissolving'],
  ['80048886', 'melatonin', 'Webber Naturals', 'https://webbernaturals.com/products/melatonin-1-mg-quick-dissolve-sublingual-tablets'],
  ['80003179', 'omega-3', 'Jamieson', 'https://www.jamiesonvitamins.com/products/omega-3-complete'],
  ['80045582', 'omega-3', 'Jamieson', 'https://www.jamiesonvitamins.com/products/omega-3-mini-softgel'],
  ['80028808', 'omega-3', 'Webber Naturals', 'https://webbernaturals.com/products/omega-3-700-mg-no-fishy-aftertaste'],
];
const base = 'https://health-products.canada.ca/api/natural-licences/';
const result=JSON.parse(await readFile('src/data/product-snapshots.json','utf8').catch(()=>'[]'));
for (const [npn, ingredient, brand, manufacturerUrl] of candidates) {
  if(result.some(p=>p.npn===npn))continue;
  const url = `${base}productlicence/?lang=en&type=json&id=${npn}`;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const licenceResponse=await response.json();
    const licences = Array.isArray(licenceResponse)?licenceResponse:licenceResponse.data;
    if (!Array.isArray(licences) || !licences.length || licences.some(x => x.licence_number !== npn)) throw new Error('Unexpected licence response');
    const licence=licences.find(x => x.flag_primary_name === 1) ?? licences[0];
    const endpoints = ['medicinalingredient','productpurpose','productrisk','productdose'];
    const detail = {};
    for (const endpoint of endpoints) {
      const detailUrl=`${base}${endpoint}/?lang=en&type=json&id=${licence.lnhpd_id}`;
      const response=await fetch(detailUrl,{signal:AbortSignal.timeout(25000)});
      if (!response.ok) throw new Error(`${endpoint}: HTTP ${response.status}`);
      detail[endpoint]=await response.json();
    }
    result.push({npn,ingredient,brand,manufacturerUrl,sourceUrl:url,checkedAt:new Date().toISOString(),licence,aliases:licences.map(x=>x.product_name),...detail});
    console.log(`${npn}: ${licence.product_name} / ${licence.company_name} / status ${licence.flag_product_status}`);
  } catch(error) { console.error(`${npn}: ${error.message}`); }
}
await mkdir('src/data',{recursive:true});
await writeFile('src/data/product-snapshots.json',JSON.stringify(result,null,2)+'\n');
console.log(`Saved ${result.length} of ${candidates.length} complete records.`);
if(result.length!==candidates.length) process.exitCode=1;
