/* eslint-disable */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');

const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT) || 3000;

const context = process.cwd();
const src = path.resolve(context, 'src');
const assetsPath = path.resolve(context, 'static/dist');

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractStyles = new ExtractTextPlugin({
  filename: 'bundle.css?v=[hash]',
  disable: isDevelopment,
});

const common = {
	context: context,

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
		extensions: ['.js', '.jsx', '.json', '.json5', '.flow', '.js.flow'],
		alias: {
      components: path.resolve(src, 'components'),
      config: path.resolve(src, 'config'),
      containers: path.resolve(src, 'containers'),
      actions: path.resolve(src, 'actions'),
      duckredux: path.resolve(src, 'duckredux'),
      styles: path.resolve(src, 'styles'),
      types: path.resolve(src, 'types'),
      utils: path.resolve(src, 'utils'),
		},
	},

	module: {
    rules: [
      {
				test: /\.jsx?(.flow)?$/,
				include: [src],
				loader: 'babel-loader',
        options: {
          compact: false,
        },
			},
      {
        test: /\.p?css$/,
        use: extractStyles.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                sourceMap: isDevelopment,
                localIdentName: isDevelopment ? '[path]--[local]' : null,
                context: '/',
              },
            },
            {
              loader: 'postcss-loader',
            }
          ]
        })
      },
			{
				test: /\.json5?$/,
				include: [src],
				loader: 'json5-loader',
			},
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.jpg(\?v=\d+\.\d+\.\d+)?$/,
        include: [src],
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: 'image/jpg',
        },
      },

    ],
	},

	plugins: [
    extractStyles,
		new webpack.ProvidePlugin({
			log: 'loglevel',
		}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      },
      __ENV__: JSON.stringify(process.env.NODE_ENV),
      __DEVELOPMENT__: isDevelopment,
      __DEVTOOLS__: isDevelopment ? process.env.DEVTOOL : false,
      __LOGLEVEL__: JSON.stringify(process.env.LOGLEVEL),
    }),
	],
}

const developeConfig = require('./webpack.conf.dev.js');
const productionConfig = require('./webpack.conf.prod.js');

if ( isDevelopment ) {
	module.exports = merge.smart(common, developeConfig);
}else if ( isProduction ) {
	module.exports = merge.smart(common, productionConfig);
}else{
	module.exports = common;
	// throw Error(`\x1b[31m✖ ==> Our assembly have no ENV\x1b[0m like  ${process.env.NODE_ENV}`);
}
