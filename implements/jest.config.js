module.exports = {
  setupFiles: ["./implements/jestsetup.js"],
  collectCoverageFrom: [
    "./src/utils/**/*.js",
    "./src/components/**/*.js",
  ],
  coverageThreshold: {
    "global": {
      "branches": 80,
      "functions": 50,
      "lines": 33,
      "statements": 25
    }
  },
  rootDir: '../',
  moduleNameMapper: {
    "^.+\\.(css|pcss)$": "identity-obj-proxy"
  },
  snapshotSerializers: [
    "./node_modules/enzyme-to-json/serializer"
  ]
}
