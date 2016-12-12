/* eslint-disable */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');

const assetsPath = path.resolve(__dirname, '../static/dist');
const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT) || 3000;

const common = {
	context: path.resolve(__dirname, '../'),

	output: {
		path: assetsPath,
		filename: 'bundle.js',
		publicPath: `http://${host}:${port}/dist/`,
	},

	resolve: {
		modulesDirectories: [
			'src',
			'node_modules',
		],
		extensions: ['', '.js', '.jsx', '.json', '.json5'],
		alias: {
		},
	},

	module: {
		loaders: [{
				test: /\.jsx?$/,
				include: [/src/],
				loaders: ['babel?cacheDirectory=true'],
			}, {
				test: /\.json5?$/,
				loader: 'json5-loader'
			},
			{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
			{ test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
		]
	},

	postcss: function() {
		return [
			require('postcss-nested'),
			require('postcss-simple-vars'),
			require('postcss-custom-media'),
			require('postcss-media-minmax'),
			require('postcss-conditionals'),
			require('postcss-mixins'),
			require('postcss-cssnext')({ browsers: ['last 2 versions'] }),
			require('postcss-easings'),
		];
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
