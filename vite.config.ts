import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        "vue",
        "three",
        "three/examples/jsm/controls/OrbitControls.js",
        "three/examples/jsm/libs/stats.module.js",
        "three/addons/libs/lil-gui.module.min.js",
        "three/addons/helpers/ViewHelper.js",
      ],
    },
  },
  plugins: [
    vue(),
  ],
});
