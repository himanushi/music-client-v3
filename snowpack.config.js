/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  "mount": {
    "public": {
      "static": true,
      "url": "/"
    },
    "src": {
      "url": "/dist"
    }
  },
  "plugins": [
    "@snowpack/plugin-svelte",
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-typescript"
  ]
};
