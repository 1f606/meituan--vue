<template>
  <div class="loadingWrapper" v-show="this.$store.state.isLoadingShow">
    <div class="loading"></div>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="scss" scoped>
  .loadingWrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
    width: 50px;
    height: 50px;
    background: url("http://p0.meituan.net/codeman/d87f156f33b16fce436fd13783b61fba832.png") no-repeat;
    background-size: contain;
  }
  .loading {
    width: 25px;
    height: 25px;
    margin: 12.5px auto 0;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAC/UlEQVRYw+3Xz0uTcRzA8UedPyN/TGWgm5MiZTCnbWFeomnK0kOSCyHcIUWlOuhDl3bISyVWO3gSWRZUR2Hp0VOhniQQZDAIOsZ2eP6Idwe/rMfvnrk9z5QI/D6n72ff7/Pa8+H7U1FMFkZJk2ZUOe9CGoD0+UOinN0LBznkkMFiIWpx4qTWPHSEhsZP7MVAVODCjRuneSiFhobGSlGQHbdVaEFAGTyFICoF46bePFTFD0FtFoQcgmmnzMpwGBOQxt3TIOqy31NndeR9FdABVfkgymgXjMP6EPeQEdRTacJmsvX67PdUljKb3gkopUtoht+MZetOwdiLnZ677DIt/yvs/EJDI5m35zHkolyKl+HARw8NJ8P7pEiRYodhqcMdkhzJ0UIrAo14CRAgQI8xlCLFe66WtHjV0CUQA2iQAx2VZIkmS4iNDvw6pjdnCtPEEkkddsAt00wDfTrETwc244ZdfNJR30xDPTrmGjWnNx5mp2TIS2MxzSuZZp/vllLnw4fD0op3Uf59YYAt9qRniwHL72shSEh6grQoBswee2xZhnKZECGC+aDts4cG2M5hEiWkrtWAuk3rxSD9P2eWjXt8YAO/6Z5tTBDGI58fjBv3s0aCBAnipqEJIkSIMI7r9IZOXgikNChChJE8exL1zLGpY75YSt2kjpqin2q5yXU+65BN5izcCxRFoZp+pnTYpHSRYV3HvCyQ4cL77JCOChtDa9yUunl5wwrevK/tZJZZOqWoi3EBPTj5g58NPjIuH4+4xCpx4rzNC82hovJEPvNQjocw4SLvgDwkTpw4Md2RLEqUrmx9HhUVlaFSst3GuoBC2ViUZZaJZusBAS3SbB1aFMzrvyll+fjR3ccfCSpslekVTJw+XVSCFIUrAlItXQ6w8Uowz07EcyBF4b6ApqkwD40IZp32glAzC4K6YR6KCWhKihtAikJQQPNWoVUuFwXV8BgVlVkrQyFGDF9O3BBSFDqZYUZeIUqZW3mgs99/pQl7flA3UZ7TbbbfH2Ist6VkGxDNAAAAAElFTkSuQmCC") no-repeat;
    background-size: contain;
    animation: loading 1s linear infinite;
  }
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
