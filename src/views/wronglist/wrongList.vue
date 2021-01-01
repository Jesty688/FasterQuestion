<!--  -->
<template>
  <v-container class="main_rand">
    <!-- 错题查看弹窗 -->
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="600"
    >
      <v-card>
        <v-toolbar color="primary" dark>错题查看</v-toolbar>
        <v-card-text>
          <div class="text-h6 pa-6">{{ contents }}</div>
          <div class="text-h6 pa-6">
            你的答案:
            <font color="red">{{ curans }}</font>
          </div>
          <div class="text-h6 pa-6">
            正确答案: <font color="green">{{ ans }}</font>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 顶部提示 -->
    <div class="font_color">
      <h2>
        今日新增
        <a
          href="javascript:void"
          class="indigo--text text--darken-2 text-decoration-none"
          >{{ errItems.length }}</a
        >
        错题
      </h2>
    </div>
    <v-list nav dense class="ls">
      <v-subheader
        >只保存最近
        <strong class="red--text text--lighten-2"> 7</strong>
        次答题</v-subheader
      >
      <v-list-group
        no-action
        prepend-icon="mdi-calendar"
        v-for="(v, i) in errItems"
        :key="i"
      >
        <template v-slot:activator>
          <v-list-item-title>{{
            $moment(v[v.length - 1]).format("YYYY年MM月DD日 HH:mm")
          }}</v-list-item-title>
        </template>
        <v-list-item
          v-for="(v, is) in errItems[i]"
          :key="is"
          @click="showTitle(v)"
          link
          v-show="errItems[i].length !== is + 1"
        >
          <v-list-item-title v-text="v.title"></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-container>
</template>

<script>
import { getErrQs } from "network/wrong";
export default {
  data() {
    return {
      dialog: false,
      contents: "",
      ans: "",
      curans: "",
      errItems: [],
    };
  },
  mounted() {
    getErrQs(window.sessionStorage.getItem("uid")).then((res) => {
      this.errItems = res.errCollect;
      //console.log(this.errItems[0][this.errItems[0].length - 1]);
    });
  },
  methods: {
    showTitle(data) {
      this.dialog = true;
      this.contents = data.title;
      this.ans = `${data.ans} ${data.anstitle}`;
      this.curans = `${data.curans} ${data.curanstitle}`;
      //console.log(data);
    },
  },
  name: "Wl",
};
</script>
<style scoped>
.main_rand > * {
  font-family: "Menlo", "PingFang" !important;
}
.ls {
  background-color: #f6f6f6 !important;
}
.font_color {
  margin-bottom: 12px;
  color: #6190e8;
}
</style>