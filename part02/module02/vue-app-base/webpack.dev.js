const { merge } = require('webpack-merge');
const webpack = require("webpack");
const CommonConfig = require("./webpack.common")
module.exports = merge(CommonConfig, {
    devServer: {
        // webpack-dev-server 在webpack4中 替换为 webpack serve
        // 打开热更新
        hot: true,
        contentBase: './src',
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "eslint-loader",
                enforce: "pre"
            }
        ]
    },
    plugins: [ 
        new webpack.HotModuleReplacementPlugin(),
    ]
})