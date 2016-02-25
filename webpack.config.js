'use strict';
let path = require('path');

module.exports = {
  entry: './app/index.js',
  // output: './public/app.js',
  output: {
      path: 'public',
      filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.js$/, exclude: /node_modules|bower_components/, loader: 'babel-loader'}
    ]
  }
};
