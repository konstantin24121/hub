// const  webpackConfig = require('./implements/webpack.config.js');
module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    "airbnb",
    "plugin:jest/recommended",
    "plugin:flowtype/recommended"
  ],
  env: {
    browser: true,
    node: true,
    "jest/globals": true,
  },
  globals: {
    // Enviroment variables
    __DEVELOPMENT__: true,
    __LOGLEVEL__: true,
    __DEVTOOLS__: true,

    // Global library
    log: true,

    // Testing
    shallow: true,
    render: true,
    mount: true,
  },
  "rules": {
    "max-len": [1, 100, { "ignoreUrls": true }],
    "no-tabs": 0,
    "linebreak-style": 0,
    "no-console": 0,
    "indent": [1, 2, {
      "SwitchCase": 1,
    }],
    "arrow-body-style": 0,
    "class-methods-use-this": 0,
    "global-require": 0,
    "no-underscore-dangle": 0,
    "no-useless-constructor": 1,
    "space-before-function-paren": 1,
    "space-before-blocks": 1,
    "arrow-parens": [2, "always"],
    "no-restricted-syntax": 0,
    "guard-for-in": 0,
    "no-duplicate-imports": 0,
    "func-names": 0,
    "no-empty": [0,  {"allowEmptyCatch": true }],
    "no-use-before-define": [1, {
      "functions": false,
      "classes": true,
    }],
    "no-use-before-define": 0,
    "no-param-reassign": [1, { "props": false }],
    // React
    "react/jsx-indent": [1, 2],
    "react/prefer-stateless-function": 1,
    "react/no-unused-prop-types": 1,
    "react/jsx-indent-props": [1, 2],
    "react/prop-types": [1, {
      "ignore": [
        "media"
      ]
    }],
    "react/prefer-stateless-function": [2, {
      ignorePureComponents: true
    }],
    "react/forbid-prop-types": 1,
    "react/sort-comp": [1, {
      order: [
        'type-annotations',
        'static-methods',
        'getters',
        'chekers',
        'lifecycle',
        'everything-else',
        '/^handle.+$/',
        'rendering',
      ],
      groups: {
        rendering: [
          '/^render.+$/',
          'render',
        ],
        getters: [
          '/^get.+$/',
        ],
        chekers: [
          '/^check.+$/',
        ],
      },
    }],

    // Import
    // "import/extensions": [2, "never", { "svg": "always", "png": "always" }],
    "import/prefer-default-export": 0,

    // jsx-a11y
    "jsx-a11y/no-static-element-interactions": 0,
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: "implements/webpack.config.js",
      },
    },
  },
  plugins: [
    "react", "import", "jsx-a11y", "json", "jest", "babel", "flowtype"
  ]
}
