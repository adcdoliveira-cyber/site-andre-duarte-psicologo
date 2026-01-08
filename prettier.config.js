/** @type {import("prettier").Config} */
export default {
  tailwindConfig: "./tailwind.config.js",
  tailwindFunctions: ["cn", "cva"],
  plugins: [
    "prettier-plugin-tailwindcss",
  ],
  semi: true,
  trailingComma: "es5",
  singleQuote: false,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
};