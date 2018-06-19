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
        this._checkIsLogin()
        this._pageProgress()
      })
      window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        localStorage.page_progress = scrollTop
      })
      window.addEventListener('keydown', (e) => {
        e = e || window.event
        if ((e.keyCode == 116) || (e.ctrlKey && e.keyCode == 82)) { //Ctrl + R
          e.keyCode = 0;
          e.returnValue = false;
        }
      })
    },
    methods: {
      _checkIsLogin() {
        if (!localStorage.loginUser) {
          alert('请先登录')
          this.$router.push('/login')
        }
      },
      _pageProgress() {
        let scrollTop = localStorage.page_progress
        if (window.pageYOffset) {
          window.pageYOffset = scrollTop
        } else if (document.documentElement.scrollTop) {
          document.documentElement.scrollTop = scrollTop
        } else {
          document.body.scrollTop = scrollTop
        }
      }
    },
    components: {
      Tabber
    }
  }
</script>
<style>
  body{
    background: rgb(240, 243, 244);
  }
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
