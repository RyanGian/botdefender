import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr({ include: "**/*.svg?react" }), react()],
  server: {
    watch: {
      usePolling: true,
    },
    hmr: {
      overlay: true, // Ensure the overlay is enabled
    },
  },
});
