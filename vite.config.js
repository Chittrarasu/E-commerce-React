// import { defineConfig, loadEnv } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "tailwindcss";
// import autoprefixer from "autoprefixer";

// export default defineConfig(({ mode }) => {
//   return {
//     plugins: [react()],

//     css: {
//       postcss: {
//         plugins: [tailwindcss, autoprefixer],
//       },
//     },
//     resolve: {
//       alias: {
//         "@": "/src",
//       },
//     },
//     server: {
//       port: 5173,
//       open: false,
//       allowedHosts: true,
//     },
//     build: {
//       outDir: "dist",
//       sourcemap: true,
//     },
//   };
// });

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
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
      port: 5173, // Development server port
      open: false,
      host: true,
    },
    build: {
      outDir: "dist",
      sourcemap: mode === "development", // Disable in production
      rollupOptions: {
        input: {
          main: "index.html",
        },
      },
    },
    base: env.VITE_BASE_URL || "/", // Base URL for routing
    preview: {
      port: 8080, // Match package.json preview script
      host: true,
    },
  };
});
