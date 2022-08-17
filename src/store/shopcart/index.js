import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from '@/api'
const state = {
    cartList:[]

}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const actions = {
    //获取购物车列表的数据
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code == 200){
            commit("GETCARTLIST",result.data)
        }
    },

    //删除购物车里面的某一个产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    //修改购物车某一个产品选中的状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    //删除全部的商品
    deleteAllCheckedCart({dispatch,getters}){
        //获取购物车中所以的产品，是一个数组
        let result = []
        getters.cartList.cartInfoList.forEach(item => {      //注意和下面区分，下面是从state中获取数据，而state中是数组
            //将每一次返回值添加到数组中
            result.push(item.isChecked === 1?dispatch('deleteCartListBySkuId',item.skuId):'')
        });
        //只要全部的p1，p2，....都成功返回结果即为成功
        //如果有一个失败，返回结果即为失败结果
        return Promise.all(result)  //组件等着你的返回成功或者失败的结果
    },

    //修改全部产品的选中状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let result = []
        state.cartList[0].cartInfoList.forEach(item => {      //这里和上面的getters.cartList不同
            result.push(dispatch('updateCheckedById',{skuId:item.skuId,isChecked})) 
        });
        //最终返回的结果
        return Promise.all(result)

    }
    
}
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}