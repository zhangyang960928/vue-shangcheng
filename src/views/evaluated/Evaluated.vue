<template>
  <div>
    <!-- 头部 -->
    <div class="head">
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
          <div class="center">评价详情</div>
        </template>
      </child>
    </div>
    <!-- 中间 -->
    <div v-if="list">
      <div class="body">
        <div class="one displayF align-itemsC">
          <div class="photo">
            <img :src="user.avatar" alt="" />
          </div>
          <div class="namer">
            <div v-if="list.anonymous===false"><div class="namerOne">{{ user.nickname }}</div></div>
            <div v-else><div class="namerOne">匿名人士</div></div>
            <div><van-rate v-model="list.rate" readonly /></div>
          </div>
          <div>{{ list.comment_time }}</div>
        </div>
        <div class="two">评价内容：{{ list.content }}</div>
      </div>
      <!-- 下面 -->
      <div class="foot displayF flex-directionC justify-contentB">
        <div class="footOne displayF">
          <div class="footimg" @click="jump">
            <img :src="list.goods[0].image_path" alt="" />
          </div>
          <div class="footWord" @click="jump">
            {{ list.goods[0].name }}
          </div>
          <div
            class="footShop displayF justify-contentC align-itemsC"
            @click="shop"
          >
            <van-icon name="shopping-cart-o" />
          </div>
        </div>
        <div class="but" @click="remove">
          <van-button type="primary">返回</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      list: null,
    };
  },
  components: {},
  methods: {
    // 返回
    remove() {
      this.$router.back();
    },
    // 跳转详情
    jump() {
      this.$router.push({
        path: "/details",
        query: {
          id: this.list.cid,
        },
      });
    },
    // 购买
    shop() {
      this.$api
        .addShop({ id: this.list.cid })
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.$toast("成功加入购物车");
            this.$api
              .getCard()
              .then((res) => {
                // console.log(res);
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
    },
  },
  mounted() {
    this.list = JSON.parse(this.$route.query.id1);
    console.log(this.list);
    console.log(this.user);
  },
  computed: {
    user() {
      return JSON.parse(this.$store.state.user);
    },
    shopping() {
      return this.$store.state.shopList;
    },
  },
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
.head {
  border-bottom: 1px solid #eeeeee;
}
.photo {
  border: 1px solid #eeeeee;
  border-radius: 50%;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}
.namer {
  margin: 0 20px 0 10px;
  .namerOne {
    margin-bottom: 5px;
  }
}
.body {
  padding: 10px;
  .two {
    border-bottom: 1px solid #eeeeee;
    padding: 10px 0;
  }
}
.foot {
  height: 400px;
}
.but {
  margin-left: 20px;
  .van-button--normal {
    width: 335px;
  }
}
.footOne {
  padding: 0 10px;
  img {
    width: 80px;
    height: 80px;
  }
  .footWord {
    font-size: 18px;
    width: 190px;
    margin: 10px 0 0 10px;
  }
}
.footShop {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ffe6e2;
  font-size: 30px;
  color: red;
  margin: 10px;
}
</style>