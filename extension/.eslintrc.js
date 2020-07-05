module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
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
