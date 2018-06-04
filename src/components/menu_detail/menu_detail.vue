<template>
  <div>
    <header>
      <span @click="_back">＜</span>
      <span>菜单详情</span>
      <span></span>
    </header>
    <div class="flex">
      <div class="panel">
        <img :src="detailData.pic" alt="">
        <p>
          <span>
            <strong>{{detailData.name}}</strong>
            <strong>{{detailData.date}}</strong>
          </span>
            <span>
            <img :src="detailData.avator" alt="">
            <strong>{{detailData.authorName}}</strong>
          </span>
        </p>
        <ul class="material">
          <p>用料：</p>
          <li v-for="item in detailData.material" style="display: flex;justify-content: space-around">
            <span>{{item.name}}</span>
            <span>:</span>
            <span>{{item.num}}</span>
          </li>
        </ul>
        <ul class="step">
          <p>步骤：</p>
          <li class="flex" v-for="item in detailData.step">
            <div>
              <span>{{item.name}}</span>
              <span>:</span>
              <span style="text-align: left">{{item.num}}</span>
            </div>
            <div>
              <img :src="item.stepPic" alt="">
            </div>
          </li>
        </ul>
        <button class="normal-bg">加入菜单</button>
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from '@/api/menu_detail'
  import Qs from 'qs'
  export default {
    name: "menu-detail",
    data() {
      return {
        detailData: {}
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._getMenuDetail()
      })
    },
    methods: {
      _getMenuDetail(id) {
        api.getMenuDetail()
          .then(resp => {
            if (resp.data.code == 200) {
              this.detailData = resp.data.data
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      _back() {
        this.$router.push('/menu_list')
      }
    }
  }
</script>

<style scoped>
  .flex{
    justify-content: center;
    margin-top: 10px;
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
  .panel p{
    display: flex;
    width: 100%;
    flex-direction: row;
    margin-left: 10px;
    justify-content: space-between;
  }
  .panel p span:first-of-type {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 20px;
    align-items: center;
    font: bold 16px/20px '微软雅黑'
  }
  .panel p span:first-of-type strong:nth-of-type(2) {
    font: bold 13px/20px '微软雅黑'
  }
  .panel p span:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
    align-items: center;
    font: normal 13px/20px '微软雅黑'
  }
  .panel p span:nth-of-type(2) img{
    width: 40px;
    height: 40px;
    border: 1px solid red;
    border-radius: 50%;
  }
  ul.material{
    width: 100%;
    margin-top: 10px;
  }
  ul.material>p, ul.step>p{
    font: bold 16px/20px '微软雅黑';
  }
  ul.material li span{
    width: 100%;
  }
  ul.step{
    margin-top: 20px;
  }
  ul.step li{
    flex-direction: row;
    padding: 10px 5px;
    border-bottom: 1px solid #ededed;
  }
  ul.step li>div:nth-of-type(1){
    flex-basis: 250px;
    text-align: left;
  }
  ul.step li>div:nth-of-type(1) span:nth-of-type(3){
    font-size: 13px;
  }
  ul.step li>div:nth-of-type(2) img{
    width: 100%;
  }
  button{
    padding: 10px;
    border: none;
    color: white;
    border-radius: 4px;
    margin: 10px;
    outline: none;
  }

</style>
