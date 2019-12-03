<template>
  <div class="shopCart">
    <transition name="fade">
      <div @click="hideFoodList" class="mask" v-show="isFoodListShow"></div>
    </transition>
    <div class="shopCart-alert--outside" v-show="this.totalPrice > this.info.minFee">已满足起送价</div>
    <div @click="showFoodList" class="shopCart_content--left">
      <div class="shopCart_icon" :class="iconClass">
        <div class="shopCart_bubble" v-show="this.totalCount > 0">{{this.totalCount}}</div>
      </div>
    </div>
    <div @click="showFoodList" class="shopCart_content--center">
      <div>
        <div class="shopCart_price" v-show="this.totalPrice>0">
          <span class="shopCart_unit">¥</span>
          <span class="shopCart_totalPrice">{{this.totalPrice}}</span>
        </div>
        <div :class="deliveryClass">另需配送费¥{{this.info.minFee}}</div>
      </div>
    </div>
    <div class="shopCart_content--right">
      <div @click="pay" class="shopCart_payment" :class="paymentClass">{{this.paymentDesc}}</div>
    </div>
    <transition-group name="drop"
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterEnter"
    >
      <div v-for="(ball, index) in this.balls" v-show="ball.show" class="ball" :key="index"></div>
    </transition-group>
    <transition name="fold">
      <div class="shopCart-list" v-show="isFoodListShow">
        <div class="shopCart-alert--inside" v-show="this.totalPrice > this.info.minFee">已满足起送价</div>
        <div class="shopCart-list_title clearFix">
          <span>购物车</span>
          <div @click="clearSelectedFoods" class="shopCart-list_clear">清空购物车</div>
        </div>
        <ul class="shopCart-list_foodList">
          <li class="shopCart-list_food" v-for="(food, index) in this.selectedFoods" :key="index">
            <div class="shopCart-list_foodName">{{food.spuName}}</div>
            <div class="shopCart-list_price">¥{{food.currentPrice}}</div>
            <div class="shopCart-list_wrapper">
              <cart-control :dish="food"></cart-control>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import CartControl from '../cartControl/CartControl'
export default {
  name: 'ShopCart',
  components: {
    CartControl
  },
  props: {
    selectedFoods: {
      type: Array,
      default () {
        return []
      }
    },
    info: Object
  },
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      isFoodListShow: false
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectedFoods.forEach(food => {
        total += food.currentPrice * food.count
      })
      if (total === 0) {
        return false
      }
      let _toFixedTotal = total.toFixed(2)
      return _toFixedTotal
    },
    totalCount () {
      let count = 0
      this.selectedFoods.forEach(food => {
        count += food.count
      })
      return count
    },
    paymentDesc () {
      if (this.totalPrice === 0) {
        return `¥${this.info.minFee}起送`
      } else if (this.info.minFee > this.totalPrice) {
        let diff = this.info.minFee - this.totalPrice
        return `差¥${diff}起送`
      } else {
        return `去结算`
      }
    },
    deliveryClass () {
      return {
        'shopCart_deliveryPrice': !this.totalPrice,
        'shopCart_deliveryPrice--smaller': this.totalPrice
      }
    },
    iconClass () {
      return {
        'shopCart_icon--inactive': !this.totalPrice,
        'shopCart_icon--active': this.totalPrice
      }
    },
    paymentClass () {
      return {
        'shopCart_payment--active': (this.totalPrice > this.info.minFee)
      }
    }
  },
  methods: {
    drop (target) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.elem = target
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.elem.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.transform = `translate3d(${x}px, ${y}px, 0)`
        }
      }
    },
    enter (el) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight // 触发重绘
      this.$nextTick(() => {
        el.style.transform = 'translate3d(0, 0, 0)'
      })
    },
    afterEnter (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    showFoodList () {
      this.isFoodListShow = !this.isFoodListShow
    },
    hideFoodList () {
      this.isFoodListShow = false
    },
    clearSelectedFoods () {
      this.selectedFoods.forEach(item => {
        item.count = 0
      })
      this.isFoodListShow = false
    },
    pay () {
      alert(`你需要支付${this.totalPrice}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .shopCart {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    height: 50px;
    width: 100%;
  }
  .shopCart-alert--outside {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    height: 25px;
    line-height: 25px;
    font-size: 11px;
    text-align: center;
    background-color: #fff1d0;
  }
  .shopCart_content--left {
    position: relative;
    width: 70px;
    background-color: #3b3b3c;
    z-index: 1;
    .shopCart_icon--active {
      background: url(//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/03098cb323a0263fdbbb102c696433c5.png);
    }
    .shopCart_icon--inactive {
      background: url(//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/c6896f9806bdcb2399cb680fb5dec8c0.png);
    }
    .shopCart_icon {
      position: absolute;
      bottom: 10px;
      width: 50px;
      height: 50px;
      margin: 0 10px;
      background-size: contain;
    }
    .shopCart_bubble {
      position: absolute;
      right: 0;
      top: 0;
      width: 15px;
      height: 15px;
      font-size: 10px;
      line-height: 15px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background-color: #fb4e44;
    }
  }
  .shopCart_content--center {
    flex: 1;
    background-color: #3b3b3c;
    z-index: 1;
  }
  .shopCart_deliveryPrice {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #999;
  }
  .shopCart_deliveryPrice--smaller {
    font-size: 14px;
    color: #999;
  }
  .shopCart_price {
    font-size: 0;
    color: #fff;
  }
  .shopCart_unit {
    font-size: 16px;
  }
  .shopCart_totalPrice {
    font-size: 24px;
  }
  .shopCart_content--right {
    width: 96px;
    z-index: 1;
    .shopCart_payment {
      padding: 0 10px;
      font-size: 16px;
      line-height: 50px;
      text-align: center;
      color: #999;
      background-color: #2e2d2d;
    }
    .shopCart_payment--active {
      background-color: #f8c74e;
      color: #333;
    }
  }
  .ball {
    position: fixed;
    left: 32px;
    bottom: 22px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #ffb000;
    z-index: 200;
  }
  .drop-enter-active {
    transition: all .4s linear;
  }
  .shopCart-list {
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    .shopCart-alert--inside {
      height: 25px;
      line-height: 25px;
      font-size: 11px;
      text-align: center;
      background-color: #fff1d0;
    }
    .shopCart-list_title {
      height: 30px;
      padding: 4px 15px;
      line-height: 30px;
      font-size: 12px;
      background-color: #f4f4f4;
    }
    .shopCart-list_clear:before {
      content: '';
      display: inline-block;
      width: 13px;
      height: 13px;
      margin-right: 6px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaBAMAAABbZFH9AAAAGFBMVEUAAABmZmZnZ2dtbW1mZmZnZ2dmZmZmZmbBwsy3AAAAB3RSTlMA54gcS6a2Y+y94QAAAGJJREFUGNNjAAPFciEGOGAqLy9XgPMYSxjcBSDi4uUwUKjAoF6OAEUM4g5wDSyFqDxUlWimMLAXgJVBGJi8chAcJDwklzEWQ3nmoKBhLTMAc5jTA0CkOMx7YFFTcQgnmIEBABeDPTvg/cSzAAAAAElFTkSuQmCC) no-repeat;
      background-size: contain;
      vertical-align: text-top;
    }
    .shopCart-list_clear {
      float: right;
    }
  }
  .shopCart-list_foodList {
    max-height: 250px;
    overflow: auto;
    background-color: #fff;
  }
  .shopCart-list_food {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 14px;
    padding: 14px 0;
    font-size: 16px;
  }
  .shopCart-list_foodName {
    flex: 2;
  }
  .shopCart-list_price {
    flex: 1;
    color: #fb4e44;
  }
  .shopCart-list_wrapper {
    position: relative;
    right: 0;
    bottom: -11px;
    min-width: 88px;
  }
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .fold-enter-active, .fold-leave-active {
    transition: all 0.5s;
  }
  .fold-enter, .fold-leave-to {
    transform: translate3d(0, 100%, 0);
  }
  .fold-enter-to, .fold-leave {
    transform: translate3d(0, 0, 0);
  }
</style>
