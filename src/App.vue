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
      :permanent="showDrawer"
      v-model="drawer"
    >
      <v-list nav dense>
        <v-list-item-group
          @change="changeGroupItem($event)"
          v-model="drawerItem"
          color="primary"
          mandatory
        >
          <v-subheader>题库相关</v-subheader>
          <!-- 练习类型下拉 -->
          <v-list-group v-model="see" prepend-icon="mdi-school">
            <template v-slot:activator>
              <v-list-item-title>练习类型</v-list-item-title>
            </template>
            <v-list-item-group @change="changeSubItem" mandatory>
              <v-list-item
                v-for="item in items.subItems"
                :key="item.text"
                class="item_padding"
                :to="item.route"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list-group>
          <!-- 单个组(习题部分)-->
          <v-list-item
            v-for="item in items.prtItems"
            :key="item.text"
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- 单个组End-->
          <!-- 个人信息部分 -->
          <v-divider class="dividermg"></v-divider>
          <v-subheader>个人信息</v-subheader>
          <v-list-item
            v-for="item in items.userItem"
            :key="item.text"
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- 个人信息结束 -->
        </v-list-item-group>
      </v-list>
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
        <h1>主体内容</h1>
        <div>很多子</div>
        <ul>
          <li>11</li>
        </ul>
      </v-container>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
// 简单架构 => 框架成形 => 单独文件 => 自定义组件 => 导入应用 => 代码简单美化
export default {
  data: () => ({
    see: 1,
    showDrawer: false,
    drawer: true,
    drawerItem: 1,
    items: {
      subItems: [
        { text: "随机练习", route: "/sj" },
        { text: "顺序练习", route: "/sx" },
        { text: "模拟测试", route: "/mn" },
      ],
      prtItems: [
        { text: "收藏题目", icon: "mdi-tag-heart", route: "/collecet" },
        { text: "错题集合", icon: "mdi-flag-variant", route: "/errclt" },
        { text: "答题排行", icon: "mdi-summit", route: "/ansrank" },
      ],
      userItem: [
        // earth earth-arrow-right police-badge police-badge-outline
        { text: "个人资料", icon: "mdi-account", route: "/users" },
        { text: "人脉", icon: "mdi-account-multiple", route: "/usersm" },
      ],
    },
  }),
  mounted() {
    this.$refs.drawers.$el.style =
      this.$refs.drawers.$el.style.cssText + "position:fixed;";
    document.querySelector(".v-navigation-drawer__border").remove();
    window.addEventListener("resize", () => {
      console.log(document.body.clientWidth);
      this.showDrawer = document.body.clientWidth < 1000 ? false : true;
    });
  },
  methods: {
    changeGroupItem(index) {
      this.drawer = index != 0 ? !this.drawer : this.drawer;
      // console.log(index);
    },
    changeSubItem() {
      // 没法合起来 bug
      this.drawer = !this.drawer;
      console.log(this.drawer);
    },
  },
  name: "App",
};
</script>
<style scoped>
@import "assets/css/reset.css";
.dividermg {
  margin: 8px 0;
}
.item_padding {
  padding-left: 72px !important;
}
.elevation {
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28) !important;
}
.content_top {
  padding-top: 64px !important;
}
</style>