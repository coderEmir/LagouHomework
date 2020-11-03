const path = require("path")
const webpack = require("webpack")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    // mode: 'none',
    entry: './src/main.js',
    output: {
        filename: 'index.js',
        path: __dirname + '/dist',
    },
    devServer: {
        // webpack-dev-server 在webpack4中 替换为 webpack serve
        // 打开热更新
        // hot: true,
        contentBase: './src',
        port: 3000
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: "vue-loader",
                    options: {
                        presets: ["@vue/cli-plugin-babel"]
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "eslint-loader",
                enforce: "pre"
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.png$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 超过这个大小，webpack会自动寻找file-loader
                        // 没有安装file-loader，会报错
                        limit: 10 * 1024,
                        esModule: false
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: "my app",
            BASE_URL: "./public/",
            template: "./src/index.html"
        }),

        new CopyPlugin({
            patterns: [
            { from: './public', to: './'}

            ]
        })
    ]
}