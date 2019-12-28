const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolve = (dir) => path.join(__dirname, '..', dir);

module.exports = {
  mode: 'development', // webpack4新增属性，默认返回production,提供一些默认配置，例如cache:true
  devtool: 'cheap-module-eval-source-map',
  // source-map每个module生成对应的map文件
  // eval 每一个module模块执行eval，不生成map文件，在尾部生成一个sourceURL对应前后关系，所以更快
  // cheap 列信息 VLQ编码
  // module 包含了模块之间的sourcemap
  entry: {
    home: './src/index.js', // 设置入口文件
  },
  output: {
    filename: '[name].js', // 生成的js文件的名字
    path: resolve('dist'), // 生成的js存放目录
  },
  module: { // 配置loader
    rules: [
      {
        test: /\.js$/,
        include: resolve('src'), // 只解析src下面的文件,不推荐用exclude
        use: {
          loader: 'babel-loader',
        }
      },
    ],
  },
  devServer: { // 配置webpack-dev-server， 在本地启动一个服务器运行
    host: 'localhost', // 服务器的ip地址 希望服务器外可以访问就设置 0.0.0.0
    port: 8088,
    open: true, // 自动打开页面
    hot: true, // 设置热更新(引用react热更新必须设置)
    contentBase: resolve('dist'),  // 设置服务器从那个目录提供内容，默认当前 推荐使用绝对路径
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve('/dist/index.html'), // 生成的html文件存放的地址和文件名
      template: resolve("/index.html"), // 基于index.html模板进行生成html文件
    }),
    new webpack.HotModuleReplacementPlugin(), // 引入热更新插件(引用react热更新必须设置)
  ]
}
