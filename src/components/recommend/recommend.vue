<template>
  <div>
    <header>
      <span></span>
      <span>推荐</span>
      <span></span>
    </header>
    <content>
      <p>昨日菜单</p>
      <ul>
        <li>
          <div>
            <img src="../../assets/logo.png" alt="">
            <span>aa</span>
            <span>aa</span>
          </div>
        </li>
        <li>
          <div>
            <img src="../../assets/logo.png" alt="">
            <span>aa</span>
            <span>aa</span>
          </div>
        </li>
      </ul>

    </content>
  </div>
</template>

<script>
  import Search from '@/base/search/search'
  import {initHeight} from '@/common/js/initHeight'
  export default {
    name: "recommend",
    data() {
      return {
        searchdata: ''
      }
    },
    mounted() {
      this.$nextTick(() => {
        // initHeight()
      })
    },
    watch: {

    },
    methods: {
      searchData: function (val) {
        console.log(val)
      }
    },
    components: {
      Search
    }
  }
</script>

<style scoped>
</style>
