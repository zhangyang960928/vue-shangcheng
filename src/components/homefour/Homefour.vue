<template>
  <div class="homefour">
    <div class="head">商品推荐</div>
    <div class="body" ref="body">
      <div class="bodybox1 displayF" ref="wrapper">
        <div
          class="bodybox"
          ref="cont"
          v-for="(item, index) in list2"
          :key="index"
        >
          <img :src="item.image" alt="" @click="jump(item)" />
          <div class="word" @click="jump(item)">{{ item.goodsName }}</div>
          <div class="pice displayF align-itemsE" @click="jump(item)">
            <div class="pice1">￥{{ item.mallPrice }}</div>
            <div class="pice2">￥{{ item.price }}</div>
          </div>
          <div class="icon displayF">
            <div
              class="icon1 displayF justify-contentC align-itemsC"
              @click="add(item)"
            >
              <van-icon name="cart" />
            </div>
            <div
              class="icon2 displayF justify-contentC align-itemsC"
              @click="jump(item)"
            >
              查看详情
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-dialog
      v-model="show"
      title="提示"
      show-cancel-button
      @confirm="confirm"
    >
      <div class="box displayF justify-contentC align-itemsC">
        未登录,是否跳转登录页面
      </div>
    </van-dialog>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "",
  props: {
    list2: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      scroll: null,
      show: false,
    };
  },
  components: {},
  methods: {
    verScroll() {
      let width = this.list2.length * 136; // 动态计算出滚动区域的大小，前面已经说过了，产生滚动的原因是滚动区域宽度大于父盒子宽度
      this.$refs.wrapper.style.width = width + "px"; // 修改滚动区域的宽度
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.body, {
            startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical",
          });
        } else {
          this.scroll.refresh(); //如果dom结构发生改变调用该方法
        }
      });
    },
    jump(item) {
      this.$router.push({
        path: "/details",
        query: {
          id: item.goodsId,
        },
      });
    },
    add(item) {
      if (this.user === null) {
        this.show = true;
      } else {
        this.$api
          .addShop({ id: item.goodsId })
          .then((res) => {
            console.log(res);
            if (res.code === 200) {
              this.$toast("成功加入购物车");
              this.$api
                .getCard()
                .then((res) => {
                  console.log(res);
                  localStorage.setItem("shopList", res.shopList.length);
                  this.$store.commit("changeshopping", res.shopList.length);
                })
                .catch((err) => {
                  console.log("请求失败", err);
                });
            }
          })
          .catch((err) => {
            console.log("请求失败", err);
          });
      }
    },
    confirm() {
      this.$router.push("/login");
    },
  },
  mounted() {
    this.$nextTick(() => {
      let timer = setTimeout(() => {
        // 其实我也不想写这个定时器的，这相当于又嵌套了一层$nextTick，但是不这么写会失败
        if (timer) {
          clearTimeout(timer);
          this.verScroll();
        }
      }, 0);
    });
    // console.log(this.list2);
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    shopping() {
      return this.$store.state.shopList;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.homefour {
  width: 98%;
  height: 210px;
  background: white;
  margin-left: 1%;
  .head {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #eeeeee;
    padding: 7px 0 0 10px;
  }
  .body {
    width: 100%;
    height: 175px;
    .bodybox1 {
      width: 100%;
      height: 100%;
    }
    .bodybox {
      width: 123px;
      height: 100%;
      border: 1px solid #eeeeee;
      img {
        width: 115px;
        height: 100px;
      }
      .word {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-left: 5px;
      }
      .pice1 {
        margin-left: 8px;
      }
      .pice2 {
        font-size: 13px;
        color: #969696;
        margin-left: 2px;
        text-decoration: line-through;
      }
    }
    .icon {
      width: 100px;
      height: 25px;
      border-radius: 4px;
      overflow: hidden;
      margin-left: 10px;
    }
    .icon1 {
      width: 30px;
      height: 100%;
      background: #feca3a;
      color: white;
    }
    .icon2 {
      width: 70px;
      height: 100%;
      background: #ff4c38;
      color: white;
    }
  }
}
.box {
  height: 80px;
  border-top: 1px solid #eeeeee;
}
</style>