<template>
  <div class="order">
    <div v-for="(item, index) in this.orderList" :key="index" class="order-item">
      <div class="order-item_title">
        <img :src="item.poi_pic" alt="" class="order-item_icon">
        <div class="order-item_name">{{item.poi_name}}</div>
        <i class="order-item_arrow"></i>
      </div>
      <div class="order-item_detailed">
        <p v-for="(item, index) in item.product_list" :key="index">
          <span>{{item.product_name}}</span>
          <span class="order-item_quantity">x{{item.product_count}}</span>
        </p>
        <p class="order-item_bill">
          <span class="order-item_time">2019-09-01 14:19</span>
          <span class="order-item_money">实付￥{{item.total}}</span>
        </p>
      </div>
      <div class="order-item_bar clearFix">
        <span class="order-item_status">订单已完成</span>
        <a class="order-item_orderTakeAway">再来一单</a>
        <a class="order-item_delete">删除</a>
      </div>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import axios from 'axios'
import TabBar from './TabBar/TabBar'
export default {
  name: 'Order',
  components: {
    TabBar
  },
  data () {
    return {
      orderList: []
    }
  },
  mounted () {
    this.getOrder()
    window.onbeforeunload = function () {
      //  刷新后页面自动回到顶部
      document.documentElement.scrollTop = 0//  ie下
      document.body.scrollTop = 0// 非ie
    }
  },
  methods: {
    getOrder () {
      axios.get('/static/orders.json').then(res => {
        this.orderList = res.data.data.digestlist
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .clearFix:after {
    content: '';
    display: block;
    clear: both;
  }
  p {
    margin: 0;
    padding: 0;
  }
  .order-item_title {
    padding: px2rem(10px) 0;
    font-size: px2rem(16px);
    margin-left: px2rem(15px);
    .order-item_icon {
      width: px2rem(35px);
      height: px2rem(35px);
      border-radius: 50%;
    }
    .order-item_name {
      display: inline-block;
      max-width: px2rem(200px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-left: px2rem(10px);
      vertical-align: super;
    }
  }
  .order-item_arrow {
    float: right;
    display: inline-block;
    width: px2rem(10px);
    height: px2rem(10px);
    border: #999 solid 2px;
    border-left: none;
    border-top: none;
    transform: rotateZ(-45deg);
    margin: px2rem(15px) px2rem(14px) 0 px2rem(15px);
  }

  .order-item_detailed {
    padding: px2rem(10px) px2rem(14px) px2rem(10px) 0;
    font-size: px2rem(14px);
    color: #000;
    line-height: 1.8em;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-left: px2rem(15px);;
  }
  .order-item_quantity {
    float: right;
  }
  .order-item_time {
    font-size: px2rem(12px);
    color: #999;
  }
  .order-item_money {
    float: right;
  }
  .order-item_bar {
    padding: px2rem(10px) 0 px2rem(10px) px2rem(15px);;
    font-size: px2rem(14px);
    border-bottom: 1px solid #eee;
  }
  .order-item_status {
    color: #999;
  }
  .order-item_delete {
    float: right;
    background-color: #fff;
    border: 1px solid #eee;
    padding: px2rem(5px) px2rem(10px);
    margin-right: px2rem(15px);
  }
  .order-item_orderTakeAway {
    float: right;
    background-color: #ffd161;
    border: 1px solid #eee;
    padding: px2rem(5px) px2rem(10px);
    margin-right: px2rem(15px);
  }
</style>
