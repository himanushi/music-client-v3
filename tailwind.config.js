module.exports = {
  "plugins": [],
  "purge": {
    "content": ["./src/**/*.svelte"]
  },

  /*
   * eslint では、CSS で ":" を使用するとパーサーエラーが発生することがあります。
   * In eslint, using ":" in CSS may cause a parser error.
   * @apply focus:outline-non → @apply focus_outline-non
   */
  "separator": "_",
  "theme": {},
  "variants": {
    "extend": {
      "backgroundColor": ["active"],
      "backgroundOpacity": ["active"]
    }
  }
};
