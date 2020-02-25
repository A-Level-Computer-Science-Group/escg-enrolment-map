const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "inline-source-map",
  mode: "development",
  entry: './index.js',
  output: {
    path: '../src',
    filename: 'main.ts',
    libraryTarget: 'var',
    library: 'Functions'
  }
});
