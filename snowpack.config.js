/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  "alias": {
    "~": "./src"
  },
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
