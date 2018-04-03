const path = require('path')

module.exports = {
    entry: [
        'react-hot-loader/patch', // react 热替换
        './src/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    /* src文件夹下面的以.js结尾的文件，要用babel解析 */
    /* cacheDirectory是用来缓存编译结果，下次编译加速 */
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        }]
    },

    // 本地开发环境静态服务器
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        host: '0.0.0.0'
    }
}