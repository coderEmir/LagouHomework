const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
var {merge} = require('webpack-merge')
const CommonConfig = require('./webpack.common')
module.exports = CommonConfig
module.exports = merge(CommonConfig, {
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './public', to: './' }

            ]
        })
    ]
})