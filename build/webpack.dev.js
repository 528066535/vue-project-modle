const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');
const CleanCSSPlugin = require('less-plugin-clean-css');

module.exports = merge(common,{
    mode: 'development',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[name].js',
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    plugins: [

    ],
    module: {
        rules:[
            {
                test: /\.css$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "../src"),
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: path.resolve(__dirname, 'postcss.config.js')
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "../src"),
                use: [
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
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
            }
        ]
    }

});