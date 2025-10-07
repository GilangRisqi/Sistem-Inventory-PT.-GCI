const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/js/app.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["last 2 versions", "not dead"],
                  },
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-transform-classes",
              "@babel/plugin-transform-async-to-generator",
            ],
          },
        },
      },
    ],
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
      publicPath: "/",
    },
    hot: true,
    historyApiFallback: true,
    compress: true,
    port: 8080,
    host: "0.0.0.0",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/manifest.json",
          to: "./",
        },
        {
          from: "./src/sw.js",
          to: "./",
        },
        {
          from: "./src/images",
          to: "images",
          noErrorOnMissing: true,
        },
        {
          from: "./node_modules/bootstrap/dist/css/bootstrap.min.css",
          to: "css/",
        },
        {
          from: "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
          to: "js/",
        },
        {
          from: "./node_modules/bootstrap-icons/font/bootstrap-icons.css",
          to: "css/",
        },
        {
          from: "./src/css",
          to: "css",
        },
      ],
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
  },
};
