module.exports = {
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-css-modules",
  ],
  "plugins": [
    "stylelint-performance-animation",
  ],
  "rules": {
    "at-rule-no-vendor-prefix": true,
    "indentation": 2,
    "no-eol-whitespace": true,
    "property-no-vendor-prefix": true,
    "value-no-vendor-prefix": true,
    "declaration-block-no-redundant-longhand-properties": null,
    "declaration-block-no-duplicate-properties": [true,
      {
        "ignore": ["consecutive-duplicates-with-different-values"]
      }
    ],
    "selector-type-no-unknown": [true,
      {
        "ignoreTypes": ["/^/"]
      }
    ],
    "plugin/no-low-performance-animation": [true,
      {
        "ignore": ["color"]
      }
    ]
  }
}
