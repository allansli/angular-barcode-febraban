import { createRequire } from "module";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { generateBarcodeSequence: fromCjs } = require("../index.js");
const fromShared = require("../generate-barcode-sequence.js");

const esmSource = readFileSync(join(here, "../index.esm.js"), "utf8");
if (!esmSource.includes("./generate-barcode-sequence.js")) {
  console.error("index.esm.js must import the shared encoder");
  process.exit(1);
}

if (fromCjs !== fromShared) {
  console.error("CJS entry does not export the shared encoder function");
  process.exit(1);
}

const samples = [
  "",
  "1",
  "12",
  "abcd",
  "12e2",
  "0012",
  "1234567890",
  "0".repeat(44),
  "0".repeat(47),
  null,
  undefined,
  1234
];

for (const sample of samples) {
  const a = fromCjs(sample);
  const b = fromShared(sample);
  if (a !== b) {
    console.error("CJS/shared mismatch for", sample);
    process.exit(1);
  }
}

console.log("esm-cjs shared-implementation parity ok");
