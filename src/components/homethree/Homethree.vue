<template>
  <div>
    <div class="homethree displayF justify-contentC align-itemsC">
      <div v-for="(item,index) in list1" :key='index' class="photo displayF flex-directionC justify-contentC align-itemsC" @click="jump(index)">
        <img :src="item.image" alt="">
        <div class="word">{{item.mallCategoryName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props:{
    list1:{
      type:Array,
      required:true,
    }
  },
  data () {
    return {
    }
  },
  components: {},
  methods: {
    // 跳转分类
    jump(index){
      this.$router.push({
        path:'/sort',
        query:{
          index:index
        }
      })
    }
  },
  mounted() {
    localStorage.setItem('sort',JSON.stringify(this.list1))
  },
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.homethree {
  background: white;
  margin: 10px 0 10px 10px;
  width: 95%;
  height: 95px;
  border-radius: 8px;
}
.photo{
  margin-right: 8px;
  img{
    width: 50px;
    height: 50px;
    margin-bottom: 5px;
  }
}
.word {
  font-size: 14px;
}
</style>