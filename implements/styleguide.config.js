/* eslint-disable */

const path = require('path');
const common = require('./webpack.config.js');

module.exports = {
	title: 'My Great Style Guide',
	rootDir: './src',
	components: 'components/**/index.jsx',

	updateWebpackConfig(webpackConfig) {
		const dir = path.resolve(__dirname, 'src');
		for (const loader of common.module.loaders) {
			loader.include = dir;
			webpackConfig.module.loaders.push(loader);
		}
		webpackConfig.postcss = common.postcss;
		return webpackConfig;
	}
};
