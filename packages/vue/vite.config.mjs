import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(rootDir, "src/index.js"),
      name: "VueBarcodeFebraban",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ["vue", "@allansli/barcode-febraban-core"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
          "@allansli/barcode-febraban-core": "barcodeFebrabanCore"
        }
      }
    }
  },
  test: {
    environment: "jsdom"
  }
});
