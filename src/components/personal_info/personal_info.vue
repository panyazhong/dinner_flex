<template>
  <div>
    <header>
      <span @click="_back">＜</span>
      <span>编辑个人资料</span>
      <span class="white-color font-md" @click="_saveInfo">保存</span>
    </header>
    <content>
      <div class="avator">
        <p>
          <img :src="user.user_avatar" alt="">
        </p>
        <p>
          <label for="">上传头像</label>
          <input type="file" name="" id="file" @change="preview" class="avator-input">
          <!--<form action="http://localhost:3000/upload" method="post" enctype="multipart/form-data">-->
            <!--<input type="file" name="content" />-->
            <!--<br />-->
            <!--<input type="submit" value="上传文件" />-->
          <!--</form>-->
        </p>
      </div>
      <div class="flex info_form white-bg">
        <input type="text" placeholder="昵称" v-model="user.user_name">
        <div class="flex sex">
          <input type="date" class="birth" placeholder="生日" v-model="user.user_birth">
          <p class="font-md">
            <span @click="_choose" v-bind:class="{active:isActive == 1 ? true : false}" data-index="1">男</span>
            <span @click="_choose" v-bind:class="{active:isActive == 2 ? true : false}" data-index="2">女</span>
          </p>
        </div>
        <textarea placeholder="个人简介" v-model="user.user_desc"></textarea>
      </div>
    </content>
  </div>
</template>

<script>
  import {initHeight} from '@/common/js/initHeight'
  import * as api from '@/api/personal'
  import avatar from '@/assets/default_avator.png'
  import axios from 'axios'
  export default {
    name: "personal_info",
    data() {
      return {
        isActive: 1,
        default_avatar: avatar,
        user: {
          sex: 1,
          user_avatar: avatar
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        // initHeight()
        this._getInfo()
      })
    },
    methods: {
      _choose(e) {
        e = e || window.event
        this.isActive = Number(e.target.dataset.index)
        this.user.user_sex = Number(e.target.dataset.index)
      },
      _saveInfo() {

        if (!this.user.user_name || !this.user.user_birth || !this.user.user_sex || !this.user.user_desc) {
          alert('请填写完整信息！')
          return
        }

        let fd = new FormData()
        let file = document.getElementById('file').files[0]
        fd.append('file', file)
        fd.append('user_id', this.user.user_id)
        fd.append('user_name', this.user.user_name)
        fd.append('user_desc', this.user.user_desc)
        fd.append('user_sex', this.user.user_sex)
        fd.append('user_birth', this.user.user_birth)

        api.modifyUser(fd)
          .then(resp => {
            if (resp.data.code == 200) {
              alert(resp.data.message)
            } else {
              alert(resp.data.message)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      _back() {
        this.$router.push('/personal')
      },
      _getInfo() {
        let data = {
          user_id: JSON.parse(localStorage.loginUser).user_id
        }
        api.getUserInfoById(data)
          .then(resp => {
            if (resp.data.code == 200) {
              this.user = resp.data.data
              if (!this.user.user_avatar) {
                this.user.user_avatar = this.default_avatar
              }
              this.isActive = this.user.user_sex
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      preview(e) {
        console.log(e)
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.createImg(files, e)
      },
      createImg(files, e) {
        let preImg = e.target.parentNode.parentNode.children[0].children[0]
        if (typeof FileReader === 'undefined') {
          return
        }
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = function(evt) {
          preImg.src = evt.target.result
        }
      },
      _uploadAvatar() {

      }
    }
  }
</script>

<style scoped>
  .info_form{
    flex-direction: column;
    margin-top: 10px;
  }
  .info_form input,textarea{
    height: 30px;
    border: none;
    border-bottom: 1px solid rgb(250, 250, 250);
    box-sizing: border-box;
    padding-left: 10px;
    font: normal 13px/20px '微软雅黑';
  }
  .info_form input.birth{
    border-bottom: none
  }
  textarea{
    height: 80px;
  }
  .info_form>div{
    justify-content: space-between;
    align-items: center;
  }
  span.active{
    background: #0f0f0f;
    padding: 3px 10px;
    border-radius: 10px;
    color: #f0f0f0;
  }
  .avator{
    position: relative
  }
  .avator img{
    width: 100px;
  }
  .avator-input{
    opacity: 0;
    filter: alpha(opacity = 0);
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%
  }
  .sex{
    border-bottom: 1px solid rgb(250, 250, 250);
    box-sizing: border-box;
    padding-right: 10px;
  }
</style>
