#!/usr/bin/env node
/**
 * scripts/publish-all.js
 *
 * Streamlines publishing all barcode-febraban packages to npm.
 *
 * Usage:
 *   node scripts/publish-all.js                     # publish all packages
 *   node scripts/publish-all.js --dry-run           # simulate without publishing
 *   node scripts/publish-all.js --tag next          # publish with a dist-tag
 *   node scripts/publish-all.js core react          # publish specific packages only
 *
 * Core is published first. If core fails, remaining packages are aborted.
 * Angular is published from ng-packagr's dist/ directory.
 * Provenance is added automatically on GitHub Actions (same as the CI jobs).
 */

"use strict";

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const ALL_PACKAGES = [
  { key: "core",      dir: "packages/core" },
  { key: "angularjs", dir: "packages/angularjs" },
  { key: "react",     dir: "packages/react" },
  { key: "vue",       dir: "packages/vue" },
  { key: "angular",   dir: "packages/angular", publishDir: "dist" }
];

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const tagIndex = args.indexOf("--tag");
const distTag = tagIndex !== -1 ? args[tagIndex + 1] : null;
const forceProvenance = args.includes("--provenance");
const skipProvenance = args.includes("--no-provenance");

const selectedKeys = args.filter(
  (a) => !a.startsWith("--") && a !== distTag
);

const packages = selectedKeys.length > 0
  ? ALL_PACKAGES.filter((p) => selectedKeys.includes(p.key))
  : ALL_PACKAGES;

if (selectedKeys.length > 0) {
  const unknown = selectedKeys.filter(
    (k) => !ALL_PACKAGES.some((p) => p.key === k)
  );
  if (unknown.length > 0) {
    console.error(`Unknown package(s): ${unknown.join(", ")}`);
    console.error(`Available keys: ${ALL_PACKAGES.map((p) => p.key).join(", ")}`);
    process.exit(1);
  }
}

function readPackageJson(pkgDir) {
  return JSON.parse(
    fs.readFileSync(path.join(pkgDir, "package.json"), "utf8")
  );
}

function run(cmd, cwd) {
  execSync(cmd, { cwd, stdio: "inherit" });
}

function buildIfNeeded(pkgJson, pkgDir) {
  if (pkgJson.scripts && pkgJson.scripts.build) {
    console.log("    Building...");
    run("npm run build", pkgDir);
  }
}

function shouldUseProvenance() {
  if (skipProvenance) return false;
  if (forceProvenance) return true;
  return process.env.GITHUB_ACTIONS === "true";
}

function publishFrom(pkg, pkgDir, isDryRun, distTag) {
  const parts = ["npm", "publish"];
  if (pkg.publishDir) {
    parts.push(pkg.publishDir);
  }
  parts.push("--access", "public");
  if (isDryRun) parts.push("--dry-run");
  if (distTag) parts.push("--tag", distTag);
  if (shouldUseProvenance()) parts.push("--provenance");
  run(parts.join(" "), pkgDir);
}

const rootDir = path.resolve(__dirname, "..");

console.log("╔══════════════════════════════════════════════════════╗");
console.log("║       barcode-febraban — publish all packages        ║");
console.log("╚══════════════════════════════════════════════════════╝");
console.log();

if (isDryRun) console.log("  [DRY RUN — no packages will be published]\n");
if (distTag) console.log(`  [dist-tag: ${distTag}]\n`);
if (shouldUseProvenance()) console.log("  [npm provenance enabled]\n");

console.log(`  Publishing ${packages.length} package(s):\n`);
packages.forEach((p) => {
  const pkgDir = path.join(rootDir, p.dir);
  const pkgJson = readPackageJson(pkgDir);
  const from = p.publishDir ? `${p.dir}/${p.publishDir}` : p.dir;
  console.log(`    • ${pkgJson.name}@${pkgJson.version}  (${from})`);
});
console.log();

let published = 0;
let failed = 0;
const results = [];

for (let i = 0; i < packages.length; i++) {
  const pkg = packages[i];
  const pkgDir = path.join(rootDir, pkg.dir);

  let pkgJson;
  try {
    pkgJson = readPackageJson(pkgDir);
  } catch (err) {
    console.error(`  [${i + 1}/${packages.length}] ERROR: cannot read package.json in ${pkg.dir}`);
    console.error(`    ${err.message}\n`);
    failed++;
    results.push({ name: pkg.key, status: "error", error: err.message });
    if (pkg.key === "core") {
      console.error("  Core failed; aborting remaining packages.\n");
      process.exit(1);
    }
    continue;
  }

  console.log(`  [${i + 1}/${packages.length}] ${pkgJson.name}@${pkgJson.version}`);

  try {
    buildIfNeeded(pkgJson, pkgDir);
    if (pkg.publishDir && !fs.existsSync(path.join(pkgDir, pkg.publishDir))) {
      throw new Error("Publish directory does not exist: " + pkg.publishDir);
    }
    publishFrom(pkg, pkgDir, isDryRun, distTag);
    console.log("    OK\n");
    published++;
    results.push({ name: pkgJson.name, version: pkgJson.version, status: "ok" });
  } catch (err) {
    console.error(`    FAILED: ${err.message}\n`);
    failed++;
    results.push({ name: pkgJson.name, version: pkgJson.version, status: "failed", error: err.message });
    if (pkg.key === "core") {
      console.error("  Core failed; aborting remaining packages.\n");
      process.exit(1);
    }
  }
}

console.log("────────────────────────────────────────────────────────");
console.log(`  Results: ${published} published, ${failed} failed`);
console.log();

results.forEach((r) => {
  const icon = r.status === "ok" ? "✓" : "✗";
  const label = r.version ? `${r.name}@${r.version}` : r.name;
  console.log(`  ${icon} ${label}${r.error ? " — " + r.error : ""}`);
});

console.log();

if (failed > 0) {
  process.exit(1);
}
