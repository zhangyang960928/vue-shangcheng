module.exports = {
  devServer: {
    proxy: {
      '/api': {
        ws: false,
        target: 'http://localhost:7003/v1',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  },
}