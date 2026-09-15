import { cookies } from 'next/headers';
import { validOrigin,validSession,SESSION_COOKIE } from '@/lib/auth';
import { refreshProducts } from '@/lib/health-canada';
export const maxDuration=60;
let busy=false;
export async function POST(request:Request){if(!validOrigin(request)||!await validSession((await cookies()).get(SESSION_COOKIE)?.value))return Response.json({error:'Editor sign-in required'},{status:403});if(busy)return Response.json({error:'A refresh is already running'},{status:409});let body:unknown;try{body=await request.json();}catch{return Response.json({error:'Invalid request'},{status:400});}const npn=(body as {npn?:unknown})?.npn;if(typeof npn!=='string'||!/^\d{8}$/.test(npn))return Response.json({error:'Choose one product to refresh'},{status:400});busy=true;try{const result=await refreshProducts(npn);return Response.json(result,{status:result.failed?502:200});}finally{busy=false;}}
