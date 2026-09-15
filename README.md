# Neurotrino

A visual supplement collection connected to an interactive body. Select a supplement to reveal its biological associations, tap body hotspots to discover related supplements, and collect the discoveries that interest you. Product evidence is available deeper in the experience.

The connection lab explores collagen + C, D + K2, C + iron and D + calcium without presenting the combinations as a personal regimen or safety assessment. Collagen powder, capsules and enhanced blends have a format comparison and an illustrative grams-per-serving calculator. BPC-157 is explicitly a research card with preclinical tendon mapping, a Canadian advisory and no NPN import or product comparison. The additional field guides do not imply newly reviewed product records.

`src/data/more-ingredients.ts` holds the additional source-linked notes; `src/data/connections.ts` defines the pairs and form comparisons. The sheep and oil-can mascots are visual metaphors; the interface distinguishes them from clinical claims.

The opening explorer includes 18 discoveries, original illustrated mascots, a stylized anatomical character, and clickable brain/nerve, muscle, bone, tendon, skin, blood, lungs/airways, digestion, cell and body-clock views, short source-linked explanations, rotating discovery notes, pause/zoom controls, and a persistent collection. The saved-only filter lets readers explore their own collection on the body. The collection page links directly back to this view. Brand comparison is no longer a primary navigation item or landing-page promotion.

`src/data/explorations.ts` defines the sourced associations. The body is a schematic: highlights are educational links, not measured concentrations, treatment predictions, or additive effects of combining supplements. For L-theanine, the head marker locates a relaxation research topic; it does not assert a proven brain target. Reader input never changes a fabricated health or neurotransmitter percentage.

Mullein leaf, NAC, ginger, psyllium husk and vitamin B12 extend the collection to 18 discoveries. Mullein cites a specific Canadian leaf-extract licence with traditional respiratory wording and distinguishes the EMA flower assessment. NAC separates inhaled medical uses from oral supplement claims. The lung layer locates these topics; it does not animate pollutant removal or lung repair. The three revised icons use a tissue-stitching motif (C), a woven tensile cable (collagen) and a straight bone with an activation key (K2).

## Live site and GitHub Pages

**[Open Neurotrino](https://khayoon.github.io/Neurotrino/)** · [GitHub repository](https://github.com/Khayoon/Neurotrino)

The public edition includes the complete visual explorer, 18 guides, browser collections, product and brand pages, comparison links and JSON exports. It uses the dated, checked-in source catalogue. Ratings re-evaluate expiry dates in the browser; rebuilding does not refresh source dates. The editorial desk and live database updates run in the full server app described below.

Pushes to main build and deploy through .github/workflows/pages.yml. In repository Settings → Pages, the publishing source must be **GitHub Actions**. Build locally with npm run build:pages; the generated out/ directory is the Pages artifact. The default base path is /Neurotrino; NEXT_PUBLIC_BASE_PATH can override it at build time.

The build uses an isolated temporary database seeded only from committed source files. Runtime databases, editor keys, environment files, and reader collections are never copied into the artifact. The generated .pages-build/ and out/ directories are ignored.

## Run locally

Requires Node.js 22 or newer and npm. From the project directory:

```sh
npm ci
npm run dev
```

Open **http://127.0.0.1:3000**. No database account or API key is required. The first request initializes PostgreSQL through PGlite and imports the dated, real source records. Data persists in `.data/postgres`. Saved collections and comparison selections live in this browser’s local storage. Collection and evidence exports are available in the interface.

For an optimized local build:

```sh
npm run build
npm start
```

The launcher includes the Node symlink flags needed by this Windows workspace. If a sandboxed npm launcher encounters an unrelated parent-directory `EPERM`, invoke npm through its installed CLI with both `--preserve-symlinks` and `--preserve-symlinks-main`. Normal installations can use the commands above.

## What changed and why

The former Create React App prototype is preserved in `legacy/`. The active application uses **Next.js App Router, React, TypeScript, PostgreSQL, and Zod**. Next serves the public guide pages and authenticated editorial endpoints in one application. A relational database models the product, brand, licence, source snapshot, evidence check, revision, and audit record separately. This fits an evidence publishing product better than keeping trust scores in browser state.

The visual collection remains the primary product experience. Brand research follows discovery. There is no simulated prediction of a person’s neurotransmitter levels or fabricated numerical health benefit. A saved card represents interest, not a recommendation to take the supplement.

**Why this scope:** one web application and one database support the current public catalogue, editorial workflow, and scheduled ingestion without a separate microservice platform. Collections do not require accounts. Search and filtering run over the small published catalogue; larger catalogues should move filtering/pagination into PostgreSQL queries. Background workers, full-text indexes, reader accounts, and native apps should follow demonstrated needs.

## Pages and workflows

- `/`: interactive body and collection, followed by searchable illustrated ingredient cards. `/?view=collection` opens the body with saved supplements only.
- `/collection`: persistent saved cards, removal, and JSON export.
- `/supplements/[slug]`: 18 sourced field guides, limits and cautions, relevant product records.
- `/products`: search by product, brand or exact NPN; filter and sort by documented evidence.
- `/products/[slug]`: evidence dimensions, source links, licence identity, available ingredient/purpose/warning records, and audit history.
- `/brands/[slug]`: product records plus sourced company history where researched.
- `/compare`: up to three products, shareable selection URL, and JSON export.
- `/methodology` and `/sources`: scoring policy, missing-data rules, source directory, freshness and refresh results.
- `/review`: authenticated evidence review, product import, licence refresh and brand history editing.

## Evidence and data

`src/data/product-snapshots.json` contains **17 real Health Canada NPN records**, retrieved September 14, 2026, across eight display brands and six ingredients. The raw endpoint responses are retained. New installations import this dated snapshot; startup does not pretend a fresh network check occurred. Live updates are available through the editor and CLI.

`src/data/editorial-evidence.ts` contains a reviewed NSF listing for Blue Star’s Canadian creatine powder. The association with NPN 80079431 is an explicit editorial inference from the product name, licence holder, form and Canadian market: NSF does not print that NPN in the directory. Sport certification is scoped to the listed lots. Health Canada’s ingredient endpoint returned no entries for this NPN; its formulation transparency remains **unknown**, even though the licence and certification can be documented. The page displays this gap.

`src/data/brand-history.ts` contains company-published founding histories for Jamieson, NOW and Webber Naturals, with links and review context. Other founding dates remain unresearched. Company age does not earn quality points.

The **evidence coverage score** measures the documentation recorded in this catalogue. It is not a safety probability, a health benefit score, a Health Canada rating, or a definitive “most trusted brand” award. Comparisons apply to exact products, never automatically to an entire brand.

| Check | Weight | Refresh interval |
| --- | ---: | ---: |
| Canadian product licence | 20 | 30 days |
| Independent product testing | 30 | 180 days |
| Manufacturing oversight | 20 | 180 days |
| Recalls and regulatory findings | 20 | 7 days |
| Formulation traceability | 10 | 30 days |

Unknowns earn zero points; missing categories are never removed from the denominator. Expired checks stop earning points and remain readable. Unresolved concerns withhold the numerical score and stay visible even after their review date expires. A licence is not an independent testing certificate. Recall and inspection matching currently requires an editorial review; the app does **not** claim these records are clear or monitored automatically. No purchase commissions or popularity metrics influence the score.

The full rationale and source links are visible in `/methodology`. Ingredient facts link to NIH ODS, NCCIH, Health Canada or the specifically identified licence/manufacturer. Clinical evidence for an ingredient is separate from evidence about its producer.

## Editorial access

Run this command privately to display the installation’s editor key:

```sh
npm run editor:key
```

Paste it at `/review`. The locally generated secret is stored in `.data/editor-token` and is ignored by version control. Treat it as a password. Sessions last eight hours and use signed, HTTP-only, same-site cookies. Mutations require authentication and a matching origin. Public API clients cannot edit reviews. Each saved review requires provenance, product/market/batch scope, date and an explicit attestation. Concurrent edits use revision checks and reject stale submissions. Database transactions save evidence and audit records together.

The reviewer must actually read and match the source. The tool does not automatically validate an editor’s assertion, scrape arbitrary source URLs, or use an LLM to invent findings. A new import uses the licence holder as its display brand until brand identity is separately researched; an ingredient match is required.

## Refresh records

Use **Refresh licence** in the editorial desk while the local app is running. This updates the official licence/formulation checks and saves the raw response and an audit event. Independent testing, manufacturing and recall reviews are not silently updated.

For command-line refresh, **stop the local app first** when using PGlite. One process owns a PGlite directory at a time:

```sh
npm run data:refresh -- 80005079
npm run data:refresh
```

The second command checks the entire current catalogue. Invalid, mismatched or failed responses preserve the last good record and freshness dates. A partial run reports each failure and exits nonzero. `scripts/fetch-seed.mjs` is the initial research-capture utility; it skips existing snapshots and is not the refresh job.

## Hosted PostgreSQL

Copy `.env.example` to `.env.local` and configure:

```dotenv
DATABASE_URL=postgresql://...
EDITOR_TOKEN=a-long-random-secret-at-least-32-characters
APP_ORIGIN=https://your-domain.example
```

Next and the CLI scripts load environment files. Never prefix database or editor secrets with `NEXT_PUBLIC_`. With `DATABASE_URL` set, the server uses the `pg` adapter instead of PGlite. Use a direct or session-pool PostgreSQL connection, with TLS settings required by the provider. Tables have row-level security enabled and no public policies; only the server-side owning database role should access them. The supplied schema runs idempotently on initialization.

Use managed PostgreSQL (for example Supabase) for multi-instance or ephemeral hosting; PGlite’s local directory is suitable for one persistent Node process. Configure the secret and public origin before exposing the editorial desk. For a server deployment use `npm start -- --hostname 0.0.0.0` and a reverse proxy that serves HTTPS. Connection, authentication and backups on a hosted database have **not** been verified in this local workspace.

An operator can schedule `npm run data:refresh` against that hosted database. No scheduler, cloud account, billing service, alerts or external deployment has been created. Refresh cadence must match the intervals above. Multi-user editorial roles and durable shared login rate limiting are additional requirements if the project grows beyond a small trusted editorial team.

## Verification

```sh
npm run typecheck
npm test
npx playwright install chromium
npm run test:e2e
npm run build
```

Database tests use new isolated PGlite directories and cover source identity, unknown evidence, failure preservation, transaction rollback and revision conflicts. Rating tests cover missing, stale, duplicate and concerning evidence. Browser tests cover discovery, collection persistence/export, all 18 discoveries, four ingredient pairs, collagen format and label arithmetic controls, NPN search, comparison, evidence export, authenticated review, conflict handling, responsive navigation and missing routes. Browser tests use a separate database and a test-only editor secret; they never write to the normal catalogue. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` if using an existing Chromium installation.

For testing a separately started isolated server on port 3010, set `E2E_EXTERNAL_SERVER=1` before the browser command. That server must use the test-only editor token specified in `playwright.config.ts` and its own data directory. This is also useful for running the same acceptance tests against `next start` after a production build.

`npm run db:check` prints catalogue counts; stop the local app before running it with the same PGlite directory. Back up `.data` only while the local database is stopped. Reader collections are browser-local and are backed up through the collection export.

## Code map

`src/app/` contains pages and HTTP endpoints; `src/components/` the interactive UI; `src/lib/rating.ts` the deterministic scoring policy; `src/lib/db.ts` the database adapters and audited writes; `src/lib/health-canada.ts` the validated ingestion pipeline; `src/data/` the educational content and dated source captures; and `sql/` the PostgreSQL schema. All supplement illustrations are editable SVG components. The interface uses local fonts and assets.
