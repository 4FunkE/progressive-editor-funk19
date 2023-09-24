const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

//Configure workbox plugins for a service worker and manifest file.
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // HTMLWebpackPlugin for generating HTML files
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),
      new WebpackPwaManifest({
        name: 'progressive-editor-funk19',
        short_name: 'PWA',
        description: 'A text editor that runs in the browser',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
      // InjectManifest for Workbox service worker
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your service worker file
        swDest: 'src-sw.js', // Output service worker filename
      }),
    ],

    module: {
      rules: [
        // Add CSS loaders and Babel configuration here as needed.
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};