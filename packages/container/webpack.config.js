/*
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
const { merge } = require('webpack-merge');
const common = require('../../dev/config/webpack.common');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies

module.exports = merge(common, {
  mode: 'development',
  entry: path.join(process.cwd(), "/src/index.ts"),
  devServer: {
    static: path.join(process.cwd(), 'dist'),
    hot: true,
    port: 8000,
  },
  devtool: 'inline-source-map',
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        contact: 'contact@http://localhost:8082/remoteEntry.js',
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
  ],
});
