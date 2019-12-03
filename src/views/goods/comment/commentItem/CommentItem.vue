<template>
  <ul class="comment-details_list">
    <li class="comment-details_item" v-for="(item, index) in this.commentList" :key="index">
      <div class="comment-details_imgWrapper">
        <div class="comment-details_profileImg"></div>
      </div>
      <div class="comment-details_mainContent">
        <div class="comment-details_nameAndData clearFix">
          <div class="comment-details_userName">{{item.userName}}</div>
          <div class="comment-details_commentDate">{{item.commentTime}}</div>
        </div>
        <div class="comment-details_deliveryTime">{{item.deliveryTime}}</div>
        <div class="comment-details_content">{{item.content}}</div>
        <div class="comment-details_foodImg" :style="{'background': 'url('+item.pictures[0].bigPicUrl+ ') no-repeat'}" v-if="item.pictures.length > 0"></div>
        <div class="comment-details_recommend" v-if="item.praiseDish">
          {{item.praiseDish}}
        </div>
        <div class="comment-details_reply" v-if="item.shopReply">{{item.shopReply}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    commentList: Array
  }
}
</script>

<style lang="scss" scoped>
  .comment-details .comment-details_item {
    display: flex;
    padding: 15px;
  }
  .comment-details .comment-details_imgWrapper {
    flex: 0 0 auto;
    margin-right: 10px;
  }
  .comment-details .comment-details_profileImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: url("//s3plus.sankuai.com/v1/mss_00c90c47614241978d32cca9bc6e44a4/h5i/userpic_defalut.c741e924.png") no-repeat;
    background-size: contain;
  }
  .comment-details_mainContent {
    flex: 1 1 auto;
  }
  .comment-details .comment-details_userName {
    float: left;
    height: 16px;
    line-height: 16px;
    font-size: 16px;
    color: #2f2f2f;
  }
  .comment-details_commentDate {
    float: right;
    color: #898989;
  }
  .comment-details_deliveryTime {
    margin-top: 10px;
    font-size: 12px;
    color: #666;
  }
  .comment-details_content {
    margin: 14px 0 8px;
    font-size: 14px;
  }
  .comment-details_foodImg {
    width: 80px;
    height: 80px;
    background: url("http://p0.meituan.net/wmcomment/433e0003387d108d3e436c75d8d9ad3a54624.jpg@160w_160h_1e_1c") center/contain no-repeat;
    font-size: 0;
  }
  .comment-details_recommend:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 50%;
    margin-bottom: -5px;
    display: block;
    height: 11px;
    width: 11px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAWCAMAAAAYXScKAAAAPFBMVEX///+pqamtra35+fnAwMDLy8vx8fHu7u7b29vExMT8/Pz19fXi4uK7u7u2trbl5eXf39/W1tbPz8+qqqppjO8pAAAAi0lEQVQY02XQ3Q6DIAxA4Z7y79RN9/7vulVMVHpuCB+kIUivNG1Zhgr/viMv7CERn5hYJplWHpdnNB9n9YZh7dvI+6atDwxKuLCiL1s3ehpfx6Nmw6yc2a1Ikkch0cSmDYwKyFBmFa+VJF4bs9dJCV4Li3jd2L327wA/1o5quOH5+R/GihhH5Uqj4Q/pNgLaSP0LZQAAAABJRU5ErkJggg==) no-repeat;
    background-size: contain;
  }
  .comment-details_recommend {
    position: relative;
    margin-top: 10px;
    height: 15px;
    line-height: 15px;
    text-indent: 19px;
    font-size: 12px;
    color: #999;
  }
  .comment-details_reply {
    margin-top: 10px;
    padding: 6px;
    font-size: 12px;
    color: #666;
    background-color: #f4f4f4;
  }
</style>
