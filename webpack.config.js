'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  node: {
    fs: 'empty',
  },
  entry: {
    background: './src/background.ts',
    popup: './src/popup.ts',
    content_script: './src/content_script.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx', 'json'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.css|\.less$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
    ],
  },
};

module.exports = config;
