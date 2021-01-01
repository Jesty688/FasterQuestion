<!--  -->
<template>
  <div>
    <!-- 登录弹窗 -->
    <v-dialog v-model="isLogin" persistent width="448">
      <v-card class="rounded-lg">
        <div class="dl-box dl-login">
          <v-btn @click="kq" icon color="white" class="ma-1">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <div class="dl-title">登录</div>
        </div>
        <v-progress-linear
          v-show="loginForm.showLoadding"
          color="#4caf50"
          indeterminate
          height="4"
          class="mt-n6 mb-6"
        ></v-progress-linear>
        <v-form class="dl-form" ref="loginforms" lazy-validation>
          <v-text-field
            class="pt-4 pb-6"
            v-model="loginForm.username"
            :rules="loginRules.username"
            :error-messages="loginForm.errMsg"
            label="用户名或邮箱"
            required
          ></v-text-field>
          <v-text-field
            class="pt-4 pb-6"
            v-model="loginForm.passwd"
            :rules="loginRules.passwd"
            label="密码"
            @keyup.enter.native="signIn"
            type="password"
            required
          ></v-text-field>

          <v-card-actions class="pa-0">
            <v-menu
              rounded="lg"
              origin="center center"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn text color="#555" v-bind="attrs" v-on="on" class="ml-n2">
                  更多选项
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="() => {}">
                  <v-list-item-title>忘记密码</v-list-item-title>
                </v-list-item>
                <v-list-item @click="toRegister">
                  <v-list-item-title>创建新账号</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-spacer></v-spacer>
            <v-btn color="primary" @click="signIn"> 登录 </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { toSignIn } from "network/sign";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        passwd: "",
        errMsg: "",
        showLoadding: false,
      },
      loginRules: {
        username: [
          (v) => !!v || "账号不能为空" || /^\w+@(\w+\.)+[a-z]+$/i.test(v),
          /*
          (v) => {
            return /^\w+@(\w+\.)+[a-z]+$/i.test(v) === false
              ? "邮箱格式错误"
              : true;
          },*/
        ],
        passwd: [(v) => !!v || "密码不能为空"],
      },
    };
  },

  props: {
    // 现在登录 注册框
    isLogin: {
      type: Boolean,
      default: false,
    },
    isRegister: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    kq() {
      this.$emit("update:isLogin", false);
    },
    signIn() {
      this.loginForm.errMsg = "";
      this.$refs.loginforms.validate()
        ? ((this.loginForm.showLoadding = true),
          toSignIn(this.loginForm.username, this.loginForm.passwd)
            .then((res) => {
              this.loginForm.showLoadding = false;
              if (res.length) {
                // 登录成功
                this.loginForm.errMsg = "";
                this.$emit("update:isLogin", false);
                // 保存登录状态和登录信息
                this.$store.commit("setToken");
                this.$store.commit("setUsername", this.loginForm.username);
                this.$store.commit(
                  "setAvater",
                  this.loginForm.username.substr(0, 1)
                );
                // 保存用户id在session中
                window.sessionStorage.setItem("uid", res[0].id);
                // this.$router.replace()
                this.$router.replace("/rand");
              } else {
                this.loginForm.errMsg = "用户名或密码错误";
              }
            })
            .catch((err) => {
              this.loginForm.errMsg = "网络错误";
            }))
        : (this.loginForm.errMsg = "");
    },
    toRegister() {
      // 跳转注册页面
      this.$emit("update:isLogin", false);
      this.$emit("update:isRegister", true);
    },
  },
};
</script>
<style scoped>
.dl-login {
  background-color: #3f51b5;
}
.dl-title {
  padding: 102px 40px 28px;
  color: #fff;
}
.dl-box {
  margin-bottom: 24px;
}
.dl-form {
  padding: 16px 40px 62px;
}
</style>