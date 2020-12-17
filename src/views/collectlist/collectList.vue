<template>
  <v-container class="main_rand">
    <!-- 顶部提示信息 -->
    <div class="font_color">
      <h3>
        当前分类:
        <strong class="success--text text-decoration-underline">{{
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
    <div class="d-flex flex-wrap justify-space-between">
      <!-- 收藏卡片 -->
      <v-card class="pa-3 ma-3 ml-0" elevation="7" width="160" v-for="n in 20">
        <div class="d-flex align-center">
          <div class="roundBarc"></div>
          <span class="grey--text">计算机基础</span>
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
  background-color: #1a73e8;
  margin-right: 8px;
  box-shadow: 1px 0 12px 0 #6190e8;
}
</style>