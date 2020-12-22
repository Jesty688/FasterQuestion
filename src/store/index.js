import Vue from 'vue'
import Vuex from 'vuex'
import state from './store'
import mutations from './mutations'
// 挂载
Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations
})