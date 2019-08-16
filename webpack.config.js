const path = require('path')
const EndWebpackPlugin = require('./plugins/test-plugin.js');
module.exports = {
    entry: './src/main.js', // 入口, 可以为相对路径, 当然绝对路径也没错
    output: { // 输出配置
        path: path.join(__dirname, './dist'), // 输出的目录
        filename: 'bundle.js' // 输出的文件名
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ab$/,
                use: [
                    {
                        loader: path.resolve('loaders/next-loader.js'),
                        options: {
                            value: '测试'
                        }
                    },
                    // path.resolve('loaders/next-loader.js'),
                    path.resolve('loaders/ab-loader.js')
                ],
            },
        ],

    },
    plugins:[
        // 在初始化 EndWebpackPlugin 时传入了两个参数，分别是在成功时的回调函数和失败时的回调函数；
        new EndWebpackPlugin(() => {
            // Webpack 构建成功，并且文件输出了后会执行到这里，在这里可以做发布文件操作
            console.log('构建成功')
        }, (err) => {
            // Webpack 构建失败，err 是导致错误的原因
            console.error('构建失败');
        })
    ]

}
