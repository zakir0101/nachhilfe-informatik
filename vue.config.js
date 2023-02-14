const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // devServer: {
  //   host: '192.168.45.149'
  // },
  publicPath: process.env.NODE_ENV === 'production' ? '/static/' : '/',
  transpileDependencies: true




})
