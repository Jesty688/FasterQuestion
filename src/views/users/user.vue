<!-- 显示用户列表 -->
<template>
  <div>
    <!-- <div><v-subheader class="pa-0 ml-2">人员推荐</v-subheader></div> -->
    <v-row no-gutters>
      <v-col cols="12"
        ><v-subheader class="pa-0 ml-3">人员推荐</v-subheader></v-col
      >
      <v-col v-for="(v, i) in users" :key="i" cols="6" sm="4" md="3" lg="3">
        <v-card
          outlined
          class="mb-2 rounded-lg"
          :class="i % 2 == 0 ? 'odd' : 'even'"
        >
          <a
            @click="toUserinfo(v.id)"
            class="iteminfo"
            v-ripple="{ class: `secondary--text` }"
          >
            <!-- 用户头像 -->
            <v-avatar rounded class="items rounded-circle" size="96">
              <img alt="User" class="rounded-circle avatar" :src="v.avaurl" />
            </v-avatar>
            <!-- 用户名 -->
            <div class="username pubs">{{ v.username }}</div>
            <div class="headline pubs">{{ v.oneWord }}</div>
          </a>

          <!-- 点击按钮 -->
          <v-card-actions class="pl-4">
            <v-btn
              v-if="v.username !== $store.state.loginStatus.userName"
              icon
              style="border: 1px solid rgba(0, 0, 0, 0.12)"
              @click="addClt(v.id)"
            >
              <v-icon
                :color="showAction(v) ? 'primary' : ''"
                v-text="showAction(v) ? 'mdi-star' : 'mdi-star-outline'"
              ></v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- 加载更多 -->
    <div v-if="false" class="d-flex justify-center align-center">
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
import { getUsers } from "network/user";
// 应该写一个公用的请求接口 我没写 那就直接用其他模块的请求吧
import { setErrQs } from "network/wrong";
export default {
  data() {
    return {
      users: [],
      selfInfo: [],
      showAddicon: false,
    };
  },
  methods: {
    toUserinfo(id) {
      this.$router.replace("/user/" + id);
    },
    // 初始化数据
    loadMore() {
      alert(1);
    },
    // 获取用户列表
    getUserList() {
      getUsers().then((res) => {
        this.users = res;
        this.selfInfo = res.filter((cur) => {
          return cur.id == window.localStorage.getItem("uid");
        });
        //console.log(this.users);
      });
    },
    // 添加关注
    addClt(id) {
      //console.log(this.$store.state.loginStatus);
      if (
        !this.$store.state.loginStatus.token &&
        !this.$store.state.loginStatus.userName
      ) {
        this.$store.commit("triggerTip", true);
        return;
      }
      // 遍历用户信息中是否当前关注的用户 如果有该次点击就移出关注用户 反之添加
      let rs = this.selfInfo[0].fllow.some((cur) => {
        return cur == id;
      });
      rs
        ? (this.selfInfo[0].fllow = this.selfInfo[0].fllow.filter((cur) => {
            return cur != id;
          }))
        : this.selfInfo[0].fllow.push(id);
      //console.log(this.selfInfo[0]);

      setErrQs(this.selfInfo[0].id, this.selfInfo[0]).then((res) => {
        //console.log(res);
        this.showAddicon = !this.showAddicon;
      });
    },
    initData() {
      this.selfInfo = [];
      this.showAddicon = false;
    },
  },
  mounted() {
    //加载用户列表
    this.getUserList();
  },
  computed: {
    showAction() {
      return (v) => {
        if (this.selfInfo.length == 0) return false;
        return (this.showAddicon = this.selfInfo[0].fllow.some(
          (cur) => cur == v.id
        ));
      };
    },
  },
  watch: {
    "$store.state.loginStatus.token": function (val) {
      val ? this.getUserList() : this.initData();
    },
    //deep: true,
  },
};
</script>

<style scoped>
.loadmore {
  user-select: none;
  /* margin: 10px auto; */
  padding: 6px 8px;
  width: 150px;
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