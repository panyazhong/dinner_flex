<template>
  <div class="flex login">
    <img src="../../assets/logo.png" alt="">
    <div class="login-input flex">
      <input type="text" placeholder="用户名" v-model="user.user_name">
      <input type="password" placeholder="密码" v-model="user.password">
      <span class="normal-color" @click="_goLogin">已有账号？去登陆！</span>
      <input type="button" class="normal-bg white-color" value="注册" @click="_reigister">
    </div>
  </div>
</template>

<script>
  import * as api from '@/api/register'
  import {ERR_OK} from "@/common/js/config";

  export default {
    name: "register",
    data() {
      return{
        user: {}
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$parent.$data.routePath = this.$route.path
      })
    },
    methods: {
      _reigister() {
        if (!this.user.user_name || !this.user.password) {
          alert('请填写完整信息')
          return
        }

        api.register(this.user)
          .then(resp => {
            if (resp.data.code == ERR_OK) {
              alert(resp.data.message)
              this.$router.push('/recommend')
            } else {
              alert(resp.data.message)
            }
          })
          .catch(err => {
            alert(err)
          })
      },
      _goLogin() {
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  span{
    font: normal 12px/20px '微软雅黑';
  }
</style>
