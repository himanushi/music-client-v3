module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["eslint:all"],
  globals: {
    DndEvent: false,
    MediaMetadata: true,
    MusicKit: false,
    NodeJS: false,
    grecaptcha: false
  },
  overrides: [
    {
      extends: "./linter/.eslintrc.javascript.js",
      files: ["*.js"]
    },
    {
      extends: "./linter/.eslintrc.typescript.js",
      files: ["*.ts"]
    },
    {
      extends: "./linter/.eslintrc.svelte.js",
      files: ["*.svelte"]
    }
  ],
  rules: {
    // アロー関数のワンライナーを許可する
    "arrow-body-style": [
      "error",
      "as-needed"
    ],

    // キャメルケースを強要しない
    camelcase: "off",

    // コメントアウトの文章の初めを大文字にしない
    "capitalized-comments": "off",

    // 戻り値の値を強制しない
    "consistent-return": "off",

    // デフォルト値がある引数は最後にしなくても良い
    "default-param-last": "off",

    // function がズレるので無効
    "function-call-argument-newline": [
      "error",
      "consistent"
    ],

    // function の括弧内での改行を強制しない
    "function-paren-newline": "off",

    // 1文字の変数を許可しない
    "id-length": [
      "error",
      { exceptions: [
        "_",
        "x",
        "y",
        "a"
      ] }
    ],

    // import 文はソートする
    "import/order": [
      "error",
      { alphabetize: { order: "asc" } }
    ],

    // インデントはスペース2個分
    indent: [
      "error",
      2
    ],

    // 初期化するときに初期値がなくても良い
    "init-declarations": "off",

    // コメントのみ最大列無視
    "max-len": [
      "error",
      {
        code: 160,
        ignoreComments: true,
        ignoreTemplateLiterals: true
      }
    ],

    // ファイルの最大行数を制限しない
    "max-lines": "off",

    "max-statements": "off",

    // 複数行用のコメント記述法を強制しない
    "multiline-comment-style": "off",

    // 三項演算子は改行してもしなくても良い
    "multiline-ternary": [
      "error",
      "never"
    ],

    // アロー関数を有効にする
    "no-confusing-arrow": "off",

    "no-duplicate-imports": "off",

    // マジックナンバーを許可する
    "no-magic-numbers": "off",

    // 演算子の混在を許可する
    "no-mixed-operators": "off",

    // process.env 使用許可
    "no-process-env": "off",

    // return の時に変数に代入できる
    "no-return-assign": "off",

    // typescript で nest した [key in object] をするため
    "no-shadow": [
      "error",
      { allow: ["key"] }
    ],

    // 三項演算子有効
    "no-ternary": "off",

    // undefined で初期化しても良い
    "no-undef-init": "off",

    // undefined 使える
    "no-undefined": "off",

    // typescript で [key in object] をするため
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^key$"
      }
    ],

    // object 内の改行
    "object-curly-newline": [
      "error",
      { minProperties: 2 }
    ],

    // object の隙間を開ける
    "object-curly-spacing": [
      "error",
      "always"
    ],

    // const 宣言をまとめない
    "one-var": "off",

    // object key のダブルクォーツを強制しない
    "quote-props": [
      "error",
      "as-needed"
    ],

    // import をソートする
    "sort-imports": "off",

    // object key をソートする
    "sort-keys-fix/sort-keys-fix": "error",

    // "use strict" を強要しない
    strict: [
      "error",
      "never"
    ]
  }
};
