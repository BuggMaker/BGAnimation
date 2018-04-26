let path = require("path");
var fs = require("fs");
let webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "./src/main.js"),
  //定义webpack输出的文件，我们在这里设置了
  //让打包后生成的文件放在dist文件夹下的build.js文件中
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "build.js"
  },
  module: {
    rules: [
      //转化ES6语法
      {
        test: /\.js$/,
        loader: "babel-loader",
        // exclude: /node_modules/
        include: [path.resolve("src"), path.resolve("node-modules/iview")]
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
      exclude: ["styles.css",'build.js']
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        //这里用于安装babel，如果在根目录下的.babelrc配置了，这里就不写了
        babel: {
          presets: ["es2015", "stage-3"],
          plugins: ["transform-runtime"]
        }
      }
    })
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.common.js"
    }
  }
};
