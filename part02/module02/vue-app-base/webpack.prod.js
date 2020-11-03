const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
var Merge = require('webpack-merge')
module.exports = Merge(CommonConfig, {
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