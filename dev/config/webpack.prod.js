/*
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

/**
 * Not implemented yet
 * Reminder:
 * Terser plugin and minify
 */
module.exports = merge(common, {
  mode: 'production',
  plugins: [],
});
