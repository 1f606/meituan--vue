module.exports = {
  devServer: {
    proxyTable: {
      '/api': {
        target: '47.101.159.14'
        // pathRewrite: {
        //   '^/api': '/static/mock'
        // }
      }
    }
  },
  publicPath: './',
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/style/_function.scss";`
      }
    }
  }
}
