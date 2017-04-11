/* eslint-disable */

const path = require('path');
const common = require('./webpack.config.js');
const docgen = require('react-docgen');
const fs = require('fs');
const recast = require('recast');
const doctrine = require("doctrine");

const port = process.env.STYLEGUIDE_PORT || (+process.env.PORT || 3000) + 1;
const host = (process.env.HOST || 'localhost');
const env = process.env.NODE_ENV;
const context = process.cwd();

const sections = require(path.resolve(context, 'docs/sections.js'));

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

function getClassLeadingComments(path) {
  let leadingComments;
  if (path.value.leadingComments) {
    leadingComments = path.value.leadingComments[0].value;
  } else {
    const root = path.scope.getGlobalScope().node;
    recast.visit(root, {
      visitVariableDeclaration: (path) => {
        if (path.value.leadingComments) {
          leadingComments = path.value.leadingComments[0].value;
        }
        return false;
      }
    });
  }
  return leadingComments;
}

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
  sections,
  updateWebpackConfig: (webpackConfig) => {
    const dir = path.resolve(context, 'src');
    webpackConfig.resolve.alias = Object.assign(webpackConfig.resolve.alias, common.resolve.alias);
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
    } else if (env === 'development') {
      for (const plugin of common.plugins) {
        if ( plugin.constructor.name === 'ExtractTextPlugin') {
          webpackConfig.plugins.push(plugin);
        }
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
      if (path.value.type === 'ClassDeclaration') {
        if (path.value.superClass) {
          documentation.set('pure', path.value.superClass.name === 'PureComponent');
        }
      }
      if (path.value.type === 'FunctionDeclaration') {
        documentation.set('stateless', true);
      }
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
      let name;

      if (path.value.id) {
        name = path.value.id.name;
      } else {
        name = documentation.get('displayName');
      }

      const leadingComments = getClassLeadingComments(path);
      const { tags } = (doctrine.parse(leadingComments, { unwrap: true }));
      const nameTag = tags.find(item => item.title === 'name');
      const namespaceTag = tags.find(item => item.title === 'namespace');
      name = nameTag && nameTag.name;
      const namespace = namespaceTag && namespaceTag.name;
      namespace && documentation.set('importString', `import {${name}} from '${namespace}';`);
    },
    // Parse component to find version
    (documentation, path) => {
      const leadingComments = getClassLeadingComments(path);
      const { tags } = (doctrine.parse(leadingComments, { unwrap: true }));
      const versionTag = tags.find(item => item.title === 'version');
      const version = versionTag && versionTag.description;
      documentation.set('version', version);
    },
    // To better support higher order components
    require('react-docgen-displayname-handler').default
  ),
};
