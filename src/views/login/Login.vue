<template>
  <div class="login">
    <div class="head displayF justify-contentC align-itemsC" @click="black">
      <van-icon name="arrow-left" />
    </div>
    <div class="body">
      <div class="one">登录 / 注册</div>
      <van-field
        class="two"
        v-model="username"
        name="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        class="two"
        v-model="password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        name="手机号码"
        label="手机号码"
        placeholder="仅注册需要"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <div class="duanxin displayF">
        <van-field
          name="短信验证码"
          label="短信验证码"
          placeholder="仅注册需要"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-button :disabled="disabled" type="primary" @click="click">{{
          text
        }}</van-button>
      </div>
      <div class="three displayF">
        <van-field
          v-model="code"
          name="验证码"
          label="验证码"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <div class="photo" v-html="photo" @click="remove"></div>
      </div>
      <div class="foot displayF">
        <van-button type="primary" @click="login">登录</van-button>
        <van-button type="danger" @click="register">注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from 'vant';
export default {
  name: "",
  props: {},
  data() {
    return {
      disabled: false,
      time: 5,
      text: "请输入验证码",
      username: "",
      password: "",
      code: "",
      photo: "",
    };
  },
  components: {},
  methods: {
    click() {
      this.disabled = true;
      let timer = setInterval(() => {
        this.time--;
        this.text = `${this.time}s之后重新发送`;
        if (this.time === 0) {
          clearInterval(timer);
          this.time = 5;
          this.disabled = false;
          this.text = "重新发送";
        }
      }, 1000);
    },
    getverify() {
      this.$api
        .getverify()
        .then((res) => {
          // console.log(res);
          this.photo = res;
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    login() {
      this.$api
        .login({
          nickname: this.username,
          password: this.password,
          verify: this.code,
        })
        .then((res) => {
          if (res.code === 200) {
            this.$toast(res.msg);
            // console.log(res);
            localStorage.setItem("user", JSON.stringify(res.userInfo));
            this.$store.commit('changeUser',JSON.stringify(res.userInfo))
            this.$router.push("/");
          } else {
            this.$toast(res.msg);
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    register() {
      this.$api
        .register({
          nickname: this.username,
          password: this.password,
          verify: this.code,
        })
        .then((res) => {
          // console.log(res);
          if (res.code === 200) {
            this.$toast(res.msg);
            localStorage.setItem("user", JSON.stringify(res.userInfo));
            this.$store.commit('changeUser',JSON.stringify(res.userInfo))
            this.$router.push("/");
          } else {
            this.$toast(res.msg);
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    remove() {
      this.getverify();
    },
    black (){
      this.$router.back()
    }
  },
  mounted() {
    this.getverify();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.login {
  height: 667px;
  background-image: url("../../assets/login.jpg");
  padding: 10px;
}
.head {
  width: 40px;
  height: 40px;
  background: #737477;
  border-radius: 50%;
}
.body {
  width: 355px;
  height: 500px;
  background: white;
  margin-top: 80px;
  padding: 10px;
}
.one {
  font-size: 20px;
  margin-left: 15px;
}
.van-cell {
  height: 50px;
}
.two {
  margin-top: 30px;
}
.foot {
  margin-top: 30px;
  margin-left: 10px;
  button {
    margin-right: 10px;
    width: 100px;
  }
}
.duanxin {
  button {
    width: 120px;
    height: 40px;
    margin: 5px 20px 0 0;
  }
}
.photo {
  margin: 5px 10px 0 0;
}
</style>