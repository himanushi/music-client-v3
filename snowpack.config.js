/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  alias: {
    routify: "./.routify",
    "~": "./src"
  },
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
    minify: true
  },
  plugins: [
    "@snowpack/plugin-svelte",
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-typescript"
  ],
  routes: [
    {
      dest: "/index.html",
      match: "routes",
      src: ".*"
    }
  ]
};
