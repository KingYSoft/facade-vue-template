/* tslint:disable */
/* eslint-disable */
const compressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      const plugins = [];
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true
            }
          },
          cache: true, // 启用文件缓存
          parallel: true, // 使用多进程并行运行来提高构建速度
          sourceMap: false // 映射错误信息到模块
        })
      );
      plugins.push(
        new compressionPlugin({
          test: /\.js$|\.html$|\.json$|\.css/,
          threshold: 0, // 只有大小大于该值的资源会被处理
          minRatio: 0.8 // 只有压缩率小于这个值的资源才会被处理
        })
      );
      config.plugins = [...config.plugins, ...plugins];
    }
  },
  chainWebpack: () => {
    // config.optimization.minimize(true);
  },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: `@import "src/assets/element-variables.scss";`
      }
    }
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: true,
      errors: true
    }
  }
};
