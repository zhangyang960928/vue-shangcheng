<template>
  <div>
    <!-- 头部 -->
    <child>
      <template #left>
        <div
          class="left displayF justify-contentC align-itemsC"
          @click="goBack"
        >
          <van-icon name="arrow-left" />
        </div>
      </template>
      <template #center>
        <div class="center displayF justify-contentC align-itemsC">
          订单结算
        </div>
      </template>
    </child>
    <!-- 地址栏 -->
    <div v-if="list">
      <div class="location">
        <div class="one displayF align-itemsE">
          <div class="oneWord">收货人:{{ list.name }}</div>
          <div class="oneWord1">{{ list.tel }}</div>
        </div>
        <div class="two displayF align-itemsE">
          <div class="twoWord">
            <van-icon name="location-o" class="icon" />
          </div>
          <div class="twoWord1">收货地址:{{ list.address }}</div>
          <div class="twoWord2 displayF align-itemsE" @click="jump">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="three">(收货不便时,可选择免费待收货服务)</div>
      </div>
    </div>
    <div v-else>
      <div
        class="location1 displayF justify-contentC align-itemsC"
        @click="jump"
      >
        点击添加收货地址
      </div>
    </div>
    <!-- 图片 -->
    <div class="photo">
      <img src="../../assets/caitiao.jpg" alt="" />
    </div>
    <!-- 详情 -->
    <div class="record">
      <div
        class="recordWord displayF align-itemsC"
        v-for="(item, index) in arr"
        :key="index"
      >
        <van-card
          class="recordImg"
          :num="item.count"
          :price="item.mallPrice.toFixed(2)"
          :desc="item.name"
          :thumb="item.image_path"
        />
      </div>
    </div>
    <!-- 底部 -->
    <div class="foot">
      <van-submit-bar :price="sum" button-text="提交订单" @submit="onSubmit" />
    </div>
  </div>
</template>

<script>
import Child from "../../components/child/Child.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      arr: [],
      arr1: "",
      list: "",
      idDirect: "",
    };
  },
  components: { Child },
  methods: {
    // 返回
    goBack() {
      this.$router.push("/shopping");
    },
    // 提交订单
    onSubmit() {
      let cid = [];
      cid = this.arr.map((item) => {
        return item.cid;
      });
      this.$api
        .placeOrder({
          address: this.list.address,
          tel: this.list.tel,
          orderId: cid,
          totalPrice: this.sum/100,
          idDirect: this.idDirect===0?false:true,
          count: this.arr[0].count,
        })
        .then((res) => {
          console.log(res);
          this.$router.push("/");
          this.$toast(res.msg);
          localStorage.removeItem('list4')
          this.$api
            .getCard()
            .then((res) => {
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
    },
    // 跳转详情地址
    jump() {
      this.$router.push("/allsite");
       localStorage.setItem('allSite',0)
    },
    // 获取地址
    getLocation() {
      if (localStorage.getItem("location") !== null) {
        this.list = JSON.parse(localStorage.getItem("location"));
      } else {
        this.$api
          .getDefaultAddress()
          .then((res) => {
            // console.log(res);
            this.list = res.defaultAdd;
            // console.log(this.list);
          })
          .catch((err) => {
            console.log("请求失败", err);
          });
      }
      localStorage.removeItem("location");
    },
  },
  mounted() {
    this.arr1 = localStorage.getItem("list4");
    this.idDirect = Number(localStorage.getItem("idDirect"));
    this.arr = JSON.parse(this.arr1);
    console.log(this.arr);
    this.getLocation();
  },
  computed: {
    // 计算总价
    sum() {
      let num = 0;
      this.arr.map((item) => {
        num += item.mallPrice * item.count;
      });
      return num * 100;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.left {
  width: 40px;
  height: 40px;
  font-size: 20px;
}
.center {
  width: 80px;
  height: 40px;
  font-size: 20px;
}
.location1 {
  height: 107px;
}
.location {
  border-top: 1px solid #eeeeee;
  height: 107px;
  .one {
    margin-top: 10px;
    font-size: 20px;
    .oneWord {
      margin-left: 40px;
      width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .oneWord1 {
      width: 110px;
      margin-left: 50px;
    }
  }
  .two {
    .icon {
      font-size: 30px;
      margin: 10px 10px 0 10px;
    }
    .twoWord1 {
      width: 280px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .twoWord2 {
      font-size: 20px;
    }
  }
  .three {
    color: #f9cda0;
    margin: 5px 0 0 50px;
  }
}
.photo {
  width: 100%;
  img {
    width: 100%;
    height: 3px;
  }
}
.recordWord {
  .recordImg {
    width: 100%;
    background: white;
    border-bottom: 1px solid #eeeeee;
    .van-card__desc {
      font-size: 16px;
      margin-top: 10px;
      color: red;
    }
    .van-card__price {
      font-size: 16px;
      color: red;
      margin-bottom: 10px;
    }
    .van-card__num {
      font-size: 16px;
      color: red;
      margin-bottom: 10px;
    }
  }
}
</style>