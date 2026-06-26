import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },
  },

  server: {
    host: "0.0.0.0",
    allowedHosts: ["aiaura.onrender.com"],
  },

  preview: {
    host: "0.0.0.0",
    allowedHosts: ["aiaura.onrender.com"],
  },
});
