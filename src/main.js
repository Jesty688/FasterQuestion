import Vue from 'vue'
import App from '@/App.vue'
import vuetify from 'plugins/vuetify' //导入vuetify框架
import router from '@/router' //导入路由
import store from './store'  //导入状态管理
import moment from "plugins/moment";
Vue.config.productionTip = false


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
