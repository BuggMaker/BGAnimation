let webpack = require("webpack");
const WebpackDevOutput = require("webpack-dev-server-output");
const baseConfig = require("./webpack.config.base.js");

baseConfig.mode = "development";
baseConfig.output.publicPath = "/dist/";
baseConfig.devtool = "source-map";
baseConfig.devServer = {
  publicPath: "/test/",
  host: "localhost",
  port: "8055",
  contentBase: "./test",
  hot: true
};
baseConfig.module.rules.push({
  test: /\.(less|css)$/,
  use: ["style-loader", "css-loader"]
});
baseConfig.plugins.push(
  ...[
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackDevOutput({
      path: "./test/dist",
      isDel: false
    })
  ]
);

module.exports = baseConfig;
