const colors = require("tailwindcss/colors");

module.exports = {
  "mode": "jit",
  "plugins": [],
  "purge": {
    "content": [
      "./public/*.html",
      "./src/**/*.{js,ts,svelte}"
    ]
  },

  /*
   * eslint では、CSS で ":" を使用するとパーサーエラーが発生することがあります。
   * In eslint, using ":" in CSS may cause a parser error.
   * @apply focus:outline-non → @apply focus_outline-non
   */
  "separator": "_",
  "theme": {
    "extend": {
      "colors": {
        "teal": colors.teal
      }
    }
  },
  "variants": {
    "extend": {
      "backgroundColor": ["active"],
      "backgroundOpacity": ["active"]
    }
  }
};
