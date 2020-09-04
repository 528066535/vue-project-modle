const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanCSSPlugin = require('less-plugin-clean-css');

module.exports = merge(common, {
    devtool: 'source-map',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    plugins: [
        new ExtractTextPlugin({
            filename:  (getPath) => {
                return getPath('[name].[chunkhash].css');
            },
            allChunks: false
        })
    ],
    optimization: {
        // minimize: true //uglify js
    },

    mode: 'production',

    module: {
        rules: [
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                include: path.resolve(__dirname, "../src"),
                use: ExtractTextPlugin.extract({
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: "postcss-loader",
                            options: {
                                config: {
                                    path: path.resolve(__dirname, 'postcss.config.js')
                                }
                            }
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "../src"),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        'css-loader',
                        {
                            loader: "postcss-loader",
                            options: {
                                config: {
                                    path: path.resolve(__dirname, 'postcss.config.js')
                                }
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {lessPlugins: [new CleanCSSPlugin({advanced: true})]}
                        }
                    ]
                })
            }
        ]

    }
});