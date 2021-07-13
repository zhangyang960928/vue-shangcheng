<template>
  <div>
    <!-- 未登录 -->
    <div v-if="user === null">
      <div class="unlogin displayF flex-directionC align-itemsC">
        <div @click="click"><van-button type="warning">点击登录</van-button></div>
        <div class="order">
          <img src="../../assets/order.gif" alt="" />
        </div>
      </div>
    </div>
    <!-- 已登录 -->
    <div v-else>
      <logon></logon>
    </div>
  </div>
</template>

<script>
import Logon from '../../components/logon/Logon.vue';
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {Logon},
  methods: {
    click(){
      this.$router.push('/login')
    }
  },
  mounted() {
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
.unlogin {
  padding-top: 100px;
}
.order {
  img {
    width: 300px;
  }
}
</style>