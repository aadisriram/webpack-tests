import path from "path";
import webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: webpack.Configuration = {
  entry: "./src/index.ts",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new webpack.ProgressPlugin((percentage) => {
      console.log(percentage);
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Custom template",
      filename: "index.html",
      // Load a custom template (lodash by default)
      template: "templates/index.html",
    }),
  ],
};

console.log("start");
const compiler = webpack(config);
console.log("end");
