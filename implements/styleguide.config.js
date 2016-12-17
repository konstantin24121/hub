/* eslint-disable */

const path = require('path');
const common = require('./webpack.config.js');
const docgen = require('react-docgen');
const fs = require('fs');

const port = process.env.STYLEGUIDE_PORT || (+process.env.PORT || 3000) + 1;
const host = (process.env.HOST || 'localhost');
const customComponents = [
  'ReactComponent',
  'StyleGuide/StyleGuideRenderer',
  'TableOfContents/TableOfContentsRenderer',
  'ComponentsList',
  'Section/SectionRenderer',
];

module.exports = {
  title: 'StyleGuide',
  serverPort: port,
  serverHost: host,
  highlightTheme: 'material',
  template: path.resolve(__dirname, '../src/tools/styleguide/template.html'),
  contextDependencies: [
    path.resolve(__dirname, '../src/components'),
  ],
  getExampleFilename: componentpath => path.join(path.dirname(componentpath), 'demo.md'),
  // getComponentPathLine: (componentpath) => {
  //   const dir = path.parse(componentpath).dir;
  //   const name = /(\w)*$/.exec(dir);
  //   return `import {${name[0]}} from 'components';`;
  // },
  sections: [
    {
      name: 'Introduction',
    },
    {
      name: 'UI Components',
      components: '../src/components/[A-Z]*/index.jsx',
    },
  ],
  updateWebpackConfig: (webpackConfig) => {
    const dir = path.resolve(__dirname, '../src');
    for (const loader of common.module.loaders) {
      loader.include = dir;
      webpackConfig.module.loaders.push(loader);
    }

    for (const component of customComponents) {
      webpackConfig.resolve.alias[`rsg-components/${component}`] =
        path.join(__dirname, `../src/tools/styleguide/${component}`);
    }

    webpackConfig.resolve.alias['tools/styles'] =
      path.join(__dirname, '../src/tools/styles');

    webpackConfig.postcss = common.postcss;
    return webpackConfig;
  },
  handlers: require('react-docgen').defaultHandlers.concat(
    (documentation, path) => {
      documentation.set('pure', path.value.superClass.name === 'PureComponent');
    },
    (documentation, path) => {
      documentation.set('importString', `import {${path.value.id.name}} from 'components';`);
    },
    // To better support higher order components
    require('react-docgen-displayname-handler').default
  ),
};
