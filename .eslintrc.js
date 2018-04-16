module.exports = {
  extends: ['eslint:recommended', 'google'],
  env: {
    serviceworker: true,
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    workbox: false,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  rules: {
    'require-jsdoc': 0,
  },
  overrides: [{
    files: ['**/*.mjs'],
    parserOptions: {
      sourceType: 'module',
    },
  }, {
    files: [
      '{functions,src}/*.{mjs,js}',
    ],
    plugins: [
      'header',
    ],
    rules: {
      'header/header': [2, 'block', {pattern: 'Copyright \\d{4} Google Inc.'}]
    }
  }],
};
