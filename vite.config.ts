import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    // Build output is created and deleted by `npm run build`; watching it can
    // crash a running dev server (EINVAL on the removed dist-server folder).
    watch: { ignored: ["**/dist/**", "**/dist-server/**"] }
  }
});
