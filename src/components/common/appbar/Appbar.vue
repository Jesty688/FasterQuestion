<!-- 封装顶栏 -->
<template>
  <v-app-bar color="#fff" class="elevation" fixed light>
    <v-app-bar-nav-icon @click="tigger"></v-app-bar-nav-icon>
    <v-toolbar-title class="toolbar_title">闪题</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text> 登录 </v-btn>
    <v-btn text> 注册 </v-btn>
  </v-app-bar>
</template>

<script>
//导入事件总线
import eventBus from "plugins/eventbus";
export default {
  data() {
    return {};
  },
  methods: {
    tigger() {
      //事件总线发送自定义事件$on接受并且监听事件
      eventBus.$emit("tigger");
    },
  },
};
</script>
<style  scoped>
.elevation {
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28) !important;
}
</style>