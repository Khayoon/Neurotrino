import { cookies } from 'next/headers';
import { z } from 'zod';
import { validOrigin,validSession,SESSION_COOKIE } from '@/lib/auth';
import { saveBrandHistory } from '@/lib/db';
const schema=z.object({year:z.number().int().min(1600).max(new Date().getUTCFullYear()).nullable(),source:z.url().refine(s=>new URL(s).protocol==='https:'),note:z.string().trim().min(30).max(1500)});
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){
  if(!validOrigin(request)||!await validSession((await cookies()).get(SESSION_COOKIE)?.value))return Response.json({error:'Editor sign-in required'},{status:403});
  let body:unknown;try{body=await request.json();}catch{return Response.json({error:'Invalid JSON'},{status:400});}const parsed=schema.safeParse(body);if(!parsed.success)return Response.json({error:parsed.error.issues.map(i=>i.message).join('; ')},{status:400});
  try{await saveBrandHistory((await params).id,parsed.data.year,parsed.data.source,parsed.data.note);return Response.json({ok:true});}catch{return Response.json({error:'Could not save brand history'},{status:400});}
}
