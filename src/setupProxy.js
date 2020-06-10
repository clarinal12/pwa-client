const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function proxy(app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'http://dev.el-ar.tk',
      changeOrigin: true,
    })
  );
  app.use(
    '/subscription',
    createProxyMiddleware({
      target: 'https://push-notification-demo-server.herokuapp.com',
      changeOrigin: true,
    })
  );
};
