const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: './js/app.js',
    path: path.resolve(__dirname, 'dist')
  },
  // Use only for local development
  //devtool: 'eval-source-map',
  devtool: 'inline-source-map',
  plugins: [
    new CopyPlugin(
      [
        {
          from: path.resolve(__dirname, './src/index.html'),
          to: path.resolve(__dirname, './dist/index.html')
        }
      ]
    ),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          },
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};