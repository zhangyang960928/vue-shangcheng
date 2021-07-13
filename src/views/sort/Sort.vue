<template>
  <div>
    <!-- 头部 -->
    <van-sticky>
      <div class="head">
        <child>
          <template #center>
            <div class="center displayF align-itemsC">商品分类</div>
          </template>
        </child>
      </div>
    </van-sticky>
    <!-- 侧边 -->
    <div class="body displayF">
      <div class="side">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            :title="item.mallCategoryName"
            v-for="(item, index) in list"
            :key="index"
            @click="clickOne(index)"
          />
        </van-sidebar>
      </div>
      <!-- 主体头部 -->
      <div class="subjectHead">
        <van-tabs v-model="active" @click="clickTwo" class="potation" :ellipsis='false'>
          <van-tab
            :title="item1.mallSubName"
            v-for="(item1, index1) in arr"
            :key="index1"
          >
            <div class="body_dv">
              <div
                class="dataList displayF"
                v-for="(item2, index2) in dataList"
                :key="index2"
                @click="jump(item2)"
              >
                <div class="photo">
                  <img :src="item2.image_path" alt="" />
                </div>
                <div class="word">
                  <div class="wordOne">{{ item2.name }}</div>
                  <div class="wordTwo displayF align-itemsE">
                    <div class="price">￥{{ item2.present_price }}</div>
                    <div class="oldprice">{{ item2.orl_price }}</div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="foot"></div>
  </div>
</template>

<script>
import Child from "../../components/child/Child.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: "",
      activeKey: 0,
      active: 0,
      arr: "",
      dataList: [],
    };
  },
  components: { Child },
  methods: {
    // 一级
    clickOne(index) {
      this.arr = this.list[index].bxMallSubDto;
      console.log(this.arr);
      //  一级请求
      this.$api
        .category({ id: this.arr[0].mallSubId })
        .then((res) => {
          // console.log(res);
          if (res.code === 200) {
            this.dataList = res.dataList;
            console.log(this.dataList);
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    // 二级
    clickTwo(name, title) {
      this.dataList = this.arr[0].mallSubId;
      // 二级请求
      this.$api
        .category({ id: this.arr[name].mallSubId })
        .then((res) => {
          // console.log(res);
          if (res.code === 200) {
            this.dataList = res.dataList;
            console.log(this.dataList);
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    // 跳转详情
    jump(item2) {
      this.$router.push({
        path: "/details",
        query: {
          id: item2.id,
        },
      });
    },
  },
  mounted() {
    this.list = JSON.parse(localStorage.getItem("sort"));
    console.log(this.list);
    let index=""
    index=this.$route.query.index
    if(index!==undefined){
      this.activeKey=index
      }
      // 初始值
    this.arr = this.list[this.activeKey].bxMallSubDto;
    this.$api
      .category({ id: this.arr[0].mallSubId })
      .then((res) => {
        // console.log(res);
        if (res.code === 200) {
          this.dataList = res.dataList;
          console.log(this.dataList);
        }
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
.center {
  font-size: 20px;
  height: 40px;
}
.head {
  border-bottom: 1px solid #eeeeee;
  background: white;
}
.side {
  width: 80px;
  background: #f7f8fa;
}
.subjectHead {
  width: 295px;
}
.dataList {
  padding: 10px;
  border-bottom: 1px solid #eeeeee;
}
.photo {
  border: 1px solid #eeeeee;
  img {
    width: 80px;
    height: 80px;
  }
}
.word {
  margin-left: 20px;
  .wordOne {
    color: red;
    width: 155px;
  }
}
.wordTwo {
  margin-top: 10px;
  .price {
    color: red;
    font-weight: bold;
    font-size: 18px;
  }
  .oldprice {
    font-size: 18px;
    margin-left: 20px;
    text-decoration: line-through;
  }
}
.foot {
  height: 40px;
}
.van-sidebar {
  position: fixed;
  height: 100%;
}
.body_dv {
  padding-top: 45px;
}
</style>