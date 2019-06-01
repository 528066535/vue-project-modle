const path = require('path');
const webpack = require('webpack');
const CleanCSSPlugin = require('less-plugin-clean-css');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    entry: {
        vendor: [
            'vue'
        ],
        index: './src/index.js',
        ts: './src/greeter.ts',
        css: './src/css.js'
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            // maxAsyncRequests: 1,                     // 最大异步请求数， 默认1
            // maxInitialRequests: 1,                   // 最大初始化请求数，默认1
            cacheGroups: {
                commons: {
                    chunks: 'all',
                    minChunks: 3,
                    maxInitialRequests: 8, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    name: 'common'
                }
            }
        }
    },
    plugins: [
        new ManifestPlugin({
            fileName: 'manifest.json',
            basePath: '',
            publicPath: '/dist/'
        }),
        new CleanWebpackPlugin()
    ],

    resolve: {
        extensions: [ '.js', '.vue', '.jsx', 'less'], //后缀名自动补全
        alias: {
            'vue': 'vue/dist/vue.common.js',
        }
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                include: path.resolve(__dirname, "../src"),
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
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
                    },
                    {
                        loader: 'less-loader',
                        options: {lessPlugins: [new CleanCSSPlugin({advanced: true})]}
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "../src"),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[chunkhash].[ext]',
                            outputPath: 'font/' //字体可以设置存放位置
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|woff)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "../src"),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
        ]
    }
};