module.exports = {
  devServer: {
    proxy: {
      '/api': { //代理api
        target: 'http://localhost:3000', //服务器api地址
        ws: true, // proxy websocket
        changeOrigin: true, //是否跨域
        pathRewrite: { //重写路径
          '^/api': ''
        }
      }
    }
  },
}