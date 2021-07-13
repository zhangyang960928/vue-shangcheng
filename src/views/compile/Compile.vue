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
            <div class="center">添加地址</div>
          </template>
        </child>
      </div>
      <!-- 中间 -->

      <van-address-edit
        :area-list="areaList"
        show-set-default
        show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </div>
  </div>
</template>

<script>
import area from '../../lib/area'
export default {
  name: "",
  props: {},
  data() {
    return {
      areaList:area,
    };
  },
  components: {},
  methods: {
    remove(){
      this.$router.back()
    },
    // 点击保存
    onSave(AddressInfo){
      //  console.log(AddressInfo);
      this.$api.postAddress({
        name:AddressInfo.name,
        tel:AddressInfo.tel,
        address:`${AddressInfo.province}${AddressInfo.city}${AddressInfo.county}${AddressInfo.addressDetail}`,
        isDefault:AddressInfo.isDefault,
        province:AddressInfo.province,
        city:AddressInfo.city,
        county:AddressInfo.county,
        addressDetail:AddressInfo.addressDetail,
        areaCode:AddressInfo.areaCode
      }).then(res=>{
        if(res.code===200){
          this.$toast('添加成功');
          this.$router.push('/allsite')
        }
      }).catch(err=>{
        console.log('请求失败',err);
      })
    }
  },
  mounted() {},
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