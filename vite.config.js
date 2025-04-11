import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],

    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      port: 5173,
      open: false,
      allowedHosts: true,
    },
    build: {
      outDir: "dist",
      sourcemap: true,
    },
  };
});
