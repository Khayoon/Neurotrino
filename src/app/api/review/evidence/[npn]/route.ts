import { cookies } from 'next/headers';
import { validOrigin,validSession,SESSION_COOKIE } from '@/lib/auth';
import { evidenceInput } from '@/lib/review-validation';
import { getProduct,saveEvidence } from '@/lib/db';
export async function POST(request:Request,{params}:{params:Promise<{npn:string}>}){
  if(!validOrigin(request)||!await validSession((await cookies()).get(SESSION_COOKIE)?.value))return Response.json({error:'Editor sign-in required'},{status:403});
  const npn=(await params).npn;const product=await getProduct(npn);if(!product)return Response.json({error:'Product not found'},{status:404});
  let body:unknown;try{body=await request.json();}catch{return Response.json({error:'Invalid JSON'},{status:400});}
  const parsed=evidenceInput.safeParse(body);if(!parsed.success)return Response.json({error:parsed.error.issues.map(i=>i.message).join('; ')},{status:400});
  const {revision,attested,...input}=parsed.data;
  try{const evidence=await saveEvidence(product.id,input,revision);return Response.json({ok:true,evidence});}catch(error){if(error instanceof Error&&error.message==='CONFLICT')return Response.json({error:'This check changed since you opened it. Reload before saving.'},{status:409});return Response.json({error:'Could not save the review. No success has been recorded.'},{status:500});}
}
