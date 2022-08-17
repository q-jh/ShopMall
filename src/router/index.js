import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
//使用插件
Vue.use(VueRouter)
//引入store
import store from '@/store'

//1、先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
//2、重写push|replace
//第一个参数：告诉原来的push，跳转的目标位置和传递了哪些参数
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}


//配置路由
let router = new VueRouter({
    //配置路由
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部,y=0代表滚动条在最上方
        return { y: 0 }
    }

})

//全局守卫，前置守卫（在路由跳转进行判断）
router.beforeEach(async (to, from, next) => {
    //to:可以获取到你要跳转到哪个路由的信息
    //from:可以获取到你从哪个路由而来的信息
    //next:放行函数，next()放行  next(path)放行到指定的路由
    //用户登录了才会有token
    let token = store.state.user.token
    //用户信息
    let name = store.state.user.userInfo.name
    //用户已经登录了
    if (token) {
        //用户登录了就无法再去login登录页面了，停留在首页
        if (to.path == '/login') {
            next('/home')
        } else {
            //登录了，但是去的不是login
            //如果用户名已经有了
            if (name) {
                next()
            } else {
                //登录了，但是没有用户信息,派发action要仓库存储用户信息再跳转
                //获取用户信息在首页展示
                try {
                    //获取用户信息成功
                    await store.dispatch('getUserInfo')
                    //放行
                    next()
                } catch (error) {
                    //token失效了获取不到用户的信息，重新登陆
                    //先清除token
                    await store.dispatch('userLogout')
                    //然后再跳转到登陆界面
                    next('/login')
                }
            }
        }
    } else {
        //未登录，不能去交易相关，不能去支付相关，不能去个人中心
           let toPath = to.path
           if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
               //把未登录想去而没有去成功的信息存储在地址栏【路由】
               next('/login?redirect='+topath)
           }else{


           }

        //    未登录可以去home，search，shopcart
        next()
    }
})

export default router