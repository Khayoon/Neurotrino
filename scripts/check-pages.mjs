import { chromium, expect } from '@playwright/test';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { servePages } from './preview-pages.mjs';

const server = process.env.PAGES_URL ? undefined : servePages();
const base = process.env.PAGES_URL || 'http://127.0.0.1:3020/Neurotrino/';
const bundled = 'C:/Users/skhay/AppData/Local/ms-playwright/chromium-1194/chrome-win/chrome.exe';
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (existsSync(bundled) ? bundled : undefined) });
const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(`${page.url()}: ${error.message}`));
page.on('response', response => { if (response.status() >= 400 && response.url().includes('/_next/')) errors.push(`${response.status()} ${response.url()}`); });
async function visit(path) {
  const response = await page.goto(new URL(path, base).href);
  expect(response.status()).toBe(200);
  await expect(page.getByTestId('app-ready')).toHaveAttribute('data-ready', 'true');
}
try {
  await visit('');
  await expect(page.locator('.specimen-option')).toHaveCount(18);
  await expect(page.locator('.ingredient-card')).toHaveCount(18);
  await page.getByRole('button', { name: 'Explore Mullein leaf in body', exact: true }).click();
  await expect(page.locator('.body-map')).toHaveAttribute('data-focus', 'lungs');
  await page.getByRole('button', { name: 'Collect Mullein leaf', exact: true }).click();
  await page.locator('.discovery-links').getByRole('link', { name: 'Keep exploring' }).click();
  await expect(page).toHaveURL(new URL('supplements/mullein/', base).href);
  await expect(page.locator('.fact-card')).toHaveCount(3);
  await visit('collection/');
  await expect(page.locator('.ingredient-card')).toHaveCount(1);
  await page.getByRole('link', { name: 'Explore on the body' }).click();
  await expect(page.locator('.specimen-option')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('.specimen-option')).toHaveCount(1);

  await visit('supplements/collagen/');
  await page.locator('.pair-guide-links').getByRole('link', { name: 'Vitamin C field note' }).click();
  await expect(page).toHaveURL(new URL('supplements/vitamin-c/', base).href);
  await visit('compare/?ids=80005079,80079431');
  await expect(page.locator('.comparison-table thead th')).toHaveCount(3);
  await page.getByRole('button', { name: 'Copy comparison link' }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(new URL('compare/?ids=80005079,80079431', base).href);
  await page.getByRole('button', { name: /Remove .* from comparison/ }).first().click();
  await expect(page.locator('.comparison-table thead th')).toHaveCount(2);
  await page.reload();
  await expect(page.locator('.comparison-table thead th')).toHaveCount(2);
  await visit('products/jamieson-80005079/');
  const downloaded = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export evidence JSON' }).click();
  const download = await downloaded;
  const evidence = JSON.parse(await readFile(await download.path(), 'utf8'));
  expect(evidence.product.npn).toBe('80005079');
  expect(evidence.history.length).toBeGreaterThan(0);

  // Frozen HTML must lose expired evidence points when opened later.
  await page.clock.setFixedTime(new Date('2027-09-15T12:00:00Z'));
  await page.reload();
  await expect(page.locator('.coverage-caption')).toContainText('Refresh needed');
  await expect(page.locator('.evidence-score strong')).toHaveText('0/100');
  await visit('sources/');
  await expect(page.locator('.source-status-card').last()).toContainText('17');
  await visit('review/');
  await expect(page.getByText(/This edition has no live database refresh or editor sign-in/)).toBeVisible();
  await expect(page.getByLabel('Editor key')).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  await visit('');
  await expect(page.locator('.specimen-option')).toHaveCount(18);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  console.log('Pages acceptance passed: explorer, guides, collection, subpath links, comparison, exports, future expiry, mobile, and zero browser errors.');
} finally {
  await browser.close();
  if (server) await new Promise(resolve => server.close(resolve));
}
