const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  (config) => {
    config.module.rules.forEach(rule => {
      if (rule.oneOf) {
        rule.oneOf.forEach(oneOf => {
          if (oneOf.loader && oneOf.loader.includes('source-map-loader')) {
            oneOf.exclude = /node_modules/;
          }
        });
      }
    });
    return config;
  }
);
