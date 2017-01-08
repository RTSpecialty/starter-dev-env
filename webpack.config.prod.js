/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/client/vendor'),
    main: path.resolve(__dirname, 'src/client/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    // Hash the files using MD5 so that thier names change when the content changes
    new WebpackMd5Hash(),

    // Use CommonsChunkPlugin to create a seperate bundle
    // of vendor libraries so that they're cached separately
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    // Create HTML file that includes reference to bundled js
    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
      minify: {
        "collapseWhitespace": true,
        "html5": true,
        "keepClosingSlash": true,
        "minifyCSS": true,
        "minifyJS": true,
        "minifyURLs": true,
        "removeComments": true,
        "removeEmptyAttributes": true,
        "removeRedundantAttributes": true,
        "removeStyleLinkTypeAttributes": true,
        "useShortDoctype": true
      },
      inject: true
    }),
    // Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),
    // Minify js
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
