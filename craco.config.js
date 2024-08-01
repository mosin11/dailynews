// craco.config.js
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "timers": require.resolve("timers-browserify"),
        "buffer": require.resolve("buffer/"),
        "url": require.resolve("url/"),
      };
      return webpackConfig;
    },
  },
};
