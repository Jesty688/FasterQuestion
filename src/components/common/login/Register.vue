<!--  -->
<template>
  <div>
    <!-- 注册弹窗 -->
    <v-dialog v-model="isRegister" persistent width="448">
      <v-card class="rounded-lg">
        <div class="dl-box dl-reg">
          <v-btn @click="kq" icon color="white" class="ma-1">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <div class="dl-title">注册</div>
        </div>
        <v-form class="dl-form" ref="regforms" lazy-validation>
          <v-text-field
            class="pt-4 pb-6"
            v-model="regForm.username"
            :rules="regRules.username"
            label="用户名或邮箱"
            required
          ></v-text-field>
          <v-text-field
            class="pt-4 pb-6"
            v-model="regForm.passwd"
            :rules="regRules.passwd"
            label="密码"
            required
          ></v-text-field>
          <v-text-field
            class="pt-4 pb-6"
            v-model="regForm.passwdEnsure"
            :rules="regRules.passwdEnsure"
            label="确认输入密码"
            required
          ></v-text-field>

          <v-card-actions class="pa-0">
            <v-btn text color="#555" class="ml-n2" @click="toLogin">
              已有账号?
            </v-btn>

            <v-spacer></v-spacer>
            <v-btn color="primary" @click="signIn"> 注册 </v-btn>
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
      regForm: {
        username: "",
        passwd: "",
        passwdEnsure: "",
      },
      regRules: {
        username: [
          (v) => !!v || "账号不能为空",
          (v) => {
            return /^\w+@(\w+\.)+[a-z]+$/i.test(v) === false
              ? "邮箱格式错误"
              : true;
          },
        ],
        passwd: [(v) => !!v || "密码不能为空"],
        passwdEnsure: [
          (v) => !!v || "密码不能为空",
          (v) => {
            console.log(this.regForm.passwd);
            return this.regForm.passwd !== v ? "两次密码输入不一致" : true;
          },
        ],
      },
    };
  },
  props: {
    // 注册框
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
      this.$emit("update:isRegister", false);
    },
    signIn() {
      console.log(this.$refs.regforms.validate);
    },
    toLogin() {
      this.$emit("update:isRegister", false);
      this.$emit("update:isLogin", true);
    },
  },
};
</script>
<style scoped>
.dl-account > * {
  width: 448px !important;
}
.dl-reg {
  background-color: #4caf50;
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