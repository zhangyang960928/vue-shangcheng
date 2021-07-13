<template>
  <div>
    <router-view></router-view>
    <van-tabbar active-color="#ee0a24" inactive-color="#000" class="foot" route>
      <van-tabbar-item icon="wap-home" to="/">商品</van-tabbar-item>
      <van-tabbar-item icon="wap-nav" to="/sort">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart" to="/shopping" :badge="shopping"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="manager" to="/me">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {
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
  height: 40px;
}
</style>