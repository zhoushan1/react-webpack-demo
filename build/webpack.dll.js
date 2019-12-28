const path = require('path')
const webpack = require('webpack')
// 生产环境不用dll的原因是因为很多相同的内容会重复打包的bundles里面
module.exports = {
  entry: {
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, '..', 'dist/vendor'), 
    filename: '[name].dll.js',
    library: '[name]_[hash]'
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的name,保持一致。
  },
  //在给定的 path 路径下创建一个名为 manifest.json 的文件。 这个文件包含了从 require 和 import 的request到模块 id 的映射。 DLLReferencePlugin 也会用到这个文件。
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      // 定义打包的公共vendor文件对外暴露的函数名
      name: '[name]_[hash]',
      // manifest.json文件的输出位置
      path: path.join(__dirname, '..', 'dist/vendor/manifest.json')
    })
  ]
}
