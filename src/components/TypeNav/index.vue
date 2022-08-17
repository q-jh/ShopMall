<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="entershow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a :data-categoryname="c1.categoryName" :data-category1Id="c1.categoryId" >{{ c1.categoryName }}</a>
              </h3>
              <div class="item-list clearfix" :style="{display:currentIndex == index?'block':'none'}">
                <div
                  class="subitem"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a :data-categoryname="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                      >
                        <a :data-categoryname="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
        
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"; //组件访问State中数据的第二种方法
//这种引入方式是把lodash全部功能都引入了。
import throttle from 'lodash/throttle';//因为throttle是默认暴露的，所以引入近来不需要写成{throttle}
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show:true
    };
  },
  //当组件挂载完毕可以向服务器发请求
  mounted() {
    if(this.$route.path!='/home'){
      this.show = false
    }
  },
  computed: {
    //将全局组件映射为当前组件的计算属性
    ...mapState({
      //右侧需要一个函数，当使用这个计算属性时，右侧函数会立即执行一次
      //注入一个参数state，其实即为大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    //1.非节流的写法
    // changeIndex(index) {
    //   this.currentIndex = index;
    // },

    //2.节流的写法
    //throttle回调函数不要用箭头函数，可能出现上下文this的问题
    changeIndex:throttle(function(index){
      this.currentIndex = index;
    },50),

    //一级分类鼠标移出的事件回调
    leaveIndex(){
      this.currentIndex = -1
      if(this.$route.path !='/home'){
        this.show = false
      }
    },
    entershow(){
      if(this.$route.path !='/home'){
        this.show = true
      }
    },
    
    goSearch(event){ //event是系统属性，所以我们只需要在函数定义的时候作为参数传入，在函数使用的时候不需要传入该参数。
      let element = event.target
      //html中会把大写转为小写
      //获取目前鼠标点击标签的categoryname,category1id,category2id,category3id，
      // 通过四个属性是否存在来判断是否为a标签，以及属于哪一个等级的a标签
      //dataset可以获取节点的自定义属性与属性值
      let {categoryname,category1id,category2id,category3id} = element.dataset
      //categoryname存在，表示为a标签
      if(categoryname){
        //category1id一级a标签
        //整理路由跳转的参数
        let location = {name:'search'}//跳转路由name
        let query = {categoryName:categoryname}//路由参数
        if(category1id){
          query.category1Id = category1id
        }else if(category2id){
          query.category2Id = category2id
        }else {
          query.category3Id = category3id
        }
        //判断路由跳转时，如果带有params参数，也传递过去
        if(this.$route.params){
          location.params = this.$route.params
          //整理完参数
          location.query = query
          //路由跳转
          this.$router.push(location)
        }
        
      
      }
    }
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 508px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block; //令display: none变为block
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画的开始状态（进入）
    .sort-enter{
      height:0px
    }
    .sort-enter-to{
      height:508px
    }
    //定义动画的时间，速率
    .sort-enter-active{
      transition: all 0.5s linear;
    }
  }
}
</style>