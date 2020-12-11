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
      <!-- <v-card-title class="body-1 d-block wrapmore">
        1.Android操作系统手机，如何使用PC机给手机安装软件
      </v-card-title> -->
      <v-list nav dense>
        <v-list-item ripple @click="showMoreQs">
          <v-list-item-content>
            <span class="wrapmore body-1">
              1.Android操作系统手机，如何使用PC机给手机安装软件
            </span>
          </v-list-item-content>
          <v-icon>{{ showIcon }}</v-icon>
        </v-list-item>
      </v-list>

      <!-- 显示更改主题 -->
      <v-expand-transition>
        <div v-if="showMore">
          <v-card-text class="px-4 py-1"
            >这里是很多字的内容内容内容内容内容内容内容内容</v-card-text
          >
          <v-divider class="mx-5"></v-divider>
        </div>
      </v-expand-transition>
      <!-- 选项卡 -->
      <v-card-text>
        <div class="itemKey">
          <div v-for="(item, index) in itemAs" :key="index">
            <!-- <div class="d-inline-flex sets"></div> -->
            <v-checkbox
              ref="inputs"
              @click="selAns(index)"
              :label="item.ans"
              :value="index"
            >
              <div slot="prepend" class="sets"></div>
            </v-checkbox>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showMore: false,
      moreBtn: false,
      itemAs: [
        { option: "A", ans: "测试A选项正确答案" },
        { option: "B", ans: "测试B选项正确答案" },
        { option: "C", ans: "测试C选项正确答案" },
        { option: "D", ans: "测试D选项正确答案" },
      ],
    };
  },
  mounted() {
    console.log(this.$refs.inputs[0].$el);
  },
  methods: {
    showMoreQs() {
      this.showMore = !this.showMore;
    },
    selAns(index) {
      console.log(index);
    },
  },
  computed: {
    showIcon() {
      return this.showMore ? "mdi-chevron-up" : "mdi-chevron-down";
    },
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
  user-select: none;
  /* border: solid 1px red; */
}
.sets {
  width: 4px;
  height: 24px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #ccc;
}
</style>