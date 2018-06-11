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
          <input type="text" placeholder="写下你的菜名" v-model="dish.dish_name">
          <textarea type="text" placeholder="写下这道菜的故事" v-model="dish.dish_desc"></textarea>
        </div>
        <p class="title">原材料</p>
        <div v-for="item in count">
          <div class="material" ref="material">
            <input type="text" placeholder="食材:如鸡蛋">
            <input type="text" placeholder="数量:如一个">
          </div>
        </div>
        <div class="operate-btn">
          <span class="normal-color" @click="_operatematerial(0,1)">添加一行食材</span>
          <span class="normal-color" @click="_operatematerial(0,-1)">删除一行食材</span>
        </div>
        <p class="title">做法</p>
        <div v-for="item in stepCount">
          <div class="step flex" ref="step">
            <span>步骤{{item}}</span>
            <input type="file" @change="preview" multiple>
            <span class="up-tip normal-color">点击上传图片</span>
            <img src="" alt="" ref="pre">
            <input type="text" placeholder="描述一下操作过程">
          </div>
        </div>
        <div class="operate-btn">
          <span class="normal-color" @click="_operatematerial(1,1)">添加一步</span>
          <span class="normal-color" @click="_operatematerial(1,-1)">删除一步</span>
        </div>
      </div>
      <button class="normal-bg white-color" @click="_addDish">确定</button>
    </content>
  </div>
</template>

<script>
  import * as api from '@/api/dish'
  import * as formatDate from '@/common/js/formatDate'
  import Qs from 'qs'
  export default {
    name: "menu-detail",
    data() {
      return {
        count: 1,
        stepCount: 1,
        dish: {
          create_time: new Date()
        }
      }
    },
    mounted() {
    },
    methods: {
      _back() {
        this.$router.push('/menu_list')
      },
      _operatematerial(flag1, flag2) {
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
      },
      _addDish() {
        let materialArr = []
        let stepArr = []
        let materials = this.$refs.material
        let steps = this.$refs.step

        materials.map((item, key) => {
          let children = item.children
          if (!children[0].value && !children[1].value) {
            return
          }
          materialArr.push({
            material_name:  children[0].value,
            material_num:  children[1].value,
          })
        })

        steps.map((item, key) => {
          let children = item.children
          if (!children[1].value && !children[4].value) {
            return
          }

          stepArr.push({
            step_desc:  children[4].value,
          })
        })

        if (materialArr.length == 0 || stepArr.length == 0) {
          alert('至少填写一种原材料或一个步骤')
        }
        this.dish.dish_material = JSON.stringify(materialArr)
        this.dish.dish_step = JSON.stringify(stepArr)
        this.dish.create_time = formatDate.formatDay(this.dish.create_time)
        this.dish.dish_author = localStorage.loginUser.user_name

        api.addDish(this.dish)
          .then(resp => {
            console.log(resp)
            if (resp.data.code == 200) {
              alert('新增成功')

              this.$router.push('menu_list')
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
  .material,.operate-btn{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .material input{
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
