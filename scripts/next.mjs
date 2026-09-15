import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
const args=process.argv.slice(2);
if (['dev','start'].includes(args[0]) && !args.includes('--hostname')) args.push('--hostname','127.0.0.1');
const child = spawn(process.execPath, ['--preserve-symlinks', '--preserve-symlinks-main', resolve('node_modules/next/dist/bin/next'), ...args], {
  stdio: 'inherit',
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1', NODE_OPTIONS: `${process.env.NODE_OPTIONS || ''} --preserve-symlinks --preserve-symlinks-main`.trim() },
});
child.on('exit', code => process.exit(code ?? 1));
for(const signal of ['SIGINT','SIGTERM']) process.on(signal,()=>{child.kill(signal);});
