import { test, expect } from '@playwright/test';
import { ingredients } from '../../src/data/ingredients';

test('body, discovery notes and a durable collection are one connected experience', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByTestId('app-ready')).toHaveAttribute('data-ready', 'true');
  const explorer = page.locator('.supplement-explorer');
  await expect(explorer.locator('.specimen-option')).toHaveCount(18);
  await explorer.getByRole('button', { name: 'Explore Bones', exact: true }).click();
  await expect(explorer).toHaveAttribute('data-supplement', 'vitamin-d');
  await expect(explorer.locator('.body-map')).toHaveAttribute('data-focus', 'bones');
  await expect(explorer.locator('.connection-story')).toContainText('mineralize bone');

  await explorer.getByRole('button', { name: 'Explore Creatine in body', exact: true }).click();
  await explorer.getByRole('button', { name: 'Explore Cells & energy', exact: true }).click();
  await expect(explorer.locator('.connection-story')).toContainText('ATP');
  await explorer.getByRole('button', { name: 'Collect Creatine', exact: true }).click();
  await explorer.getByRole('button', { name: 'Explore Melatonin in body', exact: true }).click();
  await expect(explorer.locator('.body-map')).toHaveAttribute('data-focus', 'clock');
  await explorer.getByRole('button', { name: 'Collect Melatonin', exact: true }).click();
  await expect(explorer.locator('.collection-slot.is-owned')).toHaveCount(2);
  await explorer.locator('.explorer-filter').getByRole('button', { name: /My collection/ }).click();
  await expect(explorer.locator('.specimen-option')).toHaveCount(2);
  await explorer.getByRole('button', { name: 'Explore Bones', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('No supplement in this collection is mapped here yet');
  await expect(explorer).toHaveAttribute('data-supplement', 'melatonin');

  await explorer.getByRole('button', { name: 'Explore collected Creatine', exact: true }).click();
  await explorer.getByRole('button', { name: 'Next discovery note', exact: true }).click();
  await expect(explorer.locator('.pocket-fact')).toContainText('Read the exact form');
  await explorer.getByRole('button', { name: 'Previous discovery note', exact: true }).click();
  await expect(explorer.locator('.pocket-fact')).toContainText('Quick energy, explained');
  await explorer.getByRole('button', { name: 'Pause diagram animation', exact: true }).click();
  await expect(explorer.locator('.body-map')).toHaveClass(/is-paused/);
  await explorer.getByRole('button', { name: 'Zoom into body', exact: true }).click();
  await expect(explorer.locator('.body-map')).toHaveClass(/is-zoomed/);
  await explorer.getByRole('button', { name: 'Zoom out of body', exact: true }).click();

  await page.goto('/collection');
  await expect(page.locator('.ingredient-card')).toHaveCount(2);
  await page.getByRole('link', { name: 'Explore on the body' }).click();
  await expect(page.locator('.specimen-option')).toHaveCount(2);
  await page.reload();
  await expect(page.locator('.specimen-option')).toHaveCount(2);
  await page.getByRole('button', { name: 'Remove Creatine from body collection', exact: true }).click();
  await expect(explorer).toHaveAttribute('data-supplement', 'melatonin');
  await page.getByRole('button', { name: 'Remove Melatonin from body collection', exact: true }).click();
  await expect(explorer.locator('.explorer-empty')).toBeVisible();
  await expect(explorer.locator('.body-map')).toHaveAttribute('data-focus', 'none');
  await explorer.getByRole('button', { name: 'Find a discovery', exact: true }).click();
  await expect(explorer.locator('.specimen-option')).toHaveCount(18);
  await explorer.getByRole('button', { name: 'Explore Body clock', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(explorer).toHaveAttribute('data-supplement', 'melatonin');
  expect(errors).toEqual([]);
});

test('body discovery stays usable on a phone and with reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByTestId('app-ready')).toHaveAttribute('data-ready', 'true');
  const explorer = page.locator('.supplement-explorer');
  await explorer.getByRole('button', { name: 'Explore Creatine in body', exact: true }).click();
  await expect(explorer.locator('.body-map')).toHaveAttribute('data-focus', 'muscles');
  await explorer.getByRole('button', { name: 'Collect Creatine', exact: true }).click();
  await explorer.locator('.explorer-filter').getByRole('button', { name: /My collection/ }).click();
  await expect(explorer.locator('.specimen-option')).toHaveCount(1);
  await explorer.getByRole('button', { name: 'Explore Cells & energy', exact: true }).click();
  await expect(explorer.locator('.connection-story')).toContainText('ATP');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  expect(await explorer.locator('.cell-spark').evaluate(element => getComputedStyle(element).animationName)).toBe('none');
  await explorer.screenshot({ path: 'test-results/explorer-collection-mobile.png', animations: 'disabled' });
});

test('expanded discoveries connect tendons, evidence, pairs, and collagen formats', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
  await expect(page.getByTestId('app-ready')).toHaveAttribute('data-ready', 'true');
  const explorer = page.locator('.supplement-explorer');
  for (const item of ingredients) {
    await explorer.getByRole('button', { name: `Explore ${item.name} in body`, exact: true }).click();
    await expect(explorer).toHaveAttribute('data-supplement', item.slug);
    await expect(explorer.locator('.connection-story h3')).not.toBeEmpty();
  }
  await page.getByLabel('Find a body discovery').fill('tendon');
  await expect(explorer.locator('.specimen-option')).toHaveCount(2);
  await page.getByLabel('Find a body discovery').fill('');
  await explorer.getByRole('button', { name: 'Explore Tendons', exact: true }).click();
  await expect(explorer).toHaveAttribute('data-supplement', 'collagen');
  await expect(explorer.locator('.body-map')).toHaveAttribute('data-focus', 'tendons');
  await page.getByRole('button', { name: 'D + K2', exact: true }).click();
  await expect(explorer.locator('.diagram-key')).toContainText('Pair spotlight: D + K2');
  await expect(explorer.locator('.pair-story')).toContainText('Warfarin');
  await expect(explorer.locator('.body-hotspot.is-connected')).toHaveCount(2);
  await page.getByRole('button', { name: 'Collagen + C', exact: true }).click();
  await expect(explorer.locator('.pair-story')).toContainText('did not isolate');
  await expect(explorer.locator('.collection-slot.is-owned')).toHaveCount(0);
  await page.getByRole('button', { name: 'Capsules', exact: true }).click();
  await expect(explorer.locator('.form-story')).toContainText('undenatured type II');
  await page.getByRole('button', { name: 'Enhanced blend', exact: true }).click();
  await expect(explorer.locator('.form-story')).toContainText('More additions do not establish better tendon outcomes');
  await page.locator('.label-maths summary').click();
  await expect(page.locator('.label-maths output')).toContainText('20 capsules');
  await page.getByLabel('Capsule: collagen mg / capsule').fill('1000');
  await expect(page.locator('.label-maths output')).toContainText('10 capsules');
  await page.getByLabel('Capsule: collagen mg / capsule').fill('0');
  await expect(page.locator('.label-maths output')).toContainText('positive amounts');
  await explorer.getByRole('button', { name: 'Explore BPC-157 in body', exact: true }).click();
  await expect(explorer.locator('.research-banner')).toContainText('Experimental');
  await expect(explorer.locator('.body-map')).toHaveClass(/is-research/);
  await expect(explorer.locator('.diagram-key')).toContainText('not proven healing');
  await explorer.getByRole('button', { name: 'Collect BPC-157', exact: true }).click();
  await page.reload();
  await expect(explorer.locator('.collection-slot.is-owned')).toHaveCount(1);
  await page.goto('/supplements/bpc-157');
  await expect(page.locator('.research-banner')).toContainText('unauthorized');
  await expect(page.locator('.brands-section')).toHaveCount(0);
  await expect(page.locator('.guide-sources .source-row')).toHaveCount(2);
  for (const slug of ['collagen', 'vitamin-c', 'vitamin-k2', 'calcium', 'iron', 'zinc']) {
    await page.goto(`/supplements/${slug}`);
    await expect(page.getByTestId('app-ready')).toHaveAttribute('data-ready', 'true');
    await expect(page.locator('.fact-card')).toHaveCount(3);
    await expect(page.getByRole('main').locator('.empty-product-note')).toContainText('not yet been imported');
  }
  expect(errors).toEqual([]);
});

test('new body topics and pair controls fit small screens', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByTestId('app-ready')).toHaveAttribute('data-ready', 'true');
    await page.getByRole('button', { name: 'Explore Collagen in body', exact: true }).click();
    await expect(page.locator('.body-map')).toHaveAttribute('data-focus', 'tendons');
    await page.getByRole('button', { name: 'Enhanced blend', exact: true }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    const positions = await page.locator('.body-hotspot').evaluateAll(elements => elements.map(element => { const r = element.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom }; }));
    expect(positions.every(rect => rect.left >= 0 && rect.right <= width)).toBeTruthy();
    for (let a = 0; a < positions.length; a++) for (let b = a + 1; b < positions.length; b++) {
      const first = positions[a], second = positions[b];
      expect(first.right <= second.left || second.right <= first.left || first.bottom <= second.top || second.bottom <= first.top).toBeTruthy();
    }
  }
});

test('respiratory and everyday discoveries stay sourced and collectable', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
  await expect(page.getByTestId('app-ready')).toHaveAttribute('data-ready', 'true');
  const explorer = page.locator('.supplement-explorer');
  for (const [name, slug] of [['Vitamin C', 'vitamin-c'], ['Collagen', 'collagen'], ['Vitamin K2', 'vitamin-k2'], ['Mullein leaf', 'mullein']]) {
    await page.locator('.ingredient-card').filter({ has: page.getByRole('heading', { name, exact: true }) }).screenshot({ path: `test-results/art-${slug}.png`, animations: 'disabled' });
  }
  await page.getByRole('button', { name: 'Explore Lungs & airways', exact: true }).click();
  await expect(explorer).toHaveAttribute('data-supplement', 'mullein');
  await expect(explorer.locator('.body-map')).toHaveAttribute('data-focus', 'lungs');
  await expect(explorer.locator('.anatomy-lungs')).toHaveClass(/is-focused/);
  await expect(explorer.getByRole('button', { name: 'Explore Mullein leaf in body', exact: true })).toBeInViewport();
  await expect(explorer.locator('.connection-story')).toContainText('traditional');
  await expect(explorer.locator('.connection-story a')).toHaveAttribute('href', /licence=80140235$/);
  await explorer.locator('.explorer-workbench').screenshot({ path: 'test-results/mullein-body.png', animations: 'disabled' });
  await page.getByRole('button', { name: 'Collect Mullein leaf', exact: true }).click();
  await page.getByRole('button', { name: 'Explore NAC in body', exact: true }).click();
  await expect(explorer.locator('.connection-story')).toContainText('inhaled drug');
  await page.getByRole('button', { name: 'Collect NAC', exact: true }).click();
  await explorer.locator('.explorer-filter').getByRole('button', { name: /My collection/ }).click();
  await expect(explorer.locator('.specimen-option')).toHaveCount(2);
  await page.reload();
  await expect(explorer.locator('.collection-slot.is-owned')).toHaveCount(2);
  await page.getByRole('button', { name: 'Airways', exact: true }).click();
  await expect(page.locator('.ingredient-card')).toHaveCount(2);
  const notes = [
    ['mullein', 'Mullein leaf', 'Leaf is not flower'],
    ['nac', 'NAC', 'The Canadian label scope'],
    ['ginger', 'Ginger', 'A nausea question'],
    ['psyllium', 'Psyllium husk', 'Liquid is part of use'],
    ['vitamin-b12', 'Vitamin B12', 'Absorption is a process'],
  ];
  for (const [slug, name, note] of notes) {
    await page.goto(`/supplements/${slug}`);
    await expect(page.getByTestId('app-ready')).toHaveAttribute('data-ready', 'true');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(name);
    await expect(page.getByRole('heading', { name: note, exact: true })).toBeVisible();
    await expect(page.getByRole('main').locator('.guide-sources a').first()).toHaveAttribute('href', /^https:\/\//);
    await expect(page.getByRole('main').locator('.empty-product-note')).toBeVisible();
  }
  expect(errors).toEqual([]);
});
