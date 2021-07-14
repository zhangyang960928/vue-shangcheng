<template>
  <div>
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
            <div class="center">编辑地址</div>
          </template>
        </child>
      </div>
      <!-- 中间 -->
      <van-address-edit
        :area-list="areaList"
        :address-info="AddressInfo"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
import area from "../../lib/area";
export default {
  name: "",
  props: {},
  data() {
    return {
      arr: "",
      AddressInfo: {},
      areaList: area,
    };
  },
  components: {},
  methods: {
    // 点击返回
    remove() {
      this.$router.push('/allsite');
    },
    // 点击保存
    onSave(val) {
      this.$api
        .postAddress({
          name: val.name,
          tel: val.tel,
          address: `${val.province}${val.city}${val.county}${val.addressDetail}`,
          province: val.province,
          city: val.city,
          county: val.county,
          addressDetail: val.addressDetail,
          isDefault: val.isDefault,
          areaCode: val.areaCode,
          id: val.id,
        })
        .then((res) => {
          if (res.code === 200) {
            this.$toast("修改成功");
            this.$router.push("/allsite");
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    // 点击删除
    onDelete() {
      this.$api
        .deleteAddress({ id: this.arr.id })
        .then((res) => {
          if (res.code === 200) {
            this.$toast("删除成功");
            this.$router.push("/allsite");
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
  },
  mounted() {
    this.arr = JSON.parse(this.$route.query.arr);
    // console.log(this.arr);
    this.AddressInfo = this.arr;
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
  color: blue;
  font-size: 20px;
}
.center {
  height: 40px;
  line-height: 40px;
  font-size: 20px;
}
</style>