/*
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  plugins: [],
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(process.cwd(), 'dist'),
    hot: true,
  },
});
