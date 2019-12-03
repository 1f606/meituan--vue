<template>
  <div class="ball" v-show="totalNumber > 0">{{totalNumber}}</div>
</template>

<script>
export default {
  name: 'Ball',
  props: {
    list: Array
  },
  computed: {
    totalNumber () {
      let number = 0
      this.list.forEach(item => {
        if (item.count) {
          number += item.count
        }
      })
      return number
    }
  }
}
</script>

<style lang="scss" scoped>
  .ball {
    position: absolute;
    top: 0;
    right: 0;
    width: 12px;
    height: 12px;
    line-height: 12px;
    font-size: 10px;
    border-radius: 50%;
    color: #fff;
    background-color: #fb4e44;
  }
</style>
