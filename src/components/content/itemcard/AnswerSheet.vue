<template>
  <div>
    <!-- 显示答题进度对话框 -->
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card tile>
        <v-toolbar dark color="primary">
          <!-- @click="showDialog = false" -->
          <!-- 这里之所以可以这样写是在父组件中使用了sync修饰 其实也是等于我上面的写法 只不过这是vue提供的语法糖 -->
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>已做题目</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="d-flex flex-row flex-wrap justify-space-around pa-2">
          <v-btn
            @click="listQs(n)"
            class="ma-1"
            :class="doneItems[n - 1] !== undefined ? 'bgs' : ''"
            v-for="n in doneData.has"
            :key="n"
            elevation="0"
            color="#fff"
            style="border: 1px solid grey; font-weight: normal; color: grey"
            >{{ n }}</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
    <!-- 交卷提示 -->
    <v-dialog v-model="submitd.dialog" persistent max-width="320">
      <v-card>
        <v-card-title class="headline"> {{ submitd.tipHd }} </v-card-title>
        <v-card-text>{{ submitd.tipBd }} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="submitd.dialog = false">
            再看看
          </v-btn>
          <v-btn color="error darken-1" text @click="submitSureAs">
            坚持交卷
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 超时交卷 -->
    <v-snackbar
      color="#1A73E8"
      top
      elevation="6"
      rounded
      v-model="snackMsg.submitPaper"
    >
      {{ snackMsg.submitMsg }}
    </v-snackbar>
    <!-- 答题选项卡片 -->
    <v-card outlined class="rounded-t-lg rounded-b-lg pa-3 mb-4 bgcgy">
      <!-- 答题进度 -->
      <v-row class="d-flex flex-column ma-0">
        <v-col>
          <v-chip class="alphabgc" @click="keepHistory">
            <v-icon left color="primary">mdi-image-filter-drama</v-icon>
            保存当前作答记录
          </v-chip>
        </v-col>
        <v-col>
          <v-chip
            v-ripple="{ class: 'grey--text' }"
            @click="doneQs"
            class="alphabgc"
          >
            <v-icon left color="#00c58e"> mdi-routes </v-icon>
            已完成 {{ doneData.hasDone }} / {{ doneData.has }}
          </v-chip>
          <v-text-field
            v-if="this.ansTime.isStart"
            append-icon="mdi-arrow-right"
            class="d-inline-flex ml-4"
            label="跳转题号"
            :error="qsInputs.errStatus"
            :error-messages="qsInputs.errMsg"
            v-model="qsInputs.qsValue"
            @click:append="gotoQs"
            style="max-width: 35%"
          ></v-text-field>
        </v-col>
        <!-- 时间条 -->
        <v-col class="mt-n3">
          <v-btn block text color="primary" class="mb-1" @click="startAs">
            <v-icon left> mdi-alarm </v-icon>{{ showHaveTime }}</v-btn
          >
          <v-progress-linear
            color="primary"
            :buffer-value="ansTime.progressValue"
            :value="ansTime.progressValue"
            rounded
            striped
            stream
          ></v-progress-linear>
        </v-col>
        <!-- 题目上下选择 -->
        <v-col class="d-flex">
          <v-chip
            style="color: #2f495e"
            color="#edf2f7"
            @click="prevQs"
            class="mr-4"
            v-ripple="{ class: 'white--text' }"
          >
            <v-icon small left color="#2F495E"> mdi-arrow-left </v-icon>
            上一题
          </v-chip>
          <v-chip
            style="color: #fff"
            color="#00e0a1"
            @click="nextQs"
            v-ripple="{ class: 'white--text' }"
            >下一题
            <v-icon small right color="#fff"> mdi-arrow-right </v-icon>
          </v-chip>
          <v-chip
            style="color: #fff"
            color="primary"
            @click="submitAs"
            class="ml-auto"
            v-ripple="{ class: 'white--text' }"
          >
            <v-icon small left color="#fff"> mdi-check </v-icon>
            提交
          </v-chip>
        </v-col>
      </v-row>
      <!-- 显示题目/文字溢出点击显示更多 -->
      <v-list nav dense class="bgcgy">
        <v-list-item ripple @click="showMoreQs">
          <v-list-item-content>
            <span class="wrapmore body-1">
              {{ currentIndex + 1 + ". " + showMoreTitle }}
              <!-- {{ currentIndex + 1 + showMoreTitle }} -->
            </span>
          </v-list-item-content>
          <v-icon>{{ showIcon }}</v-icon>
        </v-list-item>
      </v-list>
      <!-- 显示更多内容(对应上面) -->
      <v-expand-transition>
        <div v-if="showMore">
          <v-card-text class="px-4 py-1">{{ showMoreTitle }}</v-card-text>
          <v-divider class="mx-5"></v-divider>
        </div>
      </v-expand-transition>
      <!-- 答案选项卡 -->
      <v-card-text class="py-0">
        <div class="itemKey">
          <v-radio-group v-model="selectedIndex" class="mt-0 pt-0">
            <div
              class="d-inline-flex align-center"
              v-for="(item, index) in subject[currentIndex]"
              :key="index"
            >
              <div
                :class="[roundedBars == index ? 'roundBarc' : 'roundBar']"
              ></div>
              <v-radio
                mandatory
                @click="selAns"
                class="my-4"
                :label="item.toString()"
                :value="index"
              ></v-radio>
            </div>
          </v-radio-group>
        </div>
      </v-card-text>
      <!-- 查看正确答案 / 解析 / 提交个人解析 -->
      <v-expansion-panels v-if="showAns" flat popout v-model="panel">
        <v-expansion-panel style="background: #f6f6f6">
          <v-expansion-panel-header expand-icon="mdi-eye"
            >查看答案:</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <div class="mb-4">
              <span class="rb"
                >正确答案:<code>{{
                  itemAs[currentIndex] && itemAs[currentIndex]["答案"]
                }}</code></span
              >
            </div>
            <div class="mb-4">
              <span class="rb">解析:</span>
              <code class="mr-4"> 暂无解析~</code>
              <v-chip
                style="color: #2f495e"
                color="#edf2f7"
                @click="personalIdeas"
                v-ripple="{ class: 'primary--text' }"
              >
                <v-icon small left color="#2F495E"> mdi-feather </v-icon>
                提交解析
              </v-chip>
            </div>

            <v-badge color="green" content="2" top offset-y="15" offset-x="15">
              <v-btn class="ma-1" outlined fab color="green" x-small>
                <v-icon small>mdi-thumb-up</v-icon>
              </v-btn>
            </v-badge>
            <v-badge color="grey" content="12" top offset-y="15" offset-x="15">
              <v-btn class="ma-1" outlined fab color="grey" x-small>
                <v-icon small>mdi-thumb-down</v-icon>
              </v-btn>
            </v-badge>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <!-- 提交后分数显示 -->
    <v-dialog v-model="getScore.dialog" persistent max-width="450">
      <v-card class="popscore pa-4">
        <v-btn icon color="error" class="closes" @click="scoreClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <div class="text-center">
          <div class="text-h6">{{ getUname }}</div>
          <div class="text-body-2 mb-4">{{ curQsType }}</div>
          <v-avatar size="160" color="#fff" class="rounded-circle">
            <img
              src="../../../../public/jesty.jpeg"
              style="width: 157px; height: 157px"
            />
          </v-avatar>
          <div>
            <v-row class="text-body-1 font-weight-medium">
              <v-col cols="6"> 分数 </v-col>
              <v-col> 用时 </v-col>

              <v-col cols="6" class="text-h5 pa-0">
                {{ getScore.scores }}
              </v-col>
              <v-col class="text-h5 pa-0">{{ costTimes }}</v-col>
              <v-col cols="6">
                <v-btn color="blue-grey" text class="ma-2 white--text">
                  求鞭策
                  <v-icon right dark> mdi-chevron-right </v-icon>
                </v-btn>
              </v-col>
              <v-col
                ><v-btn color="blue-grey" text class="ma-2 white--text">
                  查看错题
                  <v-icon right> mdi-chevron-right </v-icon>
                </v-btn></v-col
              >
            </v-row>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
/**
 * NoFinished
 * 1.保存当前答题记录
 */
import { setErrQs, getErrQs } from "network/wrong";
import { checkUserName } from "network/sign";
// checkUserName(window.sessionStorage.getItem("userName")).then((udata) => {

// });
// setErrQs1(window.sessionStorage.getItem("uid")).then((res) => {
//   console.log(res);
// });

export default {
  name: "AnswerSheet",
  data() {
    return {
      // 交卷提示
      submitd: {
        dialog: false,
        tipHd: "",
        tipBd: "",
      },
      // 交卷得分
      getScore: {
        dialog: false,
        scores: 0,
        times: "",
      },
      // 超时交卷
      snackMsg: {
        submitPaper: false,
        submitMsg: "",
      },
      // 定义题目跳转对象
      qsInputs: {
        qsValue: "",
        errStatus: false,
        errMsg: "",
      },
      //   控制时间进度条显示进度
      ansTime: {
        sec: 59,
        time: null,
        progressValue: 0,
        isStart: false,
        ts: null,
      },
      panel: false, //不展开答案面板
      showMore: false,
      curQsType: undefined, //当前题目类型
      selectedIndex: undefined, //答案选项默认选中项
      currentIndex: 0, //默认题目显示第一题
      doneItems: [], //以完成题目
      curPage: 1, //当前页
      errCollect: [], //错题集合
    };
  },
  mounted() {},
  //  接受父组件传的参数
  props: {
    // 接收 是否显示查看已完成题目对话框
    dialog: {
      type: Boolean,
      default: false,
    },
    // 接收 是否显示答案区域
    showAns: {
      type: Boolean,
      default: true,
    },
    // 接收 显示答题时间
    times: {
      type: Number,
      default: 120, //分钟为单位
    },
    // 接受题目列表
    itemAs: {
      type: Array,
      default() {
        return [];
      },
    },
    subject: {
      type: Array,
      default() {
        return [];
      },
    },
    // 当前题型有多少道题目
    doneData: {
      type: Object,
      default() {
        return {
          hasDone: 0,
          has: 0,
        };
      },
    },
  },
  methods: {
    /**
     * sync子组件修改父组件数据
     */
    closeDialog() {
      this.$emit("update:dialog", false);
    },
    //查看已做题目
    doneQs() {
      this.$emit("update:dialog", true);
    },
    // 点击已做题目
    listQs(index) {
      this.currentIndex = index - 1;
      this.$emit("update:dialog", false);
    },
    // 初始化数据
    initData() {
      this.doneItems = [];
      this.errCollect = [];
      this.doneData.hasDone = 0;
      this.selectedIndex = undefined;
      this.currentIndex = 0;
      this.curPage = 1;
    },
    // 初始化时间
    initTime() {
      this.ansTime.time = this.times;
      this.ansTime.isStart = false;
      this.ansTime.progressValue = 0;
    },
    // 保存当前答题记录
    keepHistory() {
      // console.log(JSON.parse(window.localStorage.getItem("ansHistory")));
      // window.sessionStorage.setItem(
      //   "ansHistory",
      //   JSON.stringify(this.doneItems)
      // );
    },
    // 关闭得分弹窗
    scoreClose() {
      this.getScore.dialog = false;
      this.initTime();
    },
    // 题目跳转
    gotoQs() {
      /**
       *  简单判断是不是数字
       *  console.log(!isNaN(parseInt(this.qsInputs.qsValue))); 这样写有bug
       *  parseInt会把非数字的舍去  如111a 结果是111 但是a111结果是NaN 小细节
       */
      !isNaN(Number(this.qsInputs.qsValue)) &&
      this.qsInputs.qsValue.length != 0 &&
      Number(this.qsInputs.qsValue) > 0 &&
      Number(this.qsInputs.qsValue) <= this.subject.length
        ? ((this.qsInputs.errStatus = false),
          (this.qsInputs.errMsg = ""),
          (this.currentIndex = parseInt(this.qsInputs.qsValue) - 1),
          (this.qsInputs.qsValue = ""),
          // 选中/未选中
          this.doneItems[this.currentIndex] === undefined
            ? (this.selectedIndex = undefined)
            : (this.selectedIndex = this.doneItems[this.currentIndex].curans))
        : //跳转后清空输入框
          ((this.qsInputs.errStatus = true),
          (this.qsInputs.errMsg = "输入不能为空/只能是数字!"));
      //   console.log(!isNaN(Number(this.qsInputs.qsValue)));
    },
    // 开始答题
    startAs() {
      //防抖(多次点击)
      let interval = parseFloat((100 / this.ansTime.time).toFixed(2));
      let count = interval;
      if (!this.ansTime.isStart) {
        this.ansTime.isStart = true; //开始计时
        console.log("答题开始");
        this.ansTime.ts = setInterval((_) => {
          //console.log(this.ansTime.time);
          if (this.ansTime.time >= 0) {
            if (this.ansTime.sec > 0) {
              this.ansTime.sec--;
            } else {
              if (this.ansTime.time - 1 >= 0) {
                this.ansTime.sec = 59;
                --this.ansTime.time;
                this.showHavaTimes(count);
                count += interval;
              } else {
                console.log("结束!");
                this.snackMsg.submitPaper = true;
                this.snackMsg.submitMsg = "时间到!即将交卷";
                setTimeout(() => {
                  this.submitd.dialog = true;
                  this.submitSureAs();
                }, 2000);

                clearInterval(this.ansTime.ts);
              }
            }
          }
        }, 1000);
      } else {
        console.log("无法重复点击");
      }
    },
    // 题目溢出 点击显示更多
    showMoreQs() {
      this.showMore = !this.showMore;
    },
    // 点击答题列表
    selAns() {
      // 点击答题选项 判断计时器是否已经开启了
      !this.ansTime.isStart && this.startAs();
      // 保存当前选择的答案
      this.doneItems[this.currentIndex] = {
        ans: this.itemAs[this.currentIndex].答案,
        curans: this.selectedIndex,
        title: this.itemAs[this.currentIndex].题目,
        qid: this.itemAs[this.currentIndex].题号,
        anstitle: this.itemAs[this.currentIndex][
          this.itemAs[this.currentIndex].答案
        ],
        curanstitle: this.itemAs[this.currentIndex][this.selectedIndex],
      };
      // 已完成题目加1 这里不能直接将数组的长度赋值 因为空数组也会算进去
      // this.doneData.hasDone = this.doneItems.length;
      this.doneData.hasDone = Object.keys(this.doneItems).length;
      //console.dir(this.doneItems);
    },
    // 上一题
    prevQs() {
      // 点击答题选项 判断计时器是否已经开启了
      !this.ansTime.isStart && this.startAs();
      if (this.currentIndex - 1 < 0) return;
      --this.currentIndex;
      this.doneItems[this.currentIndex] === undefined
        ? (this.selectedIndex = undefined)
        : (this.selectedIndex = this.doneItems[this.currentIndex].curans);
    },
    //下一题
    nextQs() {
      // 点击答题选项 判断计时器是否已经开启了
      !this.ansTime.isStart && this.startAs();
      // 防越界
      // console.log(this.doneData.has, this.subject.length);
      if (this.currentIndex + 1 >= this.doneData.has) return;
      // 如果该题型下的最大题目数和已经保存在题目数组中的长度一样就说明已经获取完成了不用发再送获取请求了
      if (this.doneData.has !== this.subject.length) {
        // 根据当前的currentIndex所在题目下标 加载后续题目 这里设置的是50一次所以就%50
        (this.currentIndex + 1) % 50 == 0
          ? (this.$emit("getNextQs", ++this.curPage), console.log(111))
          : null;
      }
      //console.log( this.subject);
      this.panel = false;
      ++this.currentIndex;
      // 遍历下已完成的数组中有没有当前下标所对应的数据
      this.doneItems[this.currentIndex] === undefined
        ? (this.selectedIndex = undefined)
        : (this.selectedIndex = this.doneItems[this.currentIndex].curans);
      //console.log(this.doneItems);
    },
    // 提交答案
    submitAs() {
      if (Object.keys(this.doneItems).length !== this.doneData.has) {
        this.submitd.tipHd = "你还有未完成的题目!";
        this.submitd.tipBd =
          "还有" +
          (this.doneData.has - Object.keys(this.doneItems).length) +
          "题未完成~";
      } else {
        this.submitd.tipHd = "漂亮! 题目都被你KO啦";
        this.submitd.tipBd = "";
      }
      this.submitd.dialog = true;
    },
    // 提交答案
    submitSureAs() {
      let score = this.doneItems.reduce((prev, cur, index, arr) => {
        // 计算得分   --                          收集错题
        return cur.ans === cur.curans
          ? ++prev
          : (this.errCollect.push(cur), prev);
      }, 0);
      // console.table(this.errCollect);
      if (this.errCollect.length != 0) {
        let er = this.errCollect;
        er.push(Date.parse(new Date()));
        checkUserName(window.localStorage.getItem("userName")).then((udata) => {
          //大于的话删除最前面的错题 否则就直接添加
          if (udata[0].errCollect.length >= 7) {
            udata[0].errCollect.shift();
            udata[0].errCollect.push(er);
            //console.log(udata);
            setErrQs(window.localStorage.getItem("uid"), udata[0]).then(
              (res) => {
                //console.log(res);
              }
            );
          } else {
            udata[0].errCollect.push(er);
            setErrQs(window.localStorage.getItem("uid"), udata[0]).then(
              (res) => {
                //console.log(res);
              }
            );
          }
        });
      }
      this.submitd.dialog = false;
      this.getScore.dialog = true; //显示弹窗
      this.getScore.scores = score;
      this.initData();
      // 清除之前保存的答题记录(没思路 有bug)
      window.localStorage.removeItem("ansHistory");
      clearInterval(this.ansTime.ts);
      this.$emit("update:itemAs", []);
      this.$emit("update:subject", []);
      this.$emit("getNextQs", this.curPage);
    },

    personalIdeas() {},
    // 显示剩余
    showHavaTimes(count) {
      this.ansTime.progressValue = Math.ceil(count);
      // console.log("计时变量:" + this.ansTime.progressValue);
      return this.showHaveTime;
    },
  },
  computed: {
    showMoreTitle() {
      //console.log(this.itemAs);

      return this.itemAs[this.currentIndex] &&
        this.itemAs[this.currentIndex].题目
        ? this.itemAs[this.currentIndex].题目
        : "正在加载...";
      // return this.itemAs[this.currentIndex].题目;
    },
    showHaveTime: {
      get() {
        // 初始化值
        this.ansTime.time =
          this.ansTime.time === null ? this.times : this.ansTime.time;
        if (this.ansTime.isStart) {
          return `${
            this.ansTime.time < 10 ? `0${this.ansTime.time}` : this.ansTime.time
          } : ${
            this.ansTime.sec < 10 ? `0${this.ansTime.sec}` : this.ansTime.sec
          }`;
        }
        return "点击开始";
      },
    },
    costTimes() {
      return this.times - this.ansTime.time < 0
        ? `0${this.times - this.ansTime.time}:${this.ansTime.sec}`
        : `${this.times - this.ansTime.time}:${this.ansTime.sec}`;
    },
    showIcon() {
      return this.showMore ? "mdi-chevron-up" : "mdi-chevron-down";
    },
    roundedBars() {
      return this.selectedIndex;
    },
    qsTypec() {
      // 简单解决bug 显示模拟测试 还是随机测试的题型
      return this.itemAs[0] && this.itemAs[0].题型 === this.itemAs[1].题型
        ? this.itemAs[0].题型
        : "模拟测试";
    },
    curdoneItems() {
      return this.doneItems;
    },
    getUname() {
      return window.localStorage.getItem("userName");
    },
  },
  watch: {
    qsTypec: {
      handler(val, oval) {
        if (val !== undefined && this.curQsType !== val) {
          this.curQsType = val;
          this.initData();
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.closes {
  position: absolute;
  right: 5px;
  top: 5px;
}
.popscore {
  background-color: #ebeffe;
  color: #2b7a7f;
}
.bgcgy {
  background-color: #f6f6f6;
}
.bgs {
  background-color: #00c58e !important;
  color: #fff !important;
  border: 1px solid #00c58e !important;
}

.alphabgc {
  user-select: none;
  /* background-color: rgba(0, 0, 0, 0.05) !important;  */
  background-color: #edf2f7 !important;
}
.wrapmore {
  /* 多出文字以省略号表示 需要设置宽度(js) */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  user-select: none;
  /* border: solid 1px red; */
}
.roundBar {
  width: 4px;
  height: 24px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #ccc;
  margin-right: 8px;
}
.roundBarc {
  width: 4px;
  height: 24px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #1a73e8;
  margin-right: 8px;
  box-shadow: 1px 0 12px 0 #6190e8;
}
.rb {
  margin-right: 8px;
  padding: 6px 12px;
  font-size: 14px;
  color: white;
  background-color: #0377fe;
  border-radius: 360px;
  box-shadow: 1px 0 12px 0 rgba(3, 119, 254, 0.58) !important;
}
</style>