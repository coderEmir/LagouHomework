var Merge = require('webpack-merge');
const webpack = require("webpack");
module.exports = Merge(CommonConfig, {
    devServer: {
        // webpack-dev-server 在webpack4中 替换为 webpack serve
        // 打开热更新
        // hot: true,
        contentBase: './src',
        port: 3000
    },
    plugins: [ 
        new webpack.HotModuleReplacementPlugin(),
    ]
})