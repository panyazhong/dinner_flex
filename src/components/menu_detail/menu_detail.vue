<template>
  <div>
    <header>
      <span @click="_back">＜</span>
      <span>菜单详情</span>
      <span></span>
    </header>
    <div class="flex">
      <div class="panel">
        <img :src="detailData.dish_pic" alt="">
        <p>
          <span>
            <strong>{{detailData.dish_name}}</strong>
            <strong>{{detailData.create_time}}</strong>
          </span>
            <span>
            <img :src="detailData.avator" alt="">
            <strong>{{detailData.authorName}}</strong>
          </span>
        </p>
        <ul class="material">
          <p>用料：</p>
          <li v-for="item in detailData.dish_material" style="display: flex;justify-content: space-around">
            <span>{{item.material_name}}</span>
            <span>:</span>
            <span>{{item.material_num}}</span>
          </li>
        </ul>
        <ul class="step">
          <p>步骤：</p>
          <li class="flex" v-for="(item, index) in detailData.dish_step">
            <div>
              <span>步骤{{index + 1}}</span>
              <span>:</span>
              <span style="text-align: left">{{item.step_desc}}</span>
            </div>
            <div>
              <img :src="item.step_pic" alt="">
            </div>
          </li>
        </ul>
        <div class="collect">
          <div v-bind:class="is_collect ? 'on' : 'heart'" @click="_operate(detailData.id)"></div>
          <button class="normal-bg" @click="_addToVote">加入菜单</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from '@/api/menu_detail'
  import * as code from '@/common/js/config'
  import Qs from 'qs'
  export default {
    name: "menu-detail",
    data() {
      return {
        detailData: {},
        is_collect: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._getMenuDetail()
        this.$parent.$data.routePath = this.$route.path
      })
    },
    methods: {
      _getMenuDetail() {
        let data = {
          id: this.$route.query.id,
          user_id: JSON.parse(localStorage.loginUser).user_id
        }
        api.getMenuDetail(data)
          .then(resp => {
            if (resp.data.code == code.ERR_OK) {
              let date = new Date(resp.data.data[0].create_time)
              resp.data.data[0].create_time = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
              this.detailData = resp.data.data[0]
              this.is_collect = resp.data.data[0].isCollected
            } else if (resp.data.code == code.LOGIN_ERR){
              alert(resp.data.message)
              this.$router.push('login')
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      _back() {
        this.$router.push(localStorage.dishDetailFrom)
      },
      _addToVote() {
        this.detailData.user_id = JSON.parse(localStorage.loginUser).user_id
        this.detailData.user_name = JSON.parse(localStorage.loginUser).user_name

        api.addToVote(this.detailData)
          .then(resp => {
            if (resp.data.code == 200) {
              alert(resp.data.message)
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
      _operate(id) {
        let data = {
          user_id: JSON.parse(localStorage.loginUser).user_id,
          dish_id: id
        }
        console.log(this.is_collect)
        if (this.is_collect) {
          this._cancelCollect(data)
        } else {
          this._collectDish(data)
        }
      },
      _collectDish(data) {
        api.collectDish(data)
          .then(resp => {
            if (resp.data.code == code.ERR_OK) {
              alert(resp.data.message)
              this.is_collect = true
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
      _cancelCollect(data) {
        api.cancelCollect(data)
          .then(resp => {
            if (resp.data.code == code.ERR_OK) {
              alert(resp.data.message)
              this.is_collect = false
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
  .panel>img{
    width: 100%;
    border-radius: 5px 5px 0px 0px;
  }
  .panel p{
    display: flex;
    width: 100%;
    margin-top: 10px;
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
    align-self: flex-start;
  }
  ul.material li span{
    width: 100%;
  }
  ul.step{
    width: 100%;
    margin-top: 20px;
  }
  ul.step li{
    flex-direction: row;
    padding: 3px 3px 3px 10px;
    border-bottom: 1px solid #ededed;
  }
  ul.step li>div:nth-of-type(1){
    flex-basis: 250px;
    text-align: left;
  }
  ul.step li>div:nth-of-type(1) span:nth-of-type(3){
    font-size: 13px;
  }
  ul.step li>div:nth-of-type(2){
    width: 50%;
  }
  ul.step li>div:nth-of-type(2) img{
    width: 90%;
    margin-top: 6px;
  }
  .collect{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .collect>div{
    width: 20px;
    height: 20px;
    margin-left: 20px;
  }
  .collect>div.heart{
    background: url('../../assets/heart_null.png');
    background-size: cover;
  }
  .collect>div.on{
    background: url('../../assets/heart_full.png');
    background-size: cover;
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
