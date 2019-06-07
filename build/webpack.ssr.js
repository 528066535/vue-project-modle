const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js')
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanCSSPlugin = require('less-plugin-clean-css');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =  merge(baseConfig,{
    entry: {
        index: './src/enter-server.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ["vendor","index","commons","css"],
            template: './src/resource/template/index.html',
            inject: 'body',
            title: '测试',
            hash: false
        }),
        new ExtractTextPlugin({
            filename:  (getPath) => {
                return getPath('[name].[chunkhash].css');
            },
            allChunks: false
        }),
        new VueSSRServerPlugin()
    ],

    externals: nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        whitelist: /\.css$/
    }),

    mode: 'production',

    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    output: {
        libraryTarget: 'commonjs2'
    },

    target: 'node',
    node: undefined,

    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
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