import './env';
import { getDb,getProducts } from '../src/lib/db';
const db=await getDb();const products=await getProducts();console.log(JSON.stringify({backend:process.env.DATABASE_URL?'PostgreSQL':'Embedded PostgreSQL (PGlite)',products:products.length,brands:new Set(products.map(p=>p.brand_id)).size,ingredients:new Set(products.map(p=>p.ingredient_slug)).size},null,2));await db.close();
