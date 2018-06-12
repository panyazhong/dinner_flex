<template>
  <div class="menu flex">
    <search ref="search" v-on:searchData="searchData"></search>
    <!--<button @click="_count">count</button>-->
    <div id="result"></div>
    <div class="menu-list">
      <div class="panel" v-for="item in menuList" :key="item.id" @click="_showMenuDetail(item)">
        <img :src="item.dish_pic" alt="">
        <p>
          <span>{{item.dish_name}}</span>
          <span>
            <img src="../../assets/loginUser.png" alt="">
            <strong>{{item.dish_author}}</strong>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from '@/base/search/search'
  import dish1 from '@/assets/dish1.jpg'
  import dish2 from '@/assets/dish2.jpg'
  import dish3 from '@/assets/dish3.jpg'
  import dish4 from '@/assets/dish4.jpg'
  import dish5 from '@/assets/dish5.jpg'
  import dish6 from '@/assets/dish6.jpg'
  import dish7 from '@/assets/dish7.jpg'
  import dish8 from '@/assets/dish8.jpg'
  import dish9 from '@/assets/dish9.jpg'
  import dish10 from '@/assets/dish10.jpg'
  import * as api from '@/api/dish'
  import {initHeight} from '@/common/js/initHeight'

  export default {
    data() {
      return {
        searchdata: '',
        list: 10,
        menuList: []
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._getDish()
      })
    },
    watch: {

    },
    methods: {
      searchData: function (val) {
        this.list = val
      },
      _showMenuDetail(item) {
        this.$router.push({
          path: '/menu_detail',
          query: {id: item.id}
        })
      },
      _getDish() {
        api.getDish()
          .then(resp => {
            if (resp.data.code == 200) {
              this.menuList = resp.data.data
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      _count() {

      }
    },
    components: {
      Search
    }
  }
</script>

<style scoped>
  .menu-list{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .panel{
    width: 80%;
    align-items: center;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  .panel img{
    width: 100%;
    margin-bottom: 10px;
    border-radius: 5px 5px 0px 0px;
  }
  .panel p{
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
  .panel p span:first-of-type {
    display: flex;
    margin-left: 10px;
    align-items: center;
    font: bold 16px/20px '微软雅黑'
  }
  .panel p span:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 10px;
    align-items: flex-end;
    font: normal 13px/20px '微软雅黑'
  }
  .panel p span:nth-of-type(2) img{
    width: 30px;
    height: 30px;
    border: 1px solid red;
    border-radius: 50%;
  }
</style>
