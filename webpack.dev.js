const Webpack = require('webpack')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WriteFilePlugin = require('write-file-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new Webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new WriteFilePlugin({
            log: false
        }),
        new BundleAnalyzerPlugin({
            openAnalyzer: false
        })
    ]
});