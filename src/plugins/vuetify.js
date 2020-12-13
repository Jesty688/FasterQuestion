import Vue from 'vue'
import Vuetify from 'vuetify'
// 导入图标字体和vuetify的css样式
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.css'
//安装插件
Vue.use(Vuetify)
export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#1A73E8',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#b71c1c',
          },
          dark: {
            primary: '#1A73E8',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#b71c1c',
          },
        },
      },
})