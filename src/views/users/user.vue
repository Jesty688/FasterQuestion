<!-- 显示用户列表 -->
<template>
  <div>
    <!-- <div><v-subheader class="pa-0 ml-2">人员推荐</v-subheader></div> -->
    <v-row no-gutters>
      <v-col cols="12"
        ><v-subheader class="pa-0 ml-3"> 人员推荐22</v-subheader></v-col
      >
      <v-col v-for="n in 7" :key="n" cols="6" sm="4" md="3" lg="3">
        <v-card
          outlined
          class="mb-2 rounded-lg"
          :class="n % 2 == 0 ? 'odd' : 'even'"
        >
          <a
            href="javascript:void()"
            class="iteminfo"
            v-ripple="{ class: `secondary--text` }"
          >
            <!-- 用户头像 -->
            <v-avatar rounded class="items" size="96">
              <img
                alt="User"
                class="rounded-circle avatar"
                src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1705736635,478851034&fm=11&gp=0.jpg"
              />
            </v-avatar>
            <!-- 用户名 -->
            <div class="username pubs">Arects</div>
            <div class="headline pubs">软件工程大学生</div>
          </a>

          <!-- 点击按钮 -->
          <v-card-actions class="pl-4">
            <v-btn icon style="border: 1px solid rgba(0, 0, 0, 0.12)">
              <v-icon>mdi-star-outline</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <div class="d-flex justify-center align-center">
      <div class="loadmore mt-2" @click="loadMore">加载更多</div>
      <v-progress-circular
        class="mt-2"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    loadMore() {
      alert(1);
    },
  },
};
</script>

<style scoped>
.loadmore {
  user-select: none;
  /* margin: 10px auto; */
  padding: 10px;
  width: 200px;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff !important;
  text-align: center;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.loadmore:hover {
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
  background-color: rgba(0, 0, 0, 0.5);
}
.odd {
  margin-right: 8px;
}
.even {
  margin-right: 8px;
}
/* 文字溢出隐藏 */
.pubs {
  padding: 0 16px;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  text-overflow: ellipsis;
  word-break: break-all;
}
.headline {
  height: 20px;
  margin: 8px 0 0px;
  font-size: 15px !important;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.54) !important;
}
.username {
  text-align: center;
  font-family: "PingFang" !important;
  height: 20px;
  font-size: 17px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.87);
}
.iteminfo {
  user-select: none;
  display: block;
  text-decoration: none;
  background-color: transparent;
  padding-top: 24px;
  padding-bottom: 8px;
}
.items {
  /* margin: 24px auto 16px; */
  margin: 0 auto 12px;
  display: block;
}
.avatar {
  height: 96px;
  min-width: 96px;
  width: 96px;
  background-size: 96px 96px;
}
@media (max-width: 599.9px) {
  .avatar {
    width: 80px;
    height: 80px;
    min-width: 80px;
    background-size: 80px 80px;
  }
  .items {
    margin: 0px auto 0px;
    display: block;
  }
  .odd {
    margin-right: 8px;
    margin-left: 4px;
  }
  .even {
    margin-right: 4px;
    margin-left: 8px;
  }
}
</style>   