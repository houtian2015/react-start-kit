const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = require('./webpack.comon.config');


const publicConfig = {
    /** 报错配置 */
    devtool: 'cheap-module-source-map',

    /* src文件夹下面的以.js结尾的文件，要用babel解析 */
    /* cacheDirectory是用来缓存编译结果，下次编译加速 */
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?modules&localIdentName=[local]-[hash:base64:5]', 'postcss-loader']
            })
        }]
    },

    /** 插件配置 */
    plugins: [
        /** 压缩js插件 */
        new UglifyJSPlugin(),
        /** 指定环境 */
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        /** 每次build之前清理一下dist目录插件 */
        new CleanWebpackPlugin(['dist/*.*']),
        /** 单独打包css文件 */
        new ExtractTextPlugin({
            filename: '[name].[contenthash:5].css',
            allChunks: true
        })
    ]
};

module.exports = merge(commonConfig, publicConfig);