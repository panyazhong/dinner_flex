<template>
  <div>
    <header>
      <span><</span>
      <span>{{title}}</span>
      <span></span>
    </header>
    <content>
      <ul>
        <li v-for="item in 5">
          <div>
            <p>鱼香肉丝</p>
            <p>{{desc}}</p>
            <p>
              <span>
                <img src="../../assets/default_avator.png" alt="">
              </span>
              <span>dapan</span>
            </p>
          </div>
          <div>
            <img src="../../assets/dish2.jpg" alt="">
          </div>
        </li>
      </ul>
    </content>
  </div>
</template>

<script>
  import * as api from '@/api/type_dish'
  export default {
    name: "type_dish",
    data() {
      return {
        title: '',
        desc: ''
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$parent.$data.routePath = this.$route.path
        this.title = this.$route.query.type_name
        this.desc = this.desc.slice(0, 15) + '...'
      })
    }
  }
</script>

<style scoped>
  ul{
    background: #fff;
  }
  content li{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
  }
  content li>div:first-of-type{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
    width: 150px;
    border-bottom: 1px solid #cdcdcd;
    box-sizing: border-box;
    padding-left: 10px;
  }
  content li>div:first-of-type p:first-of-type{
    font: bold 16px/30px '微软雅黑';
  }
  content li>div:first-of-type>p:nth-of-type(2){
    font: normal 13px/25px '微软雅黑';
    color: #333;
  }
  content li>div:first-of-type>p:nth-of-type(3){
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  content li>div:first-of-type>p:nth-of-type(3) span:first-of-type{
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
  content li>div:first-of-type p:nth-of-type(3) span:first-of-type img{
    width: 100%;
  }
  content li>div:nth-of-type(2){
    width: 150px;
    display: flex;
    align-items: center;
  }
  content li>div:nth-of-type(2) img{
    width: 100%;
  }
</style>
