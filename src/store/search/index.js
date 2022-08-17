//search模块的小仓库
import {reqGetSearchInfo} from '@/api'
const state = {
    //仓库初始的状态
    searchList:{}

}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }

}
const actions = {
    //获取search的数据
    async getSearchList({commit},params={}){
        //当前这个reqGetSearchInfo函数在调用获取服务器的数据时候，至少传递一个参数（至少是空对象）
        //params形参：是用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if(result.code == 200){
            commit('GETSEARCHLIST',result.data)
        }
    }


}
//计算属性
//项目中getters的主要作用是简化仓库中的数据
//把将来在组件中需要用的数据进行简化一下【将来组件获取数据的时候就方便了】
const getters = {
    //当前的形参state，是当前仓库中的state，而非大仓库中的state
    goodsList(state){
        //假如没有网络/网络不给力，state.searchList.goodsList返回的是undefined
        //至少给人家来一个数组。所以就在后面加上: ||[]
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    }


}
export default {
    state,
    mutations,
    actions,
    getters
}