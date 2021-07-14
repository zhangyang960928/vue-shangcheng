<template>
  <div>
    <div class="foot">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon
          icon="shopping-cart-o"
          text="购物车"
          @click="eject2"
          :badge="shopping"
        />
        <van-goods-action-button
          color="#ff8855"
          type="warning"
          text="加入购物车"
          @click="eject"
        />
        <van-goods-action-button
          color="#ff4444"
          type="danger"
          text="立即购买"
          @click="eject1"
        />
      </van-goods-action>
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
    <van-popup
      v-model="show1"
      closeable
      position="bottom"
      :style="{ height: '32%' }"
    >
      <div>
        <div class="eject1 displayF">
          <img :src="list.image" alt="" />
          <div class="eject1Word">
            <div class="wordname">{{ list.name }}</div>
            <div class="wordprice">
              ￥{{ Number(list.orl_price).toFixed(2) }}
            </div>
          </div>
        </div>
        <div class="body displayF">
          <div class="body1">
            <div class="body1word">购买数量：</div>
            <div class="body1word1 displayF">
              <div class="body1word2">剩余 {{ list.amount }} 件</div>
              <div class="body1word3">每人限购50件</div>
            </div>
          </div>
          <div class="body2">
            <van-stepper v-model="value" max="50" />
          </div>
        </div>
        <div
          class="body3 displayF justify-contentC align-itemsC"
          @click="checkLogin"
        >
          立即购买
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      show: false,
      show1: false,
      value: 1,
    };
  },
  components: {},
  methods: {
    eject() {
      if (this.user === null) {
        this.show = true;
      } else {
        this.$api
          .addShop({ id: this.list.id })
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
      }
    },
    eject2() {
      this.$router.push("/shopping");
    },
    eject1() {
      this.show1 = true;
    },
    confirm() {
      this.$router.push("/login");
    },
    // 立即购买
    nowBuy(){
      this.$set(this.list, 'count' , this.value);
      this.$set(this.list, 'mallPrice', this.list.orl_price);
      this.$set(this.list, 'cid', this.list.id);
      let list4=[]
      list4.push(this.list)
      localStorage.setItem('idDirect',1)
      localStorage.setItem("list4", JSON.stringify(list4));
      this.$router.push("/settlement");
    },
    checkLogin(){
      this.$utils.checkLogin({
        key:'user',
        next:this.nowBuy,
      })
    }
  },
  mounted() {
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    shopping() {
      if(localStorage.getItem('user')){
        if(this.$store.state.shopList <= 0){
          return ''
        }else{
          return this.$store.state.shopList;
        }
      }
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.foot {
  .van-goods-action {
    z-index: 999;
  }
}
.box {
  height: 80px;
  border-top: 1px solid #eeeeee;
}
.eject1 {
  margin: 10px 0 0 10px;
  height: 90px;
  border-bottom: 1px solid #eeeeee;
  img {
    width: 80px;
    height: 80px;
  }
}
.wordname {
  margin-top: 10px;
  margin-left: 5px;
}
.wordprice {
  margin-top: 5px;
  margin-left: 5px;
  color: red;
}
.body {
  height: 60px;
  border-bottom: 1px solid #eeeeee;
  .body1 {
    margin: 5px 0 0 10px;
  }
  .body1word2 {
    color: #c3bfa7;
  }
  .body1word3 {
    margin-left: 10px;
    color: red;
  }
}
.body2 {
  margin: 15px 0 0 30px;
}
.body3 {
  background: #ff4444;
  height: 54px;
  color: white;
  font-size: 20px;
}
</style>