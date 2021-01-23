import path from "path";
import webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { promisify } from "util";

const config: webpack.Configuration = {
  entry: "./src/index.ts",
  stats: "verbose",
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
  watch: false,
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
    new webpack.ProgressPlugin((percentage) => console.log(percentage)),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Custom template",
      filename: "index.html",
      // Load a custom template (lodash by default)
      template: "templates/index.html",
    }),
  ],
};

const config2: webpack.Configuration = {
  entry: "./src/index.ts",
  stats: "verbose",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  watch: false,
  watchOptions: {
    ignored: /node_modules/,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist2"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new webpack.ProgressPlugin((percentage) => console.log(percentage)),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Custom template",
      filename: "index.html",
      // Load a custom template (lodash by default)
      template: "templates/index.html",
    }),
  ],
};

async function run() {
  console.log("start");
  const compiler = webpack([config, config2]);
  console.log("mid");
  const wrapped = promisify(compiler.run).bind(compiler);
  console.log("end");

  // const timeout = () => new Promise((resolve) => setTimeout(resolve, 10000));
  // await timeout();
  // wrapped()
  //   .then((stats: webpack.Stats) => {
  //     if (stats.hasWarnings()) {
  //       console.log(stats.compilation.warnings);
  //     }
  //   })
  //   .catch(console.log);
}

run();
