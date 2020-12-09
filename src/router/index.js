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
 * routes一组路由
 * route单个路由 this.$route.params
 * router vue中注册路由
 */
// 组件懒加载
const Rand = () => import('views/test/rand')
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
        path:'/order',
        name:'order',
        // component:1

    }
];


export default new VueRouter({
    mode:'history', //地址栏无#
    routes          //初始化路由条目
})