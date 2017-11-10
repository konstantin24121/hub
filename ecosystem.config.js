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
  ],
};
