const webpack = require('webpack');
const RefreshBrowserPlugin = require('refresh-browser-webpack-plugin');

module.exports = {
    mode: 'development',
    entry:['refresh-browser-webpack-plugin/client', './App.js'],
    module: {
        rules: [{
            test: /\.html$/,
            loader: "raw-loader"
        }, {
            test: /\.css$/,
            loaders: "css-loader"
        }]
    },
    watch: true,
    devServer: {
        port: 8080,
        contentBase: './',
        watchContentBase: true,
        hot: true,
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 300,
            poll: 1000
        },
        openPage: '/comment.html'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new RefreshBrowserPlugin()
    ]
}