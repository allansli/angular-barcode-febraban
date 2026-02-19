import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "VueBarcodeFebraban",
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ["vue", "@allansli/barcode-febraban-core"],
      output: {
        globals: {
          vue: "Vue",
          "@allansli/barcode-febraban-core": "barcodeFebrabanCore"
        }
      }
    }
  }
});
