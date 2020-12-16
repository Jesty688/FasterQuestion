import Vue from 'vue'
import VueRouter from 'vue-router'

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
const routes = [
    {
        path:'/',
        redirect:'/rand'
    },
    {
        path:'/rand',
        component:Rand,
        name:'rand'
    },
    {
        path:'/test',
        name:'test',
        component:Test

    },
    {
        path:'/wronglist',
        name:'wronglist',
        component:wrongList,
    },
    {
        path:'/collection',
        name:'collection',
        component:collectList
    }
];


export default new VueRouter({
    mode:'history', //地址栏无#
    routes          //初始化路由条目
})