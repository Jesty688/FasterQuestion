<template>
  <v-container class="main_rand">
    <!-- 顶部提示信息 -->
    <div class="font_color">
      <h3>
        当前分类:
        <strong style="color: #4dcab0" class="text-decoration-underline">{{
          currentCate
        }}</strong>
      </h3>
      <v-row align="center">
        <v-col cols="5" lg="2" class="pr-0 pb-0">
          <v-select
            v-model="currentCate"
            :items="category"
            label="分类"
            dense
          ></v-select>
        </v-col>
        <v-col cols="6" md="4" lg="3" class="pl-0 pb-0">
          <v-text-field
            v-model="keyWord"
            class=""
            dense
            label="搜索关键字"
            append-outer-icon="mdi-database-search"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>

    <div class="ct">
      <!-- 收藏卡片 -->
      <v-card
        class="pa-3 ma-2 ml-0 items pb-1 rounded-lg"
        elevation="6"
        width="160"
        v-for="n in 20"
        :key="n"
      >
        <div class="d-flex align-center mb-2">
          <div class="roundBarc"></div>
          <span class="grey--text text-subtitle-1">计算机基础</span>
        </div>
        <div class="genft font-weight-medium">
          我是题目题目i放声大哭123asasdfsdf是的发生方式
          廊坊市大房间卡萨浪费结算单方式
        </div>
        <v-card-text class="pa-0 ma-0 my-1 as">
          答案:<span class="teal--text text--lighten-2 font-weight-bold"
            >A</span
          >
        </v-card-text>
        <div class="d-flex align-center justify-space-between">
          <v-btn icon color="#f4716d" outlined small>
            <v-icon small>mdi-heart</v-icon>
          </v-btn>
          <v-btn style="font-size: 10px; color: #999" class="px-1" text
            >212人关注此题</v-btn
          >
        </div>
      </v-card>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "component_name",
  data() {
    return {
      currentCate: "全部",
      category: ["全部", "计算机基础"],
      keyWord: "",
    };
  },
};
</script>
<style scoped>
.as {
  font-size: 12px;
}
.genft {
  color: #666666;
  font-family: "PingFang" !important;
  font-size: 14px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
.ct {
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 160px) !important;
  grid-gap: 5px !important;
}
/*
.items:last-child {
  margin-right: auto !important;
      <div class="ct d-flex flex-wrap justify-space-between">
}*/
.main_rand > * {
  font-family: "Menlo", "PingFang" !important;
}
.font_color {
  margin-bottom: 12px;
  color: #6190e8;
}
.roundBarc {
  width: 4px;
  height: 18px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #4dcab0;
  margin-right: 3px;
  /* box-shadow: 1px 0 12px 0 #6190e8; */
}
</style>