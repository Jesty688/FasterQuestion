<!-- 封装顶栏 -->
<template>
  <v-app-bar color="#fff" class="elevation" fixed light>
    <v-app-bar-nav-icon @click="tigger"></v-app-bar-nav-icon>
    <v-toolbar-title class="toolbar_title">闪题</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-menu
      v-if="$store.state.loginStatus.userName"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
      style="z-index: 15"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-avatar color="indigo" size="32">
            <span
              class="white--text"
              v-if="!$store.state.loginStatus.avaterUrl.includes('http')"
              >{{ $store.state.loginStatus.avaterUrl }}</span
            >
            <img v-else :src="$store.state.loginStatus.avaterUrl" alt="John" />
          </v-avatar>
        </v-btn>
      </template>
      <v-card width="380">
        <v-list>
          <v-list-item>
            <v-list-item-avatar size="96">
              <v-avatar
                color="indigo"
                size="96"
                v-if="!$store.state.loginStatus.avaterUrl.includes('http')"
              >
                <span class="white--text text-h2">{{
                  $store.state.loginStatus.avaterUrl
                }}</span>
              </v-avatar>
              <img
                v-else
                :src="$store.state.loginStatus.avaterUrl"
                :alt="$store.state.loginStatus.userName"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title style="font-weight: 700; margin-bottom: 8px">{{
                $store.state.loginStatus.userName
              }}</v-list-item-title>
              <v-btn text outlined> 个人资料 </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-card-actions style="background: #f5f5f5">
          <v-spacer></v-spacer>
          <v-btn text outlined @click="loginOut"> 退出 </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
    <div v-else>
      <v-btn text @click="login"> 登录 </v-btn>
      <v-btn text @click="register"> 注册 </v-btn>
    </div>

    <!-- 登录弹窗 -->
    <Login :isLogin.sync="isLogin" :isRegister.sync="isRegister"></Login>
    <!-- 注册弹窗 -->
    <Register :isRegister.sync="isRegister" :isLogin.sync="isLogin"></Register>

    <!-- 登录提示 -->
    <v-snackbar color="#f56c6c" v-model="$store.state.loginStatus.loginTip">
      <span>请先登录</span>
      <template v-slot:action="{ attrs }">
        <v-btn small icon color="white" v-bind="attrs" @click="tipLogin">
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
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
      loginTip: true,
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
    tipLogin() {
      this.login();
      // 关闭提示
      this.$store.commit("triggerTip", false);
    },
    // 退出登录
    loginOut() {
      window.sessionStorage.clear();
      this.$store.commit("sessionClear");
      this.$router.replace({ path: "/users" });
    },
  },
  computed: {},
  mounted() {
    // console.log(this.$store.state.isLogin);
  },
};
</script>
<style  scoped>
.elevation {
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28) !important;
}
</style>