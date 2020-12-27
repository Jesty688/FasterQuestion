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
        :items="Qs.qType"
        v-model="Qs.currqType"
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
      :subject="subject"
      :dialog.sync="showDialog"
      :showAns="true"
      :doneData.sync="doneData"
      @getNextQs="getqItem"
    ></item-sheet>
  </v-container>
</template>
<script>
// 导入答题组件
import itemSheet from "content/itemcard/AnswerSheet";
// 导入此页面所有请求
import { getQsType, getQsList, getQsCount } from "network/test";
export default {
  name: "test",
  data() {
    return {
      //题型
      Qs: {
        currqType: "",
        qType: [],
      },
      // 完成进度
      doneData: {
        hasDone: 0,
        has: 0,
      },
      showDialog: false,
      itemAs: [],
      subject: [], //格式化后的保存题目数组
    };
  },
  components: {
    itemSheet,
  },
  methods: {
    // 获取题型
    getqType() {
      getQsType()
        .then((data) => {
          // console.log(data);
          this.Qs.qType = data;
          this.Qs.currqType = data[0];
          return getQsCount(this.Qs.currqType);
        })
        .then((data) => {
          this.doneData.has = data;
          this.getqItem(0);
        });
    },
    getqCount(type) {
      getQsCount(type).then((data) => {
        this.doneData.has = data;
      });
    },
    getqItem(page) {
      getQsList(this.Qs.currqType, page).then((data) => {
        // 这里先处理下数据在给组件
        data.sort((_) => {
          return 0.5 - Math.random();
        }); //打乱数组
        this.itemAs = this.itemAs.concat(data);
        //console.log(this.itemAs);
        data.map((cur, index, arr) => {
          let ob = {};
          let items = Object.keys(data[index])
            .join(" ")
            .match(/[a-z]+/gi); //获取选项[A-Z]
          for (let it of items) {
            ob[it] = cur[it];
          }
          this.subject.push(ob);
        });
        //console.log(this.subject);
      });
    },
  },
  mounted() {
    // 获取题型和对应的题数
    this.getqType();
    // 获取题型下的题目每次50条
  },
  watch: {
    // 题型修改的时候 重新获取新题型的数量和题目
    "Qs.currqType": {
      handler(val, oldval) {
        // 如果当前题型就是变更以后的就不需要获取请求
        if (val !== oldval && oldval !== "") {
          this.subject = [];
          this.itemAs = [];
          this.getqCount(val);
          // 请求选项列表
          this.getqItem(val, 0);
        }
      },
      deep: true,
    },
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
</style>