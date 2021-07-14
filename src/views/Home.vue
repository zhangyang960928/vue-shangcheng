<template>
  <div class="home">
    <div class="homeone displayF">
      <div class="left displayF justify-contentC align-itemsC" @click="map">
        {{ citys ? citys : "定位中" }}
        <van-icon name="arrow-down" />
      </div>
      <div class="right displayF align-itemsC">
        <van-search
          show-action
          v-model="value"
          placeholder="请输入搜索关键词"
          @focus="focus"
        >
          <template #action>
            <div v-if="show" @click="cancel" style="font-size: 16px">取消</div>
          </template>
        </van-search>
      </div>
    </div>
    <div v-if="flag">
      <hometwo v-if="list" :list="list"></hometwo>
      <homethree v-if="list1" :list1="list1"></homethree>
      <div class="homefixed displayF justify-contentC align-itemsC">
        <img :src="arr.PICTURE_ADDRESS" alt="" />
      </div>
      <homefour v-if="list2" :list2="list2"></homefour>
      <homefive v-if="list3" :list3="list3" :arr1="arr1">
        <template #floor>
          <div class="floor displayF justify-contentC align-itemsC">1F</div>
        </template>
      </homefive>
      <homefive v-if="list3" :list3="list4" :arr1="arr2">
        <template #floor>
          <div class="floor displayF justify-contentC align-itemsC">2F</div>
        </template>
      </homefive>
      <homefive v-if="list3" :list3="list5" :arr1="arr3">
        <template #floor>
          <div class="floor displayF justify-contentC align-itemsC">3F</div>
        </template>
      </homefive>
      <homesix v-if="list6" :list6="list6"></homesix>
    </div>
    <div v-else>
      <div v-if="value">
        <div
          class="search displayF align-itemsC"
          v-for="(item, index) in listone"
          :key="index"
          @click="saveSearch(item.id)"
        >
          <img :src="item.image" alt="" />
          <div v-html="item.name" class="searchWord"></div>
        </div>
      </div>
      <div v-else>
        <div class="cancel displayF justify-contentE">
          <div class="cancel1" @click="cancel1">
            <van-icon name="delete-o" />
          </div>
        </div>
        <div class="exhibition displayF">
          <div class="entry" v-for="(item, index) in searchlist" :key="index">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="foot"></div>
  </div>
</template>

<script>
import Homefive from "../components/homefive/Homefive.vue";
import Homefour from "../components/homefour/Homefour.vue";
import Homesix from "../components/homesix/homesix.vue";
import Homethree from "../components/homethree/Homethree.vue";
import Hometwo from "../components/hometwo/Hometwo.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: null,
      list1: null,
      arr: "",
      list2: null,
      arr1: "",
      arr2: "",
      arr3: "",
      list3: null,
      list4: null,
      list5: null,
      list6: null,
      flag: true,
      city: "",
      value: "",
      listone: [],
      searchlist: [],
      show: false,
    };
  },
  components: { Hometwo, Homethree, Homefour, Homefive, Homesix },
  methods: {
    getLocation() {
      let _this = this;
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB",
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          console.log(data);
          this.city = data.addressComponent.city;
          _this.city = this.city;
          _this.$store.commit("changeCity", this.city);
          localStorage.setItem("city", this.city);
          console.log(this.city);
        }

        function onError(data) {
          // 定位出错
        }
      });
    },
    map() {
      this.$router.push("/map");
    },
    // 点击存储
    saveSearch(item) {
      if (this.user) {
        this.$utils.saveHistory({
          key: `${this.user.username}search`,
          data: this.value,
          attr: "name",
        });
      }
      this.$router.push({
        path: "/details",
        query: {
          id: item,
        },
      });
    },
    // 获取焦点
    focus() {
      this.flag = false;
      this.show = true;
    },
    // 取消
    cancel() {
      this.flag = true;
      this.show = false;
      this.value = "";
    },
    // 清空
    cancel1() {
      if (this.user) {
        localStorage.removeItem(`${this.user.username}searchHistory`);
        this.searchlist = [];
      }
    },
  },
  mounted() {
    // console.log(this.user);
    if (!this.citys) {
      this.getLocation();
    }
    this.$api
      .recommend()
      .then((res) => {
        // console.log(res);
        this.list = res.data.slides;
        this.list1 = res.data.category;
        this.arr = res.data.advertesPicture;
        this.list2 = res.data.recommend;

        this.arr1 = res.data.floorName.floor1;
        this.list3 = res.data.floor1;

        this.arr2 = res.data.floorName.floor2;
        this.list4 = res.data.floor2;

        this.arr3 = res.data.floorName.floor3;
        this.list5 = res.data.floor3;

        this.list6 = res.data.hotGoods;
        // console.log(this.list);
      })
      .catch((err) => {
        console.log("请求失败", err);
      });
    if (this.user) {
      this.searchlist = this.$utils.getHistory({
        key: `${this.user.username}search`,
      });
    }
  },
  computed: {
    citys() {
      return this.$store.state.city;
    },
    user() {
      return JSON.parse(this.$store.state.user);
    },
  },
  watch: {
    value(val) {
      this.$api
        .search({
          value: val,
        })
        .then((res) => {
          // console.log(res.data.list);
          this.listone = res.data.list;
          this.listone.map((item) => {
            item.name = item.name.replace(
              val,
              `<span style='color:red'>${val}</span>`
            );
          });
          // console.log(this.listone);
        })
        .catch((err) => {
          console.log("请求失败");
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.home {
  background: #f2f2f2;
  width: 100%;
  overflow: hidden;
}
.homefixed {
  margin-bottom: 25px;
  img {
    width: 350px;
    height: 35px;
  }
}
.floor {
  width: 20px;
  height: 20px;
  background: red;
  color: white;
  border-radius: 50%;
}
.search {
  width: 375px;
  background: white;
  padding: 0 10px;
  border-bottom: 1px solid #eeeeee;
  img {
    width: 40px;
    height: 40px;
    margin-right: 5px;
  }
  .searchWord {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 310px;
  }
}
.foot {
  height: 40px;
  background: white;
}
.homeone {
  width: 100%;
  height: 44px;
  background: #f2f2f2;
}
.left {
  width: 80px;
  height: 44px;
}
.van-search {
  padding: 0px;
  background: #f2f2f2;
}
.van-search__content {
  background: white;
  border-radius: 4px;
  width: 240px;
}
.cancel {
  padding-right: 20px;
  background: #f2f2f2;
}
.exhibition {
  background: white;
  padding: 10px 20px;
  flex-wrap: wrap;
}
.entry {
  padding: 5px;
  background: #f2f2f2;
  border-radius: 10px;
  margin-right: 10px;
}
.cancel1 {
  padding: 10px;
  font-size: 20px;
}
</style>