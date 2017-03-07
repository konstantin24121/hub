module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
  },
  "globals": {
    // Enviroment variables
    "__DEVELOPMENT__": true,
    "__LOGLEVEL__": true,
    "__DEVTOOLS__": true,

    // Global library
    "log": true,
  },
  "rules": {
    "no-tabs": 0,
    "linebreak-style": 0,
    "no-console": 0,
    "indent": [1, 2, {
      "SwitchCase": 1,
    }],
    "global-require": 0,
    "no-underscore-dangle": 0,
    "no-useless-constructor": 1,
    "space-before-function-paren": 1,
    "space-before-blocks": 1,
    "arrow-parens": [2, "always"],
    "no-restricted-syntax": 0,
    "guard-for-in": 0,

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

    // Import
    // "import/extensions": [2, "never", { "svg": "always", "png": "always" }],
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "implements/webpack.config.js",
      },
    },
  },
  "plugins": [
    "react", "import", "jsx-a11y", "json"
  ]
}