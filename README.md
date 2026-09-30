# barcode-febraban

Monorepo of **font encoders** for `BarcodeInterleaved2of5.ttf`. Each package turns an even-length digit string into the character sequence that font renders as an ITF (Interleaved 2 of 5) barcode.

This is **not** a Febraban boleto engine: there is no 47-digit linha digitável → 44-digit código de barras conversion, and no módulo-11 DAC.

---

## Packages

| Package | Version | Description |
|---|---|---|
| [`@allansli/barcode-febraban-core`](packages/core/README.md) | 2.0.0 | Pure JS encoder — framework-agnostic |
| [`@allansli/angular-barcode-febraban`](packages/angularjs/README.md) | 2.0.0 | AngularJS (1.x) directive |
| [`@allansli/react-barcode-febraban`](packages/react/README.md) | 2.0.0 | React 16.8+ component |
| [`@allansli/vue-barcode-febraban`](packages/vue/README.md) | 2.0.0 | Vue 3 component |
| [`@allansli/ng-barcode-febraban`](packages/angular/README.md) | 2.0.0 | Angular 15+ standalone component |

All framework packages consume `@allansli/barcode-febraban-core`.

---

## Architecture

```
barcode-febraban (npm workspaces monorepo)
│
├── packages/core           @allansli/barcode-febraban-core
├── packages/angularjs      @allansli/angular-barcode-febraban
├── packages/react          @allansli/react-barcode-febraban
├── packages/vue            @allansli/vue-barcode-febraban
├── packages/angular        @allansli/ng-barcode-febraban
└── demo/                   GitHub Pages demos (framework CDNs, pinned)
```

The published libraries live only under `packages/`. There is no parallel
AngularJS product at the repository root.

---

## Quick start

Pass a **string** of digits with even length (a 44-digit código de barras is fine). A 47-digit linha digitável returns an empty barcode.

```js
import { generateBarcodeSequence } from "@allansli/barcode-febraban-core";
const sequence = generateBarcodeSequence("1234567890");
```

See each package README for framework usage.

---

## Development

This is an **npm workspaces** monorepo.

```bash
npm install
npm run build:all
npm run test:all
```

---

## Publishing

The recommended release is a single GitHub Release. The workflow does not bump versions and does not publish from a pull request.

### Dry-run before `NPM_TOKEN`

Run this before adding the `NPM_TOKEN` secret and before publishing a release.

1. Open **Actions**.
2. Select **Publish all packages**.
3. Click **Run workflow**.
4. Leave **dry_run** checked (that is the default).
5. Click **Run workflow**.

That run uses the same tests and builds as a release, then `npm publish --access public --dry-run` for each package. Angular uses `npm publish ./dist --access public --dry-run`. It does not upload, does not read `NPM_TOKEN`, and does not pass `--provenance`.

Unchecking **dry_run** publishes to npm for real (`--provenance` and `NPM_TOKEN`), the same as a `barcode-febraban@v*` release.

GitHub shows **Run workflow** after this file is on the default branch. A pull request that touches this workflow runs the same dry-run, which is the check to watch on PR #10 before merge. Until the button is available, you can also dispatch the branch that contains the workflow:

```bash
gh workflow run "Publish all packages" --ref claude/decouple-js-library-U9HKc -f dry_run=true
```

### Release

1. Set `version` in each `package.json` (`packages/core`, `packages/angularjs`, `packages/react`, `packages/vue`, `packages/angular`) to the version you intend to publish. Commit those versions before cutting the release.
2. Publish a GitHub Release whose tag is `barcode-febraban@v` plus [semver](https://semver.org/). Example: `barcode-febraban@v2.0.0`. The tag names that release cut and should align with it. Each package is published at the version already in its `package.json` (those versions can differ). Draft releases do not trigger publishing.
3. [`.github/workflows/publish-barcode-febraban.yml`](.github/workflows/publish-barcode-febraban.yml) runs the tests and builds, then publishes in this order:

   `core` → `angularjs` → `react` → `vue` → `angular`

   React, Vue, and AngularJS are built before publish. Angular is built with ng-packagr and published from that folder (`npm publish ./dist --access public --provenance` in `packages/angular`). Every package uses `npm publish --access public --provenance`, `NODE_AUTH_TOKEN` from the `NPM_TOKEN` repository secret, and `id-token: write` for npm provenance. Packages are published on the `latest` dist-tag.

`NPM_TOKEN` must be able to publish all five `@allansli/*` packages. Provenance is generated for this public repository. Publishing the release sends each package to the npm `latest` dist-tag, including when the GitHub Release is marked as a pre-release.

A failed test, build, or publish stops the rest of the sequence. Re-run the failed job from the Actions run; jobs that already succeeded stay as they are. A version that is already on npm cannot be published again — bump it and cut a new `barcode-febraban@vX.Y.Z` release, or publish one leftover package with a per-package tag.

Per-package releases still work. A published release tagged `core@v*`, `angularjs@v*`, `react@v*`, `vue@v*`, or `angular@v*` publishes only that package through its existing workflow. Use `barcode-febraban@vX.Y.Z` when the whole set should go out together.

Local dry run (packs and prints the publish plan, does not upload):

```bash
npm run publish:dry-run
```

`npm run publish:all` publishes from a machine in the same order and stops at the first failure. Provenance is attached when that script runs on GitHub Actions. Prefer the release workflow.

---

## Font

`BarcodeInterleaved2of5.ttf` stays in git for demos. It is **excluded from npm**.
Name table: “Code 2/5 Interleaved”, Copyright 2000, version 1.00 (21 Jun 2000).
No license grant. A nearby Chaos Microsystems shareware family (1999) is
documented at https://luc.devroye.org/fonts-29893.html — **not confirmed to be
this file**, and not a MIT grant. See [NOTICE](./NOTICE).

---

## License

MIT © Allan Martins de Paula (source code only).
