const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = "../src/";

module.exports = {
  entry: {
    main: path.join(__dirname, srcDir + "main.ts"),
    style: path.join(__dirname, srcDir + "style.scss")
  },
  output: {
    path: path.join(__dirname, "../dist/js"),
    filename: "[name].js"
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial"
    }
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
              name: "css/[name].css"
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
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    // exclude locale files in moment
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyPlugin([{ from: ".", to: "../" }], { context: "public" })
  ]
};
