const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const resolve = (dir) => path.join(__dirname, '..', dir);

module.exports = {
  mode: 'production', // webpack4新增属性，默认返回production,提供一些默认配置，例如cache:true
  entry: {
    home: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: resolve('src'),
        use: {
          loader: 'babel-loader',
        }
      },
    ],
  },
  optimization: {
    minimizer:[
      new UglifyJsPlugin({//压缩js
        cache:true,
        parallel:true,
        sourceMap:true
    }),
    new OptimizeCssAssetsPlugin({})
    ],
    // 分离公共包
    splitChunks: { 
      cacheGroups: {
        commons: {
          test: /(react|react-dom)/,
          name: 'vendors',
          chunks: 'all' 
        }
      } 
   }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: resolve('/dist/index.html'),
      template: resolve("/index.html"),
    }),
    new webpack.DllReferencePlugin({
         manifest: require('../dll/manifest.json')
    }),
  ]
}
