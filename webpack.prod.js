const Webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin(),
    new Webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new Webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new Webpack.optimize.AggressiveMergingPlugin(),
    new Webpack.optimize.UglifyJsPlugin()
  ]
});
