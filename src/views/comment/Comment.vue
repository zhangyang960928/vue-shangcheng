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
    <div class="photo displayF align-itemsC">
      <img :src="list.image_path" alt="" />
      <div class="word displayF flex-directionC">
        商品评分
        <van-rate v-model="value" class="word1" />
      </div>
    </div>
    <!-- 评价 -->
    <div class="comment">
      <van-field
        class="comment1"
        v-model="word"
        placeholder="说说你的购买感受吧~~"
      />
    </div>
    <!-- 评分 -->
    <div class="anonymous">
      <input type="checkbox" v-model="radio"> 匿名评价
    </div>
    <!-- 提交 -->
    <van-button type="primary" @click="submit">提交</van-button>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      list: {},
      value: 0,
      word: "",
      radio: false,
    };
  },
  components: {},
  methods: {
    // 返回
    remove() {
      this.$router.back();
    },
    // 点击提交
    submit() {
      // console.log(this.value);
      this.$api.comment({
        id:this.list.cid,
        rate:this.value,
        content:this.word,
        anonymous:this.radio,
        _id:this.list._id,
        order_id:this.list.order_id,
      }).then(res=>{
        if(res.code===200){
           this.$toast(res.msg);
           this.$router.push('/mycomments')
        }
      }).catch(err=>{
        console.log('请求失败',err);
      })
    },
  },
  mounted() {
    this.list = JSON.parse(this.$route.query.id);
    console.log(this.list);
  },
  computed: {},
  watch: {
    // radio(val,oldVal){
    //   console.log(val);
    //   console.log(oldVal);
    // }
  },
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
  border-top: 1px solid #eeeeee;
  padding: 10px 20px 0 30px;
  img {
    width: 80px;
    height: 80px;
  }
}
.word {
  font-size: 20px;
  margin-left: 30px;
  .word1 {
    margin-top: 10px;
  }
}
.comment1 {
  background: #f7f7f7;
  height: 200px;
}
.anonymous {
  margin: 10px 0 0 10px;
  input{
    width: 15px;
    height: 15px;
  }
}
.van-button--normal {
  width: 335px;
  margin: 50px 20px;
  font-size: 20px;
}
</style>