import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";

const external = ["react", "@allansli/barcode-febraban-core"];

const babelOptions = {
  babelHelpers: "bundled",
  presets: [
    ["@babel/preset-env", { targets: "> 0.5%, last 2 versions, not dead" }],
    "@babel/preset-react"
  ]
};

export default [
  {
    input: "src/BarcodeFebraban.jsx",
    external,
    plugins: [resolve(), babel(babelOptions)],
    output: {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true
    }
  },
  {
    input: "src/BarcodeFebraban.jsx",
    external,
    plugins: [resolve(), babel(babelOptions), terser()],
    output: {
      file: "dist/index.cjs.js",
      format: "cjs",
      exports: "named",
      sourcemap: true
    }
  }
];
