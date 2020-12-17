<!-- 答题排行 -->
<template>
  <v-container class="main_rand">
    <!-- 排行标题 -->
    <div class="d-flex">
      <v-icon x-large color="primary" class="mr-3"> mdi-school-outline</v-icon>
      <div class="inline">
        <h2 style="color: #333; letter-spacing: 0.5px">答题排行</h2>
        <div class="grey--text font-weight-medium">
          答题者有资格参与排行和线上交易...
        </div>
      </div>
    </div>
    <!-- 显示前三 -->
    <v-container>
      <v-row justify="center">
        <v-col lg="6" cols="9" class="pa-0">
          <v-card
            class="d-flex pa-3 rounded-lg boxsha align-center"
            elevation="0"
          >
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
        <v-col lg="2" cols="4">
          <v-card
            class="d-flex pa-3 rounded-lg boxsha align-center"
            elevation="0"
          >
            <div class="d-flex flex-column align-center">
              <v-avatar size="72" color="#fff" class="boxsha rounded-circle">
                <img
                  src="../../../public/jesty.jpeg"
                  style="width: 60px; height: 60px"
                />
              </v-avatar>
              <span
                v-ripple
                class="rounded-lg text-center boxsha2 font-weight-bold my-2"
                style="
                  color: white;
                  background: #006ff9;
                  padding: 2px 12px;
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
        <v-col lg="4" cols="8">
          <v-card
            class="d-flex pa-3 rounded-lg boxsha align-center"
            elevation="0"
          >
            <div class="d-flex flex-column align-center mr-2">
              <v-avatar size="82" color="#fff" class="boxsha rounded-circle">
                <img
                  src="../../../public/jesty.jpeg"
                  style="width: 70px; height: 70px"
                />
              </v-avatar>
              <h4 style="color: #333; font-size: 12px" class="mt-2">
                大鱼海棠MIDI
              </h4>
              <span
                v-ripple
                class="rounded-lg text-center boxsha2 font-weight-bold mt-2"
                style="
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
              <h3>榜二 NO.3</h3>

              <div class="grey--text font-weight-medium text-body-2">
                恭喜德国绘画艺术家@Dlicac
                liery油画作品/风干的墙/荣获2020年度绘画金奖
              </div>
            </div>
          </v-card></v-col
        >
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.genft {
  color: #666666;
  font-family: "PingFang" !important;
  font-size: 14px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
.main_rand > * {
  font-family: "PingFang" !important;
}
.boxsha {
  box-shadow: 10px 10px 30px rgba(0, 110, 248, 0.15) !important;
}
.boxsha2 {
  box-shadow: 4px 2px 10px rgba(0, 110, 248, 0.6) !important;
}
</style>