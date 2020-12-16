<!--  -->
<template>
  <v-container class="main_rand">
    <!-- 顶部提示 -->
    <div class="font_color">
      <h2>
        近期新增
        <a
          href="javascript:void"
          class="indigo--text text--darken-2 text-decoration-none"
          >5</a
        >
        错题
      </h2>
    </div>
    <v-list nav dense>
      <v-subheader
        >只保存最近
        <strong class="red--text text--lighten-2"> 7</strong> 天</v-subheader
      >
      <v-list-group
        no-action
        prepend-icon="mdi-calendar"
        v-for="i in 7"
        :key="i"
      >
        <template v-slot:activator>
          <v-list-item-title>2020年12月16日</v-list-item-title>
        </template>
        <v-list-item v-for="([title], i) in admins" :key="i" link>
          <v-list-item-title v-text="title"></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    admins: [["Management"], ["Settings"]],
  }),
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