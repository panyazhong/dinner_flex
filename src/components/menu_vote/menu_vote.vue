<template>
  <div class="vote">
    <header>
      <span></span>
      <span>菜单投票</span>
      <span>
      </span>
    </header>
    <content>
      <ul class="menu">
        <li v-for="item in voteList" class="flex">
          <div class="flex">
            <div class="flex">
              <img :src="item.pic" alt="">
            </div>
            <div>
              <span>{{item.name}}</span>
            </div>
          </div>
          <div>
            <span class="normal-color">{{item.num}}</span>
          </div>
          <div>
            <button @click="_vote" :data-index="item" class="normal-bg">投票</button>
          </div>
        </li>
      </ul>
    </content>
  </div>
</template>

<script>
  import dish1 from '@/assets/dish1.jpg'
  import dish2 from '@/assets/dish2.jpg'
  import dish3 from '@/assets/dish3.jpg'
  import dish4 from '@/assets/dish4.jpg'
  import dish5 from '@/assets/dish5.jpg'
  import dish6 from '@/assets/dish6.jpg'
  import dish7 from '@/assets/dish7.jpg'
  import dish8 from '@/assets/dish8.jpg'
  import dish9 from '@/assets/dish9.jpg'
  import dish10 from '@/assets/dish10.jpg'
  export default {
    name: "menu_vote",
    data() {
      return {
        count: null,
        voteList: [
          {
            pic: dish1,
            name: '鱼香茄子',
            num: 1,
          },
          {
            pic: dish2,
            name: '牛腩豆角',
            num: 3,
          },
          {
            pic: dish3,
            name: '绝味三丁',
            num: 2,
          },
          {
            pic: dish4,
            name: '拍黄瓜',
            num: 1,
          },
          {
            pic: dish5,
            name: '辣椒炒肉',
            num: 1,
          },
          {
            pic: dish6,
            name: '鸡胗',
            num: 4,
          },
          {
            pic: dish7,
            name: '水芹肉丝',
            num: 3,
          },
          {
            pic: dish8,
            name: '凉拌三丝',
            num: 0,
          },
          {
            pic: dish9,
            name: '美味猪耳',
            num: 2,
          },
          {
            pic: dish10,
            name: '青椒肉棒',
            num: 5,
          }
        ]
      }
    },
    methods: {
      _vote(e) {
        this.count++
        let date = new Date()
        let day = date.getDay()
        if (day <= 5) {
          if (this.count > 2) {
            alert('今日只能选择两道菜')
            return
          }
        }
        e = e || window.event
        e.target.setAttribute("disabled", true)
        // e.target.style.background = "rgb(60, 140, 120)"
        e.target.style.background = "rgb(200, 150, 40)"
      }
    }
  }
</script>

<style scoped>
  .menu{
    background: #fff;
  }
  ul.menu li{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid rgb(235,238,245);
  }
  ul.menu li>div{
    flex-direction: row;
    align-items: center;
    text-align: center;
  }
  ul.menu li>div>div:first-of-type{
    flex-direction: row;
    width: 20%;
    margin-left: 10px;
    align-items: center;
  }
  ul.menu li>div>div:first-of-type img{
    width: 100%;
  }
  ul.menu li>div>div:nth-of-type(2) {
    margin-left: 20px;
  }
  button{
    height: 30px;
    width: 50px;
    margin: 0px 10px;
    color: white;
    border-radius: 4px;
    border: none;
    outline: none;
  }
</style>
