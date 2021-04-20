module.exports = {
  extends: "stylelint-config-recommended",
  rules: {
    "at-rule-no-unknown": [
      true,
      { ignoreAtRules: [
        "extends",
        "tailwind",
        "layer"
      ] }
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["global"] }
    ]
  }
};
