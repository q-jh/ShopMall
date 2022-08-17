//引入路由组件
import Login from '@/pages/Login' 
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
export default [
    {
        path:"/center",
        component:()=>import('@/pages/Center'),
        meta:{show:true},
        //二级路由组件
        children:[
            {
                path:"myorder",
                component:()=>import('@/pages/Center/myOrder'),  //路由懒加载 ,当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效
                meta:{show:true}
            },
            {
                path:"grouporder",
                component:()=>import('@/pages/Center/groupOrder'),
                meta:{show:true}
            },
            {
                path:"/center",
                redirect:'/center/myorder',
            }

        ]
    },
    {
        path:"/paysuccess",
        component:()=>import('@/pages/PaySuccess'),
        meta:{show:true}
    },
    {
        path:"/pay",
        component:()=>import('@/pages/Pay'),
        meta:{show:true},
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path =='/trade'){
                next()
            }else{
                next(false) //取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。(即是从哪来回哪去)
            }
            
          },
    },
    {
        path:"/trade",
        component:()=>import('@/pages/Trade'),
        meta:{show:true},
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path =='/shopcart'){
                next()
            }else{
                next(false) //取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。(即是从哪来回哪去)
            }
            
          },

    },
    {
        path:"/shopcart",
        component:()=>import('@/pages/ShopCart'),
        name:'shopcart',
        meta:{show:true}
    },
    {
        path:"/addcartsuccess",
        component:()=>import('@/pages/AddCartSuccess'),
        name:'addcartsuccess',
        meta:{show:true}
    },
    {
        path:"/detail/:skuid",
        component:()=>import('@/pages/Detail'),
        meta:{show:true}
    },
    {
        path:"/home",
        component:()=>import('@/pages/Home'),
        meta:{show:true}
    },
    {
        path:"/search/:keyword?",//?表示params参数可传可不传
        component:()=>import('@/pages/Search'),
        //配置路由的时候，可以给路由配置元信息meta,在路由的原信息中定义show属性，用来给v-show赋值，判断是否显示footer组件
        meta:{show:true},
        name:'search',
        //1.布尔值写法
        props:true
        //2.对象写法：额外的给路由组件传递一些props
        //props：{a:1,b:2}
        //3.函数写法：可以props参数。query参数，通过props传递给路由组件
        // props:($route)=>({keyword:$route.params.keyword,K:$route.query.K})
    },
    {
        path:"/register",
        component:()=>import('@/pages/Register'),
        meta:{show:true}
    },
    {
        path:"/login",
        component:()=>import('@/pages/Login'),
        meta:{show:false}
    },
    //重定向
    {
        path:"*",
        redirect:"/home"
    }
    

]