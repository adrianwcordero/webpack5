const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Para componentes
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { index: "./src/index.js", photo: "./src/photo.js" },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
    clean: { dry: false }, // keep: /\.css$/ dry ask before removing
    // publicPath: "https://somecdn.com/",
  },
  mode: "development",
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 3000,
    },
  },
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(svg)$/,
        type: "asset/inline",
      },
      {
        test: /\.(png|jpg)$/,
        type: "asset", // Decide si es inline o resource segun el tamaño del archivo (maximo de 8kb por default)
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8 kb max for inline
          },
        },
      },
      {
        test: /\.ttf$/,
        type: "asset",
      },
      {
        test: /\.txt$/,
        type: "asset/source",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // Para componentes
          },
          "css-loader",
        ],
        exclude: /node_modules/,
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
  plugins: [
    new TerserPlugin(),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }), // Para componentes
    // new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ["**/*"] }),
    new HtmlWebpackPlugin({ filename: "index.html", minify: false }),
    new HtmlWebpackPlugin({ filename: "kiwi.html", minify: false }),
  ],
};
