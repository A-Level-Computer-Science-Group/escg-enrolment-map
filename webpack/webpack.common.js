const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = "../src/";

module.exports = {
  mode: "development",
  entry: {
    main: path.join(__dirname, srcDir + "main.ts"),
    style: path.join(__dirname, srcDir + "style.scss")
  },
  output: {
    path: path.join(__dirname, "../dist/js"),
    chunkFilename: "[name].js",
    publicPath: "./dist/",
    library: "funcs",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  node: {
    net: "empty"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "../css/[name].css"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "css-loader?-url"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial"
    }
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    // exclude locale files in moment
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyPlugin([{ from: ".", to: "../" }], { context: "public" })
  ]
};
