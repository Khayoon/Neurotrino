import { NextResponse } from 'next/server';
import { validOrigin, SESSION_COOKIE } from '@/lib/auth';
export async function POST(request:Request){if(!validOrigin(request))return NextResponse.json({error:'Request origin not allowed'},{status:403});const response=NextResponse.json({ok:true});response.cookies.delete(SESSION_COOKIE);return response;}
