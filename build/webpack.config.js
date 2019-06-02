const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        vendor: [
            'vue'
        ],
        index: './src/main.js',
        css: './src/resource/css/index.js'
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
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ["vendor","index","commons","css"],
            template: './src/index.html',
            inject: 'body',
            title: '测试',
            hash: false
        }),
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
            '@': path.resolve(__dirname, "../src"),
            '@Components': path.resolve(__dirname, "../src/resource/core/components"),
            '@Pages': path.resolve(__dirname, "../src/pages"),
            '@Core': path.resolve(__dirname, "../src/resource/core"),
            '@Router': path.resolve(__dirname, "../src/resource/core/router"),
            'vue': 'vue/dist/vue.common.js',
        }
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                options: {
                    loaders: {
                        less: 'vue-style-loader!css-loader!less-loader'
                    },
                    esModule: false
                }
            },
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
            {
                test: /\.js$/,
                use: 'babel-loader?cacheDirectory', // 缓存loader执行结果 发现打包速度已经明显提升了
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            }

        ]
    }
};