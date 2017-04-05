/* eslint-disable */
const path = require('path');
const webpack = require('webpack');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const context = process.cwd();
const publicFolder = path.join(context, 'public');

module.exports = {
	entry: {
		'app': [
			'./src/client.js'
		]
	},

	output: {
		path: publicFolder,
    filename: 'bundle.js?v=[hash]',
		publicPath: '/',
	},

	plugins:[
		new HtmlWebpackPlugin({
      template: './static/index.tpl.html',
      filename: 'index.html',
      chunks: ['app'],
      inject: 'body',
    }),

    // optimizations
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin(),

    //Analization
    new BundleAnalyzerPlugin({
    	analyzerMode: 'static',
    	reportFilename: path.join(context, 'reports/report.html'),
    	generateStatsFile: true,
      openAnalyzer: false,
    	statsFilename: path.join(context, 'reports/stats.json'),
    })
	],
}
