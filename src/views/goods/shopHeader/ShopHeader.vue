<template>
  <div class="shop-header">
    <i @click="backToIndex" class="shop-header_backwardArrow"></i>
    <div class="shop-header_detail">
      <div class="shop-header_logoWrapper">
        <img class="shop-header_logo" :src="this.info.shopPic" alt="" >
      </div>
      <div class="shop-header_content">
        <div class="shop-header_delivery">
          <span class="shop-header_time">{{this.info.shipping_time}}</span>
          <span class="shop-header_column">|</span>
          <span class="shop-header_distance">{{this.info.distance}}</span>
        </div>
        <p class="shop-header_desc">{{this.info.bulletin}}</p>
        <div class="shop-header_discount">
          <i class="shop-header_icon"></i>
          <span class="shop-header_text">折扣商品1.67折起</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopHeader',
  props: {
    info: Object
  },
  methods: {
    backToIndex () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
  .shop-header {
    flex: 0 0 auto;
    max-height: 130px;
    background-color: #333;
  }
  .shop-header_backwardArrow {
    display: block;
    height: 40px;
    width: 40px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAYAAAEVsH/dAAAABGdBTUEAALGPC/xhBQAAAMJJREFUKBXFkrEOwjAMRFMkFujKB1Ti+5GYGahA/AMDS6X+AywovEu5BApCMGHpYvt8dtMkIcZYBRvJJbBsTIw9tT5zJDEnKYBoM0Oyq1hqmIWmNtasSMqY3EBAoX0pQtRA1khRErdCThzbi7hSWJpIHmIGZN8X5kNDnOZREHvQ/UBISssxtziA3IITeN6SBfYItHcdkKwH/2zg87qJA5CdQTkg7RlCAh2UrAPDE3j4oc+C+5R16n83wZPsEZbXbHLkbwE+Cry82MV2AAAAAElFTkSuQmCC) center no-repeat;
    transform: rotate(-180deg);
  }
  .shop-header_detail {
    display: flex;
    box-sizing: border-box;
    height: 80px;
    padding: 5px 0 0 10px;
    font-size: 0;
  }
  .shop-header_logoWrapper {
    margin-right: 10px;
    overflow: hidden;
  }
  .shop-header_logo {
    width: 85px;
    height: 64px;
  }
  .shop-header_content {
    flex: 1;
    overflow: hidden;
    font-size: 12px;
    color: #fff;
  }
  .shop-header_delivery {
    height: 16px;
    line-height: 16px;
  }
  .shop-header_column {
    margin: 0 8px 0 8px;
  }
  .shop-header_desc {
    height: 16px;
    margin: 5px 0 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .shop-header_discount {
    position: relative;
  }
  .shop-header_icon {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 7px;
    background: url("https://p0.meituan.net/activityconfig/3da2d9c7a4ddf89e4e71cfdfff168c391088.png");
    background-size: contain;
  }
  .shop-header_text {
    height: 15px;
    line-height: 15px;
    vertical-align: top;
  }
  .shop-header_text:after {
    content: '>';
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 5px;
    height: 9px;
    margin-right: 10px;
  }
</style>
