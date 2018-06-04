<template>
  <div id="app">
    <tabber></tabber>
    <router-view/>
  </div>
</template>

<script>
  import Tabber from '@/components/tabber/tabber'
  import {initHeight} from '@/common/js/initHeight'

  export default {
    name: 'App',
    mounted() {
      this.$nextTick(() => {
        // initHeight()
      })

    },
    methods: {},
    components: {
      Tabber
    }
  }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 50px 0px;
  background: rgb(240, 243, 244);
}
</style>
