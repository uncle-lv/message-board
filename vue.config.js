module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    // proxy: {
    //     '/api': {
    //         target: 'http://localhost:8000/',
    //         pathRewrite: {
    //             '^/api': '',
    //       },
    //     }
    // },
    disableHostCheck: true
},
publicPath: '/'
}
