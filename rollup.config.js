/*
 * @Author: cyberber 978265004@qq.com
 * @Date: 2024-07-24 22:55:00
 * @LastEditors: cyberber 978265004@qq.com
 * @LastEditTime: 2025-01-06 14:21:00
 * @FilePath: /my-component/rollup.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import sass from "sass";

const processScss = function (context) {
  return new Promise((resolve, reject) => {
    sass.render(
      {
        file: context,
        includePaths: ["src/styles"],
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.css);
        }
      }
    );
  });
};

const external = ["react", "react-dom", "react/jsx-runtime", "classnames"];

const config = {
  input: "src/index.tsx",
  output: [
    {
      dir: "dist/",
      format: "es",
      preserveModules: true,
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
  ],
  external,
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: "./tsconfig.json",
      tsconfigOverride: {
        exclude: ["**/__tests__/**"],
      },
    }),
    postcss({
      extract: true,
      modules: true,
      use: ["sass"],
      process: processScss,
      extensions: [".css", ".scss"],
    }),
  ],
};

export default config;
