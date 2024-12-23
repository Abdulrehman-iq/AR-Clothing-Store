import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Ensures relative paths work correctly in production
  build: {
    outDir: "dist", // Output directory for the build
    assetsDir: "assets", // Directory for static assets
  },
});
