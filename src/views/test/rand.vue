<!-- 随机练习 -->
<template>
  <v-container class="main_rand">
    <!-- 顶部提示 -->
    <div class="font_color">
      <h2>Hello,</h2>
      <h2>Suchs Jesty.👋</h2>
    </div>
    <!-- 答题选项卡片 -->
    <v-card outlined class="rounded-t-lg rounded-b-lg pa-3 my-4">
      <!-- 答题进度 -->
      <v-row class="d-flex flex-column ma-0">
        <v-col>
          <v-chip class="alphabgc">
            <v-icon left color="primary">mdi-image-filter-drama</v-icon>
            保存当前作答记录
          </v-chip>
        </v-col>
        <v-col>
          <v-chip class="alphabgc">
            <v-icon left color="#00c58e"> mdi-routes </v-icon>
            已完成 1 / 123
          </v-chip></v-col
        >
        <v-col>
          <v-chip
            style="color: #2f495e"
            color="#edf2f7"
            @click="personalIdeas"
            class="mr-4"
            v-ripple="{ class: 'white--text' }"
          >
            <v-icon small left color="#2F495E"> mdi-arrow-left </v-icon>
            上一题
          </v-chip>
          <v-chip
            style="color: #fff"
            color="#00e0a1"
            @click="personalIdeas"
            v-ripple="{ class: 'white--text' }"
          >
            <v-icon small left color="#fff"> mdi-arrow-right </v-icon>
            下一题
          </v-chip>
        </v-col>
      </v-row>
      <!-- 显示题目/文字溢出点击显示更多 -->
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
      <!-- 显示更多内容(对应上面) -->
      <v-expand-transition>
        <div v-if="showMore">
          <v-card-text class="px-4 py-1"
            >这里是很多字的内容内容内容内容内容内容内容内容</v-card-text
          >
          <v-divider class="mx-5"></v-divider>
        </div>
      </v-expand-transition>
      <!-- 答案选项卡 -->
      <v-card-text class="py-0">
        <div class="itemKey">
          <v-radio-group v-model="selectedIndex" class="mt-0 pt-0">
            <div
              class="d-inline-flex align-center"
              v-for="(item, index) in itemAs"
              :key="index"
            >
              <div
                :class="[roundedBars == index ? 'roundBarc' : 'roundBar']"
              ></div>
              <v-radio
                mandatory
                @click="selAns"
                class="my-4"
                :label="item.ans"
                :value="index"
              ></v-radio>
            </div>
          </v-radio-group>
        </div>
      </v-card-text>
      <!-- 查看正确答案 / 解析 / 提交个人解析 -->
      <v-expansion-panels flat popout>
        <v-expansion-panel>
          <v-expansion-panel-header expand-icon="mdi-eye"
            >查看答案:</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <div class="mb-4">
              <span class="rb">正确答案:<code>A</code></span>
            </div>
            <div class="mb-4">
              <span class="rb">解析:</span>
              <code class="mr-4"
                >12312323撒旦法撒旦法沙发撒旦法沙发士大夫撒旦法阿斯蒂芬撒旦法沙发上的发送到f安抚安抚阿萨德发送到符点数123123123123
                暂无解析~</code
              >
              <v-chip
                style="color: #2f495e"
                color="#edf2f7"
                @click="personalIdeas"
                v-ripple="{ class: 'primary--text' }"
              >
                <v-icon small left color="#2F495E"> mdi-feather </v-icon>
                提交解析
              </v-chip>
            </div>

            <v-badge color="green" content="2" top offset-y="15" offset-x="15">
              <v-btn class="ma-1" outlined fab color="green" x-small>
                <v-icon small>mdi-thumb-up</v-icon>
              </v-btn>
            </v-badge>
            <v-badge color="error" content="12" top offset-y="15" offset-x="15">
              <v-btn class="ma-1" outlined fab color="error" x-small>
                <v-icon small>mdi-thumb-down</v-icon>
              </v-btn>
            </v-badge>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

    <!-- 所有题目列表 -->
    <v-card outlined class="d-flex flex-wrap">
      <v-btn
        style="border: 1px solid #ccc"
        v-for="n in 111"
        :key="n"
        class="pa-2 ma-1 rounded-sm"
        tile
        depressed
        iconw
      >
        {{ n }}
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showMore: false,
      itemAs: [
        { option: "A", ans: "测试A选项正确答案" },
        { option: "B", ans: "测试B选项正确答案" },
        { option: "C", ans: "测试C选项正确答案" },
        { option: "D", ans: "测试D选项正确答案" },
      ],
      selectedIndex: 0, //默认选中项
      selectedItems: [],
    };
  },
  mounted() {},
  methods: {
    showMoreQs() {
      this.showMore = !this.showMore;
    },
    selAns(index) {
      console.log(this.selectedIndex);
    },
    personalIdeas() {},
  },
  computed: {
    showIcon() {
      return this.showMore ? "mdi-chevron-up" : "mdi-chevron-down";
    },
    roundedBars() {
      return this.selectedIndex;
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
  /* background-color: rgba(0, 0, 0, 0.05) !important;  */
  background-color: #edf2f7 !important;
}
.wrapmore {
  /* 多出文字以省略号表示 需要设置宽度(js) */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  user-select: none;
  /* border: solid 1px red; */
}
.roundBar {
  width: 4px;
  height: 24px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #ccc;
  margin-right: 8px;
}
.roundBarc {
  width: 4px;
  height: 24px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #1a73e8;
  margin-right: 8px;
  box-shadow: 1px 0 12px 0 #6190e8;
}
.rb {
  margin-right: 8px;
  padding: 6px 12px;
  font-size: 14px;
  color: white;
  background-color: #0377fe;
  border-radius: 360px;
  box-shadow: 1px 0 12px 0 rgba(3, 119, 254, 0.58) !important;
}
</style>