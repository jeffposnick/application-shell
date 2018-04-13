export default [{
  input: 'src/templates.mjs',
  output: {
    file: 'build/templates.js',
    format: 'cjs',
  },
}, {
  input: 'src/urls.mjs',
  output: {
    file: 'build/urls.js',
    format: 'cjs',
  },
}, {
  input: 'src/router.mjs',
  output: {
    file: 'build/router.js',
    format: 'cjs',
  },
}, {
  input: 'src/routes.mjs',
  output: {
    file: 'build/routes.js',
    format: 'cjs',
  },
}, {
  input: 'src/partials.mjs',
  output: {
    file: 'build/partials.js',
    format: 'cjs',
  },
}, {
  input: 'src/source-sw.mjs',
  output: {
    file: 'build/source-sw.js',
    format: 'iife',
  },
}];
