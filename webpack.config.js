const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

let devMode = false;
if (typeof (process.env.NODE_ENV) != 'undefined') {
  const devMode = process.env.NODE_ENV !== "production";
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js?t=' + new Date().getTime(),
    chunkFilename: '[name]-chunk.js?t=' + new Date().getTime(),
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CopyPlugin({
      patterns: [
        {from: "src/images", to: "images"},
        {context: 'src/styles/otf/', from: "*", to: "."},
        {context: 'src/styles/ttf/', from: "*", to: "."},
        {context: 'src/styles/woff/', from: "*", to: "."},
        {context: 'src/styles/svg/', from: "*", to: "."}
      ]
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      algorithm: "gzip",
      compressionOptions: {
        level: 9
      }
    })
  ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8888,
  },
};
