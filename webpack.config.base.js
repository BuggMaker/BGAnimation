let path = require("path");
var fs = require("fs");
let webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {    
    react:"./src/react/index.js",
    vue:  "./src/vue/index.js"  
  },
  //定义webpack输出的文件，我们在这里设置了
  //让打包后生成的文件放在dist文件夹下的build.js文件中
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].build.js"
  },
  module: {
    rules: [
      //转化ES6语法
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      //解析.vue文件
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      //图片转化，小于8K自动转化为base64的编码
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader?limit=8192"
      },
      //加载 字体文件
      {
        test: /\.(eot|woff|svg|ttf)$/,
        // loader: "file-loader"
        loader: "url-loader?limit=10000"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin("./dist", {
      exclude: ["styles.css"]
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", "json", ".css", ".vue"], //需要编译的文件类型
    alias: {
      vue$: "vue/dist/vue.common.js"
    }
  }
};
