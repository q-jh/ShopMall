import {reqCategoryList} from '@/api'
import {reqGetBannerList} from '@/api'
import {reqFloorList} from '@/api'
//home模块的小仓库
const state = {
    //state中的数据默认初始值别瞎写，服务器返回对象，服务器返回数组【根据接口返回值初始化的】
    //home中存储三级菜单的数据
    categoryList:[],
    //轮播图的数据
    bannerList:[],
    //floor中的轮播图的数据
    floorList:[]
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
const actions = {
    //通过Api里面的接口函数调用，向服务器发送请求，获取服务器的全部商品分类的数据
    async categoryList({commit}){
        let result = await reqCategoryList()
        if (result.code == 200){
            //提交mutation
            commit("CATEGORYLIST",result.data)
        }
    },
    //通过接口调用，获取mock里面的模拟数据(轮播图数据)
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        if (result.code == 200){
            commit("GETBANNERLIST",result.data)
        }
    },
    //通过接口调用，获取mock里面的floor模拟数据
    async getFloorList({commit}){
        let result = await reqFloorList()
        if (result.code == 200){
            commit("GETFLOORLIST",result.data)
        }
    },
}
const getters = {}
export default  {
    state,
    mutations,
    actions,
    getters

}