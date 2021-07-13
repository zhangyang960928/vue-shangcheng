import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import api from './http/api'
import child from '../src/components/child/Child.vue'
import utils from './utils'

// 把api挂载成全局变量
Vue.prototype.$api = api
Vue.prototype.$utils = utils
Vue.use(Vant);
Vue.config.productionTip = false
Vue.component('child',child)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
