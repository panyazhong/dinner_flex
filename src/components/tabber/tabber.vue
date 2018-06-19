<template>
  <div class="flex" ref="tabber">
    <div v-bind:class="{is_active : tabber_progress == 'recommend' ? true : false}" @click="_tabber">
      <router-link to="/recommend">
        <img src="../../assets/recommend.png" alt="">
        <!--<img src="../../assets/recommend (1).png" alt="">-->
        推荐
      </router-link>
    </div>
    <div v-bind:class="{is_active : tabber_progress == 'menu_list' ? true : false}" @click="_tabber">
      <router-link to="/menu_list">
        <img src="../../assets/list.png" alt="">
        <!--<img src="../../assets/list (1).png" alt="">-->
        菜谱
      </router-link>
    </div>
    <div v-bind:class="{is_active : tabber_progress == 'menu_vote' ? true : false}" @click="_tabber">
      <router-link to="/menu_vote">
        <img src="../../assets/make.png" alt="">
        <!--<img src="../../assets/make (1).png" alt="">-->
        菜单投票
      </router-link>
    </div>
    <div v-bind:class="{is_active : tabber_progress == 'personal' ? true : false}" @click="_tabber">
      <router-link to="/personal">
        <img src="../../assets/personal.png" alt="">
        <!--<img src="../../assets/personal (1).png" alt="">-->
        我的
      </router-link>
    </div>
  </div>
</template>

<script>
  import * as dom from "../../common/js/dom";

  export default {
    name: "tabber",
    data() {
      return {
        tabber_progress: ''
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (localStorage.tabber_progress) {
          this.tabber_progress = localStorage.tabber_progress
        } else {
          this.tabber_progress = 'recommend'
        }
        this.$router.push(this.tabber_progress)
      })
    },
    methods: {
      _tabber(e) {
        e = e || window.event
        this.tabber_progress = e.target.hash.split('/')[1]
        localStorage.tabber_progress = this.tabber_progress
      }
    }
  }
</script>

<style scoped>
  .flex{
    flex-direction: row;
    justify-content: space-around;
    position: fixed;
    bottom: -1px;
    width: 100%;
    z-index: 999;
  }
  .flex>div{
    flex: 0 0 25%;
    background: rgb(84, 92, 100);
    box-sizing: border-box;
    padding: 5px
  }
  .flex>div.is_active{
    background: rgb(67, 74, 80);
  }
  .flex>div.is_active a{
    color: #fff;
  }
  .flex a {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: #cdcdcd;
    font: normal 13px/20px '微软雅黑';
  }
  .flex a img{
    align-self: center;
    width: 20px;
    height: 20px;
  }
</style>
