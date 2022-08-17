<template>
   <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <!-- 没有用户名，未登陆 -->
                        <p>尚品汇欢迎您！</p>
                        <p v-if="!userName">
                            <span>请 </span>
                            <router-link to="/login">登陆</router-link>
                            <router-link class="register" to="/register"> 免费注册</router-link>
                        </p>
                        <!-- 登陆了 -->
                        <p v-else>
                            <a>{{userName}}</a>
                            <a class="register" @click="logout">退出登录</a>
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link to="/center">我的订单</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link to="/home" class="logo" title="尚品汇" >
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <!-- form的作用：点击"button"按钮，表单数据将被发送到action="###"中的###”。 -->
                    <form action="###" class="searchForm">
                        <input 
                        type="text" 
                        id="autocomplete" 
                        class="input-error input-xxlarge" 
                        v-model="keyword"
                        />
                        <button 
                        class="sui-btn btn-xlarge btn-danger" 
                        type="button"
                        @click="goSearch"
                        >搜索</button>
                    </form>
                </div>
            </div>
        </header>
</template>

<script>
export default {
    name:'Header',
    data(){
        return{
            keyword:''
        }
    },
    mounted(){
        // 通过全局事件总线清除关键字
        this.$bus.$on("clear",()=>{
            this.keyword = ""
        })
    },
    methods:{
        //路由传参
        //第一种字符串形式
        // this.$router.push("/search/"+this.keyword+"?key="+this.keyword.toUpperCase())
        //第二种字符串形式
        // this.$router.push("/search/"${this.keyword}?k=${this.keyword.toUpperCase()})
        // 第三种对象（常用）
        //this.$router.push({name:“路由名字”,params:{传参},query:{传参}})。
        //以对象方式传参时，如果我们传参中使用了params，只能使用name，不能使用path，如果只是使用query传参，可以使用path 。
        
        //问题1：params可传可不传，但是如果传递的时空串，如何解决
        //答：解决方法： 加入||undefined，当我们传递的参数为空串时地址栏url也可以保持正常
            // this.$router.push({name:'search',params:{keyword:''||undefined},query:{key:this.keyword.toUpperCase()}})
        
       
        goSearch(){
            if(this.$route.query){
                let location = {name:'search',params:{keyword:this.keyword || undefined}}
                location.query = this.$route.query
                this.$router.push(location)
            }
        } ,
        //退出登录
        //需要发请求给服务器退出登录，并清除一些数据
        //清除项目中的数据【userInfo，token】
        async logout(){
            try {
                //如果退出成功
                await this.$store.dispatch('userLogout')
                //回到首页
                this.$router.push('/home')
            } catch (error) {
                alert(error.message)
            }
        }
    },
    computed:{
        userName(){
            return this.$store.state.user.userInfo.name

        }
    }

}
</script>

<style scoped lang='less'>
.header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }


</style>