/* eslint-disable */
const webpack = require('webpack');
const path = require('path');

const context = process.cwd();

module.exports = {
	devtool: 'eval',
	entry: {
	  'main': [
	    'react-hot-loader/patch',
	  	'webpack-hot-middleware/client',
		  path.join(context, 'src/client.js')
	  ]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
}
