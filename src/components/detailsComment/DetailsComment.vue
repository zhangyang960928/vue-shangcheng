<template>
  <div>
    <div class="comment">
      <van-tabs>
        <van-tab title="商品详情">
          <div class="photo" v-html="list.detail"></div>
        </van-tab>
        <van-tab title="商品评论">
          <div class="comment" v-for="(item, index) in arr" :key="index">
            <div class="one">
              <div v-if="item.anonymous === false" class="word displayF">
                <div class="photo displayF justify-contentC align-itemsC">
                  <img :src="item.user[0].avatar" alt="" />
                </div>
                <div class="namer">
                  <div class="wordOne displayF justify-contentB">
                    <div>{{item.user[0].nickname}}:</div>
                    <div style="color:#8b8b8b;">{{item.comment_time}}</div>
                  </div>
                  <div><van-rate v-model="item.rate" /></div>
                </div>
              </div>
              <div v-else class="word displayF">
                <div class="photo displayF justify-contentC align-itemsC">
                  <img :src="item.comment_avatar" alt="" />
                </div>
                <div class="namer">
                  <div class="wordOne displayF justify-contentB">
                    <div>{{item.comment_nickname}}:</div>
                    <div style="color:#8b8b8b;">{{item.comment_time}}</div>
                  </div>
                  <div><van-rate v-model="item.rate" /></div>
                </div>
              </div>
              <div class="title">{{item.content}}</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      arr: null,
    };
  },
  components: {},
  methods: {},
  mounted() {
    this.$api
      .goodOne({
        id: this.list.id,
      })
      .then((res) => {
        this.arr = res.goods.comment;
        console.log(this.arr);
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
.comment {
  margin-top: 15px;
  width: 100%;
  border-top: 1px solid #eeeeee;
  .photo {
    margin-top: 10px;
  }
}
.word {
  .photo {
    border: 1px solid #eeeeee;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin: 10px;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
  .wordOne{
    width: 270px;
    font-size: 18px;
    margin: 15px 0 10px 0;
  }
}
.title{
  font-size: 20px;
  margin: 5px 0 0 80px;
}
</style>