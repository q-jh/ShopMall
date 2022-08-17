import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'
//注册和登录模块
const state = {
    code:'',
    token:getToken(),
    userInfo:{}

}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    //清除本地数据
    CLEAR(state){
        state.token = ''
        state.userInfo = {}
        //本地存储清空
        removeToken()
    }

}
const actions = {
    //获取验证码
   async getCode({commit},phone){
       //获取验证码的这个接口，把验证码返回了，但是正常情况是后台把验证码发给用户的手机（现在我们这样做是为了省钱）
      let result = await reqGetCode(phone)
      if(result.code == 200){
        commit('GETCODE',result.data)
        return 'ok'
      }else{
          return Promise.reject(new Error('faile'))
      }

    },

    //用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        if(result.code == 200){
            return 'ok'
          }else{
              return Promise.reject(new Error('faile'))
          }

    },

    //用户登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        //服务器下发token，用户唯一标识符
        //将来经常通过token找服务器要用户的数据进行展示
        if(result.code == 200){
            //用户已经登录成功并且获取到了token
            commit('USERLOGIN',result.data.token);
            //持久化存储token
            setToken(result.data.token);
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    //获取用户的信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        console.log(result)
        if(result.code == 200){
            //提交用户的信息
            commit("GETUSERINFO",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
        

    },

    //退出登录
    async userLogout({commit}){
        //只是向服务器发送一次请求，通知服务器清除token
        let result = await reqLogout()
        if(result.code == 200){
            commit("CLEAR")
        }
    }
   
    
    
    
}
const getters = {
    
}
export default {
    state,
    mutations,
    actions,
    getters
}