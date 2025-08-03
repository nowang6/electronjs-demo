const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const mainConfig = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/main/main.ts',
  target: 'electron-main',
  devtool: isDevelopment ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/main'),
    filename: 'main.js',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
};

const rendererConfig = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/renderer/renderer.ts',
  target: 'electron-renderer',
  devtool: isDevelopment ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/renderer'),
    filename: 'renderer.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/renderer/index.html',
      filename: 'index.html',
    }),
  ],
};

const preloadConfig = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/renderer/preload.ts',
  target: 'electron-preload',
  devtool: isDevelopment ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/renderer'),
    filename: 'preload.js',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
};

module.exports = [mainConfig, rendererConfig, preloadConfig];