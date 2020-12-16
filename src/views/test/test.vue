<template>
  <v-container class="main_rand">
    <!-- 顶部提示 -->
    <div class="font_color">
      <h2>Hello,</h2>
      <h2>Suchs Jesty.👋</h2>
    </div>
    <!-- 题型选择 -->
    <v-col class="d-flex pa-0" cols="12" sm="2">
      <v-select
        :items="['Java', 'C++', '计算机基础']"
        label="题型选择"
        append-icon="mdi-shape"
        menu-props="auto, overflowX"
      ></v-select>
    </v-col>
    <!-- sync (简单实现:其实原理就是父组件给子组件经过props传数据 子组件想修改父组件传过来的数据 但是呢 vue是不支持子组件直接修改父组件的数据的 
        所以这时候又用到了 this.$emit 现在子组件可以修改父组件的数据了
        PS:这里的 [@事件:属性] 我暂时也不清楚是什么意思有没有大佬出来给我解释一下
        对了 父组件这样写的话 在子组件的emit中的函数名也需要和父组件对应也就是 事件:属性
        @closeDialog:dialog="changeDialog"
    ) -->
    <item-sheet
      :itemAs="itemAs"
      :dialog.sync="showDialog"
      :showAns="false"
    ></item-sheet>
  </v-container>
</template>
<script>
import itemSheet from "content/itemcard/AnswerSheet";
export default {
  name: "test",
  data() {
    return {
      showDialog: false,
      itemAs: [{ option: "A", ans: "测试A选项正确答案" }],
    };
  },
  components: {
    itemSheet,
  },
};
</script>
<style scoped>
.main_rand > * {
  font-family: "Menlo", "PingFang" !important;
}
.font_color {
  margin-bottom: 12px;
  color: #6190e8;
}
.main_rand > * {
  font-family: "Menlo", "PingFang" !important;
}
</style>