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
		rules: [
      {
  			test: /\.css$/,
  			include: [/src/],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[path]--[name]--[local]',
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
  		},
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
      __ENV__: JSON.stringify(process.env.NODE_ENV),
      __DEVELOPMENT__: true,
      __DEVTOOLS__: process.env.DEVTOOLS,
      __LOGLEVEL__: JSON.stringify(process.env.LOGLEVEL),
    }),
	],
}
