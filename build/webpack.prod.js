const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common,{
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ["vendor","index", "css", "ts","commons"],
            template: './src/index.html',
            inject: 'body',
            title: '测试',
            hash: true
        }),
    ],
    devtool: 'source-map',
    mode: 'production'
});