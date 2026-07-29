import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: { outDir: "dist" },
  server: {
    proxy: {
      // En dev local (npm run dev), redirige /api vers le serveur Express
      // lancé séparément avec `node server.js` (port 3000 par défaut).
      "/api": "http://localhost:3000",
    },
  },
});
