<template>
  <div>
    <div class="hometwo displayF justify-contentC">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in list" :key='index' @click='jump(item)'>
          <img :src="item.image" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      id:'',
    };
  },
  components: {},
  methods: {
    jump(item){
      this.$router.push({
        path:'/details',
        query:{
          id:item.goodsId,
        }
      })
    }
  },
  mounted() {
    // console.log(this.list);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.my-swipe {
  height: 200px;
  width: 98%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>