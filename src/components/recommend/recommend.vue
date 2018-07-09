<template>
  <div>
    <header>
      <span></span>
      <span>推荐</span>
      <span></span>
    </header>
    <content class="recommend">
      <div class="top-content">
        <img src="../../assets/dish1.jpg" alt="">
        <div class="types">
          <div @click="_showDishByType(1, '小炒')">
            <img src="../../assets/chaocai.png" alt="">
            热炒
          </div>
          <div @click="_showDishByType(2, '凉拌')">
            <img src="../../assets/liangcai.png" alt="">
            凉拌
          </div>
          <div @click="_showDishByType(3, '汤羹')">
            <img src="../../assets/soul.png" alt="">
            汤羹
          </div>
        </div>
        <div class="types">
          <div @click="_showDishByType(4, '主食')">
            <img src="../../assets/noodle.png" alt="">
            主食
          </div>
          <div @click="_showDishByType(5, '小吃')">
            <img src="../../assets/xiaochi.png" alt="">
            小吃
          </div>
          <div @click="_showDishByType(6, '甜点')">
            <img src="../../assets/sweet.png" alt="">
            甜点
          </div>
        </div>
      </div>
      <div class="new_dish_title">
        <div>新上菜品</div>
        <img class='dish-pic' src="../../assets/next.png" alt="">
      </div>
      <div class="new_dish_item">
        <div v-for="item in dishs" @click="_showMenuDetail(item)">
          <img class="dish-pic" :src="item.dish_pic" alt="">
          <div>
            <div>
              <p>{{item.dish_name}}</p>
              <p>{{item.create_time}}</p>
            </div>
            <div>{{item.dish_desc}}</div>
            <div>
              <p>难度系数</p>
              <div class="star-pos">
                <div class="stars" v-bind:class="{on: item.dish_difficulty >= 1}"></div>
                <div class="stars" v-bind:class="{on: item.dish_difficulty >= 2}"></div>
                <div class="stars" v-bind:class="{on: item.dish_difficulty >= 3}"></div>
                <div class="stars" v-bind:class="{on: item.dish_difficulty >= 4}"></div>
                <div class="stars" v-bind:class="{on: item.dish_difficulty >= 5}"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </content>
  </div>
</template>

<script>
  import Search from '@/base/search/search'
  import * as api from '@/api/recommend'
  import * as code from '@/common/js/config'
  import {initHeight} from '@/common/js/initHeight'
  export default {
    name: "recommend",
    data() {
      return {
        searchdata: '',
        dishs: []
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$parent.$data.routePath = this.$route.path
        this._getNewestDish()
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
      },
      _getNewestDish() {
        api.getNewestDish()
          .then(resp => {
            if (resp.data.code == code.ERR_OK) {
              for (let i = 0; i < resp.data.data.length; i++) {
                let date = new Date(resp.data.data[i].create_time)
                resp.data.data[i].create_time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
              }
              this.dishs = resp.data.data
            } else if (resp.data.code == code.LOGIN_ERR) {
              alert(resp.data.message)
              this.$router.push('login')
            } else {
              alert(resp.data.message)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      _showMenuDetail(item) {
        localStorage.dishDetailFrom = 'recommend'
        this.$router.push({
          path: '/menu_detail',
          query: {id: item.id}
        })
      },
      _showDishByType(type_id, type_name) {
        this.$router.push({
          path: '/type_dish',
          query: {
            type_id: type_id,
            type_name: type_name
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
  .top-content{
    background: #fff;
  }
  .top-content>img{
    width: 100%;
  }
  .types{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-size: 13px;
    margin-top: 20px;
  }
  .types:last-of-type{
    padding-bottom: 20px;
  }
  .types image{
    width: 32px;
    height: 32px;
  }
  .types>div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .new_dish_title{
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .new_dish_title img{
    width: 15px;
    height: 15px;
  }
  .new_dish_item{
    padding: 10px;
  }
  .new_dish_item>div{
    padding: 10px;
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 5px;
  }
  .new_dish_item>div img.dish-pic{
    display: block;
    width: 100px;
    height: 100px;
  }
  .new_dish_item>div>div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 200px;
  }
  .new_dish_item>div>div>div:first-of-type{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-self: center;
  }
  .new_dish_item>div>div>div:first-of-type p:nth-of-type(2){
    font-size: 12px;
    color: #ccc;
  }
  .new_dish_item>div>div>div:first-of-type p:first-of-type{
    color: #333;
    margin-left: 10px;
  }
  .new_dish_item>div>div>div:nth-of-type(2){
    font-size: 14px;
    margin-left: 10px;
    color: #666;
    text-align: left;
  }
  .new_dish_item>div>div>div:nth-of-type(3){
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .new_dish_item>div>div>div:nth-of-type(3)>p:first-of-type{
    color: #333;
    margin-left: 10px;
    font-size: 14px;
  }
  .new_dish_item>div>div>div:nth-of-type(3)>div{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .stars{
    background:url("../../assets/star_null.png");
    width: 14px;
    height: 14px;
    background-size: contain;
    transition: 600ms;
  }
  .on{
    background:url("../../assets/star_full.png");
    width: 14px;
    height: 14px;
    background-size: contain;
  }
</style>
