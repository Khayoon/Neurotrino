import './env';
import { getDb } from '../src/lib/db';
import { refreshProducts } from '../src/lib/health-canada';
// Run on a schedule chosen by the deployment operator. Never run concurrently with a local app on the same PGlite directory.
try{const result=await refreshProducts(process.argv[2]);console.log(JSON.stringify(result,null,2));if(result.failed)process.exitCode=1;}finally{await (await getDb()).close();}
