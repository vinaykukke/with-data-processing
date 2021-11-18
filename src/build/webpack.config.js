const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const babelConf = require('./.babelrc.json');

module.exports = {
  entry: path.resolve(__dirname, '..', 'client', 'index.ts'),
  output: {
    path: path.resolve('dist'),
    filename: 'client.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelConf
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new UglifyJsPlugin(),
  ],
  resolve: {
    alias: {
      Types: path.resolve(__dirname, '..', 'client', 'types'),
      Helpers: path.resolve(__dirname, '..', 'client', 'helpers'),
    },
    extensions: ['.js', '.ts', '.json', '*'],
  }
};
