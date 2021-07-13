<template>
  <div>
    <!-- 头部 -->
    <child>
      <template #left>
        <div class="left displayF justify-contentC align-itemsC" @click="remove">
          <van-icon name="arrow-left" />
        </div>
      </template>
      <template #center>
        <div class="center displayF align-itemsC">
          我的订单
        </div>
      </template>
    </child>
    <!-- 详情 -->
    <div class="body">
      <div class="word" v-for="(item,index) in list" :key='index'>
        <!-- 订单编号 -->
        <div class="word1 displayF justify-contentB">
          <div class="word1One">订单编号：{{item.order_id}}</div>
          <div class="word1Two">交易完成</div>
        </div>
        <!-- 订单详情 -->
        <div class="word2" v-for="(item1,index1) in item.order_list" :key='index1'>
          <div class="word2One displayF" @click="jump(item1)">
            <div class="photo"><img :src="item1.image_path" alt=""></div>
            <div class="title displayF">
              <div class="title1">{{item1.name}}</div>
              <div class="title2 displayF flex-directionC align-itemsE ">
                <div class="title2One">￥{{Number(item1.mallPrice).toFixed(1)}}</div>
                <div class="title2Two">x{{item1.count}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 底部 -->
        <div class="word3 displayF flex-directionC align-itemsE">
            <div>创建时间：{{item.add_time}}</div>
            <div>收货地址：{{item.address}}</div>
            <div>共：{{item.order_list.length}}件商品 合计：{{Number(item.mallPrice).toFixed(2)}}</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props:{},
  data () {
    return {
      list:[],
    }
  },
  components: {},
  methods: {
    // 点击返回
    remove(){
      this.$router.back()
    },
    // 跳转详情页
    jump(item1){
      this.$router.push({
        path:'/details',
        query:{
          id:item1.cid
        }
      })
    }
  },
  mounted() {
    // 获取所有订单
    this.$api.getMyOrder().then(res=>{
      console.log(res.list);
      this.list=res.list
    }).catch(err=>{
      console.log('请求失败',err);
    })
  },
  computed: {
  },
  watch: {}
}
</script>

<style lang='scss' scoped>
.left {
  width: 40px;
  height: 40px;
  font-size: 20px;
}
.center{
  height: 40px;
  font-size: 18px;
}
.body {
  background: #f2f2f2;
  padding: 10px;
}
.word {
  background: white;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 10px;
}
.word1{
  padding-bottom: 10px;
  border-bottom: 1px solid #eeeeee;
}
.word1Two {
  color: #d25b1d;
}
.word2One{
  margin: 10px 0;
}
.photo {
  border: 1px solid #eeeeee;
  border-radius: 5px;
  img{
    width: 80px;
    height: 80px;
  }
}
.title1{
  width: 180px;
  margin-left: 10px;
}
.title2 {
  width: 60px;
}
.title2Two {
  color: #c7c7c7;
}
</style>