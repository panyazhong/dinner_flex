<template>
  <div>
    <header>
      <span @click="_back">＜</span>
      <span>新增菜</span>
      <span></span>
    </header>
    <content>
      <div ref="addRef" class="white-bg flex">
        <div class="name-desc flex">
          <input type="text" placeholder="写下你的菜名">
          <textarea type="text" placeholder="写下这道菜的故事"></textarea>
        </div>
        <p class="title">原材料</p>
        <div v-for="item in count">
          <div class="metrial">
            <input type="text" placeholder="食材:如鸡蛋">
            <input type="text" placeholder="数量:如一个">
          </div>
        </div>
        <div class="operate-btn">
          <span class="normal-color" @click="_operateMetrial(0,1)">添加一行食材</span>
          <span class="normal-color" @click="_operateMetrial(0,-1)">删除一行食材</span>
        </div>
        <p class="title">做法</p>
        <div v-for="item in stepCount">
          <div class="step flex">
            <span>步骤{{item}}</span>
            <input type="file" @change="preview" multiple>
            <span class="up-tip normal-color">点击上传图片</span>
            <img src="" alt="" ref="pre">
            <input type="text" placeholder="描述一下操作过程">
          </div>
        </div>
        <div class="operate-btn">
          <span class="normal-color" @click="_operateMetrial(1,1)">添加一步</span>
          <span class="normal-color" @click="_operateMetrial(1,-1)">删除一步</span>
        </div>
      </div>
      <button class="normal-bg white-color">确定</button>
    </content>
  </div>
</template>

<script>
  import * as api from '@/api/menu_detail'
  import Qs from 'qs'
  export default {
    name: "menu-detail",
    data() {
      return {
        count: 3,
        stepCount: 2
      }
    },
    mounted() {
    },
    methods: {
      _back() {
        this.$router.push('/menu_list')
      },
      _operateMetrial(flag1, flag2) {
        if (flag1 == 0 && flag2 == 1) {
          this.count ++
        } else if (flag1 == 0 && flag2 == -1) {
          if (this.count <= 0) {
            return
          }
          this.count --
        } else if (flag1 == 1 && flag2 == 1) {
          this.stepCount ++
        } else {
          if (this.stepCount <= 0) {
            return
          }
          this.stepCount --
        }
      },
      preview(e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.createImg(files, e)
      },
      createImg(files, e) {
        let preImg = e.target.parentNode.getElementsByTagName('img')[0]
        if (typeof FileReader === 'undefined') {
          return
        }
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = function(evt) {
          preImg.src = evt.target.result
        }
      }
    }
  }
</script>

<style scoped>
  .name-desc{
    flex-direction: column;
    margin-top: 10px;
  }
  .name-desc>input,.name-desc>textarea{
    border: 1px solid rgb(239, 241, 243);
    border-left: none;
    border-right: none;
    height: 35px;
    box-sizing: border-box;
    font-family: '微软雅黑';
    color: #333;
  }
  .name-desc>input:first-of-type{
    border-bottom: none;
    font-size: 20px;
    text-align: center;
    border-top: none;
  }
  .name-desc>textarea {
    font-size: 13px;
    height: 50px;
    padding: 5px 10px;
    border-bottom: none;
  }
  content>div{
    flex-direction: column;
  }
  .title{
    font: bold 15px/20px '微软雅黑';
    colro: #333;
    margin-left: 10px;
    align-self: flex-start;
  }
  .metrial,.operate-btn{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .metrial input{
    height: 30px;
    /*margin: 0px 3px;*/
    width: 50%;
    box-sizing: border-box;
    padding-left: 10px;
    margin-top: 5px;
    border: 1px solid rgb(239, 241, 243);
    border-left: none;
    border-right: none;
    border-top: none;
    color: #333;
  }
  .operate-btn>span{
    margin: 5px 3px;
    font-size: 13px;
    padding: 5px;
    border-radius: 5px;
    border: none;
  }
  .step{
    flex-direction: column;
    position: relative;
  }
  .step span{
    align-self: flex-start;
    font-size: 13px;
    margin: 10px;
  }
  .step span.up-tip{
    position: absolute;
    top: 30px;
    left: 20px;
  }
  .step input{
    border: none;
    box-sizing: border-box;
    padding-left: 10px;
  }
  .step>img{
    width: 80%;
    margin-top: 30px;
    align-self: center;
  }
  .step input:first-of-type{
    height: 20px;
    opacity: 0;
    filter: alpha(opacity=0);
    position: absolute;
    top: 40px;
    z-index: 999;
  }
  .step input:nth-of-type(2) {
    height: 30px;
    margin-top: 20px;
  }
  button {
    border: none;
    height: 40px;
    letter-spacing: 10px;
    outline: none;
  }
</style>
