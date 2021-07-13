import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/layout/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue')
  },
  // 地图
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/map/Map.vue')
  },
  // 详情页
  {
    path: '/details',
    name: 'Details',
    component: () => import('../views/details/Details.vue')
  },
  // 结算
  {
    path: '/settlement',
    name: 'Settlement',
    component: () => import('../views/settlement/Settlement.vue')
  },
  // 详情地址
  {
    path: '/allsite',
    name: 'Allsite',
    component: () => import('../views/allsite/Allsite.vue')
  },
  // 新增地址
  {
    path: '/compile',
    name: 'Compile',
    component: () => import('../views/compile/Compile.vue')
  },
  // 编辑地址
  {
    path: '/changeadd',
    name: 'Changeadd',
    component: () => import('../views/changeadd/Changeadd.vue')
  },
  // 全部订单
  {
    path: '/allorders',
    name: 'Allorders',
    component: () => import('../views/allorders/Allorders.vue')
  },
  // 已完成
  {
    path: '/completed',
    name: 'Completed',
    component: () => import('../views/completed/Completed.vue')
  },
  // 我的收藏
  {
    path: '/collection',
    name: 'Collection',
    component: () => import('../views/collection/Collection.vue')
  },
  // 评价
  {
    path: '/mycomments',
    name: 'Mycomments',
    component: () => import('../views/mycomments/Mycomments.vue')
  },
  // 评价页面
  {
    path: '/comment',
    name: 'Comment',
    component: () => import('../views/comment/Comment.vue')
  },
  // 已评价
  {
    path: '/evaluated',
    name: 'Evaluated',
    component: () => import('../views/evaluated/Evaluated.vue')
  },
  // 个人资料
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/profile/Profile.vue')
  },
  // 最近浏览
  {
    path: '/browse',
    name: 'Browse',
    component: () => import('../views/browse/Browse.vue')
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/sort',
        name: 'Sort',
        component: () => import('../views/sort/Sort.vue')
      },
      {
        path: '/shopping',
        name: 'Shopping',
        component: () => import('../views/shopping/Shopping.vue')
      },
      {
        path: '/me',
        name: 'Me',
        component: () => import('../views/me/Me.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
