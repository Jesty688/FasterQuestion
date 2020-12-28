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
          <v-chip class="alphabgc">
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
  </div>
</template>
<script>
/**
 * 未完成
 * 1.保存当前答题记录
 * 2.计时功能
 * 3.完善提交功能
 */
export default {
  name: "AnswerSheet",
  data() {
    return {
      // 交卷提示
      submitd: {
        dialog: false,
        tipHd: "",
        tupBd: "",
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
      },
      panel: false, //不展开答案面板
      showMore: false,
      curQsType: undefined, //当前题目类型
      selectedIndex: undefined, //答案选项默认选中项
      currentIndex: 0, //默认题目显示第一题
      doneItems: [], //以完成题目
      curPage: 1, //当前页
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
      default: 1200, //分钟为单位
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
    // 题目跳转
    gotoQs() {
      /**
       *  简单判断是不是数字
       *  console.log(!isNaN(parseInt(this.qsInputs.qsValue))); 这样写有bug
       *  parseInt会把非数字的舍去  如111a 结果是111 但是a111结果是NaN 小细节
       */
      !isNaN(Number(this.qsInputs.qsValue)) &&
      this.qsInputs.qsValue.length != 0 &&
      Number(this.qsInputs.qsValue) > 0
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
        let ts = setInterval((_) => {
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
                console.log("结束了!");
                this.snackMsg.submitPaper = true;
                this.snackMsg.submitMsg = "时间到!即将交卷";
                clearInterval(ts);
              }
            }
          }
        }, 10);
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
      // 保存当前选择的答案
      this.doneItems[this.currentIndex] = {
        ans: this.itemAs[this.currentIndex].答案,
        curans: this.selectedIndex,
        qid: this.itemAs[this.currentIndex].题号,
      };
      // 已完成题目加1 这里不能直接将数组的长度赋值 因为空数组也会算进去
      // this.doneData.hasDone = this.doneItems.length;
      this.doneData.hasDone = Object.keys(this.doneItems).length;
      //console.dir(this.doneItems);
    },
    // 上一题
    prevQs() {
      if (this.currentIndex - 1 < 0) return;
      --this.currentIndex;
      this.doneItems[this.currentIndex] === undefined
        ? (this.selectedIndex = undefined)
        : (this.selectedIndex = this.doneItems[this.currentIndex].curans);
    },
    //下一题
    nextQs() {
      // 防越界
      if (this.currentIndex + 1 >= this.doneData.has) return;
      // 如果该题型下的最大题目数和已经保存在题目数组中的长度一样就说明已经获取完成了不用发再送获取请求了
      if (this.doneData.has !== this.subject.length)
        // 根据当前的currentIndex所在题目下标 加载后续题目 这里设置的是50一次所以就%50
        (this.currentIndex + 1) % 50 == 0
          ? (this.$emit("getNextQs", ++this.curPage), console.log("请求一次"))
          : null;
      //console.log( this.subject);
      this.panel = false;
      ++this.currentIndex;
      // 遍历下已完成的数组中有没有当前下标所对应的数据
      this.doneItems[this.currentIndex] === undefined
        ? (this.selectedIndex = undefined)
        : (this.selectedIndex = this.doneItems[this.currentIndex].curans);
      console.log(this.doneItems);
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
      }
      this.submitd.dialog = true;
    },
    // 提交答案
    submitSureAs() {
      let score = this.doneItems.reduce((prev, cur, index, arr) => {
        return cur.ans === cur.curans ? ++prev : prev;
      }, 0);
      console.log(score);
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
    showIcon() {
      return this.showMore ? "mdi-chevron-up" : "mdi-chevron-down";
    },
    roundedBars() {
      return this.selectedIndex;
    },
    qsTypec() {
      return this.itemAs[0] && this.itemAs[0].题型;
    },
    curdoneItems() {
      return this.doneItems;
    },
  },
  watch: {
    qsTypec: {
      handler(val, oval) {
        if (val !== undefined && this.curQsType !== val) {
          this.curQsType = val;
          this.doneItems = [];
          this.doneData.hasDone = 0;
          this.selectedIndex = undefined;
          //console.log(this.curQsType);
          // 初始化数据
          this.currentIndex = 0;
          this.curPage = 1;
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
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