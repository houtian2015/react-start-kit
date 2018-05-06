const path = require('path');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.comon.config');

const devConfig = {
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch', // react 热替换
            './src/index.js'
        ]
    },
    output: {
        /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
        filename: '[name].[hash].js'
    },

    /** 报错配置 */
    devtool: 'inline-source-map',

    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader?modules&localIdentName=[local]-[hash:base64:5]', 'postcss-loader']
        }]
    },

    // 本地开发环境静态服务器
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
        proxy: {
            "/api/*": "http://localhost:8090/$1"
        }
    }
}

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);