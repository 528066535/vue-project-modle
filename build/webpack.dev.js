const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');
const CleanCSSPlugin = require('less-plugin-clean-css');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common,{
    mode: 'development',
    entry: {
        index: './src/enter-client.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[name].js',
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ["vendor","index","commons","css"],
            template: './src/resource/template/index.html',
            inject: 'body',
            title: '测试',
            hash: false
        }),
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
                exclude: /node_modules|bootstrap/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
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
                        options: { lessPlugins: [ new CleanCSSPlugin({ advanced: true }) ] }
                    }
                ]
            }
        ]
    }

});