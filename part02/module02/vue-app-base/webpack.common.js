const path = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');

var CommonConfig = {
    
    entry: './src/main.js',
    output: {
        filename: 'index.js',
        path: __dirname + '/dist',
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
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: "my app",
            BASE_URL: "./public/",
            template: "./src/index.html"
        })
    ]
}
module.exports = CommonConfig