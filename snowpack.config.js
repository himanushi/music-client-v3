/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  alias: {
    routify: "./.routify",
    "~": "./src"
  },
  devOptions: { tailwindConfig: "./tailwind.config.js" },
  exclude: ["**/*.graphql"],
  mount: {
    ".routify": { url: "/" },
    public: {
      static: true,
      url: "/"
    },
    src: { url: "/" }
  },
  optimize: {
    bundle: true,
    minify: true,
    sourcemap: false
  },
  packageOptions: { knownEntrypoints: [
    "@roxi/routify",
    "@roxi/routify/runtime/buildRoutes"
  ] },
  plugins: [
    "@snowpack/plugin-svelte",
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-typescript",
    "@snowpack/plugin-postcss"
  ],
  routes: [
    {
      dest: "/index.html",
      match: "routes",
      src: ".*"
    }
  ]
};
