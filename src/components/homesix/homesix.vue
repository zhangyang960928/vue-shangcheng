<template>
  <div class="homesix">
    <div class="head displayF justify-contentC align-itemsC">热销商品</div>
    <div class="body displayF">
      <div
        v-for="(item, index) in list6"
        :key="index"
        class="bodybox displayF flex-directionC justify-contentC align-itemsC"
        @click="jump(item)"
      >
        <img :src="item.image" alt="" />
        <div class="bodybox1">{{ item.name }}</div>
        <div class="bodybox2 displayF align-itemsE">
          <div class="bodybox3">￥{{ item.mallPrice }}</div>
          <div class="bodybox4">￥{{ item.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list6: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    jump(item) {
      this.$router.push({
        path: "/details",
        query: {
          id: item.goodsId,
        },
      });
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.homesix {
  width: 98%;
  margin-left: 1%;
  background: white;
}
.head {
  height: 35px;
  background: #eeeeee;
  color: red;
  font-size: 16px;
}
.body {
  width: 100%;
  flex-wrap: wrap;
}
.bodybox {
  width: 50%;
  height: 235px;
  border-right: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  img {
    width: 150px;
    height: 160px;
  }
}
.bodybox1 {
  width: 100%;
  padding: 0 3px;
  margin-bottom: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.bodybox4 {
  font-size: 13px;
  color: red;
  margin-left: 5px;
  text-decoration: line-through;
}
</style>