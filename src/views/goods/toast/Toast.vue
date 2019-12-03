<template>
  <div v-show="isToastShow" class="toast">
    <div class="toast-content">
      <div class="toast-content_food">
        <img :src="this.item.bigImageUrl" alt="img" class="toast-content_img">
        <div class="toast-content_name">{{this.item.spuName}}</div>
        <div class="toast-content_salesVolume">
          <span>月售{{this.item.saleVolume}}</span>
          <span class="toast-content_like">赞{{this.item.praiseNum}}</span>
        </div>
        <div class="toast-content_price">
          {{this.item.currentPrice}}
          <div @click="addCart" class="toast-content_addCart" v-if="!this.item.count">加入购物车</div>
          <div class="cartControlWrapper " v-else>
            <CartControl :dish="this.item"></CartControl>
          </div>
        </div>
      </div>
      <div @click="hideToast" class="toast-content_close"></div>
    </div>
    <div @click="hideToast" class="background"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import CartControl from '../cartControl/CartControl'
export default {
  name: 'Toast',
  components: {
    CartControl
  },
  props: {
    item: Object
  },
  data () {
    return {
      isToastShow: false
    }
  },
  methods: {
    toggle () {
      this.isToastShow = !this.isToastShow
    },
    hideToast () {
      this.isToastShow = false
    },
    addCart (event) {
      if (!this.item.count) {
        Vue.set(this.item, 'count', 1)
      } else {
        this.item.count++
      }
      this.$emit('cartAdd', event.target)
    }
  }
}
</script>

<style lang="scss" scoped>
  .toast {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(20px);
  }
  .toast-content {
    position: relative;
    box-sizing: border-box;
    width: 84vw;
    height: 59vh;
    z-index: 1;
  }
  .toast-content_food {
    background-color: #fff;
  }
  .toast-content_img {
    width: 100%;
    height: 35vh;
  }
  .toast-content_name {
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    padding: 0 17px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .toast-content_salesVolume {
    height: 15px;
    line-height: 15px;
    font-size: 11px;
    padding: 10px 17px;
  }
  .toast-content_like {
    margin-left: 15px;
  }
  .toast-content_price {
    background-color: #fafafa;
    padding: 10px 17px;
    font-size: 24px;
    color: #fb4e44;
  }
  .toast-content_addCart {
    float: right;
    width: 60px;
    height: 25px;
    padding: 0 15px;
    border-radius: 25px;
    line-height: 25px;
    font-size: 12px;
    text-align: center;
    background: #FFD161;
    color: #333;
  }
  .cartControlWrapper {
    position: relative;
  }
  .toast-content_close {
    position: absolute;
    top: 55vh;
    left: 50%;
    margin: 0 0 0 -20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-image: url(http://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/df125964473c5a2c4edadb74d8a11995.png);
    background-size: contain;
  }
</style>
