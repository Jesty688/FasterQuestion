<!-- 答题排行 -->
<template>
  <v-container class="main_rand">
    <!-- 顶部标题 -->
    <!-- <div class="d-flex">
      <v-icon x-large color="primary" class="mr-3"> mdi-school-outline</v-icon>
      <div class="inline">
        <h2 style="color: #333; letter-spacing: 0.5px">答题排行</h2>
        <div class="grey--text font-weight-medium">
          答题者有资格参与排行和线上交易...
        </div>
      </div>
    </div> -->
    <!-- 显示前三 -->
    <v-container>
      <v-row justify="center">
        <v-col lg="6" cols="11" class="pa-0 mb-3">
          <div class="d-flex">
            <v-icon x-large color="primary" class="mr-3">
              mdi-school-outline</v-icon
            >
            <div class="inline">
              <h2 style="color: #333; letter-spacing: 0.5px">答题排行</h2>
              <div class="grey--text font-weight-medium">
                答题者有资格参与排行和线上交易...
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col lg="6" cols="11" class="pa-0">
          <v-card
            class="d-flex pa-3 rounded-lg boxsha align-center"
            elevation="0"
          >
            <v-badge
              color="#fc0"
              icon="mdi-seal-variant"
              style="position: absolute; z-index: 12; right: 10px; top: 5px"
            >
            </v-badge>
            <div class="d-flex flex-column align-center mr-2">
              <v-avatar size="82" color="#fff" class="boxsha rounded-circle">
                <img
                  src="../../../public/jesty.jpeg"
                  style="width: 70px; height: 70px"
                />
              </v-avatar>
              <span
                v-ripple
                class="rounded-lg text-center boxsha2 font-weight-bold mt-2"
                style="
                  cursor: pointer;
                  color: white;
                  background: #006ff9;
                  padding: 2px 12px;
                  font-size: 14px;
                "
              >
                关注
              </span>
            </div>

            <div class="inline">
              <h3>榜主 NO.1</h3>
              <h4 style="color: #353535; font-weight: 560">
                不散的烟火&为你/@
              </h4>
              <div class="grey--text font-weight-medium text-body-2">
                恭喜德国绘画艺术家@Dlicac
                liery油画作品/风干的墙/荣获2020年度绘画金奖
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col lg="2" cols="5">
          <v-card
            class="d-flex pa-3 rounded-lg boxsha align-center"
            elevation="0"
          >
            <div class="d-flex flex-column align-center">
              <v-avatar size="62" color="#fff" class="boxsha rounded-circle">
                <img
                  src="../../../public/jesty.jpeg"
                  style="width: 50px; height: 50px"
                />
              </v-avatar>
              <span
                v-ripple
                class="rounded-lg text-center boxsha2 font-weight-bold my-2"
                style="
                  color: white;
                  background: #006ff9;
                  padding: 2px 10px;
                  font-size: 14px;
                "
              >
                关注
              </span>
              <div class="genft grey--text font-weight-medium text-body-2">
                恭喜德国绘画艺术家@Dlicac
                liery油画作品/风干的墙/荣获2020年度绘画金奖
              </div>
            </div>
          </v-card></v-col
        >
        <v-col lg="4" cols="7">
          <v-card
            class="d-flex pa-3 rounded-lg boxsha align-center"
            elevation="0"
          >
            <div class="d-flex flex-column align-center mr-2">
              <v-avatar size="62" color="#fff" class="boxsha rounded-circle">
                <img
                  src="../../../public/jesty.jpeg"
                  style="width: 50px; height: 50px"
                />
              </v-avatar>
              <h4
                style="color: #333; font-size: 10px"
                class="mt-2 text-center font-weight-medium"
              >
                大鱼海棠MDIU!@!
              </h4>
              <span
                v-ripple
                class="rounded-lg text-center boxsha2 font-weight-bold mt-2"
                style="
                  color: white;
                  background: #006ff9;
                  padding: 2px 10px;
                  font-size: 14px;
                "
              >
                关注
              </span>
            </div>

            <div>
              <h3 class="mb-1">榜二 NO.2</h3>
              <v-spacer></v-spacer>
              <div class="genft grey--text font-weight-medium text-body-2">
                恭喜德国绘画艺术家@Dlicac
                liery油画作品/风干的墙/荣获2020年度绘画金奖
              </div>
            </div>
          </v-card></v-col
        >
      </v-row>
    </v-container>

    <!-- 后续排行 -->
    <v-row justify="center">
      <v-col lg="6" cols="11" class="pa-0">
        <v-card class="pa-3 rounded-lg boxsha" elevation="0">
          <!-- 排行标题 -->
          <div class="d-flex align-center mb-2">
            <v-icon large color="#fc0" class="mr-3"> mdi-seal</v-icon>
            今日排行
          </div>
          <!-- 排行标题结束 -->

          <div
            class="d-flex align-center mb-3"
            v-for="n in [4, 5, 6, 7, 8]"
            :key="n"
          >
            <!-- 名次 -->
            <div class="mr-2 text-center ranks" style="font-weight: 300">
              {{ n }}
            </div>
            <!-- 名次结束 -->

            <!-- 排行小卡片 -->
            <v-card
              elevation="0"
              class="pa-2 rounded-lg boxsha3"
              style="width: 100%"
            >
              <div class="d-flex align-center">
                <!-- 用户头像 -->
                <v-avatar class="mr-5 ml-1" size="40">
                  <img
                    src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1705736635,478851034&fm=11&gp=0.jpg"
                    alt="John"
                  />
                </v-avatar>
                <!-- 用户头像结束 -->

                <v-row align="center">
                  <!-- 上榜用户个人信息 -->
                  <v-col cols="8" class="pa-0">
                    <!-- 名字 -->
                    <h4 style="color: #333">大鱼海棠</h4>
                    <!-- 名字结束 -->
                    <!-- 个人技能 -->
                    <div style="width: 80%; color: #666" class="genft2">
                      <span class="mr-2 spans">插画</span
                      ><span class="mr-2">国画</span>
                      <span class="mr-2">绘画资料</span>
                      <span class="mr-2">名人</span>
                      <span class="mr-2">画展咨询</span>
                    </div>
                    <!-- 个人技能结束 -->
                  </v-col>
                  <!-- 上榜用户简单的个人信息结束 -->
                  <!-- 点赞 -->
                  <v-col cols="4" class="pa-0" align="center">
                    <v-btn icon color="pink">
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <span class="mr-4 grey--text">12</span>
                  </v-col>
                  <!-- 点赞结束 -->
                </v-row>
              </div>
            </v-card>
            <!-- 排行小卡片结束 -->
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!-- 分页 -->
    <v-pagination v-model="page" :length="4" circle class="mt-5"></v-pagination>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
    };
  },
};
</script>
<style scoped>
.genft2 {
  color: #666666;
  font-family: "PingFang" !important;
  font-size: 14px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.genft {
  color: #666666;
  font-family: "PingFang", "Menlo" !important;
  font-size: 14px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
.ranks:after {
  content: " ";
  width: 16px;
  height: 4px;
  line-height: 4px;
  position: relative;
  top: -6px;
  background: #006ff997;
  border-radius: 2px;
  box-shadow: 0 13px 15px rgba(31, 45, 61, 0.15) !important;
  display: block;
  margin: 0 auto;
}
.main_rand > * {
  user-select: none;
  font-family: "PingFang" !important;
}
.boxsha {
  box-shadow: 10px 10px 30px rgba(0, 110, 248, 0.15) !important;
}
.boxsha2 {
  box-shadow: 4px 2px 10px rgba(0, 110, 248, 0.6) !important;
}
.boxsha3 {
  box-shadow: 1px 2px 10px rgba(0, 110, 248, 0.12) !important;
}
</style>