import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoadingShow: false
  },
  mutations: {
    show (state) {
      // 变更状态
      state.isLoadingShow = true
    },
    hide (state) {
      state.isLoadingShow = false
    }
  },
  actions: {
  },
  modules: {
  }
})
