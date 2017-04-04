/* eslint-disable */
const path = require('path');
const webpack = require('webpack');

// Plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
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

	module: {
		rules: [
      {
				test: /\.p?css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
            }
          ]
        })
			},
		]
	},
	plugins:[
		new ExtractTextPlugin({
      filename: 'bundle.css?v=[hash]',
    }),

		new HtmlWebpackPlugin({
      template: './static/index.tpl.html',
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
