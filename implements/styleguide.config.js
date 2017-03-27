/* eslint-disable */

const path = require('path');
const common = require('./webpack.config.js');
const docgen = require('react-docgen');
const fs = require('fs');
const recast = require('recast');

const port = process.env.STYLEGUIDE_PORT || (+process.env.PORT || 3000) + 1;
const host = (process.env.HOST || 'localhost');
const env = process.env.NODE_ENV;
const context = process.cwd();

const customComponents = [
  'ReactComponent',
  'Code',
  'StyleGuide',
  'TableOfContents/TableOfContentsRenderer',
  'ComponentsList',
  'Section',
  'Props',
  'Playground',
  'Editor',
  'Markdown',
  'Examples',
];

module.exports = {
  title: 'StyleGuide',
  serverPort: port,
  serverHost: host,
  highlightTheme: 'material',
  template: path.resolve(context, 'src/tools/styleguide/template/index.ejs'),
  favicon: path.resolve(context, 'src/tools/styleguide/template/icon.png'),
  styleguideDir:  path.resolve(context, 'styleguide'),
  contextDependencies: [
    path.resolve(context, 'src/components'),
  ],
  getExampleFilename: componentpath => path.join(path.dirname(componentpath), 'demo/demo.md'),
  getChangelogFilename: componentpath => path.join(path.dirname(componentpath), 'demo/changelog.md'),
  sections: [
    {
      name: 'Introduction',
    },
    {
      name: 'UI Components',
      components: '../src/components/[A-Z]*/[A-Z]*.jsx',
    },
    {
      name: 'Examples',
      components: '../src/components/__examples__/[A-Z]*/[A-Z]*.jsx',
    },
  ],
  updateWebpackConfig: (webpackConfig) => {
    const dir = path.resolve(context, 'src');
    webpackConfig.module.rules = webpackConfig.module.loaders;
    for (const rule of common.module.rules) {
      rule.include = dir;
      webpackConfig.module.loaders.push(rule);
    }
    webpackConfig.module.loaders = [];

    // Use webpack plugins only if
    // env is equal to production
    if (env === 'production') {
      for (const plugin of common.plugins) {
        // Skip HtmlWebpackPlugin because it rewrite
        // plugin in styleguidist config
        if ( plugin.constructor.name === 'HtmlWebpackPlugin') continue;
        // Skip BundleAnalyzerPlugin because it does'n need
        if ( plugin.constructor.name === 'BundleAnalyzerPlugin') continue;
        webpackConfig.plugins.push(plugin);
      }
    }

    for (const component of customComponents) {
      webpackConfig.resolve.alias[`rsg-components/${component}`] =
        path.join(context, `src/tools/styleguide/${component}`);
    }

    webpackConfig.resolve.alias['tools/styles'] =
      path.join(context, 'src/tools/styles');

    return webpackConfig;
  },
  handlers: require('react-docgen').defaultHandlers.concat(
    // Add pure parametr
    (documentation, path) => {
      documentation.set('pure', path.value.superClass.name === 'PureComponent');
    },
    // Is flowtyped ?
    (documentation, path) => {
      const root = path.scope.getGlobalScope().node;
      recast.visit(root, {
        visitImportDeclaration: (path) => {
          if (path.value.leadingComments) {
            path.value.leadingComments.forEach(({ value }) => {
              if (value.trim() === '@flow') {
                documentation.set('flow', true);
              }
            })
          }
          return false;
        }
      });
    },
    // Add import string parament
    (documentation, path) => {
      documentation.set('importString', `import {${path.value.id.name}} from 'components';`);
    },
    // Parse component to find version
    (documentation, path) => {
      const root = path.scope.getGlobalScope().node;
      recast.visit(root, {
        visitExportDefaultDeclaration: (path) => {
          const regex = /version: (\d(\.\d+){1,2}((-(?=\w+)[\w\.]*)|$|\r|\n))/;
          try {
            const version = regex.exec(path.value.trailingComments[0].value);
            documentation.set('version', version[1]);
          } catch (e) {};
          return false;
        }
      })
    },
    // To better support higher order components
    require('react-docgen-displayname-handler').default
  ),
};
