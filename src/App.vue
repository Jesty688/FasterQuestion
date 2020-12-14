<template>
  <v-app>
    <!-- 顶栏 -->
    <jst-app-bar></jst-app-bar>
    <!-- 侧边栏 -->
    <jst-drawer></jst-drawer>
    <v-main class="content_top">
      <v-container>
        <!-- 主页面 -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
//事件总线这里用于兄弟组件之间通信(顶栏_侧滑栏)点击菜单控制侧滑栏是否显示或隐藏
import eventBus from "@/plugins/eventbus";
//导入顶栏
import jstAppBar from "common/appbar/Appbar";
//导入侧滑栏
import jstDrawer from "content/navdrawer/navDrawer";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    //开关侧滑
    eventBus.$on("ctltigger", (cpDrawer) => {
      cpDrawer.drawer = !cpDrawer.drawer;
    });
  },
  //注册组件
  components: {
    jstAppBar,
    jstDrawer,
  },
  name: "App",
};
</script>
<style scoped>
@import "assets/css/reset.css";
.content_top {
  /* 内容往下  顶栏个高度 */
  padding-top: 64px !important;
}
</style>