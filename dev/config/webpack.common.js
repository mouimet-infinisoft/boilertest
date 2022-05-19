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
  target: "web",
  entry: path.join(process.cwd(), "/src/index.tsx"),
  plugins: [
    new MomentLocalesPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /node_modules\/antd\/es\/style\/core\/global\.less/,
      path.join(__dirname, "../templates/antd.css")
    ),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../templates/index.html"),
      title: "Infinisoft Boiler Plate"
    })
  ],
  output: {
    filename: "[name].[contenthash].js",
    path: path.join(process.cwd(), "dist"),
    clean: true
  },
  optimization: {
    moduleIds: 'deterministic',
    usedExports: true,
    runtimeChunk: 'multiple',
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all"
        }
      }
    }
  },
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
              // modularly import the JS and styles that we use from ‘antd’
              // [
              //   'import',
              //   { libraryName: 'antd', style: true },
              //   'antd',
              // ],
              // // modularly import the JS that we use from ‘@ant-design/icons’
              // [
              //   'import',
              //   {
              //     libraryName: '@ant-design/icons',
              //     libraryDirectory: 'es/icons',
              //   },
              //   'antd-icons',
              // ],
              'lodash',
            ],
          }
        },
        exclude: /node_modules/
      },
      // {
      //   test: /\.tsx?$/,
      //   use: "ts-loader",
      //   exclude: /node_modules/
      // },
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
