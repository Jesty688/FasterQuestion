<!-- 封装侧滑栏组件 -->
<template>
  <v-navigation-drawer
    ref="drawers"
    class="content_top"
    app
    absolute
    disable-resize-watcher
    v-model="drawer"
  >
    <v-list nav dense>
      <v-list-item-group
        @change="changeGroupItem($event)"
        color="primary"
        mandatory
      >
        <v-subheader>题库相关</v-subheader>
        <!-- 练习类型下拉 -->
        <!-- prepend-icon="mdi-school" -->
        <v-list-group v-model="drawerItem">
          <template v-slot:prependIcon>
            <v-icon dense>mdi-school</v-icon>
          </template>
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
            <v-icon dense v-text="item.icon"></v-icon>
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
          v-show="item.isShow"
        >
          <v-list-item-icon>
            <v-icon dense v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- 个人信息结束 -->
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import eventBus from "plugins/eventbus";
export default {
  data() {
    return {
      optionItem: false,
      drawer: true, //侧滑
      drawerItem: false, //控制侧滑列表显示隐藏
      items: {
        subItems: [
          { text: "随机练习", route: "/rand" },
          // { text: "顺序练习", route: "/order" },
          { text: "模拟测试", route: "/test" },
        ],
        prtItems: [
          { text: "收藏集合", icon: "mdi-tag-heart", route: "/collection" },
          { text: "错题集合", icon: "mdi-flag-variant", route: "/wronglist" },
          { text: "答题排行", icon: "mdi-summit", route: "/ranking" },
        ],
        userItem: [
          // earth earth-arrow-right police-badge police-badge-outline
          {
            text: "个人资料",
            icon: "mdi-account",
            route: "/users",
            isShow: false,
          },
          {
            text: "人脉",
            icon: "mdi-account-multiple",
            route: "/userss",
            isShow: true,
          },
        ],
      },
    };
  },
  mounted() {
    /*
     *有点绕 先顶栏组件点击事件发送emit事件 由事件总线来调用
     *然后侧滑组件挂载时监听并接受($on)顶栏组件点击事件中发送的事件
     *最后在主组件挂载时监听并接受($on)侧滑组件发送的事件这里传递的参数是:侧滑组件对象
     *因为对象是引用传递又因为vue双向数据绑定所以修改控制侧滑组件data数据中的布尔值 直接去反
     *Ps:其实可以直接在主组件中的侧滑组件中加入ref属性 然后this.refs.name.drawer = !this.refs.name.drawer
     *因为没怎么用过父子组件传值/兄弟组件传值所以用了这个方法
     */
    eventBus.$on("tigger", () => {
      eventBus.$emit("ctltigger", this);
    });
    //侧滑栏固定 不随着主页面下拉而下拉
    let fixeds =
      this.$refs.drawers.$el.style.cssText + "position:fixed; z-index:2";
    this.$refs.drawers.$el.style = fixeds;
    //隐藏侧滑最右边的小细线
    document.querySelector(".v-navigation-drawer__border").remove();
  },
  methods: {
    changeGroupItem(index) {},
    changeSubItem() {},
  },
};
</script>
<style scoped>
.dividermg {
  margin: 8px 0;
}
.item_padding {
  padding-left: 72px !important;
}
</style>