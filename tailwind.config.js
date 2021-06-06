const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography")
  ],
  purge: {
    content: [
      "./public/*.html",
      "./src/**/*.{js,ts,svelte}"
    ],
    options: { safelist: [
      /^h-/u,
      /^w-/u
    ] }
  },

  /*
   * eslint では、CSS で ":" を使用するとパーサーエラーが発生することがあります。
   * In eslint, using ":" in CSS may cause a parser error.
   * @apply focus:outline-non → @apply focus_outline-non
   */
  separator: "_",

  // ref: https://github.com/tailwindlabs/tailwindcss-typography/issues/69#issuecomment-752946920
  theme: { extend: {
    colors: {
      cyan: colors.cyan,
      "light-blue": colors.lightBlue,
      teal: colors.teal
    },
    typography: (theme) => ({ DEFAULT: { css: [
      {
        "[class~=\"lead\"]": { color: theme("colors.gray.300") },
        a: { color: theme("colors.white") },
        "a code": { color: theme("colors.white") },
        blockquote: {
          borderLeftColor: theme("colors.gray.600"),
          color: theme("colors.gray.200")
        },
        code: { color: theme("colors.white") },
        color: theme("colors.gray.400"),
        "figure figcaption": { color: theme("colors.gray.400") },
        h1: { color: theme("colors.white") },
        h2: { color: theme("colors.white") },
        h3: { color: theme("colors.white") },
        h4: { color: theme("colors.white") },
        hr: { borderColor: theme("colors.gray.200") },
        "ol > li::before": { color: theme("colors.gray.400") },
        pre: {
          backgroundColor: theme("colors.gray.800"),
          color: theme("colors.gray.200")
        },
        strong: { color: theme("colors.white") },
        "tbody tr": { borderBottomColor: theme("colors.gray.600") },
        thead: {
          borderBottomColor: theme("colors.gray.400"),
          color: theme("colors.white")
        },
        "ul > li::before": { backgroundColor: theme("colors.gray.600") }
      }
    ] } })
  } }
};
