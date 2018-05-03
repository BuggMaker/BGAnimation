let webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const baseConfig = require("./webpack.config.base.js");

baseConfig.module.rules.push(
  //样式文件 .css/.less
  {
    test: /\.(less|css)$/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: "css-loader"
    })
  }
);
baseConfig.plugins.push(
  ...[
    // 模块分析可视化
    // new BundleAnalyzerPlugin(),
    // new ExtractTextPlugin("[name].styles.css")
  ]
);
module.exports = baseConfig;
