import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "./", // Garante caminhos relativos para uso externo
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, "webflow-modules-txt/modules/index.js"),
      output: {
        entryFileNames: "index.js",
        dir: "dist",
        format: "iife",
      },
    },
    minify: false,
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: false,
  },
});
