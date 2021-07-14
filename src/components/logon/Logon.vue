<template>
  <div>
    <div v-if="list.length === 0">
      <div class="logon">
        <child>
          <template #center>
            <div class="center2 displayF justify-contentC align-itemsC">
              购物车
            </div>
          </template>
        </child>
        <div class="cargo displayF flex-directionC align-itemsC">
          <div class="cargo1">暂无商品...</div>
          <div>
            <van-button type="warning" @click="goshopping">点击购物</van-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- 有商品 -->
      <div>
        <!-- 头部 -->
        <child>
          <template #center>
            <div class="top displayF justify-contentC align-itemsC">购物车</div>
          </template>
        </child>
        <!-- 第二层 -->
        <div class="center displayF justify-contentB align-itemsC">
          <div class="centerOne displayF align-itemsC">
            <input
              type="checkbox"
              v-model="checked"
              @change="change"
            />&nbsp;全选
          </div>
          <div class="centerTwo">
            <div class="one"><span>合计：</span>￥{{ num }}</div>
            <div class="two">请确认订单</div>
          </div>
        </div>
        <!-- 第三层 -->
        <div class="center1 displayF justify-contentE align-itemsC">
          <div v-if="flag">
            <van-button color="#e6057f" class="but1" @click="cut"
              >删除</van-button
            >
            <van-button color="#e6057f" class="but2" @click="settl"
              >去结算</van-button
            >
          </div>
        </div>
        <!-- 第四层 -->
        <div class="foot">
          <div
            class="footWord displayF align-itemsC"
            v-for="(item, index) in list"
            :key="index"
          >
            <input type="checkbox" v-model="item.check" @change="change1" />
            <div class="photo"><img :src="item.image_path" alt="" /></div>
            <div class="word">
              <div class="word1">{{ item.name }}</div>
              <div class="word2 displayF align-itemsC justify-contentB">
                <div class="pice">￥ {{ item.mallPrice.toFixed(2) }}</div>
                <van-stepper
                  v-model="item.count"
                  theme="round"
                  button-size="20px"
                  @change="remove(item.count, item.cid, item.mallPrice)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Child from "../child/Child.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      checked: false,
      flag: false,
    };
  },
  components: { Child },
  methods: {
    // 跳转首页
    goshopping() {
      this.$router.push("/");
    },
    // 全选
    change() {
      this.list.map((item) => {
        return (item.check = this.checked);
      });
    },
    // 反选
    change1() {
      this.checked = this.list.every((item) => {
        return item.check === true;
      });
    },
    // 删除
    cut() {
      let list2 = [];
      list2 = this.list.filter((item) => {
        return item.check === true;
      });
      let list3 = list2.map((item) => {
        return item.cid;
      });
      console.log(list3);
      this.$dialog.confirm({
        title: "删除商品",
        message: "您确定删除商品吗",
      })
        .then(() => {
          this.$api
            .deleteShop(list3)
            .then((res) => {
              // console.log(res);
              this.$toast("删除成功");
              this.$api
                .getCard()
                .then((res) => {
                  console.log(res);
                  this.list = res.shopList;
                  localStorage.setItem("shopList", res.shopList.length);
                  this.$store.commit("changeshopping", res.shopList.length);
                })
                .catch((err) => {
                  console.log("请求失败", err);
                });
            })
            .catch((err) => {
              console.log("请求失败", err);
            });
        })
        .catch(() => {});
    },
    // 加减
    remove(count, cid, mallPrice) {
      this.$api
        .editCart({
          count: count,
          id: cid,
          mallPrice: mallPrice,
        })
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    // 跳转结算
    settl() {
      let list4 = [];
      list4 = this.list.filter((item) => {
        return item.check === true;
      });
      // console.log(list4);
      localStorage.setItem("idDirect", 0);
      localStorage.setItem("list4", JSON.stringify(list4));
      this.$router.push("/settlement");
    },
  },
  mounted() {
    this.$api
      .getCard()
      .then((res) => {
        console.log(res);
        this.list = res.shopList;
        // localStorage.setItem("shopList", res.shopList.length);
        // this.$store.commit("changeshopping", res.shopList.length);
      })
      .catch((err) => {
        console.log("请求失败", err);
      });
  },
  computed: {
    num() {
      let list1 = [];
      let sum = 0;
      list1 = this.list.filter((item) => {
        return item.check === true;
      });
      if (list1.length !== 0) {
        this.flag = true;
      } else {
        this.flag = false;
      }
      list1.map((item) => {
        sum += item.mallPrice * item.count;
      });
      return sum.toFixed(2);
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.center2 {
  height: 40px;
  font-size: 18px;
}
.cargo {
  width: 100%;
  border-top: 1px solid #eeeeee;
}
.cargo1 {
  font-size: 20px;
  margin-top: 50px;
  margin-bottom: 30px;
}
.top {
  height: 40px;
  font-size: 20px;
}
.center {
  height: 80px;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.centerOne {
  margin-left: 20px;
  input {
    width: 20px;
    height: 20px;
  }
}
.centerTwo {
  margin-right: 20px;
  .one {
    width: 150px;
    color: red;
    margin-bottom: 2px;
    span {
      color: black !important;
    }
  }
}
.center1 {
  height: 60px;
  .but2 {
    margin: 0 20px 0 10px;
  }
}
.footWord {
  height: 80px;
  padding: 0 0 0 20px;
  border-bottom: 1px solid #eeeeee;
  input {
    width: 20px;
    height: 20px;
  }
  .photo {
    margin-left: 20px;
    border: 1px solid #eeeeee;
    img {
      width: 60px;
      height: 60px;
    }
  }
  .word {
    margin-left: 20px;
    .word1 {
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #e9706b;
    }
    .word2 {
      color: #e9706b;
      margin-top: 10px;
    }
  }
}
</style>