import { terser } from "rollup-plugin-terser";

export default {
  input: 'index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm'
  },
  plugins: [terser()]
};
