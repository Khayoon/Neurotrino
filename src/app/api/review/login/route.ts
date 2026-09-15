import { NextResponse } from 'next/server';
import { createSession, editorToken, safeEqual, SESSION_COOKIE, validOrigin, isLocalOrigin } from '@/lib/auth';
const attempts=new Map<string,{count:number;since:number}>();
export async function POST(request:Request){
  if(!validOrigin(request))return NextResponse.json({error:'Request origin not allowed'},{status:403});
  if(!process.env.EDITOR_TOKEN&&!isLocalOrigin(new URL(request.url).origin))return NextResponse.json({error:'Configure an editor token for this host'},{status:403});
  const key='login';const now=Date.now();let attempt=attempts.get(key);if(!attempt||now-attempt.since>60000){attempt={count:0,since:now};attempts.set(key,attempt);}if(attempt.count>=10)return NextResponse.json({error:'Too many attempts. Try again in a minute.'},{status:429});attempt.count++;
  try{const input=await request.json();if(typeof input.token!=='string'||input.token.length>500||!safeEqual(input.token,await editorToken()))return NextResponse.json({error:'That editor key is not valid.'},{status:401});const response=NextResponse.json({ok:true});response.cookies.set(SESSION_COOKIE,await createSession(),{httpOnly:true,sameSite:'strict',secure:new URL(request.url).protocol==='https:',path:'/',maxAge:8*60*60});attempts.delete(key);return response;}catch{return NextResponse.json({error:'The editorial desk is not configured. Check the server configuration.'},{status:503});}
}
