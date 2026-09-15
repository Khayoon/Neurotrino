import { cookies } from 'next/headers';
import { validSession,SESSION_COOKIE } from '@/lib/auth';
import { getProducts,getBrands } from '@/lib/db';
import { EditorLogin,ReviewDesk } from '@/components/review-desk';
export const metadata={title:'Editorial desk',robots:{index:false,follow:false}};
export default async function Review(){const signedIn=await validSession((await cookies()).get(SESSION_COOKIE)?.value);return <main id="main" className="wrap directory-page">{signedIn?<ReviewDesk products={await getProducts()} brands={await getBrands()}/>:<EditorLogin/>}</main>;}
