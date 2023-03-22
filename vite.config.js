import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // devOptions: {
      //   enabled: true,
      //   type: "module",
      // },
      registerType: "autoUpdate",
      manifest: {
        short_name: "React App",
        name: "Create React App Sample",
        icons: [
          {
            src: "f.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "f.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "f.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",
      },
    }),
  ],
});
