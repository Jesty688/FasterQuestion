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
        <v-form class="dl-form" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            class="pt-4 pb-6"
            v-model="name"
            :rules="nameRules"
            label="用户名或邮箱"
            required
          ></v-text-field>
          <v-text-field
            class="pt-4 pb-6"
            v-model="name"
            :rules="nameRules"
            label="密码"
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
            <v-btn color="primary" @click="kq"> 登录 </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "账号不能为空",
        (v) => (v && v.length <= 10) || "账号或密码错误",
      ],
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