import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", //跨域地址
        changeOrigin: true, //支持跨域
        rewrite: (path) => path.replace(/^\/api/, ""), //重写路径,替换/api
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
