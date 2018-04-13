const path = require('path');

module.exports = {
  globDirectory: 'www',
  globIgnores: ['**/workbox-v*/**'],
  swSrc: 'build/source-sw.js',
  swDest: path.join('www', 'sw.js'),
};
