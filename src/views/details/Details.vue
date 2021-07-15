<template>
  <div>
    <!-- 头部返回 -->
    <child class="head">
      <template #left>
        <div @click="jump"><van-icon name="arrow-left" /></div>
      </template>
    </child>
    <!-- 图片 -->
    <div class="detailsOne">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img :src="list.image" alt="" @click="show1" />
        </van-swipe-item>
        <van-swipe-item>
          <img :src="list.image" alt="" @click="show1" />
        </van-swipe-item>
      </van-swipe>
      <van-image-preview v-model="show" :images="images" @change="onChange">
        <template v-slot:index>第{{ index + 1 }}页</template>
      </van-image-preview>
    </div>
    <!-- 介绍 -->
    <div class="detailsTwo">
      <div class="one">{{ list.name }}</div>
      <div class="two">￥{{ list.present_price }}</div>
    </div>
    <!-- 收藏 -->
    <detailsCollect
      v-if="Object.keys(list).length !== 0"
      :list="list"
    ></detailsCollect>
    <!-- 商店 -->
    <div class="shopping displayF align-itemsC justify-contentB">
      <div class="left displayF align-itemsC">
        <van-icon name="shop-o" />
        有赞的店
        <div class="guanfang displayF justify-contentC align-itemsC">官方</div>
      </div>
      <div class="right displayF align-itemsC">
        进去店铺
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 评论 -->
    <detailsComment
      v-if="Object.keys(list).length !== 0"
      :list="list"
    ></detailsComment>
    <!-- 底部 -->
    <detailsFoot
      v-if="Object.keys(list).length !== 0"
      :list="list"
    ></detailsFoot>
    <div style="height: 50px"></div>
  </div>
</template>

<script>
import Child from "../../components/child/Child.vue";
import DetailsCollect from "../../components/detailsCollect/DetailsCollect";
import DetailsComment from "../../components/detailsComment/DetailsComment";
import DetailsFoot from "../../components/detailsFoot/DetailsFoot";
export default {
  name: "",
  props: {},
  data() {
    return {
      id: "",
      list: {},
      show: false,
      index: 0,
      images: [],
    };
  },
  components: { Child, DetailsCollect, DetailsComment, DetailsFoot },
  methods: {
    jump() {
      this.$router.back();
    },
    show1() {
      this.show = true;
    },
    onChange(index) {
      this.index = index;
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    // console.log(this.id);
    this.$api
      .goodOne({
        id: this.id,
      })
      .then((res) => {
        // console.log(res);
        this.list = res.goods.goodsOne;
        if (!res.goods.goodsOne) {
          this.$router.push("/");
          this.$toast("产品已下架");
        } else {
          if (this.user) {
            this.$utils.saveHistory({
              key: `${this.user.username}browse`,
              data: this.list,
              attr: "id",
            });
          }
          this.images.push(this.list.image);
          // console.log(this.list);
        }
      })
      .catch((err) => {
        console.log("请求失败", err);
      });
  },
  computed: {
    user() {
      return JSON.parse(this.$store.state.user);
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.head {
  margin: 10px 0 0 10px;
}
.van-icon {
  width: 38px;
  height: 38px;
  font-size: 20px;
  color: white;
  background: #7f7f7f;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.my-swipe {
  border-bottom: 1px solid #eeeeee;
  img {
    width: 100%;
    height: 355px;
  }
}
.detailsTwo {
  width: 100%;
  height: 65px;
  padding: 10px 0 0 10px;
  border-bottom: 1px solid #eeeeee;
  .one {
    font-size: 18px;
  }
  .two {
    color: red;
  }
}
.shopping {
  width: 100%;
  height: 43px;
  padding: 0 20px;
  margin-top: 15px;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  .guanfang {
    width: 40px;
    height: 20px;
    background: red;
    color: white;
    border-radius: 3px;
    margin-left: 5px;
  }
  .van-icon {
    width: 20px;
    height: 20px;
    background: white;
    color: #c7c7c7;
    margin-right: 5px;
  }
}
</style>