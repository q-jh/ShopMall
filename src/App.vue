<template>
  <div id="app">
    <Header></Header>
    <!-- 书写路由组件出口 -->
    <router-view></router-view>
    <!-- 在home，search是显示的，在登录，注册是隐藏的 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Home from '@/pages/Home' 
import Search from '@/pages/Search' 
import Login from '@/pages/Login' 
import Register from '@/pages/Register'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Home,
    Search,
    Login,
    Register
  },
  mounted(){
    //通知vue发请求，获取数据，存储于仓库中
    //派发一个action，获取商品分类的三级列表的数据
    //出于性能的考虑我们希望该数据只请求一次，所以我们把这次请求放在App.vue的mounted中。（根组件App.vue的mounted只会执行一次）
    //注意：虽然main.js也是只执行一次，但是不可以放在main.js中。因为只有组件的身上才会有$store属性。
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>

</style>
