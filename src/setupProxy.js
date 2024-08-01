const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/rss',
    createProxyMiddleware({
      target: 'https://mynewss.onrender.com/', // Your backend server
      changeOrigin: true,
      pathRewrite: {
        '^/rss': '', // Remove /rss prefix when forwarding to backend
      },
    })
  );
};
