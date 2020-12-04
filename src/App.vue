<template>
  <v-app>
    <v-app-bar color="#fff" class="elevation" light fixed>
      <v-app-bar-nav-icon
        @click="drawer = drawer ? false : true"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="toolbar_title">FastQs</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app absolute v-model="drawer">
      <h1>cb</h1>
    </v-navigation-drawer>
    <v-main class="content_top">
      <v-container fluid>
        <h1>12312ssss2313123123123312</h1>
        <div>123ccccsfdsjflksjfskjflksj</div>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
  }),
  mounted() {
    // console.log(
    //   (document.querySelector(".v-navigation-drawer__border").style.display =
    //     "none")
    // );
  },
  name: "App",
};
</script>
<style scoped>
@import "assets/css/reset.css";
.fixed {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
.elevation {
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28) !important;
}
.content_top {
  padding-top: 64px !important;
}

.toolbar_title {
  font-size: 22px !important;
  color: inherit;
  text-decoration: none;
  -ms-user-select: none;
  user-select: none;
  margin: 0 16px;
  font-family: "Menlo", "PingFang" !important;
}
.toolbar_title > div {
  font-family: "Menlo", "PingFang" !important;
}
</style>