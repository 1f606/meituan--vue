<template>
  <div @scroll.passive="getLazyLoadData" class="comment">
    <div class="comment-shopInfo">
      <div class="comment-shopInfo_shopRateWrapper">
        <div class="comment-shopInfo_shopRate">{{this.data.shopScore}}</div>
        <div class="comment-shopInfo_shopRateText">商家评分</div>
      </div>
      <div class="comment-shopInfo_mainContent">
        <div class="comment-shopInfo_tasteWrapper">
          <span class="comment-shopInfo_tasteText">口味</span>
          <Star :starNumber="this.data.qualityScore"></Star>
          <span class="comment-shopInfo_tasteRate">{{this.data.qualityScore}}</span>
        </div>
        <div class="comment-shopInfo_packageWrapper">
          <span class="comment-shopInfo_packageText">包装</span>
          <Star :starNumber="this.data.packScore"></Star>
          <span class="comment-shopInfo_packageRate">{{this.data.packScore}}</span>
        </div>
      </div>
      <div class="comment-shopInfo_deliveryWrapper">
        <div class="comment-shopInfo_deliveryRate">{{this.data.deliveryScore}}</div>
        <div class="comment-shopInfo_deliveryText">配送评分</div>
      </div>
    </div>
    <div class="comment-details">
      <div class="comment-details_commentLabels clearFix">
        <div @click="initCommentList(item)" class="comment-details_commentLabel" :class="{ 'comment-details_commentLabel--active': item.isSelected}" v-for="(item, index) in this.labelList" :key="index">{{item.content}}</div>
      </div>
      <CommentItem :commentList="this.commentList"></CommentItem>
      <CommentItem :commentList="this.lazyLoadList"></CommentItem>
    </div>
    <div class="comment-warn" v-show="allListLoaded">——我是有底线的——</div>
  </div>
</template>

<script>
import axios from 'axios'
import Star from '../../../components/Star/Star'
import CommentItem from './commentItem/CommentItem'
export default {
  name: 'Comment',
  props: {
    id: String
  },
  /**
   * currentLabelId 页面初始化请求的是“全部”标签下的评论，“全部”标签的ID是0
   * @returns {{commentList: [], labelList: [], lazyLoadList: [], data: {}, currentLabelId: number}}
   */
  data () {
    return {
      commentList: [],
      labelList: [],
      data: {},
      lazyLoadList: [],
      currentLabelId: 0,
      readyToLoadId: 0,
      allListLoaded: false
    }
  },
  components: {
    Star,
    CommentItem
  },
  created () {
    axios.get('/static/comment/' + this.id + '.json').then(res => {
      this.data = res.data.data
      this.labelList = this.data.commentLabels
      this.readyToLoadId = this.data.commentLabels
      this.commentList = this.data.list
    })
  },
  methods: {
    getLazyLoadData (e) {
      if ((e.target.scrollHeight - 496) - e.target.scrollTop < 50) {
        this.getLazyLoadCommentList()
      }
    },
    initCommentList (item) {
      const _id = item.ID
      this.currentLabelId = _id
      this.readyToLoadId = _id
      for (let i = 0; i < this.labelList.length; i++) {
        this.labelList[i].isSelected = 0
      }
      item.isSelected = 1
      axios.get('/static/' + _id + '/' + _id + '.json').then((res) => {
        this.commentList = res.data.data.list
      })
      this.allListLoaded = false
    },
    getLazyLoadCommentList () {
      if (!this.allListLoaded) {
        axios.get('/static/' + this.currentLabelId + '/' + this.readyToLoadId + '.json').then(res => {
          this.lazyLoadList = res.data.data.list
          this.readyToLoadId++
        }).catch(error => {
          console.log(error)
          this.allListLoaded = true
        })
      }
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
  .comment {
    flex: 0 0 auto;
    width: 100vw;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    font-size: 13px;
    background: #f4f4f4;
  }

  .comment-shopInfo {
    display: flex;
    padding: 15px 0;
    margin-bottom: 15px;
    background-color: #fff;
  }
  .comment-shopInfo .comment-shopInfo_shopRateWrapper {
    flex: 0 0 auto;
    width: 48px;
    padding: 0 22px;
  }
  .comment-shopInfo .comment-shopInfo_shopRate {
    font-size: 27px;
    text-align: center;
    color: #ffb000;
  }
  .comment-shopInfo .comment-shopInfo_shopRateText {
    font-size: 12px;
    text-align: center;
    color: #999;
  }

  .comment-shopInfo .comment-shopInfo_mainContent {
    flex: 1;
  }
  .comment-shopInfo .comment-shopInfo_tasteWrapper {
    display: flex;
    align-items: center;
    margin: 3px 0 10px;
  }
  .comment-shopInfo .comment-shopInfo_tasteText {
    font-size: 13px;
    margin-right: 15px;
  }
  .comment-shopInfo .comment-shopInfo_tasteRate {
    margin-left: 10px;
    font-size: 14px;
    color: #ffb000;
  }

  .comment-shopInfo .comment-shopInfo_packageWrapper {
    display: flex;
    align-items: center;
  }
  .comment-shopInfo .comment-shopInfo_packageText {
    font-size: 13px;
    margin-right: 15px;
  }
  .comment-shopInfo .comment-shopInfo_packageRate {
    margin-left: 10px;
    font-size: 14px;
    color: #ffb000;
  }

  .comment-shopInfo .comment-shopInfo_deliveryWrapper {
    flex: 0 0 auto;
    width: 48px;
    padding: 0 22px;
    border-left: 1px solid #eee;
    color: #999;
  }
  .comment-shopInfo_deliveryRate {
    font-size: 27px;
    text-align: center;
  }
  .comment-shopInfo_deliveryText {
    font-size: 12px;
    text-align: center;
  }

  .comment-details {
    background-color: #fff;
  }
  .comment-details .comment-details_commentLabels {
    padding: 15px 15px 0;
    border-bottom: 1px solid #eee;
  }
  .comment-details .comment-details_commentLabel {
    float: left;;
    padding: 0 12px;
    margin: 0 10px 10px 0;
    height: 26px;
    line-height: 26px;
    font-size: 13px;
    border: 1px solid #bbb;
    border-radius: 20px;
    color: #666;
  }
  .comment-details .comment-details_commentLabel--active {
    color: #FFB000;
    border-color: #FFB000;
  }

  .comment-warn {
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-top: 1px solid #eee;
    font-size: 16px;
    color: #333;
    background-color: #fff;
  }
</style>
