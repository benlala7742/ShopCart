const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭eslint
  lintOnSave: false,
  //代理解决跨域问题
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        changeOrigin: true,
      },
    },
  },
})

// module.exports = ({
//     transpileDependencies: true,
//     //关闭eslint
//     lintOnSave: false,
//     //代理解决跨域问题
//     devServer: {
//       proxy: {
//         '/api': {
//           target: 'http://gmall-h5-api.atguigu.cn',
//           changeOrigin: true,
//         },
//       },
//     },
//   })

