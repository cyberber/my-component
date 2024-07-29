import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2"; // 打包typeScript的插件
// import sass from "rollup-plugin-sass";
import commonjs from "@rollup/plugin-commonjs";
// import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss"
import sass from "sass"


const processScss = function (context) {
  return new Promise((resolve, reject) => {
    sass.compile({ file: context }, (err, result) => {
      err ? reject(result) : resolve(reject)
    })
  })
}

const overrides = {
  compilerOptions: { declaration: true },
};

// const babelOptions = {
//   presets: ["@babel/preset-env"],
//   extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
//   exclude: "**/node_modules/**",
// };
const config = {
  input: "src/index.tsx",
  output: [
    {
      dir: "dist/",
      format: "es",
      preserveModules: true,
    },
  ],
    plugins: [
    nodeResolve(),
    // sass(),
    commonjs(),
    // babel(babelOptions),
    json(),
    typescript(),
    postcss({
      extract: true,
      process: processScss,
    }),
  ],
};

export default config