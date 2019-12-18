<template>
  <div class="category">
    <div class="category-title">附近商家</div>
    <div :class="[isFilterFixed ? 'category-filter--fixed' : 'category-filter']" >
      <div @click="toggleSort" :class="{'category-filter_mainFilter': true, 'upArrow': isSortShow, 'downArrow': !isSortShow}">综合排序</div>
      <div class="category-filter_volumeFilter">销量最高</div>
      <div class="category-filter_distanceFilter">距离最近</div>
      <div class="category-filter_customFilter">筛选</div>
      <ul class="category-filter_sort" v-show="isSortShow">
        <li class="category-filter_item">综合排序</li>
        <li class="category-filter_item">速度最快</li>
        <li @click="sort('wmPoiScore')" class="category-filter_item">评分最高</li>
        <li class="category-filter_item">起送价最低</li>
        <li class="category-filter_item">配送费最低</li>
        <li class="category-filter_item">人均高到低</li>
        <li class="category-filter_item">人均低到高</li>
      </ul>
    </div>
    <transition name="fade">
      <div @click="hideSort" class="mask" v-show="isSortShow"></div>
    </transition>
    <ul>
      <li class="category-list_item" @click="_handleCategoryItemClick(item.mtWmPoiId)" v-for="(item, index) in categoryList" :key="index">
        <div class="category-list_logoWrapper">
          <img :src="item.picUrl" alt="" class="category-list_logo">
        </div>
        <div class="category-list_info">
          <h3 class="category-list_shopName">{{item.shopName}}</h3>
          <div class="category-list_shopRate">
            <div class="category-list_star">
              <Star :starNumber="(item.wmPoiScore/10)"></Star>
              <span class="category-list_score" v-text="item.wmPoiScore/10">
            </span>
              <div class="category-list_volume">{{item.monthSalesTip}}</div>
            </div>
            <div class="category-list_delivery">
              <span class="category-list_deliveryTime">{{item.deliveryTimeTip}}</span>
              <span class="category-list_deliveryDistance">{{item.distance}}</span>
            </div>
          </div>
          <div class="category-list_detail">
            <span class="category-list_startingPrice">{{item.minPriceTip}}</span>
            <span class="category-list_deliveryFee">{{item.shippingFeeTip}}</span>
            <span class="category-list_averagePrice">{{item.averagePriceTip}}</span>
          </div>
          <div>
            <div class="category-list_promotion" v-for="(item, index) in item.discounts2" :key="index">
              <img :src="item.iconUrl" class="category-list_promIcon">
              <div class="category-list_promContent">{{item.info}}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Star from '../../../components/Star/Star'
export default {
  name: 'Category',
  components: {
    Star
  },
  props: {
    categoryList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isFilterFixed: false,
      isSortShow: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.changeIsFilterShow)
  },
  methods: {
    sort (key) {
      this.categoryList.sort((a, b) => {
        let score1 = a[key]
        let score2 = b[key]
        return score2 - score1
      })
      this.isSortShow = false
      document.removeEventListener('touchmove', this.banScroll)
      document.removeEventListener('mousewheel', this.banScroll)
    },
    toggleSort () {
      document.documentElement.scrollTop = 188
      if (!this.isSortShow) {
        document.addEventListener('touchmove', this.banScroll, { passive: false })
        document.addEventListener('mousewheel', this.banScroll, { passive: false })
      }
      if (this.isSortShow) {
        document.removeEventListener('touchmove', this.banScroll)
        document.removeEventListener('mousewheel', this.banScroll)
      }
      this.isSortShow = !this.isSortShow
    },
    hideSort () {
      this.isSortShow = false
    },
    changeIsFilterShow () {
      let top = document.documentElement.scrollTop
      if (top >= 187.2) {
        this.isFilterFixed = true
      } else {
        this.isFilterFixed = false
      }
    },
    _handleCategoryItemClick (id) {
      this.$router.push({
        path: '/goods',
        query: {
          id: id
        }
      })
    },
    banScroll (event) {
      event.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
  .category {
    padding-bottom: 50px;
  }

  .category-title {
    position: relative;
    margin-bottom: 5px;
    text-align: center;
    font-size: 17px;
    line-height: 1.4;
    color: #333;
  }
  .category-title:after,.category-title:before {
    position: absolute;
    top: 50%;
    content: '';
    display: block;
    width: 60px;
    height: 1px;
    background: #666;
  }
  .category-title:after {
    left: 50%;
    transform: translateX(70%);
  }
  .category-title:before {
    right: 50%;
    transform: translateX(-70%);
  }

  .category-filter {
    display: flex;
  }

  .category-filter--fixed {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin-top: 50px;
    z-index: 200;
  }
  .category-filter div, .category-filter--fixed div {
    width: 25%;
    height: 40px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    text-align: center;
    font-size: 14px;
    line-height: 40px;
    color: #666;
    background-color: #fff;
  }
  .category-filter_sort {
    position: absolute;
    width: 100%;
    top: 40px;
    left: 0;
    right: 0;
    background-color: #fff;
    .category-filter_item {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-indent: 15px;
      color: #666;
    }
  }
  .category-filter_mainFilter {
    position: relative;
    color: #333;
  }
  .downArrow:after {
    position: absolute;
    top: 38%;
    right: 5px;
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    border-top: 1px solid #666;
    border-left: 1px solid #666;
    transition: all 0.1s linear;
    transform: rotateZ(-135deg);
  }
  .upArrow:after {
    position: absolute;
    top: 38%;
    right: 5px;
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    border-top: 1px solid #666;
    border-left: 1px solid #666;
    transition: all 0.1s linear;
    transform: rotateZ(45deg);
  }

  .category-list_item {
    display: flex;
    margin: 10px 0 25px;
    padding: 0 10px;
    font-size: 0;
    line-height: 1.4;
  }
  .category-list_logoWrapper {
    flex: 0 0 auto;
    margin-right: 8px;
  }
  .category-list_logo {
    width: 76px;
    height: 57px;
  }

  .category-list_info {
    flex: 1;
  }
  .category-list_shopName {
    margin:0;
    font-size: 16px;
  }
  .category-list_shopRate {
    display: flex;
    margin-top: 4px;
    font-size: 11px;
  }
  .category-list_star {
    display: flex;
  }
  .category-list_score {
    font-size: 11px;
  }
  .category-list_volume {
    margin-left: 10px;
    font-size: 11px;
  }
  .category-list_delivery {
    flex: 1;
    text-align: right;
  }
  .category-list_detail {
    margin-top: 4px;
    font-size: 11px;
  }
  .category-list_detail span {
    margin-right: 10px;
  }
  .category-list_promotion {
    margin-top: 4px;
    font-size: 11px;
  }
  .category-list_promIcon {
    display: inline-block;
    height: 15px;
    width: 15px;
    margin-right: 5px;
    vertical-align: middle;
  }
  .category-list_promContent {
    display: inline-block;
  }
  .category-filter_item {
    position: relative;
  }
</style>
