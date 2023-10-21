const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/", {
      target: "https://api-ma.ucell.uz",
      changeOrigin: true,
    })
  );
};
