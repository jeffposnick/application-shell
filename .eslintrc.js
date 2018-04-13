module.exports = {
  extends: ['eslint:recommended', 'google'],
  env: {
    serviceworker: true,
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  rules: {
    'require-jsdoc': 0,
  },
  overrides: [{
    files: ['**/*.mjs'],
    sourceType: 'module',
  }]
};
