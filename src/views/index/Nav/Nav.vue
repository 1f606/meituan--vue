<template>
  <div class="nav">
    <div class="nav-item" v-for="(item,index) in list" :key="index">
      <div class="nav-item_imgWrapper">
        <img :src="item.url" alt="" class="nav-item_img">
      </div>
      <p class="nav-item_name">{{item.name}}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Nav',
  props: {
    list: [Array]
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    margin: 50px 0 15px 0;
  }
  .nav-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20%;
    font-size: 0;
  }
  .nav-item_imgWrapper {
    margin-top: 10px;
  }
  .nav-item_img {
    width: 40px;
    height: 40px;
  }
  .nav-item_name {
    margin: 10px 0 0 0;
    font-size: 11px;
    text-align: center;
  }
</style>
