<template>
  <div>
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
        <div class="center displayF justify-contentC align-itemsC">
          城市列表
        </div>
      </template>
    </child>
    <van-search placeholder="请输入城市关键词" v-model="value" />
    <div>
      <div v-if="flag">
        <div class="head">
          <div class="headWord displayF align-itemsC">当前城市</div>
          <div class="headWord1">
            <div class="headWord2 displayF justify-contentC align-itemsC">
              {{ citys ? citys : "定位中" }}
            </div>
          </div>
        </div>
        <div class="body">
          <div class="headWord displayF align-itemsC">热门城市</div>
          <div class="bodyWord displayF">
            <div
              class="bodyWord1 displayF justify-contentC align-itemsC"
              v-for="(item, index) in list"
              :key="index"
              @click="add(item.name)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <van-index-bar class="wordColor">
          <div class="foot" v-for="(value, key, index) in arr" :key="index">
            <van-index-anchor :index="key" />
            <van-cell
              v-for="(item, index) in value"
              :key="index"
              :title="item.name"
              @click="add(item.name)"
            />
          </div>
        </van-index-bar>
      </div>
      <div v-else>
        <div class="search displayF align-itemsC" v-for="(item,index) in list1" :key='index'>
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lib from "../../lib/city";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      arr: {},
      list1:[],
      flag:true,
      value:'',
    };
  },
  components: {},
  methods: {
    remove() {
      this.$router.back();
    },
    add(city) {
      localStorage.setItem("city", city);
      this.$store.commit("changeCity", city);
      this.$router.push("/");
    },
  },
  mounted() {
    this.list = lib.data.hotCities;
    this.arr = lib.data.cities;
    console.log(this.arr);
    // console.log(this.list);
  },
  computed: {
    citys() {
      return this.$store.state.city;
    },
  },
  watch: {
    value(val){
      this.list1=[]
      Object.values(this.arr).map((item)=>{
        item.map(item1=>{
          this.list1.push(item1)
          
        })
      })
      this.list1=this.list1.filter((item)=>{
        return item.name.includes(val)===true ||item.spell.includes(val)===true
      })
      console.log(this.list1);
      if(val==='') {
        this.flag=true
      }else {
        this.flag=false
      }
    }
  },
};
</script>

<style lang='scss' scoped>
.left {
  height: 40px;
  width: 40px;
  font-size: 16px;
}
.center {
  height: 40px;
}
.van-search {
  background: #eeeeee;
}
.van-search__content {
  background: white;
}
.headWord {
  height: 30px;
  background: #eeeeee;
  padding: 0 0 0 10px;
}
.headWord1 {
  height: 45px;
  padding: 10px 0 0 10px;
}
.bodyWord {
  flex-wrap: wrap;
}
.bodyWord1 {
  width: 100px;
  height: 25px;
  margin: 10px 0 0 10px;
  border: 1px solid #eeeeee;
}
.headWord2 {
  width: 100px;
  height: 25px;
  border: 1px solid #eeeeee;
}
.search {
  height: 40px;
  padding-left: 10px;
  border-bottom: 1px solid #eeeeee;
}
</style>