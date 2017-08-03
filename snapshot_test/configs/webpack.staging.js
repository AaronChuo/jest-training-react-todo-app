const merge        = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const loaders      = require('./webpack.loaders.js');
const plugins      = require('./webpack.plugins.js');
const paths        = require('./webpack.paths.js');

module.exports = merge(
  commonConfig,
  {
    devtool: '',
    output: {
      filename:      '[name]-[chunkhash:6].js',
      chunkFilename: '[name]-[chunkhash:6].js',
      publicPath:    paths.public,
    },
    module: {
      loaders: [
        loaders.eslint,
        loaders.js,
        loaders.font,
        loaders.image,
        loaders.audio,
        loaders.video,
        loaders.extractCss,
      ],
    },
    plugins: [
      plugins.loaderOptions,
      plugins.environmentVariables,
      plugins.extractText,
      plugins.htmlWebpack,
      plugins.commonsChunkVendor,
      plugins.commonsChunkManifest,
      plugins.bundleAnalyzerPlugin,
      // plugins.stylelintPlugin,
    ],
  }
);
