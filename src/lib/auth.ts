import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { dataDir } from './db';
export const SESSION_COOKIE='neurotrino-editor';
export async function editorToken() {
  if (process.env.EDITOR_TOKEN) {
    if (process.env.EDITOR_TOKEN.length<32) throw new Error('EDITOR_TOKEN must be at least 32 characters');
    return process.env.EDITOR_TOKEN;
  }
  if (process.env.DATABASE_URL || (process.env.APP_ORIGIN && !isLocalOrigin(process.env.APP_ORIGIN))) throw new Error('Set EDITOR_TOKEN for a hosted installation');
  await mkdir(dataDir(),{recursive:true});
  const path=resolve(dataDir(),'editor-token');
  try { return (await readFile(path,'utf8')).trim(); }
  catch(error) {
    if ((error as NodeJS.ErrnoException).code!=='ENOENT') throw error;
    const token=randomBytes(32).toString('hex');
    try { await writeFile(path,token+'\n',{flag:'wx',mode:0o600}); return token; }
    catch(error) { if((error as NodeJS.ErrnoException).code==='EEXIST') return (await readFile(path,'utf8')).trim(); throw error; }
  }
}
export const isLocalOrigin=(origin:string)=>{try{return ['localhost','127.0.0.1','[::1]'].includes(new URL(origin).hostname);}catch{return false;}};
export function safeEqual(a:string,b:string) { const left=Buffer.from(a); const right=Buffer.from(b); return left.length===right.length && timingSafeEqual(left,right); }
export async function createSession() { const expires=String(Date.now()+8*60*60*1000); return `${expires}.${createHmac('sha256',await editorToken()).update(expires).digest('hex')}`; }
export async function validSession(value?:string) {
  if(!value) return false;
  const [expires,signature]=value.split('.');
  if(!signature||!/^\d+$/.test(expires)||Number(expires)<=Date.now()||Number(expires)>Date.now()+8*60*60*1000) return false;
  return safeEqual(signature,createHmac('sha256',await editorToken()).update(expires).digest('hex'));
}
export function validOrigin(request:Request) {
  const origin=request.headers.get('origin');
  if(!origin) return false;
  const url=new URL(request.url);
  return origin===url.origin || (!!process.env.APP_ORIGIN && origin===process.env.APP_ORIGIN);
}
