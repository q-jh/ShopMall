<template>
  <div>
    <!-- 三级联动全局组件已经注册为全局组件，因此不需要引入--> 
    <TypeNav></TypeNav>
    <!--  轮播图列表-->
    <ListContainer></ListContainer>
    <!--  今日推荐-->
    <Recommend></Recommend>
    <!--  商品排行-->
    <Rank></Rank>
    <!--  猜你喜欢-->
    <Like></Like>
    <!-- 楼层 -->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
    <!-- 商标 -->
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'
export default {
    name:'Home',
    components:{
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand  
    },
    mounted(){
      //派发action，获取floor的组件的数据
      this.$store.dispatch('getFloorList')
      //获取用户登录的信息
      this.$store.dispatch('getUserInfo')
    },
    computed:{
      ...mapState({
        floorList:state => state.home.floorList
      })
    },
}
</script>

<style>

</style>