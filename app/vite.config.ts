import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],
  build: {
    sourcemap: false,
  },
  server: {
    fs: {
      strict: false,
    },
    port: 7878,
    hmr: {
      overlay: false,
    },
    watch: {
      usePolling: false,
      interval: 100,
    },
  },
});
