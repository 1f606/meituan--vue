import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'normalize.css'
import './assets/style/_common.scss'

Vue.config.productionTip = false

//  定义一个请求拦截器
axios.interceptors.request.use(function (config) {
  store.commit('show') //  在请求发出之前进行一些操作
  return config
})
//  定义一个响应拦截器
axios.interceptors.response.use(function (response) {
  store.commit('hide') //  在这里对返回的数据进行处理
  return response
}, function (error) {
  if (error.response.status === 404) {
    store.commit('hide')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
