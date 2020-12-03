<template>
  <v-app>
    <nav>
      <v-app-bar color="#fff" class="elevation">
        <v-app-bar-nav-icon
          @click="drawer = drawer ? false : true"
        ></v-app-bar-nav-icon>
        <a href="#" class="toolbar_title">
          <v-toolbar-title>FlashQ</v-toolbar-title>
        </a>
        <v-spacer></v-spacer>
      </v-app-bar>
    </nav>

    <v-navigation-drawer class="nav_asideg" v-model="drawer">
      <h2>12</h2>
    </v-navigation-drawer>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
  }),
  mounted() {
    console.log(
      (document.querySelector(".v-navigation-drawer__border").style.display =
        "none")
    );
  },
  name: "App",
};
</script>
<style scoped>
@import "assets/css/reset.css";
.elevation {
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28) !important;
}
.nav_asideg {
  margin: 8px 0;
}
.toolbar_title {
  font-size: 22px !important;
  color: inherit;
  text-decoration: none;
  -ms-user-select: none;
  user-select: none;
  margin: 0 16px;
}
.toolbar_title > div {
  font-family: "Menlo", "PingFang" !important;
}
</style>