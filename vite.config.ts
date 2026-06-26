import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    server: {
      host: "0.0.0.0",
      allowedHosts: ["aiaura.onrender.com"],
    },
    preview: {
      host: "0.0.0.0",
      allowedHosts: ["aiaura.onrender.com"],
    },
  },

  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});
