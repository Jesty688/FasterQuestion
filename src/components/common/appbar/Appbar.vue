<!-- 封装顶栏 -->
<template>
  <v-app-bar color="#fff" class="elevation" fixed light>
    <v-app-bar-nav-icon @click="tigger"></v-app-bar-nav-icon>
    <v-toolbar-title class="toolbar_title">闪题</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="login"> 登录 </v-btn>
    <v-btn text @click="register"> 注册 </v-btn>
    <!-- 登录弹窗 -->
    <Login :isLogin.sync="isLogin" :isRegister.sync="isRegister"></Login>
    <!-- 注册弹窗 -->
    <Register :isRegister.sync="isRegister" :isLogin.sync="isLogin"></Register>
  </v-app-bar>
</template>

<script>
//导入事件总线
import eventBus from "plugins/eventbus";
// 导入登录注册组件
import Login from "common/login/Login";
import Register from "common/login/Register";
export default {
  data() {
    return {
      isLogin: false,
      isRegister: false,
    };
  },
  components: {
    Login,
    Register,
  },
  methods: {
    // 开关侧滑栏
    tigger() {
      //事件总线发送自定义事件$on接受并且监听事件
      eventBus.$emit("tigger");
    },
    // 点击登录 注册
    login() {
      this.isLogin = !this.isLogin;
    },
    register() {
      this.isRegister = !this.isRegister;
    },
  },
  computed: {},
};
</script>
<style  scoped>
.elevation {
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28) !important;
}
</style>