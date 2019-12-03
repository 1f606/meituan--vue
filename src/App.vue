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
