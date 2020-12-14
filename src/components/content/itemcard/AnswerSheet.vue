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
            :class="n == 12 || n == 77 ? 'bgs' : ''"
            v-for="n in 100"
            :key="n"
            elevation="0"
            color="#fff"
            style="border: 1px solid grey; font-weight: normal; color: grey"
            >{{ n }}</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
    <!-- 答题选项卡片 -->
    <v-card outlined class="rounded-t-lg rounded-b-lg pa-3 mb-4">
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
            已完成 1 / 123
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
        <v-col class="d-flex">
          <v-chip
            style="color: #2f495e"
            color="#edf2f7"
            @click="personalIdeas"
            class="mr-4"
            v-ripple="{ class: 'white--text' }"
          >
            <v-icon small left color="#2F495E"> mdi-arrow-left </v-icon>
            上一题
          </v-chip>
          <v-chip
            style="color: #fff"
            color="#00e0a1"
            @click="personalIdeas"
            v-ripple="{ class: 'white--text' }"
          >
            <v-icon small left color="#fff"> mdi-arrow-right </v-icon>
            下一题
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
      <v-list nav dense>
        <v-list-item ripple @click="showMoreQs">
          <v-list-item-content>
            <span class="wrapmore body-1">
              1.Android操作系统手机，如何使用PC机给手机安装软件
            </span>
          </v-list-item-content>
          <v-icon>{{ showIcon }}</v-icon>
        </v-list-item>
      </v-list>
      <!-- 显示更多内容(对应上面) -->
      <v-expand-transition>
        <div v-if="showMore">
          <v-card-text class="px-4 py-1"
            >Android操作系统手机，如何使用PC机给手机安装软件</v-card-text
          >
          <v-divider class="mx-5"></v-divider>
        </div>
      </v-expand-transition>
      <!-- 答案选项卡 -->
      <v-card-text class="py-0">
        <div class="itemKey">
          <v-radio-group v-model="selectedIndex" class="mt-0 pt-0">
            <div
              class="d-inline-flex align-center"
              v-for="(item, index) in itemAs"
              :key="index"
            >
              <div
                :class="[roundedBars == index ? 'roundBarc' : 'roundBar']"
              ></div>
              <v-radio
                mandatory
                @click="selAns"
                class="my-4"
                :label="item.ans"
                :value="index"
              ></v-radio>
            </div>
          </v-radio-group>
        </div>
      </v-card-text>
      <!-- 查看正确答案 / 解析 / 提交个人解析 -->
      <v-expansion-panels v-if="showAns" flat popout>
        <v-expansion-panel>
          <v-expansion-panel-header expand-icon="mdi-eye"
            >查看答案:</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <div class="mb-4">
              <span class="rb">正确答案:<code>A</code></span>
            </div>
            <div class="mb-4">
              <span class="rb">解析:</span>
              <code class="mr-4"
                >12312323撒旦法撒旦法沙发撒旦法沙发士大夫撒旦法阿斯蒂芬撒旦法沙发上的发送到f安抚安抚阿萨德发送到符点数123123123123
                暂无解析~</code
              >
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
export default {
  name: "AnswerSheet",
  data() {
    return {
      // 定义题目跳转对象
      qsInputs: {
        qsValue: "",
        errStatus: false,
        errMsg: "",
      },
      //   控制时间进度条显示进度
      ansTime: {
        time: null,
        progressValue: 0,
        isStart: false,
      },

      showMore: false,
      itemAs: [{ option: "A", ans: "测试A选项正确答案" }],
      selectedIndex: 0, //默认选中项
      selectedItems: [],
    };
  },
  mounted() {
    // let ts = setInterval(() => {
    //   this.progressValue >= 100
    //     ? (clearInterval(ts), console.log("清除定时器 并执行交卷操作"))
    //     : (this.progressValue += 1);
    // }, 50);
  },
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
      console.log(index);
      this.$emit("update:dialog", false);
    },
    // 题目跳转
    gotoQs() {
      /**
       *  简单判断是不是数字
       *  console.log(!isNaN(parseInt(this.qsInputs.qsValue))); 这样写有bug
       *  parseInt会把非数字的舍去  如111a 结果是111 但是a111结果是NaN 小细节
       */
      !isNaN(Number(this.qsInputs.qsValue))
        ? ((this.qsInputs.errStatus = false),
          (this.qsInputs.errMsg = ""),
          (this.qsInputs.qsValue = "")) //跳转后清空输入框
        : ((this.qsInputs.errStatus = true),
          (this.qsInputs.errMsg = "只能是数字!"));
      //   console.log(!isNaN(Number(this.qsInputs.qsValue)));
    },
    // 开始答题
    startAs() {
      //防抖(多次点击)
      if (!this.isStart) {
        let time = 1;
        let sec = 60;
        this.isStart = true; //开始计时
        console.log("计时已经开始了 ");
        let ts = setInterval((_) => {
          time >= 0
            ? sec > 0
              ? sec--
              : --time >= 0
              ? (sec = 60)
              : (++time, clearInterval(ts))
            : clearInterval(ts);
          console.log(time < 10 ? "0" + time : time, +sec);
        }, 15);
      } else {
        console.log("计时已经开始了 无法重复点击");
      }
    },
    // 提交答案
    submitAs() {},
    showMoreQs() {
      this.showMores = !this.showMore;
    },
    selAns(index) {
      console.log(this.selectedIndex);
    },
    personalIdeas() {},
  },
  computed: {
    showHaveTime() {
      // 初始化值
      this.ansTime.time =
        this.ansTime.time === null ? this.times : this.ansTime.time;

      return "点击开始";
    },
    showIcon() {
      return this.showMore ? "mdi-chevron-up" : "mdi-chevron-down";
    },
    roundedBars() {
      return this.selectedIndex;
    },
  },
};
</script>
<style scoped>
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