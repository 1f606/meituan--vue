import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index/Index.vue'

Vue.use(VueRouter)
const Order = () => import('../views/order/Order')
const My = () => import('../views/my/My')
const Goods = () => import('../views/goods/Goods')
const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/order',
    name: 'Order',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Order
  },
  {
    path: '/my',
    name: 'My',
    component: My
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Goods
  }
]

const router = new VueRouter({
  routes
})

export default router
