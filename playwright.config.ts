import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
const bundled='C:/Users/skhay/AppData/Local/ms-playwright/chromium-1194/chrome-win/chrome.exe';
const executablePath=process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||(existsSync(bundled)?bundled:undefined);
export default defineConfig({
  testDir:'./tests/e2e',fullyParallel:false,workers:1,timeout:60000,
  use:{baseURL:'http://127.0.0.1:3010',viewport:{width:1440,height:1000},launchOptions:{executablePath},trace:'retain-on-failure'},
  reporter:[['list'],['html',{open:'never'}]],
  webServer:process.env.E2E_EXTERNAL_SERVER==='1'?undefined:{command:'node --preserve-symlinks --preserve-symlinks-main node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3010',url:'http://127.0.0.1:3010',reuseExistingServer:false,timeout:120000,env:{DATABASE_URL:'',NEUROTRINO_DATA_DIR:`.data/e2e-${randomUUID()}`,EDITOR_TOKEN:'isolated-e2e-editor-token-not-for-deployment',APP_ORIGIN:'http://127.0.0.1:3010',NEXT_TELEMETRY_DISABLED:'1'}},
});
