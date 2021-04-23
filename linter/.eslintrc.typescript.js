module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint",
    "import",
    "sort-keys-fix"
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^key$"
      }
    ],
    "no-unused-vars": "off"
  }
};
