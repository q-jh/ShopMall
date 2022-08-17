//当前这个模块，API进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax";
import { method } from "lodash";

//首页三级分类接口
export const reqCategoryList = ()=>{   //也可以这样写 export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')
    return requests({
        url:'/product/getBaseCategoryList',
        method:'GET'
    })
}
//当组件想要使用相关请求时，只需要导入相关函数即可，以上图的reqCateGoryList 为例:
// import {reqCateGoryList} from './api'
// 发起请求
// reqCateGoryList();

//获取banner数据(Home首页轮播图接口)
export const reqGetBannerList = ()=>mockRequests.get('/banner')

//获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor')

//获取搜索模块的数据,地址：/api/post/ 请求方式：post 请求需要带参数
//当前的接口给服务器传递一个默认参数，【至少是一个空对象】
//https://mock.presstime.cn/mock/62a44b7f8bb737002976b34d/easy/list#!method=POST&queryParameters=%5B%7B%22enabled%22%3Atrue%2C%22key%22%3A%22http%3A%2F%2Fgmall-h5-api.atguigu.cn%2Fapi%2Flist%22%2C%22value%22%3A%22%22%7D%5D&body=&headers=%5B%5D
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:'POST',data:params})

//获取商品详情的接口  URL：/api/item/{skuid} 请求方式：get
export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method:'GET'})

//将产品添加到购物车中
export const reqAddOrUpdateShopCart = (skuId,SkuNum)=>requests({url:`/cart/addToCart/${skuId}/${SkuNum}`,method:'POST'})

//获取购物车列表数据接口
export const reqCartList = () => requests({url:'/cart/cartList',method:'GET'})

//删除购物车产品的接口
//URL:/api/cart/deleteCart/{skuid} method:DELETE
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'DELETE'})

//修改选中的状态的接口
//URL：/api/cart/checkCart/{skuId}/{isChecked},method:GET
export const reqUpdateCheckedById = (skuId,isChecked) =>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'GET'})

//获取验证码的接口
//URL：/api/user/passport/sendCode/{phone} method:GET
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'GET'})

//注册的接口
//URL:/api/user/passport/register   method:POST
export const reqUserRegister = (data) => requests({url:'/user/passport/register',data,method:'POST'}) //key和value一致省掉value

//登陆的接口
//URL:/api/user/passport/login method: post  phone,password
export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:'POST'})

//获取用户的信息。需要带着用户的token去获取用户的数据
//URL：api/user/passort/auth/getUserInfo  method:GET
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:'GET'})

//退出登录的接口
//URL:/api/user/passport/logout
export const reqLogout = () => requests({url:'/user/passport/logout',method:'GET'})

//获取用户地址的接口
//URL：/api/user/user/userAddress/auth/findUserAddressList  method:GET
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'GET'})

//获取商品清单的接口
//URL：/api/order/auth/trade
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:'GET'})

//提交订单的接口
//URL：/api/order/auth/sumbmitOrder?tradeNo={tradeNo}  method:POST
export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'POST'})

//获取支付信息的接口
//URL：/api/payment/weixin/createNative/{orderId}   method:GET
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'GET'})

//获取支付订单状态的接口
//URL：/api/payment/weixin/queryPayStatus/{orderId}  method:GET
export const reqPayStatus = (orderId) =>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'GET'})

//获取个人中心数据
//URL：/api/order/auth/{page}/{limit}
export const reqMyOrderList =(page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:'GET'})