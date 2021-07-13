<template>
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
        <div class="center">个人资料</div>
      </template>
    </child>
    <!-- 中间 -->
    <div class="one displayF align-itemsC">github</div>
    <div class="two displayF justify-contentB align-itemsC">
      <div>头像</div>
      <div class="twoWord displayF align-itemsC">
        <img :src="list.avatar" alt="" />
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="three" style="font-size: 20px">
      <van-cell-group class="font">
        <van-field label="用户名" :value="list.username" readonly />
      </van-cell-group>
    </div>
    <div class="three" style="font-size: 20px">
      <van-cell-group class="font">
        <van-field label="昵称" v-model="list.nickname" />
      </van-cell-group>
    </div>
    <div class="three" style="font-size: 20px">
      <!-- <van-cell-group class="font">
        <van-field label="性别" v-model="list.gender"  />
      </van-cell-group> -->
      <van-radio-group
        v-model="list.gender"
        direction="horizontal"
        style="font-size: 20px; height: 50px; padding-left: 15px"
      >
        <van-radio name="男">男</van-radio>
        <van-radio name="女">女</van-radio>
      </van-radio-group>
    </div>
    <div class="three" style="font-size: 20px">
      <van-cell-group class="font">
        <van-field label="邮箱" placeholder="请输入邮箱" />
      </van-cell-group>
    </div>
    <div class="four" >
      <van-cell-group>
        <van-field v-model="value" label="出生年月" @click="add" v-if="flag"/>
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          v-else
          @cancel='cancel'
          @confirm='confirm'
        />
      </van-cell-group>
    </div>
    <div class="five displayF flex-directionC">
      <van-button type="primary" class="but" @click="save">保存</van-button>
      <van-button type="default" class="but" @click="remove">取消</van-button>
    </div>
  </div>
</template>

<script>
import dayjs, { locale } from 'dayjs'
export default {
  name: "",
  props: {},
  data() {
    return {
      gender: "",
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      flag:true,
      value:'',
      list:{},
    };
  },
  components: {},
  methods: {
    // 返回
    remove() {
      this.$router.back();
    },
    // 点击跳转
    add(){
      this.flag=false
    },
    cancel(){
      this.flag=true
    },
    // 点击确定
    confirm(daty){
      this.flag=true
      this.value=dayjs(daty).format('YYYY年MM月DD日')
    },
    // 保存
    save(){
      if(this.list.nickname==='' || this.list.gender==='' || this.value===''){
        this.$toast('填写有误');
      }else{
      this.list.year=dayjs(this.currentDate).format('YYYY')
      this.list.month=dayjs(this.currentDate).format('MM')
      this.list.day=dayjs(this.currentDate).format('DD')
      localStorage.setItem('user',JSON.stringify(this.list))
      this.$store.commit('changeUser',JSON.stringify(this.list))
      this.$router.push('/me')
      }
    }
  },
  mounted() {
    this.list=JSON.parse(localStorage.getItem('user'))
    console.log(this.list);
    this.value=`${this.list.year}年${this.list.month}月${this.list.day}日`
  },
  computed: {
  },
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
.one {
  height: 50px;
  font-size: 20px;
  padding-left: 15px;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.two {
  height: 100px;
  border-bottom: 1px solid #eeeeee;
  padding: 0 15px;
  font-size: 20px;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}
.van-cell {
  height: 50px;
  font-size: 18px;
}
.five {
  margin-top: 50px;
  .but {
    width: 295px;
    margin: 5px 40px;
  }
}
</style>