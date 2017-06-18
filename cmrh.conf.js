const path = require('path');
const postcssImport = require('postcss-import-sync');
const cssnext = require('postcss-cssnext');

module.exports = {
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  rootDir: path.resolve(__dirname),
  prepend: [
    postcssImport({}),
    cssnext({
      browsers: ['last 2 versions', '> 5%'],
      features: {
        customProperties: {},
      },
    }),
  ],
};
