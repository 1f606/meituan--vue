<template>
  <div class="cartControl">
    <transition name="move">
      <div @click.stop="decreaseCart" class="cartControl-minus" v-show="dish.count > 0">
        <div class="cartControl-minus_rotate"></div>
      </div>
    </transition>
    <div class="cartControl-total" v-show="dish.count > 0">{{dish.count}}</div>
    <div @click.stop="addCart" class="cartControl-plus" ></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'CartControl',
  props: {
    dish: Object
  },
  methods: {
    addCart (event) {
      if (!this.dish.count) {
        Vue.set(this.dish, 'count', 1)
      } else {
        this.dish.count++
      }
      this.$emit('cartAdd', event.target)
    },
    decreaseCart () {
      if (this.dish.count > 0) {
        this.dish.count--
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .cartControl {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 0;
    height: 25px;
    line-height: 25px;
  }
  .cartControl-minus {
    display: inline-block;
  }
  .cartControl-minus_rotate {
    display: inline-block;
    width: 25px;
    height: 25px;
    vertical-align: bottom;
    border-radius: 50%;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAM1BMVEX////Z296wsLD6+vvo6evi5Obe3+Lr7O709fb5+fr3+Pjb3eDw8fLu7/Hl5+nk5ui5ubmS1nTyAAABG0lEQVRIx52WWXLEIAxEeUGSGeNl7n/aME6lUmQWm+5f+5l2A5LSC+XFPCrUcFtyuqDbFHSK6XaCzE7TvpZ8LFnWnSafPyB5g2oldSpWYXvrcgKmkQdNDpbfWDDwVwEE8cH6HMRTIAX8Y7rZofxbByydyKBfKx7MORV9Bn4CPL82EfkKlOMv+QxzuqQZfr++YemijK3Dz9Sb8mb0sib8Z4tqGlDldrA2AtnhKygjUCGOX0tDesS2sI9BO0vzuI5BK5acMgYVPAV5DMpEy71P9P71pHu/J9REDzXmBdVDSJBkTwpCilzaXOkYSQdWuRrSJZSuu1JYpBKmFEupLCsNQGk1SlOT2qfSqJWRQBg+lDFHG6j00U0fEqVx9BvALAkNabHL3QAAAABJRU5ErkJggg==") no-repeat;
    background-size: contain;
  }
  .cartControl-total {
    display: inline-block;
    margin: 0 10px 0;
    vertical-align: bottom;
    font-size: 16px;
    color: #333;
  }
  .cartControl-plus {
    display: inline-block;
    width: 25px;
    height: 25px;
    vertical-align: bottom;
    border-radius: 50%;
    background: url("http://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/318c525df8eba9c557594305c44b2ddf.png") no-repeat;
    background-size: contain;
  }
  .move-enter-to, .move-leave {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(0);;
  }
  .move-enter-active, .move-leave-active {
    transition: all 0.4s linear;
  }
  .move-enter, .move-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translate3d(24px, 0, 0) rotate(180deg);
  }
</style>
