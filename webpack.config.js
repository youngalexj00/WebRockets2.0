const path = require('path');

module.exports = {
  entry: './Client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '/Server/Build'),
  },
  mode: process.env.NODE_ENV,
  devServer: {
    publicPath: 'http://localhost:8080/Server/Build/',
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
      },
    },
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: path.resolve(__dirname, 'node_modules/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?css$/i,
        exclude: path.resolve(__dirname, 'node_modules/'),
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
