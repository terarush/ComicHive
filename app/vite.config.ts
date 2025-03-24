import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],
  build: {
    sourcemap: false,
  },
  server: {
    hmr: {
      overlay: false,
    },
    watch: {
      usePolling: false,
    },
  },
});
