<template>
  <v-app>
    <v-app-bar color="#fff" class="elevation" fixed light>
      <v-app-bar-nav-icon
        @click="drawer = drawer ? false : true"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="toolbar_title">闪题</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text> 登录 </v-btn>
      <v-btn text> 注册 </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      ref="drawers"
      class="content_top"
      app
      absolute
      v-model="drawer"
    >
      <v-list nav dense> 213 </v-list>
    </v-navigation-drawer>

    <v-main class="content_top">
      <v-container fluid>
        <v-card max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">OVERLINE</div>
              <v-list-item-title class="headline mb-1">
                Headline 5
              </v-list-item-title>
              <v-list-item-subtitle
                >Greyhound divisely hello coldly
                fonwderfully</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text> Button </v-btn>
          </v-card-actions>
        </v-card>
        <h1>12312ssss2313123123123312</h1>
        <div>123ccccsfdsjflksjfskjflksj</div>
        <ul>
          <li>11</li>
          <li>11</li>
          <li>11</li>
          <li>11</li>
          <li>11</li>
          v
          <li>11</li>
          <li>11</li>
          <li>11</li>
          v
          <li>11</li>
          <li>11</li>
          <li>11</li>
          <li>11</li>
          <li>11</li>
          v
          <li>11</li>
          <li>11</li>
          <li>11</li>
          v
          <li>11</li>
          <li>11</li>
          <li>11</li>
          <li>11</li>
          <li>11</li>
          v
          <li>11</li>
          <li>11</li>
          <li>11</li>
          v
          <li>11</li>
          <li>11</li>
          <li>11</li>
          <li>11</li>
          <li>11</li>
          v
          <li>11</li>
          <li>11</li>
          <li>11</li>
          v
          <li>1231211</li>
          <li>123123</li>
          <li>12312</li>
          <li>11</li>
          <li>123</li>
          v
          <li>123</li>
          <li>11</li>
          <li>11</li>
          v v
        </ul>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    selectedItem: 0,
    items: [
      { text: "随机练习", icon: "mdi-folder" },
      { text: "顺序练习", icon: "mdi-account-multiple" },
      { text: "模拟测试", icon: "mdi-star" },
    ],
  }),
  mounted() {
    this.$refs.drawers.$el.style =
      this.$refs.drawers.$el.style.cssText + "position:fixed;";
    document.querySelector(".v-navigation-drawer__border").remove();
  },
  methods: {
    changeItem() {
      this.selectedItem = this.selectedItem ? this.selectedItem : 0;
    },
  },
  name: "App",
};
</script>
<style scoped>
@import "assets/css/reset.css";
.elevation {
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28) !important;
}
.content_top {
  padding-top: 64px !important;
}
</style>