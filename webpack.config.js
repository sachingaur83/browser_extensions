const path = require('path');

module.exports = [
  {
    mode: 'production',
    entry: './src/background.js',
    output: {
      filename: 'background.bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  },
  {
    mode: 'production',
    entry: './src/content.js',
    output: {
      filename: 'content.bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  },
  {
    mode: 'production',
    entry: './src/options.js',
    output: {
      filename: 'options.js',
      path: path.resolve(__dirname, 'dist'),
    },
  }
];
