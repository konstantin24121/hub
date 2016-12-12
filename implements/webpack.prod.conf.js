/* eslint-disable */
const path = require('path');
const webpack = require('webpack');

// Plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const publicFolder = path.join(__dirname, '../public');

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

	module: {
		loaders: [{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css?modules&importLoaders=2!sass'),
			}, {
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('css?modules&importLoaders=2!postcss'),
			},
		]
	},
	plugins:[
		new ExtractTextPlugin('bundle.css?v=[hash]'),

		new HtmlWebpackPlugin({
      template: 'static/index.tpl.html',
      filename: 'index.html',
      chunks: ['app'],
      inject: 'body',
    }),

    new webpack.DefinePlugin({
    	'process.env': {
	      'NODE_ENV': JSON.stringify('production')
	    },
      __DEVELOPMENT__: false,
      __ENV__: JSON.stringify(process.env.NODE_ENV),
      __DEVTOOLS__: false,
    }),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    //Analization
    new BundleAnalyzerPlugin({
    	analyzerMode: 'static',
    	reportFilename: '../reports/report.html',
    	generateStatsFile: true,
    	statsFilename: '../reports/stats.json',
    })
	],
}
