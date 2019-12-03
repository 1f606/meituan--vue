<template>
  <div class="info">
    <div class="info-itemWrapper">
      <div class="info-itemWrapper_item item--location">{{this.shopInfo.shopAddress}}</div>
      <div class="info-addressWrapper_call"></div>
    </div>
    <div class="info-itemWrapper">
      <div class="info-itemWrapper_item item--security">查看食品档案</div>
    </div>
    <div class="info-itemWrapper">
      <div class="info-itemWrapper_item item--time">
        配送时间：9.00-24.00
      </div>
    </div>
    <div class="info-itemWrapper">
      <div class="info-itemWrapper_item item--tip">
        {{this.shopInfo.tip}}
      </div>
    </div>
    <div class="info-itemWrapper">
      <div class="info-itemWrapper_item item--serve">
        商家服务
      </div>
      <div class="info-itemWrapper_iconWrapper" v-for="(item, index) in this.shopInfo.activityList" :key="index">
        <div class="info-itemWrapper_icon" :style="{'background': 'url(' + item.iconUrl + ') center/contain no-repeat'}"></div>
        {{item.actDesc}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: {
    shopInfo: Object
  }
}
</script>

<style lang="scss" scoped>
  .info {
    flex: 0 0 auto;
    width: 375px;
    font-size: 16px;
  }
  .info-itemWrapper {
    position: relative;
    padding: 15px 15px;
  }
  .info-itemWrapper_iconWrapper {
    margin-top: 8px;
  }
  .item--location:before {
    content: '';
    position: absolute;
    display: block;
    left: 15px;
    top: 18px;
    width: 14px;
    height: 16px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAgCAMAAAA2a+hwAAAAV1BMVEUAAACrq6uqqqqrq6uvr6+qqqqsrKysrKyqqqqsrKyurq6tra2qqqqrq6urq6usrKyxsbGqqqqrq6urq6urq6uqqqqqqqqrq6urq6urq6urq6uqqqqqqqptythVAAAAHHRSTlMA9dHCCYNBTN4vGSPsj2hFD6lgd3Tly7Z6VDyiLLeTfQAAASlJREFUKM91UlGWgyAMJICAqK1WrdrO/c+5aXhK2WXnJy8ZMkwC6oR1gwlEwQzOqhJ27nGhnwvaM6Ub11nbuUYz7TM3AOae07sBhszRogosdLIz6GzLzYT5EzvCIYWx0US6SWYOUMdhw1tSFyAITtI3Nm4EReEA42P0BhA2Ejq1Y5JBAxolaBBEecKuDI5UMqcZk44dXAnczdC45vbQYhRBEUSEEE8yguQiDj3GOjmiZ722LtviyaYedUMPHsOn6vhnFMNadkVbW0KLlc/c8Kytz+D2Cc8UlM2Lzy0tEQtnlLUFeiy5UeN6/gmbLcgN0/fB4ZsbCqm4Ys/ZjLUrDSTLyehvgy+SNcrayFX+20M4+YsV9iaaXlXgCPtS7ZN7e6B/qX/Qal34/AGEtRT7yCXlzQAAAABJRU5ErkJggg==") no-repeat;
    background-size: contain;
    vertical-align: bottom;
  }
  .item--location {
    border-right: 1px solid #eee;
  }
  .info-itemWrapper_item {
    margin: 0 35px 0 20px;
    line-height: 20px;
  }
  .info-addressWrapper_call {
    position: absolute;
    right: 15px;
    top: 10px;
    display: block;
    width: 20px;
    height: 20px;
    margin: 10px 0 0 10px;
    background: url(//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/25e14d800434e9a9d3ee9148dd6b033f.png);
    background-size: contain;
  }
  .item--security:before{
    content: '';
    position: absolute;
    display: block;
    left: 15px;
    top: 18px;
    width: 14px;
    height: 16px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAe1BMVEUAAACsrKyrq6u8vLyrq6uqqqqurq6rq6uqqqqurq6rq6uqqqqrq6urq6urq6urq6urq6utra2qqqqrq6urq6urq6usrKyvr6+qqqqrq6urq6urq6uurq6rq6uqqqqqqqqqqqqrq6urq6uqqqqurq6rq6utra2tra2qqqpQWWHrAAAAKHRSTlMAa5UFpvkR9vIJxu3ey2FaSyrmiHNELxy1f2Y3INfQvq+ajHolUT0Y1wVGwAAAAV5JREFUOMt9k+l6gyAQRTGAu8bdqM2+nfd/whZJ22hMzg/9Zu6dEYQRE/K+Sr/EO77OWwxh7y6obh8CkTodfNCbdTBRg+tBg6cyaYL1RoOvavkrt8d50d0JgaJ0bfMCEucuply6LSRjk4rwIpYYYjLzXuEs6laZGzLVfDS0mlh+MqyA9IPh4tERu8sGd5X4oMQWorBbMHRAlOTiuvOA7NVQQ2k7yw1+u7CGHs6jrvBvz584mbwhhfzntcYfbELZHVWoR2tNIFwxsBOWnV3Kja2Nc+Jmo485WtpL4HEfCwvqMbHGA8zDHp5DaCsr9g8D+jQoIB8LzWHaVoVdjDyVZnfNqhrTJYl4kOI1Yk6Gvv0FR+J2pjcR1X8kQ+LpOAwRanLpE4r8Ka59DsF0LPZ4/V/DTqOkmBIoOLh2wkIoxSuOpqjN7/CJrmKJZgeq3sP+3fzKswdEqXhPe0zK2Wh/A7mFImCuxPBKAAAAAElFTkSuQmCC") no-repeat;
    background-size: contain;
    vertical-align: bottom;
  }
  .item--time:before {
    content: '';
    position: absolute;
    display: block;
    left: 15px;
    top: 18px;
    width: 14px;
    height: 16px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAS1BMVEUAAACsrKy1tbWqqqqrq6v///+rq6urq6urq6urq6urq6uurq6qqqqrq6usrKyqqqqrq6uqqqqqqqqrq6urq6uqqqqsrKywsLCqqqqPxk2bAAAAGHRSTlMAZQfy5wKLvamAUCrhcjmUQtbZokbKJg4RvoWNAAAA8ElEQVQoz4WTWZLDIAxEBWIxxgtekvT9TzqumQFFSRz3DxSvqiW0UJOfQlyZ1xgmT6+yo0OTG62m/QBwZ0rOxXQMDD2JfAKcsc3JOCD5RjsgKDs7A1vlCTD0IgOk/7hCNe9/jQaE9hhju84Y7HGMcBIXkPgO45GXO6wVFnvnaQLbz9gyJgroSGFRh0AR5gwbRFpRzvCOhRj5DGfwG75rrM1vQHg8m+vUHhvAxrfU6sfE8TBYSv1YK4uod0CpZWlFFdl0u9eitpaIpCV/DZ01kIZejcP1MJHfgPl9FL8P8oc12HPeZQ2ul0iv4MK8qBX8Aa70EZDD+3G4AAAAAElFTkSuQmCC") no-repeat;
    background-size: contain;
    vertical-align: bottom;
  }
  .item--tip:before {
    content: '';
    position: absolute;
    display: block;
    left: 15px;
    top: 18px;
    width: 14px;
    height: 16px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAATlBMVEUAAACYmJiYmJibm5uYmJiXl5ezs7OXl5eXl5eYmJiYmJiYmJiZmZmgoKCYmJiYmJiZmZmZmZmbm5ufn5+Xl5eYmJiZmZmYmJiampqXl5fFk318AAAAGXRSTlMAVKso+bYG6tzTS346FuW+cGgcEJKHW5sw6MqDlgAAAMFJREFUKM9909sSgyAMRdGDRGxFtF7b8/8/2po6iuPE/URYb2HAtfRqYNdUlGRqLRTWN/ou6AxdhBNM7skZJr/ICJMj2cPkmbLg4Djo4OdC6ygOBzs+0qrCLamR8fhkqedycdoHOWPQ7Ty5X58Zkd3K3uCREm4YLYc7rphu2LMFOjqD35x0z49/RThxQ/EAJuFWGTIeWkadgtea6ucH9+wC8vzqO6MfgatbD3q4su3KtivbXiqbTtawvaUk2I3ZF/wCwVMN845HN1gAAAAASUVORK5CYII=") no-repeat;
    background-size: contain;
    vertical-align: bottom;
  }
  .item--tip {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item--serve:before {
    content: '';
    position: absolute;
    display: block;
    left: 15px;
    top: 18px;
    width: 14px;
    height: 16px;
    background: url("//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/bc2175e8adc4beec375977e424b1f542.png") no-repeat;
    background-size: contain;
    vertical-align: bottom;
  }
  .info-itemWrapper_icon {
    content: '';
    display: inline-block;
    width: 14px;
    height: 16px;
  }
</style>
