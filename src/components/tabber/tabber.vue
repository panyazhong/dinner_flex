<template>
  <div class="flex" ref="tabber">
    <div class="is-active">
      <router-link to="/recommend">
        <img src="../../assets/recommend.png" alt="">
        <!--<img src="../../assets/recommend (1).png" alt="">-->
        推荐
      </router-link>
    </div>
    <div>
      <router-link to="/menu_list">
        <img src="../../assets/list.png" alt="">
        <!--<img src="../../assets/list (1).png" alt="">-->
        菜谱
      </router-link>
    </div>
    <div>
      <router-link to="/menu_vote">
        <img src="../../assets/make.png" alt="">
        <!--<img src="../../assets/make (1).png" alt="">-->
        菜单投票
      </router-link>
    </div>
    <div>
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

      }
    },
    mounted() {
      this.$nextTick(() => {
        this._tabber()
      })
    },
    methods: {
      _tabber() {
        let children = this.$refs.tabber.children
        let len = children.length
        for (let i = 0; i < len; i++) {
          let child = children[i]
          child.addEventListener('click', () => {
            // console.log(child.children[0].children[0].src)
            for (let j = 0; j < len; j++) {
              dom.delClass(this.$refs.tabber.children[j], 'is-active')
            }
            dom.addClass(child, 'is-active')
          })
        }
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
  }
  .flex>div{
    flex: 0 0 25%;
    background: rgb(84, 92, 100);
    box-sizing: border-box;
    padding: 5px
  }
  .flex>div.is-active{
    background: rgb(67, 74, 80);
  }
  .flex>div.is-active a{
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
