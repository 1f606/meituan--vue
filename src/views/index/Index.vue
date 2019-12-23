<template>
  <div class="index">
    <search></search>
    <Nav :list="navList"></Nav>
    <Category :categoryList="homeList"></Category>
    <TabBar></TabBar>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import search from './Search/Search'
import Nav from './Nav/Nav'
import Category from './Category/Category'
import TabBar from './TabBar/TabBar'
export default {
  name: 'Index',
  data () {
    return {
      navList: [],
      homeList: []
    }
  },
  components: {
    search,
    Nav,
    Category,
    TabBar
  },
  created () {
    axios.get('/static/icon.json').then(res => {
      let data = res.data.data
      this.navList = data.icon
      // console.log(data)
    })
    axios.get('/static/homelist.json').then(res => {
      // console.log(res)
      let data = res.data.data
      this.homeList = data.shopList
      // console.log(this.homeList)
    })
  },
  mounted () {
    window.onbeforeunload = function () {
      //  刷新后页面自动回到顶部
      document.documentElement.scrollTop = 0//  ie下
      document.body.scrollTop = 0// 非ie
    }
  }
}
</script>

<style lang="scss" scoped>
  .index {
    overflow: visible;
  }
</style>
