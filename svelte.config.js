module.exports = { preprocess: require("svelte-preprocess")({
  defaults: { script: "typescript" },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer")
  ]
}) };
