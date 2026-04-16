import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

const external = ["react", "@allansli/barcode-febraban-core"];

const babelOptions = {
  babelHelpers: "bundled",
  presets: [
    ["@babel/preset-env", { targets: "> 0.5%, last 2 versions, not dead" }],
    "@babel/preset-react"
  ]
};

export default [
  // ESM build
  {
    input: "src/BarcodeFebraban.jsx",
    external,
    plugins: [resolve(), babel(babelOptions)],
    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: true
    }
  },
  // CJS build
  {
    input: "src/BarcodeFebraban.jsx",
    external,
    plugins: [resolve(), babel(babelOptions), terser()],
    output: {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true
    }
  }
];
