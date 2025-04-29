import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Ensure this points to /src
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/onuman.scss";`,
        // Or if @ doesn't work, try direct path:
        // additionalData: `@import "${path.resolve(__dirname, 'src/assets/styles/onuman.scss')}";`
      },
    },
  },
});
