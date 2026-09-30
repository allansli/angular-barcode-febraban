# barcode-febraban

Draw the **barcode on a Brazilian boleto**. A boleto’s barcode is **ITF (Interleaved 2 of 5)**, specified by **Febraban**. These packages turn an even-length digit string — usually the 44-digit código de barras — into the character sequence that `BarcodeInterleaved2of5.ttf` renders as that barcode.

You already have the digits. Nothing here parses a bank slip, converts a 47-digit linha digitável into 44 digits, or computes the módulo-11 DAC.

Coding agents: start at [`llms.txt`](./llms.txt).

## Install

Pick one package. Every framework package depends on `@allansli/barcode-febraban-core` (published together at 2.0.0).

```bash
npm install @allansli/barcode-febraban-core          # vanilla JS
npm install @allansli/angular-barcode-febraban       # AngularJS 1.x
npm install @allansli/react-barcode-febraban         # React 16.8+
npm install @allansli/vue-barcode-febraban           # Vue 3
npm install @allansli/ng-barcode-febraban            # Angular 15+
```

## Minimal example

```js
import { generateBarcodeSequence } from "@allansli/barcode-febraban-core";

// Even-length digits. A 44-digit código de barras works the same way.
// A 47-digit linha digitável returns "".
const sequence = generateBarcodeSequence("1234567890");
```

Render `sequence` with `font-family: BarcodeInterleaved2of5` (CSS is in the core package; the TTF is not on npm — host it yourself). Framework components do the encoding for you:

```jsx
import BarcodeFebraban from "@allansli/react-barcode-febraban";
import "@allansli/barcode-febraban-core/assets/css/barcode.css";

export function BoletoBarcode() {
  return <BarcodeFebraban sequence="1234567890" />;
}
```

## When to use

- You need the **ITF / Interleaved 2 of 5** barcode printed on a **Brazilian boleto** (Febraban).
- The input is a **string of digits with even length**. The usual value is the 44-digit código de barras.
- You will draw it with **`BarcodeInterleaved2of5.ttf`** (this repo’s font encoder, not a generic barcode image).
- Your UI is **vanilla JS**, **AngularJS 1.x**, **React**, **Vue 3**, or **Angular 15+**.

## When not to use

- **EAN**, **UPC**, **Code 128**, QR, Data Matrix, or any symbology other than ITF.
- You still have a **47-digit linha digitável** and need the 44-digit código de barras. This repo does not convert it (odd length returns an empty barcode).
- You need the **DAC (módulo 11)**, nosso número, or a full boleto PDF.
- You need an SVG or canvas barcode that does not use this TrueType font.

## Packages

| Package | Version | Use it for |
|---|---|---|
| [`@allansli/barcode-febraban-core`](packages/core/README.md) | 2.0.0 | Vanilla JS encoder (`vanilla-core`) |
| [`@allansli/angular-barcode-febraban`](packages/angularjs/README.md) | 2.0.0 | AngularJS 1.x directive |
| [`@allansli/react-barcode-febraban`](packages/react/README.md) | 2.0.0 | React 16.8+ component |
| [`@allansli/vue-barcode-febraban`](packages/vue/README.md) | 2.0.0 | Vue 3 component |
| [`@allansli/ng-barcode-febraban`](packages/angular/README.md) | 2.0.0 | Angular 15+ standalone component |

Live demos (GitHub Pages): [index](https://allansli.github.io/angular-barcode-febraban/demo/), [AngularJS](https://allansli.github.io/angular-barcode-febraban/demo/angularjs.html), [React](https://allansli.github.io/angular-barcode-febraban/demo/react.html), [Vue](https://allansli.github.io/angular-barcode-febraban/demo/vue.html), [Angular](https://allansli.github.io/angular-barcode-febraban/demo/angular.html).

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

GitHub shows **Run workflow** after this file is on the default branch. A pull request to `master` or `main` that changes `packages/`, the root `package.json` or `package-lock.json`, `scripts/`, or this workflow runs the same tests and a tokenless `npm publish --dry-run`. That is the CI check for those changes.

### Release

1. Set `version` in each `package.json` (`packages/core`, `packages/angularjs`, `packages/react`, `packages/vue`, `packages/angular`) to the version you intend to publish. Commit those versions before cutting the release.
2. Publish a GitHub Release whose tag is `barcode-febraban@v` plus [semver](https://semver.org/). Example: `barcode-febraban@v2.0.0`. The tag names that release cut and should align with it. Each package is published at the version already in its `package.json` (those versions can differ). Draft releases do not trigger publishing.
3. [`.github/workflows/publish-barcode-febraban.yml`](.github/workflows/publish-barcode-febraban.yml) runs the tests and builds, then publishes in this order:

   `core` → `angularjs` → `react` → `vue` → `angular`

   React, Vue, and AngularJS are built before publish. Angular is built with ng-packagr and published from that folder (`npm publish ./dist --access public --provenance` in `packages/angular`). Every package uses `npm publish --access public --provenance`, `NODE_AUTH_TOKEN` from the `NPM_TOKEN` repository secret, and `id-token: write` for npm provenance. Packages are published on the `latest` dist-tag.

`NPM_TOKEN` must be able to publish all five `@allansli/*` packages. Provenance is generated for this public repository. Publishing the release sends each package to the npm `latest` dist-tag, including when the GitHub Release is marked as a pre-release.

A failed test, build, or publish stops the rest of the sequence. Re-run the failed job from the Actions run; jobs that already succeeded stay as they are. A version that is already on npm cannot be published again — bump it and cut a new `barcode-febraban@vX.Y.Z` release.

Releases go out together with the tag `barcode-febraban@vX.Y.Z`. This repository has one workflow, `.github/workflows/publish-barcode-febraban.yml`. Tags such as `core@v*` do not publish a single package on their own.

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
