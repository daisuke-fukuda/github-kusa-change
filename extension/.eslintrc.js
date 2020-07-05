module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  globals: {
    chrome: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    // "no-console": "off",
    "no-use-before-define": "off",
    semi: [2, "always"]
  },
  globals: {
    ga: "readonly"
  }
};
