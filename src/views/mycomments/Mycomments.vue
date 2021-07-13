<template>
  <div>
    <!-- 头部 -->
    <child>
      <template #left>
        <div
          class="left displayF justify-contentC align-itemsC"
          @click="remove"
        >
          <van-icon name="arrow-left" />
        </div>
      </template>
      <template #center>
        <div class="center">评价中心</div>
      </template>
    </child>
    <!-- 图片 -->
    <div class="photo">
      <img src="../../assets/evaluate.jpg" alt="" />
    </div>
    <!-- 评价 -->
    <div class="mycomment">
      <van-tabs class="mycomment_potation" sticky>
        <van-tab title="待评价">
          <van-pull-refresh v-model="refreshing">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="evaluate">
                <div
                  class="evaluateWord displayF"
                  v-for="(item, index) in list"
                  :key="index"
                >
                  <img :src="item.image_path" alt="" />
                  <div
                    class="evaluateWord1 displayF flex-directionC justify-contentB"
                  >
                    <div class="top">{{ item.name }}</div>
                    <div
                      class="end displayF justify-contentC"
                      @click="comment(item)"
                    >
                      <van-icon name="chat" />
                      评论晒单
                    </div>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="已评价">
          <van-pull-refresh v-model="refreshing">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad1"
            >
              <div class="evaluate">
                <div
                  class="evaluateWord displayF"
                  v-for="(item1, index1) in list1"
                  :key="index1"
                >
                  <img :src="item1.goods[0].image_path" alt="" />
                  <div
                    class="evaluateWord1 displayF flex-directionC justify-contentB"
                  >
                    <div class="top">{{ item1.goods[0].name }}</div>
                    <div
                      class="end displayF justify-contentC"
                      @click="evaluated(item1)"
                    >
                      <van-icon name="chat" />
                      查看评价
                    </div>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      list1: [],
      page1: 1,
      num1: 0,
      page2: 1,
      num2: 0,
    };
  },
  components: {},
  methods: {
    // 返回
    remove() {
      this.$router.back();
    },
    // 跳转评价
    comment(item) {
      this.$router.push({
        path: "/comment",
        query: {
          id: JSON.stringify(item),
        },
      });
    },
    // 跳转已评价
    evaluated(item1) {
      this.$router.push({
        path: "/evaluated",
        query: {
          id1: JSON.stringify(item1),
        },
      });
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        this.loading = false;
        this.page1++
        this.getTobe()
        if (this.list.length >= this.num1) {
          this.finished = true;
        }
      }, 1000);
    },
    onLoad1() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list1 = [];
          this.refreshing = false;
        }
        this.loading = false;
        this.page2++
        this.getAlready()
        if (this.list1.length >= this.num2) {
          this.finished = true;
        }
      }, 1000);
    },
    getTobe() {
      // 请求数据 待评价
      this.$api
        .tobeEvaluated(this.page1)
        .then((res) => {
          this.list = this.list.concat(res.data.list);
          this.num1 = res.data.count;
          console.log(res.data);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    getAlready() {
      // 已评价
      this.$api
        .alreadyEvaluated(this.page2)
        .then((res) => {
          this.list1 = this.list1.concat(res.data.list);
          this.num2 = res.data.count;
          // console.log(this.list1);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
  },
  mounted() {
    this.getTobe();
    this.getAlready();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.left {
  width: 40px;
  height: 40px;
  color: blue;
  font-size: 20px;
}
.center {
  height: 40px;
  line-height: 40px;
  font-size: 20px;
}
.photo {
  width: 375px;
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
}
.van-tab__pane {
  padding-top: 50px;
}
.evaluate {
  padding: 10px 10px 5px 10px;
  .evaluateWord {
    border-bottom: 1px solid #eeeeee;
    img {
      width: 80px;
      height: 80px;
      margin-left: 50px;
    }
  }
  .evaluateWord1 {
    height: 70px;
    margin-left: 20px;
    .top {
      width: 176px;
    }
    .end {
      padding: 2px 0;
      color: red;
      border: 1px red solid;
      width: 100px;
      border-radius: 20px;
      margin-left: 100px;
    }
  }
}
</style>