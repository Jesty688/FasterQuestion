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
const routes = [];


export default new VueRouter({
    mode:'history',
    routes
})