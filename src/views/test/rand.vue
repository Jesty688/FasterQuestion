<!-- 随机练习 -->
<template>
  <v-container class="main_rand">
    <!-- 顶部提示 -->
    <div class="font_color">
      <h2>Hello,</h2>
      <h2>Suchs Jesty.👋</h2>
    </div>
    <v-card outlined class="gw rounded-t-lg rounded-b-lg pa-3">
      <v-row class="d-flex flex-column ma-0">
        <v-col>
          <v-chip class="alphabgc">
            <v-icon left color="primary"> mdi-apple-icloud </v-icon>
            保存当前作答记录
          </v-chip>
        </v-col>
        <v-col>
          <v-chip class="alphabgc">
            <v-icon left color="#00c58e"> mdi-routes </v-icon>
            已完成 1 / 123
          </v-chip></v-col
        >
      </v-row>
      <v-card-title class="body-1 d-block wrapmore">
        1.Android操作系统手机，如何使用PC机给手机安装软件
        <v-btn v-if="moreBtn" icon @click="showMore = !showMore"
          ><v-icon>{{
            showMore ? "mdi-chevron-up" : "mdi-chevron-down"
          }}</v-icon></v-btn
        >
      </v-card-title>
      <v-card-text>123</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showMore: false,
      moreBtn: false,
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      let cardWidth = document.querySelector(".gw").offsetWidth;
      let questionDom = document.querySelector(".wrapmore");
      // let res =
      //   questionDom.offsetWidth + 28 + 36 > cardWidth ? "显示更多" : "正常视图";
      console.log(questionDom.ScrollWidth, questionDom.OuterWidth);

      // console.log(res);

      // console.log(
      //   document.querySelector(".wrapmore").offsetWidth + 28 + 36 > cardWidth
      //     ? "显示更多按钮" + document.querySelector(".wrapmore").offsetWidth
      //     : "没事了" + document.querySelector(".wrapmore").offsetWidth
      // );
    });
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
.alphabgc {
  user-select: none;
  background-color: rgba(0, 0, 0, 0.05) !important;
}
.wrapmore {
  /* 多出文字以省略号表示 需要设置宽度(js) */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  /* border: solid 1px red; */
}
</style>