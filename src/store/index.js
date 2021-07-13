import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city:localStorage.getItem('city'),
    user:localStorage.getItem('user'),
    shopList:localStorage.getItem('shopList')
  },
  mutations: {
    changeCity(state,city){
      state.city=city
    },
    changeUser(state,user){
      state.user=user
    },
    changeshopping(state,shopList){
      state.shopList=shopList
    }
  },
  actions: {
  },
  modules: {
  }
})
