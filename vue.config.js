module.exports = {
  devServer: {
    proxy: {
      '/api': { //代理api
        target: 'http://hn216.api.yesapi.cn/?s=App.OSS_Aliyun.UploadFile&return_data=0&app_key=F7596B43CDFDAFCF66C3843B13056A7A&sign=181F788586CCB17996AD03B9CB78E605', //服务器api地址
        ws: true, // proxy websocket
        changeOrigin: true, //是否跨域
        // pathRewrite: { //重写路径
        //   '^/api': ''
        // }
      }
    }
  },
}