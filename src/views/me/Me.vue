<template>
  <div>
    <!-- 头部 -->
    <child>
      <template #center>
        <div class="center displayF align-itemsC">会员中心</div>
      </template>
    </child>
    <!-- 登录栏 -->
    <div class="portrait">
      <div
        class="first displayF justify-contentE"
        @click="checkLogin('/profile')"
      >
        <van-icon name="setting-o" />
      </div>
      <div v-if="user">
        <div
          class="second displayF flex-directionC justify-contentC align-itemsC"
        >
          <div class="secondword">
            <img :src="user.avatar" alt="" />
          </div>
          <div class="secondword1">欢迎您：{{ user.nickname }}</div>
          <div class="secondword2" @click="signout">退出登录</div>
        </div>
      </div>
      <div v-else>
        <div
          class="second displayF flex-directionC justify-contentC align-itemsC"
        >
          <div class="secondword"></div>
          <div class="secondword2" @click="go('/login')">登录/注册</div>
        </div>
      </div>
    </div>
    <!-- 分类 -->
    <div class="sort displayF align-itemsC">
      <div
        class="sortOne displayF flex-directionC justify-contentC align-itemsC"
        @click="checkLogin('/completed', 1)"
      >
        <van-icon name="balance-pay" class="photo" />
        <div class="word">待付款</div>
      </div>
      <div
        class="sortOne displayF flex-directionC justify-contentC align-itemsC"
        @click="checkLogin('/completed', 2)"
      >
        <van-icon name="free-postage" class="photo" />
        <div class="word">待发货</div>
      </div>
      <div
        class="sortOne displayF flex-directionC justify-contentC align-itemsC"
        @click="checkLogin('/completed', 3)"
      >
        <van-icon name="points" class="photo" />
        <div class="word">待收货</div>
      </div>
      <div
        class="sortOne displayF flex-directionC justify-contentC align-itemsC"
        @click="checkLogin('/mycomments')"
      >
        <van-icon name="good-job-o" class="photo" />
        <div class="word">评价</div>
      </div>
      <div
        class="sortOne displayF flex-directionC justify-contentC align-itemsC"
        @click="checkLogin('/completed', 4)"
      >
        <van-icon name="like-o" class="photo" />
        <div class="word">已完成</div>
      </div>
    </div>
    <!-- 全部订单 -->
    <div
      class="allorders displayF align-itemsC"
      @click="checkLogin('/completed', 0)"
    >
      <van-icon name="records" class="photo1" />
      全部订单
      <van-icon name="arrow" class="photo2" />
    </div>
    <!-- 功能 -->
    <div class="functions">
      <div
        class="funOne displayF align-itemsC"
        @click="checkLogin('/collection')"
      >
        <van-icon name="star-o" class="photo1" />
        收藏商品
        <van-icon name="arrow" class="photo3" />
      </div>
      <div
        class="funOne displayF align-itemsC"
        style="border-top: 1px solid #eeeeee; border-bottom: 1px solid #eeeeee"
        @click="checkLogin('/allsite')"
      >
        <van-icon name="location-o" class="photo1" />
        地址管理
        <van-icon name="arrow" class="photo3" />
      </div>
      <div class="funOne displayF align-itemsC" @click="checkLogin('/browse')">
        <van-icon name="eye-o" class="photo1" />
        最近浏览
        <van-icon name="arrow" class="photo3" />
      </div>
      <div class="funOne displayF align-itemsC" @click="clearCache">
        <van-icon name="delete-o" class="photo1" />
        清除缓存
        <van-icon name="arrow" class="photo3" />
      </div>
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
      activeIndex: 0,
    };
  },
  components: { Child },
  methods: {
    // 点击退出
    signout() {
      this.$api
        .loginOut()
        .then((res) => {
          if (res.code === 0) {
            this.$toast("退出成功");
            localStorage.removeItem("user");
            this.$store.commit("changeUser", null);
            this.$router.push("/login");
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    go(url) {
      if (url === "/allsite") {
        localStorage.setItem("allSite", 1);
        this.$router.push(url);
      } else if (url === "/completed") {
        this.$router.push({
          path: "/completed",
          query: {
            index: this.activeIndex,
          },
        });
      } else {
        this.$router.push(url);
      }
    },
    checkLogin(item, index) {
      this.activeIndex = index;
      this.$utils.checkLogin({
        key: "user",
        next: this.go,
        item: item,
      });
    },
    // 清除缓存
    clearCache() {
      this.$dialog
        .confirm({
          title: "清除缓存",
          message: "您确定搜索历史和浏览历史吗",
        })
        .then(() => {
          localStorage.removeItem(`${this.user.username}searchHistory`)
          localStorage.removeItem(`${this.user.username}browseHistory`)
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  mounted() {},
  computed: {
    user() {
      return JSON.parse(this.$store.state.user);
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.center {
  height: 40px;
  font-size: 20px;
}
.portrait {
  height: 200px;
  background: #e30c7b;
}
.first {
  font-size: 25px;
  color: white;
  padding: 10px 10px 0 0;
}
.secondword {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: white;
  overflow: hidden;
  img {
    width: 70px;
    height: 70px;
  }
}
.secondword1 {
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
}
.secondword2 {
  color: white;
  margin-top: 10px;
}
.sort {
  height: 100px;
}
.sortOne {
  margin: 0px 9px;
}
.photo {
  font-size: 30px;
}
.word {
  font-size: 20px;
  margin-top: 5px;
}
.allorders {
  height: 50px;
  font-size: 18px;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.photo1 {
  margin: 0 5px 0 10px;
}
.photo2 {
  margin-left: 230px;
}
.functions {
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  height: 150px;
  margin-top: 20px;
}
.funOne {
  height: 50px;
  margin-left: 20px;
  font-size: 18px;
}
.photo3 {
  margin-left: 210px;
}
</style>