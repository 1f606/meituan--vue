<template>
  <div class="shop">
    <ShopHeader :info="this.info"></ShopHeader>
    <nav class="shop-nav">
      <div @click="swiperMove(index)" class="shop-nav_item" v-for="(item, index) in this.navs" :key="index">{{item}}</div>
    </nav>
    <div class="shop-swiperWrapper">
      <div ref="swiperContent" class="shop-swiperContent">
        <div class="goods">
          <div ref="goodsList" class="goods-list">
            <div class="goods-list_wrapper--menu" ref="menuWrapper">
              <ul class="goods-list_content--menu">
                <li @click="selectMenu(index)" class="goods-list_menu" :class="{'current': menuCurrentIndex === index}" v-for="(item, index) in this.menuList" :key="index">
                  <img class="goods-list_icon" v-show="item.iconUrl" :src="item.iconUrl">
                  <div class="goods-list_item">
                    {{item.categoryName}}
                    <Ball :list="item.spuList"></Ball>
                  </div>
                </li>
              </ul>
            </div>
            <div class="goods-list_wrapper--dishes" ref="dishesWrapper">
              <ul class="goods-list_content--dishes">
                <li  class="goods-list_dishes goods-list_dishes--hook" v-for="(item, index) in this.menuList" :key="index">
                  <div class="goods-list_title">{{item.categoryName}}</div>
                  <div @click="showToggle(food)" class="goods-list_dish" v-for="(food, index) in item.spuList" :key="index">
                      <img class="goods-list_img" :src="food.littleImageUrl" alt="photo" >
                      <div class="goods-list_info">
                        <h1 class="goods-list_name">{{food.spuName}}</h1>
                        <div class="goods-list_desc">{{food.spuDesc}}</div>
                        <div>
                          <span class="goods-list_salesVolume">月售{{food.saleVolume}}</span>
                          <span class="goods-list_like">赞{{food.praiseNum}}</span>
                        </div>
                        <div class="goods-list_select">
                          <span class="goods-list_price">¥{{food.currentPrice}}</span>
                          <div class="goods-list_wrapper">
                            <CartControl :dish="food" v-on:cartAdd="handleCartAdd"></CartControl>
                          </div>
                        </div>
                      </div>
                    </div>
                </li>
              </ul>
            </div>
          </div>
          <ShopCart :selectedFoods="this.selectedFoods" :info="this.info" ref="shopCart"></ShopCart>
          <Toast :item="this.selectedItem" ref="toast"></Toast>
        </div>
        <Comment :id="this.id"></Comment>
        <ShopInfo :shopInfo="this.shopInfo"></ShopInfo>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from '@better-scroll/core'
import ShopHeader from './shopHeader/ShopHeader'
import ShopCart from './shopCart/ShopCart'
import CartControl from './cartControl/CartControl'
import Ball from './ball/Ball'
import Toast from './toast/Toast'
import Comment from './comment/Comment'
import ShopInfo from './shopInfo/ShopInfo'
export default {
  name: 'Goods',
  components: {
    ShopCart,
    CartControl,
    Ball,
    Toast,
    Comment,
    ShopHeader,
    ShopInfo
  },
  data () {
    return {
      id: '',
      menuList: [],
      shopInfo: {},
      listHeight: [],
      scrollY: 0,
      selectedItem: {},
      navs: ['点菜', '评价', '商家'],
      info: {}
    }
  },
  created () {
    this.getId()
    axios.get('/static/' + this.id + '.json').then(res => {
      this.info = res.data.data.shopInfo
      this.menuList = res.data.data.categoryList
      this.$nextTick(() => {
        if (!this.dishesScroll || !this.menuScroll) {
          this._initBetterScroll()
        } else {
          this.dishesScroll.refresh()
          this.menuScroll.refresh()
        }
        this._calculateHeight()
      })
    })
  },
  mounted () {
    // this.$loading.show()
    window.onbeforeunload = function () {
      //  刷新后页面自动回到顶部
      document.documentElement.scrollTop = 0//  ie下
      document.body.scrollTop = 0// 非ie
    }
    axios.get('/static/info/' + this.id + '.json').then(res => {
      console.log(res)
      this.shopInfo = res.data.data
    })
  },
  computed: {
    menuCurrentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let currentHeight = this.listHeight[i]
        let nextHeight = this.listHeight[i + 1]
        if (!nextHeight || (this.scrollY >= currentHeight && this.scrollY < nextHeight)) {
          return i
        }
      }
      return 0
    },
    selectedFoods () {
      let selected = []
      // console.log(this.menuList)
      this.menuList.forEach(foods => {
        foods.spuList.forEach(food => {
          if (food.count) {
            selected.push(food)
          }
        })
      })
      return selected
    }
  },
  methods: {
    //  取到index页面跳转携带的id
    getId () {
      const routerParam = this.$route.query.id
      this.id = routerParam
    },
    _initBetterScroll () {
      this.dishesScroll = new BScroll(this.$refs.dishesWrapper, { 'mouseWheel': true, 'click': true, probeType: 3 })
      this.menuScroll = new BScroll(this.$refs.menuWrapper, { 'mouseWheel': true, 'click': true, probeType: 3 })
      // console.log(this.dishesScroll)
      // console.log(this.menuScroll)
      this.dishesScroll.on('scroll', (position) => {
        this.scrollY = Math.abs(Math.round(position.y))
      })
    },
    _calculateHeight () {
      let dishList = this.$refs.dishesWrapper.getElementsByClassName('goods-list_dishes--hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < dishList.length; i++) {
        let item = dishList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu (index) {
      let dishList = this.$refs.dishesWrapper.getElementsByClassName('goods-list_dishes--hook')
      let elem = dishList[index]
      this.dishesScroll.scrollToElement(elem, 300)
    },
    handleCartAdd (target) {
      this.$refs.shopCart.drop(target)
    },
    showToggle (food) {
      this.selectedItem = food
      this.$refs.toast.toggle()
    },
    swiperMove (index) {
      this.$refs.swiperContent.style.transform = `translate3d(-${index * 100}%, 0, 0)`
      // this.$refs.goodsList.style.top = 0
    }
  }
}
</script>

<style lang="scss" scoped>
  /*位置属性(position, top, right, z-index,display, float, overflow 等)*/
  /*大小(width, height, padding, margin, border)*/
  /*文字系列(font, line-height, letter-spacing,color- text-align等)*/
  /*视觉(background, color, list-style等)*/
  /*其他(animation, transition等)*/
  .shop {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  .goods-info {
    height: 130px;
    background-color: #333;
  }
  .goods-info_backwardArrow {
    display: block;
    height: 50px;
    width: 40px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAYAAAEVsH/dAAAABGdBTUEAALGPC/xhBQAAAMJJREFUKBXFkrEOwjAMRFMkFujKB1Ti+5GYGahA/AMDS6X+AywovEu5BApCMGHpYvt8dtMkIcZYBRvJJbBsTIw9tT5zJDEnKYBoM0Oyq1hqmIWmNtasSMqY3EBAoX0pQtRA1khRErdCThzbi7hSWJpIHmIGZN8X5kNDnOZREHvQ/UBISssxtziA3IITeN6SBfYItHcdkKwH/2zg87qJA5CdQTkg7RlCAh2UrAPDE3j4oc+C+5R16n83wZPsEZbXbHLkbwE+Cry82MV2AAAAAElFTkSuQmCC) center no-repeat;
    transform: rotate(-180deg);
  }
  .goods-info_detail {
    display: flex;
    box-sizing: border-box;
    height: 80px;
    width: 100%;
    padding: 5px 0 0 10px;
  }
  .goods-info_logoWrapper {
    width: 22.67%;
    height: 0;
    padding-bottom: 17.07%;
    margin-right: 10px;
    overflow: hidden;
  }
  .goods-info_logo {
    width: 100%;
  }
  .goods-info_content {
    flex: 1;
    overflow: hidden;
    font-size: 12px;
    color: #fff;
  }
  .goods-info_delivery {
    height: 16px;
    line-height: 16px;
  }
  .goods-info_column {
    margin: 0 8px 0 8px;
  }
  .goods-info_desc {
    height: 16px;
    margin: 5px 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .goods-info_discount {
    position: relative;
  }
  .goods-info_icon {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 7px;
    background: url("https://p0.meituan.net/activityconfig/3da2d9c7a4ddf89e4e71cfdfff168c391088.png");
    background-size: contain;
  }
  .goods-info_Text {
    height: 15px;
    line-height: 15px;
    vertical-align: top;
  }
  .goods-info_Text:after {
    content: '>';
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 5px;
    height: 9px;
    margin-right: 10px;
  }

  .shop-swiperWrapper {
    flex: 1;
    width: 100%;
    overflow: hidden;
  }
  .shop-nav {
    flex: 0 0 auto;
    display: flex;
    height: 40px;
    border-bottom: 1px solid #eee;
  }
  .shop-nav_item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    text-align: center;
  }

  .shop-swiperContent {
    display: flex;
    height: 100%;
    transition: all 0.5s linear;
  }
  .goods {
    flex: 0 0 auto;
    position: relative;
    width: 100vw;
    height: 100%;
  }
  .goods-list {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    display: flex;
    overflow: hidden;
  }
  .goods-list_wrapper--menu {
    position: relative;
    height: 100%;
    width: 80px;
    overflow: hidden;
    font-size: 13px;
    background-color: #f5f5f5;
  }
  .goods-list_menu {
    position: relative;
  }
  .current {
    background-color: #fff;
  }
  .goods-list_icon {
    position: absolute;
    top: 20%;
    left: 5%;
    width: 15px;
    height: 15px;
  }
  .goods-list_item {
    position: relative;
    text-align: center;
    padding: 9px 10px 15px;
  }
  .goods-list_wrapper--dishes {
    flex: 1;
    overflow: hidden;
    position: relative;
    font-size: 11px;
  }
  .goods-list_dishes {
    padding: 0 10px 0;
  }
  .goods-list_content--menu {
    position: absolute;
    padding-bottom: 50px;
    width: 100%;
  }
  .goods-list_content--dishes {
    position: absolute;
    padding-bottom: 50px;
    width: 100%;
  }
  .goods-list_title {
    font-size: 12px;
    line-height: 36px;
  }
  .goods-list_dish {
    position: relative;
    padding-bottom: 22px;
  }
  .goods-list_img {
    position: absolute;
    width: 70px;
    height: 70px;
  }
  .goods-list_info {
    padding-left: 85px;
  }
  .goods-list_name {
    margin: 0;
    padding: 0;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .goods-list_desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 2px 0 3px;
  }
  .goods-list_like {
    margin-left: 5px;
  }
  .goods-list_select {
    height: 25px;
    line-height: 25px;
    margin-top: 5px;
  }
  .goods-list_wrapper {
    position: relative;
  }
  .goods-list_price {
    font-size: 18px;
    color: #f01414;
  }
  .goods-list_minus {
    float: right;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAM1BMVEX////Z296wsLD6+vvo6evi5Obe3+Lr7O709fb5+fr3+Pjb3eDw8fLu7/Hl5+nk5ui5ubmS1nTyAAABG0lEQVRIx52WWXLEIAxEeUGSGeNl7n/aME6lUmQWm+5f+5l2A5LSC+XFPCrUcFtyuqDbFHSK6XaCzE7TvpZ8LFnWnSafPyB5g2oldSpWYXvrcgKmkQdNDpbfWDDwVwEE8cH6HMRTIAX8Y7rZofxbByydyKBfKx7MORV9Bn4CPL82EfkKlOMv+QxzuqQZfr++YemijK3Dz9Sb8mb0sib8Z4tqGlDldrA2AtnhKygjUCGOX0tDesS2sI9BO0vzuI5BK5acMgYVPAV5DMpEy71P9P71pHu/J9REDzXmBdVDSJBkTwpCilzaXOkYSQdWuRrSJZSuu1JYpBKmFEupLCsNQGk1SlOT2qfSqJWRQBg+lDFHG6j00U0fEqVx9BvALAkNabHL3QAAAABJRU5ErkJggg==") no-repeat;
    background-size: contain;
  }
  .goods-list_total {
    float: right;
    font-size: 16px;
    margin: 0 10px 0;
  }
  .goods-list_plus {
    float: right;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: url("http://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/318c525df8eba9c557594305c44b2ddf.png") no-repeat;
    background-size: contain;
  }
</style>
