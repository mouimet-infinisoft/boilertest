/*
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  context: process.cwd(),
  // target: "web",
  plugins: [
    new MomentLocalesPlugin(),
    // new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin(),
    // new webpack.NormalModuleReplacementPlugin(
    //   /(global\.less)*/g,
    //  "./empty.less"
    // ),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../templates/index.html"),
      title: "Infinisoft Boilerplate"
    })
  ],
  output: {
    filename: "[name].[contenthash].js",
    path: path.join(process.cwd(), "dist"),
    publicPath: 'auto',
    clean: true
  },
  // optimization: {
  //   moduleIds: 'deterministic',
  //   usedExports: true,
  //   runtimeChunk: 'multiple',
  //   minimize: true,
  //   minimizer: [new TerserPlugin()],
  //   splitChunks: {
  //     chunks: "all",
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: "all"
  //       }
  //     }
  //   }
  // },
  resolve: {
    cacheWithContext: false,
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-typescript",
              "@babel/preset-env",
              ["@babel/preset-react", {"runtime": "automatic"}]
            ],
            plugins: [
              'lodash',
            ],
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        include: path.resolve(process.cwd(), "src"),
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: path.resolve(process.cwd(), "src"),
        exclude: /node_modules/,
        type: "asset/resource"
      }
    ]
  }
};
