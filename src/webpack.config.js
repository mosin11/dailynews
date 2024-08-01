// webpack.config.js
const path = require('path');

module.exports = {
  // Your existing configuration
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "timers": require.resolve("timers-browserify"),
      "buffer": require.resolve("buffer/")
    }
  },
  // Other configurations...
};
