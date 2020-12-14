import Vue from 'vue'
import App from '@/App.vue'
import vuetify from 'plugins/vuetify' //导入vuetify框架
import router from '@/router' //导入路由
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
