import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import { MessageBox } from 'element-ui';
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
//第一个参数，全局组件的名字，第二个参数，哪一个组件
Vue.component(TypeNav.name,TypeNav)

//轮播图全局组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name,Carousel)

//分页器的全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)

//引入MockServe.js ---mock数据
import '@/mock/mockServe'

//引入swiper样式，然后全部组件都能用了
import "swiper/css/swiper.css" //不用import A from B 的写法，因为swiper没有对外暴露

//统一接口API文件里面的全部请求函数
//统一引入
import * as API from '@/api'

//引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/1.gif'
//注册插件
Vue.use(VueLazyload,{
  //懒加载模认图片
  loading:atm
})

//引入表单验证插件
import '@/plugins/validate'

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由：底下的写法KV一致省略V【router小写的】
  router,
  //注册仓库：组件实例的身上会多一个属性$store属性
  store,
}).$mount('#app')
