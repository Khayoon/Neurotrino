import { cookies } from 'next/headers';
import { z } from 'zod';
import { validOrigin,validSession,SESSION_COOKIE } from '@/lib/auth';
import { fetchSnapshot } from '@/lib/health-canada';
import { getDb, getProduct, storeSnapshot } from '@/lib/db';
import { licenceIngredientPatterns } from '@/data/licence-ingredients';
import { unwrapRecords } from '@/lib/normalise';
export const maxDuration=60;
const schema=z.object({npn:z.string().regex(/^\d{8}$/),ingredient:z.string().refine(s=>Object.hasOwn(licenceIngredientPatterns,s)),attested:z.literal(true)});
export async function POST(request:Request){
  if(!validOrigin(request)||!await validSession((await cookies()).get(SESSION_COOKIE)?.value))return Response.json({error:'Editor sign-in required'},{status:403});
  let body:unknown;try{body=await request.json();}catch{return Response.json({error:'Invalid JSON'},{status:400});}const parsed=schema.safeParse(body);if(!parsed.success)return Response.json({error:'Enter an eight-digit NPN, choose an ingredient, and confirm the match.'},{status:400});
  if(await getProduct(parsed.data.npn))return Response.json({error:'This product already exists. Use Refresh licence instead.'},{status:409});
  try{const snapshot=await fetchSnapshot(parsed.data.npn,parsed.data.ingredient);
    if(!licenceIngredientPatterns[parsed.data.ingredient].test(JSON.stringify(unwrapRecords(snapshot.medicinalingredient))))return Response.json({error:'The ingredient record does not match the selected guide. Review the official licence.'},{status:400});
    await (await getDb()).transaction(tx=>storeSnapshot(tx,snapshot,'editor-import'));return Response.json({ok:true,message:'Official record imported. The licence holder is used as the display brand until its consumer-brand identity is researched.'});
  }catch{return Response.json({error:'The official record could not be retrieved and validated. Nothing was imported.'},{status:502});}
}
