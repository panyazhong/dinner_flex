<template>
  <div>
    <header>
      <span>+</span>
      <span>我</span>
      <span>
        <img src="../../assets/set.png" alt="">
      </span>
    </header>
    <content>
      <div class="info white-bg">
        <p>
          <strong>{{user.user_name}}</strong>
          <strong>...</strong>
        </p>
        <p @click="_goToEditPersonalInfo">
          <img src="../../assets/default_avator.png" alt="">
        </p>
      </div>
      <div class="fans  white-bg">
        <div>
          <p class=" font-sm">
            <span>0</span>
            <span>关注</span>
          </p>
          &nbsp;
          &nbsp;
          <p class="font-sm">
            <span>0</span>
            <span>粉丝</span>
          </p>
        </div>
        <p class="red-color font-sm" @click="_goToEditPersonalInfo">编辑个人资料</p>
      </div>
      <div class="flex person_nav font-sm white-bg">
        <div>菜谱</div>
        <div>我的收藏</div>
      </div>
    </content>
  </div>
</template>

<script>
  import {initHeight} from '@/common/js/initHeight'
  export default {
    name: "personal",
    data() {
      return {
        user: {}
      }
    },
    mounted() {
      this.$nextTick(() => {
        // initHeight()
        this._getUser()
      })
    },
    methods: {
      _getUser() {
        if (localStorage.loginUser) {
          this.user = JSON.parse(localStorage.loginUser)
        }
      },
      _goToEditPersonalInfo() {
        this.$router.push('personal_info')
      }
    }
  }
</script>

<style scoped>

  content div.info{
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 20px;
  }
  content div.info>p:first-of-type{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
  }
  content div.info>p:nth-of-type(2){
    width: 80px;
  }
  content div.info>p:nth-of-type(2) img{
    width: 100%;
    border-radius: 50%;
  }
  .fans{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(235,238,245);
    padding: 0px 10px 20px;
  }
  .fans>div{
    display: flex;
  }
  .fans>div>p{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .person_nav{
    flex-direction: row;
    justify-content: space-around;
    padding: 20px 0px;
    border-bottom: 1px solid rgb(235,238,245);
  }
</style>
