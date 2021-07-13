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
          <div class="center displayF align-itemsC">我的收藏</div>
        </template>
      </child>
    </div>
    <!-- 中间部分 -->
    <div class="body displayF" v-for="(item, index) in list" :key="index">
      <div class="photo" @click="jump(item)">
        <img :src="item.image_path" alt="" />
      </div>
      <div class="word" @click="jump(item)">
        <div class="namer">{{item.name}}</div>
        <div class="price">￥{{item.present_price}}</div>
      </div>
      <div class="but" @click="remove1(item,index)">
        <van-icon name="close" />
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
      list: "",
    };
  },
  components: {},
  methods: {
    // 点击返回
    remove() {
      this.$router.back();
    },
    // 请求数据
    getcollection(){
      this.$api
      .getCollection({ page: 1 })
      .then((res) => {
        if (res.code === 200) {
          // console.log(res);
          this.list = res.data.list;
          console.log(this.list);
        }
      })
      .catch((err) => {
        console.log("请求失败", err);
      });
    },
    // 删除
    remove1(item,index){
      this.$api.cancelCollection({
        id:item.cid
      }).then(res=>{
        this.$toast(res.msg);
        // this.list.splice(index,1)
        this.getcollection()
      }).catch(err=>{
        console.log('请求失败',err);
      })
    },
    // 跳转详情页
    jump(item){
      this.$router.push({
        path:'/details',
        query:{
          id:item.cid
        }
      })
    }
  },
  mounted() {
    this.getcollection()
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.head {
  border-bottom: 1px solid #eeeeee;
}
.left {
  width: 40px;
  height: 40px;
  font-size: 20px;
}
.center {
  height: 40px;
  font-size: 18px;
}
.body {
  padding: 10px;
  border-bottom: 1px solid #eeeeee;
}
.photo {
  width: 82px;
  height: 82px;
  border: 1px solid #eeeeee;
  img {
    width: 80px;
    height: 80px;
  }
}
.word{
  margin-left: 20px;
  .namer{
    width: 176px;
  }
  .price{
    margin-top: 20px;
    color: red;
  }
}
.but{
  font-size: 20px;
  margin: 55px 0 0 50px;
}
</style>