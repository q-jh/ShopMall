const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false, //打包时去掉map后缀的文件
  transpileDependencies: true,
  lintOnSave:false,
  //代理跨域
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
      }
    }

  }
})
