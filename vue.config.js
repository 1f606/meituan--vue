module.exports = {
  // devServer: {
  //   proxyTable: {
  //     '/api': {
  //       target: '47.101.159.14'
  //     }
  //   }
  // },
  publicPath: './',
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/style/_function.scss";`
      }
    }
  }
}
