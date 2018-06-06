<template>
  <div>
    <header>
      <span></span>
      <span>推荐</span>
      <span></span>
    </header>
    <content class="recommend">
      <p>昨日菜单</p>
      <ul class="flex yesterday-menu ">
        <li v-for="item in 5" @click="_goMenuDetail">
          <div class="flex white-bg">
            <img src="../../assets/dish2.jpg" alt="">
            <span>鱼香肉丝</span>
          </div>
        </li>
      </ul>
      <p>今日推荐</p>
      <ul class="flex yesterday-menu ">
        <li v-for="item in 5" @click="_goMenuDetail">
          <div class="flex white-bg">
            <img src="../../assets/dish2.jpg" alt="">
            <span>鱼香肉丝</span>
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
      },
      _goMenuDetail() {
        this.$router.push({
          name: 'menuDetail',
          query: {
            id: 1
          }
        })
      }
    },
    components: {
      Search
    }
  }
</script>

<style scoped>
  p{
    margin-top: 10px;
  }
  .recommend{
    /*width: 80%;*/
    margin: 0px auto;
  }
  .yesterday-menu{
    border-top: 1px solid rgb(240, 243, 244);
    flex-direction: column;
  }
  .yesterday-menu li{
    height: 50px;
  }
  .yesterday-menu li div{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px 0px 0px;
    margin-top: 10px;
  }
  .yesterday-menu li div img{
    height: 40px;
  }
</style>
