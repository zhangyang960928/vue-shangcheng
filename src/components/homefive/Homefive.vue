<template>
  <div class="homefive displayF justify-contentC">
    <div class="box">
      <div class="head displayF justify-contentC align-itemsC">
        <slot name="floor"></slot>
        <div class="floor">{{ arr1 }}</div>
      </div>
      <div class="body displayF">
        <div class="photo1">
          <img @click='jump(list3[0].goodsId)' :src="list3[0].image" alt="" />
          <img @click='jump(list3[3].goodsId)' :src="list3[3].image" alt="" class="three" />
        </div>
        <div class="photo2">
          <img @click='jump(list3[1].goodsId)' :src="list3[1].image" alt="" />
          <img @click='jump(list3[2].goodsId)' :src="list3[2].image" alt="" />
          <img @click='jump(list3[4].goodsId)' :src="list3[4].image" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list3: {
      type: Array,
      required: true,
    },
    arr1: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    jump(item){
      this.$router.push({
        path:'/details',
        query:{
          id:item,
        }
      })
    }
  },
  mounted() {
    // console.log(this.list3);
    // console.log(this.arr1);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 98%;
  height: 275px;
  background: white;
}
.head {
  width: 100%;
  height: 35px;
  background: #eeeeee;
}
.body {
  box-sizing: border-box;
  overflow: hidden;
}
.floor {
  color: red;
  font-size: 16px;
  margin-left: 5px;
}
.photo1 {
  width: 50%;
  height: 240px;
  img {
    width: 100%;
    height: 160px;
    border-right: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
  }
}
.photo2 {
  width: 50%;
  height: 240px;
  img {
    width: 100%;
    height: 80px;
    border-right: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
  }
}
.three {
  width: 100%;
  height: 80px !important;
}
</style>