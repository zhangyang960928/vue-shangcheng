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
          <div class="center">最近浏览</div>
        </template>
      </child>
    </div>
    <!-- 列表 -->
    <div class="body displayF" v-for="(item,index) in list" :key="index">
      <div class="photo"><img :src="item.image_path" alt=""></div>
      <div class="word displayF flex-directionC justify-contentB">
        <div class="word1">{{item.name}}</div>
        <div class="word2 displayF align-itemsE">
          <div class="one">￥{{item.present_price}}</div>
          <div class="two">{{item.orl_price}}</div>
        </div>
        <div class="word3 displayF justify-contentE">
            <div class="word3One displayF justify-contentC align-itemsC" @click="cleanUp(item)"><van-icon name="cross" /></div>
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
      list: [],
    };
  },
  components: {},
  methods: {
    // 返回
    remove() {
      this.$router.back();
    },
    // 拿本地数据
    browseHistory() {
      this.list = this.$utils.getHistory({
        key: `${this.user.username}browse`,
      });
      // console.log(this.list);
    },
    // 清除
    cleanUp(item){
      this.list.splice(item,1)
      // console.log(this.list);
      localStorage.setItem(`${this.user.username}browseHistory`,JSON.stringify(this.list))
    }
  },
  mounted() {
    if(this.user){
       this.browseHistory();
    }
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
.head{
  border-bottom: 1px solid #eeeeee;
}
.body{
  padding: 10px 20px;
  border-bottom: 1px solid #eeeeee;
  .photo{
    border: 1px solid #eeeeee;
    img{
      width: 60px;
      height: 60px;
    }
  }
  .word{
    margin-left: 20px;
    width: 255px;
  }
  .one{
    font-size: 18px;
    color: red;
    font-weight: bold;
  }
  .two{
    font-size: 18px;
    text-decoration: line-through;
    margin-left: 10px;
  }
  .word3One{
    border: 1px solid black;
    border-radius: 50%;
  }
}
</style>