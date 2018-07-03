<template>
  <div class="flex login">
    <img src="../../assets/logo.png" alt="">
    <div class="login-input flex">
      <input type="text" placeholder="用户名" v-model="user.user_name">
      <input type="password" placeholder="密码" v-model="user.password">
      <span class="normal-color" @click="_goRegister">没有账号？请注册！</span>
      <input type="button" class="normal-bg white-color" value="登录" @click="_login">
    </div>
  </div>
</template>

<script>
  import * as api from '@/api/login'
  import {ERR_OK} from '@/common/js/config'
  export default {
    name: "login",
    data() {
      return {
        user: {}
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$parent.$data.routePath = this.$route.path
      })
    },
    methods: {
      _login() {
        if (!this.user.user_name || !this.user.password) {
          alert('请填写完整信息')
          return
        }

        api.login(this.user)
          .then(resp => {
            if (resp.data.code == ERR_OK) {
              localStorage.loginUser = JSON.stringify(resp.data.data)
              this.$router.push('/recommend')
            } else {
              alert(resp.data.message)
            }
          })
          .catch(err => {
            console.log(err)
          })

      },
      _goRegister() {
        this.$router.push('/register')
      }
    }
  }
</script>

<style scoped>
  span{
    font: normal 12px/20px '微软雅黑';
  }
</style>
