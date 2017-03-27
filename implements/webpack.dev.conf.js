/* eslint-disable */
const webpack = require('webpack');
const path = require('path');

const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT ) || 3000;

const context = process.cwd();
const src = path.resolve(context, 'src');

// Plugins

module.exports = {
	devtool: 'eval',
	entry: {
	  'main': [
	    'react-hot-loader/patch',
	  	'webpack-hot-middleware/client',
		  path.join(context, 'src/client.js')
	  ]
	},

	module: {
		rules: [
      {
  			test: /\.css$/,
  			include: [src],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[name]--[local]',
              sourceMap: true,
              context: '/',
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
