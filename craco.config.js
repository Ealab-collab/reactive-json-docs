/**
 * We use CRACO to rename the output files.
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let pkg = require("./package.json")

const version = pkg.version;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.filename = `static/js/reactive-json-standalone_${version}_[contenthash:8].js`;
      webpackConfig.output.chunkFilename = `static/js/reactive-json-standalone_${version}_[contenthash:8].chunk.js`;

      const miniCssPlugin = webpackConfig.plugins.find(
          (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
      );
      if (miniCssPlugin) {
        miniCssPlugin.options.filename = `static/css/reactive-json-standalone_${version}_[contenthash:8].css`;
        miniCssPlugin.options.chunkFilename = `static/css/reactive-json-standalone_${version}_[contenthash:8].chunk.css`;
      }

      return webpackConfig;
    }
  }
};
