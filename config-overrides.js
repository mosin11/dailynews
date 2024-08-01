// config-overrides.js
const path = require('path');

module.exports = function override(config) {
  config.resolve.fallback = {
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "timers": require.resolve("timers-browserify"),
    "buffer": require.resolve("buffer/")
  };
  return config;
};
