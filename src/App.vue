<template>
  <div id="app">
    <router-view/>
    <Loading></Loading>
  </div>
</template>

<script>
import Loading from './components/loading/Loading'
export default {
  components: {
    Loading
  }
}
</script>

<style lang="scss" scoped>
  #app {
    width: 100%;
    height: 100%;
  }
</style>
