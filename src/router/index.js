import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";
Vue.use(VueRouter);
//解决重复点击一个路由报错问题
const [VueRouterPush , VueRouterReplace] = [VueRouter.prototype.push , VueRouter.prototype.replace];
VueRouter.prototype.push = function(location){
    VueRouterPush.call(this , location).catch(err => err)
}
VueRouter.prototype.replace = function(location){
    VueRouterReplace.call(this , location).catch(err => err)
}
/**
 * routes  一组路由
 * route  单个路由 this.$route.params
 * router vue中注册路由
 */

// 组件懒加载
const Rand = () => import('views/test/rand')                        //随机测试 
const Test = () => import('views/test/test')                        //模拟测试
const wrongList = () => import('views/wronglist/wrongList')         //错题集合
const collectList = () => import('views/collectlist/collectList')   //收藏集合
const Rank = () => import('views/rank/ranking')
const User = () => import('views/users/user')
const routes = [
    {
        path:'/',
        redirect:'/rand'
    },
    {
        path:'/rand',
        component:Rand,
        name:'rand',
        meta:{
            keepAlive:true
        }
    },
    {
        path:'/test',
        name:'test',
        component:Test,
        meta:{
            keepAlive:true
        }

    },
    {
        path:'/wronglist',
        name:'wronglist',
        component:wrongList,
        meta:{
            keepAlive:false
        }
    },
    {
        path:'/collection',
        name:'collection',
        component:collectList,
        meta:{
            keepAlive:true
        }
    },{
        path:'/ranking',
        name:'rank',
        component:Rank,
        meta:{
            keepAlive:true
        }
    },
    {
        path:'/users',
        name:'user',
        component:User,
        meta:{
            keepAlive:true
        }

    }
    
];


const router = new VueRouter({
    mode:'history', //地址栏无#
    routes          //初始化路由条目
})
// 需要登录的页面
let needLoginList = ['collection' , 'rand' , 'test' , "wronglist"]
// 全局路由守卫
router.beforeEach((to , from , next) => {
    let hasLogin = needLoginList.some((cur , index, arr) => {
        return cur === to.name
    })
    // 
    if(hasLogin){  
        //如果当前页面需要登录的话先判断是否已经是登录 在vuex中查询登录状态
        //未登录出现提示信息 路由跳转到user页面
        if(!store.state.loginStatus.userName && !store.state.loginStatus.token){
            // console.log(store.state.loginStatus.userName , store.state.loginStatus.token)
            // console.log(store.state.loginStatus)
            store.commit('triggerTip' , true)
            next('/users')
        }
    }
    next();
})

export default router

