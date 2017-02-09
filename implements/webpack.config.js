/* eslint-disable */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');

const assetsPath = path.resolve(__dirname, '../static/dist');
const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT) || 3000;

const context = path.resolve(__dirname, '../');
const src = path.resolve(__dirname, '../src/');

const common = {
	context: path.resolve(__dirname, '../'),

	output: {
		path: assetsPath,
		filename: 'bundle.js',
		publicPath: `http://${host}:${port}/dist/`,
	},

	resolve: {
		modules: [
			context,
			'node_modules',
		],
    enforceExtension: true,
    enforceModuleExtension: true,
		extensions: ['.js', '.jsx', '.json', '.json5'],
		alias: {
      components: path.resolve(context, 'components'),
		},
	},

	module: {
    rules: [
      {
				test: /\.jsx?$/,
				include: [src],
				loader: 'babel-loader',
        query: {
          cacheDirecory: true,
        }
			},
			{
				test: /\.json5?$/,
				include: [src],
				loader: 'json5-loader',
			}
    ],
	},

	plugins: [
		new webpack.ProvidePlugin({
			log: 'loglevel',
		}),
	],
}

const developeConfig = require('./webpack.dev.conf.js');
const productionConfig = require('./webpack.prod.conf.js');

if ( process.env.NODE_ENV === 'development' ) {
	module.exports = merge.smart(common, developeConfig);
}else if ( process.env.NODE_ENV === 'production' ) {
	module.exports = merge.smart(common, productionConfig);
}else{
	module.exports = common;
	// throw Error(`\x1b[31m✖ ==> Our assembly have no ENV\x1b[0m like  ${process.env.NODE_ENV}`);
}
