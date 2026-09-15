import { readFile,writeFile } from 'node:fs/promises';
const packageFile=JSON.parse(await readFile('package.json','utf8'));
for(const group of ['dependencies','devDependencies'])for(const name of Object.keys(packageFile[group]))packageFile[group][name]=JSON.parse(await readFile(`node_modules/${name}/package.json`,'utf8')).version;
await writeFile('package.json',JSON.stringify(packageFile,null,2)+'\n');
