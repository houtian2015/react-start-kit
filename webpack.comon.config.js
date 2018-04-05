const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const commonConfig = {
    entry: {
        app: [
            'babel-polyfill',
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    /* src文件夹下面的以.js结尾的文件，要用babel解析 */
    /* cacheDirectory是用来缓存编译结果，下次编译加速 */
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        },{
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192     // 小于8k的图片自动编码为base64
                }
            }]
        }]
    },
    /** 插件配置 */
    plugins: [
        /** html 模板插件 */
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }), 
        /** 打包公共库代码插件 */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        /** 配合webpack.HashedModuleIdsPlugin使vendor.js名保持不变 */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
         /** 使构建的vendor.js文件名始终保持不变 */
         new webpack.HashedModuleIdsPlugin(),
    ],

    resolve: {
        /* 别名配置 */
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers'),
            mock: path.join(__dirname, 'mock')
        }
    },
};

module.exports = commonConfig;