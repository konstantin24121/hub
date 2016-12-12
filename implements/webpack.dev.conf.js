/* eslint-disable */
const webpack = require('webpack');
const path = require('path');

const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT ) || 3000;

// Plugins

module.exports = {
	devtool: 'eval',
	entry: {
	  'main': [
	    'react-hot-loader/patch',
	  	'webpack-hot-middleware/client',
		  path.join(__dirname, '../src/client.js')
	  ]
	},

	module: {
		loaders: [{
			test: /\.scss$/,
			loader: 'style!css?modules&importLoaders=2!postcss!sass'
		}, {
			test: /\.css$/,
			loader: 'style!css?modules&localIdentName=[path][name]--[local]&sourceMap!postcss'
		},
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
      __ENV__: JSON.stringify(process.env.NODE_ENV),
      __DEVELOPMENT__: true,
      __DEVTOOLS__: process.env.DEVTOOLS,
      __LOGLEVEL__: JSON.stringify(process.env.LOGLEVEL),
    }),
	],
}
