import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(
        env.VITE_SUPABASE_URL
      ),
      "import.meta.env.VITE_SUPABASE_ANON_KEY": JSON.stringify(
        env.VITE_SUPABASE_ANON_KEY
      ),
    },
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
      open: true,
    },
    build: {
      outDir: "dist",
      sourcemap: true,
    },
  };
});
