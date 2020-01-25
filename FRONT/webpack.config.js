const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/app/app.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};