// rollup.config.js
import reactScopedCssPlugin from "rollup-plugin-react-scoped-css";

export default {
  input: "src/input.js",
  output: { file: "ouput.js" },
  plugins: [reactScopedCssPlugin()],
};
