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
        menuList: [
          // {
          //   id: 1,
          //   pic: dish1,
          //   name: '鱼香茄子',
          //   author: 'dapan'
          // },
          // {
          //   id: 2,
          //   pic: dish2,
          //   name: '牛腩豆角',
          //   author: 'urzz'
          // },
          // {
          //   id: 3,
          //   pic: dish3,
          //   name: '绝味三丁',
          //   author: 'trusturzz'
          // },
          // {
          //   id: 4,
          //   pic: dish4,
          //   name: '拍黄瓜',
          //   author: 'Mr.liu'
          // },
          // {
          //   id: 5,
          //   pic: dish5,
          //   name: '辣椒炒肉',
          //   author: 'Mr.dapanpro'
          // },
          // {
          //   id: 6,
          //   pic: dish6,
          //   name: '鸡胗',
          //   author: 'flyer'
          // },
          // {
          //   id: 7,
          //   pic: dish7,
          //   name: '水芹肉丝',
          //   author: 'Mrs.fly'
          // },
          // {
          //   id: 8,
          //   pic: dish8,
          //   name: '凉拌三丝',
          //   author: 'dapanpro'
          // },
          // {
          //   id: 9,
          //   pic: dish9,
          //   name: '美味猪耳',
          //   author: 'Mr.panyazhong'
          // },
          // {
          //   id: 10,
          //   pic: dish10,
          //   name: '青椒肉棒',
          //   author: 'Mr.Pan'
          // }
        ]
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
          query: {id: item}
        })
      },
      _getDish() {
        api.getDish()
          .then(resp => {
            console.log(resp)
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
