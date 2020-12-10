<!-- 随机练习 -->
<template>
  <v-container class="main_rand">
    <!-- 顶部提示 -->
    <div class="font_color">
      <h2>Hello,</h2>
      <h2>Derek Doyle👋</h2>
    </div>
    <v-card elevation="3" class="rounded-t-lg fullw"> <h2>123</h2></v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.main_rand {
  height: 100%;
}
.main_rand > * {
  font-family: "Menlo", "PingFang" !important;
}
.font_color {
  margin-bottom: 24px;
  color: #6190e8;
}
.fullw {
  height: 80%;
}
</style>