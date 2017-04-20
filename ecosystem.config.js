module.exports = {
  apps: [
    // Static application server
    {
      name: 'server',
      script: './implements/server.dev.njs',
      "env": {
        "NODE_ENV": "development",
        "PORT": 3000,
      }
    },
    // Styleguide
    {
      name: 'styleguide',
      script: './node_modules/react-styleguidist/bin/styleguidist.js',
      args: 'server --config implements/styleguide.config.js',
      "env": {
        "NODE_ENV": "development",
        "STYLEGUIDE_PORT": 3001,
      }
    }
  ],
};
