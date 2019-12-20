module.exports = {
  // devServer: {
  //   proxyTable: {
  //     '/api': {
  //       target: '47.101.159.14'
  //     }
  //   }
  // },
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 100,
            exclude: /(node_module)/,
            mediaQuery: false,
          })
        ]
      },
      scss: {
        prependData: `@import "~@/assets/style/_function.scss";`
      }
    }
  },
  publicPath: './'
}
