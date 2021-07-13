<template>
  <div>
    <div class="collect displayF justify-contentB align-itemsC">
      <div class="left">运费：0</div>
      <div class="center">剩余：{{ list.amount }}</div>
      <div v-if="flag">
        <div class="right displayF justify-contentE">
          收藏：
          <div class="aixin" @click="eject"><van-icon name="like" /></div>
        </div>
      </div>
      <div v-else>
        <div class="right displayF justify-contentE">
          取消收藏：
          <div class="aixin" @click="eject1" style="color: red">
            <van-icon name="like" />
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
      flag: true,
      show: false,
    };
  },
  components: {},
  methods: {
    // 收藏
    eject() {
      if (this.user === null) {
        this.show = true;
      } else {
        this.$api
          .collection(this.list)
          .then((res) => {
            console.log(res);
            if (res.code === 200) {
              this.$toast("收藏成功");
              this.flag = false;
            }
          })
          .catch((err) => {
            console.log("请求失败", err);
          });
      }
    },
    // 取消收藏
    eject1() {
      this.$api
        .cancelCollection({ id: this.list.id })
        .then((res) => {
          // console.log(res);
          if (res.code === 200) {
            this.$toast("取消收藏成功");
            this.flag = true;
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    confirm() {
      this.$router.push("/login");
    },
  },
  mounted() {
    // 进页面判断是否收藏
    this.$api
      .isCollection({ id: this.list.id })
      .then((res) => {
        // console.log(res);
        if (res.isCollection === 1) {
          this.flag = false;
        } else {
          this.flag = true;
        }
      })
      .catch((err) => {
        console.log("请求失败", err);
      });
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.collect {
  width: 100%;
  height: 35px;
  padding: 0 20px;
  border-bottom: 1px solid #eeeeee;
  color: #b0aab3;
}
.aixin {
  margin-top: 2px;
}
.box {
  height: 80px;
  border-top: 1px solid #eeeeee;
}
.right {
  width: 100px;
}
</style>