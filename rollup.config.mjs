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
  input: 'src/source-sw.mjs',
  output: {
    file: 'build/source-sw.js',
    format: 'iife',
  },
}];
