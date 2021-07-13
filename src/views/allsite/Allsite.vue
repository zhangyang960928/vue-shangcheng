<template>
  <div>
    <div v-if="list.length === 0">
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
            <div class="center">地址列表</div>
          </template>
        </child>
        <!-- 中间 -->
        <van-address-list disabled-text="暂无收货地址~~" @add="onAdd" />
      </div>
    </div>
    <div v-else>
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
            <div class="center">地址列表</div>
          </template>
        </child>
        <!-- 中间 -->
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          @select="click_item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Child from "../../components/child/Child.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      chosenAddressId: "1",
      id: "",
    };
  },
  components: { Child },
  methods: {
    // 返回
    remove() {      
        this.$router.back();
    },
    // 跳转新增
    onAdd() {
      this.$router.push("/compile");
    },
    // 跳转编辑
    onEdit(item) {
      console.log(item);
      this.$router.push({
        path: "/changeadd",
        query: {
          arr: JSON.stringify(item),
        },
      });
    },
    // 点击地址
    click_item(item) {
      localStorage.setItem("location", JSON.stringify(item));
      if (Number(localStorage.getItem("allSite"))===0) {
        this.$router.push("/settlement");
      }
    },
  },
  mounted() {
    this.$api
      .getAddress()
      .then((res) => {
        // console.log(res);
        this.list = res.address;
        console.log(this.list);
        this.list.map((item1) => {
          this.$set(item1, "id", item1._id);
          // console.log(this.list);
        });
      })
      .catch((err) => {
        console.log("请求失败", err);
      });
  },
  computed: {},
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
.van-address-list__bottom {
  background: none;
}
.van-address-list__disabled-text {
  color: #bcbcbc;
  font-size: 25px;
  padding: 100px 0 0 110px;
}
</style>