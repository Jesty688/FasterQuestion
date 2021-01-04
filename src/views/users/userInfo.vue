<template>
  <div>
    <!-- 修改框 -->

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card class="rounded-lg">
        <v-card-title>
          <span class="headline">编辑个人信息</span>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  label="一句话介绍"
                  counter="40"
                  v-model="userMsg.oneWord"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="个人主页"
                  counter="80"
                  v-model="userMsg.userHome"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="头像直链"
                  counter="80"
                  v-model="userMsg.avaurl"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="封面背景直链"
                  counter="80"
                  v-model="userMsg.coverurl"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="所属学校或企业"
                  counter="80"
                  v-model="userMsg.school"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="所在地区"
                  counter="80"
                  v-model="userMsg.area"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="个人简介"
                  counter="160"
                  v-model="userMsg.introduce"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="submitUserinfo">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="10" md="10" lg="10">
        <v-card class="rounded-lg">
          <v-parallax
            :height="height"
            style="background-size: cover"
            :src="userMsg.coverurl"
          >
          </v-parallax>
          <v-card-text>
            <div class="d-inline-flex">
              <v-avatar size="102">
                <img alt="user" :src="userMsg.avaurl" />
              </v-avatar>
              <div class="ml-8">
                <div class="username black--text pb-1">
                  {{ userMsg.username }}
                  <!-- 修改信息 -->
                  <v-btn
                    icon
                    color="#ccc"
                    small
                    outlined
                    @click="dialog = true"
                    v-if="
                      this.$store.state.loginStatus.userName === userMsg.username
                    "
                  >
                    <v-icon color="#0000008A" small>mdi-pencil</v-icon>
                  </v-btn>
                </div>
                <div class="mt-2">
                  <v-icon left color="#777777" small>
                    mdi-credit-card-outline
                  </v-icon>
                  {{ userMsg.oneWord }}
                </div>
                <!-- 隐藏 -->
                <div v-if="showMore">
                  <div class="mt-2">
                    <v-icon left color="#777777" small> mdi-link </v-icon>
                    <a href="http://baidu.com" target="blank">{{
                      userMsg.userHome
                    }}</a>
                  </div>
                  <div class="mt-2">
                    <v-icon left color="#777777" small> mdi-city </v-icon>
                    {{ userMsg.school }}
                  </div>
                  <div class="mt-2">
                    <v-icon left color="#777777" small> mdi-map-marker </v-icon>
                    {{ userMsg.area }}
                  </div>
                  <div class="mt-2">
                    <v-icon left color="#777777" small>
                      mdi-message-text-outline
                    </v-icon>
                    {{ userMsg.introduce }}
                  </div>
                </div>

                <v-btn
                  text
                  color="#555"
                  class="ml-n3 mt-2"
                  @click="showMore = !showMore"
                >
                  <v-icon
                    left
                    v-text="showMore ? 'mdi-menu-up' : 'mdi-menu-down'"
                  ></v-icon>
                  {{ showMore ? "收起详细信息" : "查看详细资料" }}
                </v-btn>
              </div>
            </div>
          </v-card-text>
          <v-card-actions class="pb-4">
            <v-row no-gutters>
              <v-col cols="4" class="item">
                <v-btn text color="#555">0人关注</v-btn>
              </v-col>
              <v-col
                cols="4"
                class="item d-inline-flex align-center justify-center"
              >
                <div class="divider"></div>
              </v-col>
              <v-col cols="4" class="item">
                <v-btn text color="#555"
                  >关注了{{ userMsg.fllow && userMsg.fllow.length }}人</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getUserInfo } from "network/userinfo";
import {setErrQs} from 'network/wrong'
export default {
  data() {
    return {
      dialog: false,
      showMore: false,
      queryId: "",
      userMsg: [],
    };
  },
  methods: {
    queryUser(id) {
      getUserInfo(id).then((res) => {
        //sconsole.log(res);
        this.userMsg = res;
      });
    },
    submitUserinfo(){
      setErrQs(this.userMsg.id , this.userMsg).then(res => {
        //console.log(res)
        this.dialog = false
      })
    }
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 200;
        case "sm":
          return 200;
        case "md":
          return 400;
        case "lg":
          return 400;
        case "xl":
          return 400;
      }
    },
  },
  mounted() {
    this.queryId = this.$route.params.id;
    this.queryUser(this.queryId);
  },
  watch: {
    $route(to, from) {
      if (to.name == "userinfo") {
        //console.log("请求用户数据");
        this.queryId = this.$route.params.id;
        this.queryUser(this.queryId);
      }
    },
  },
};
</script>
<style>
.divider {
  width: 3px;
  height: 16px;
  margin: 0 8px;
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  /* display: inline-block; */
}
.item {
  text-align: center;
}
.username {
  padding-top: 8px;
  padding-bottom: 4px;
  padding-left: 0;
  font-size: 32px;
  line-height: 32px;
}
</style>