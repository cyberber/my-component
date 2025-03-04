/*
 * @Author: cyberber 978265004@qq.com
 * @Date: 2025-01-11 21:23:42
 * @LastEditors: cyberber 978265004@qq.com
 * @LastEditTime: 2025-01-24 11:24:28
 * @FilePath: /my-component/vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve("src/index.js"),
      name: "MyReactLibrary",
      fileName: (format) => `my-library.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: true,
  },
});
