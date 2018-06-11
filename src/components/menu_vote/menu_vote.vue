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
              <img :src="item.dish_pic" alt="">
            </div>
            <div>
              <span>{{item.dish_name}}</span>
            </div>
          </div>
          <div class="flex">
            <span class="normal-color">{{item.dish_vote_count}}</span>

            <button @click="_vote(item.id)" :data-index="item" class="normal-bg" v-bind:class="{isVoted: item.isVoted == '1'}" v-bind:disabled="item.isVoted == '1'">投票</button>
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
  import * as api from '@/api/vote'
  export default {
    name: "menu_vote",
    data() {
      return {
        count: null,
        voteList: [],
        user_id: '',
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.user_id = JSON.parse(localStorage.loginUser).user_id
        this._getVotes()
      })
    },
    methods: {
      _vote(id, e) {

        e = e || window.event

        this.count++
        let date = new Date()
        let day = date.getDay()
        if (day <= 5) {
          if (this.count > 2) {
            alert('今日只能选择两道菜')
            return
          }
        }

        e.target.setAttribute("disabled", true)
        e.target.style.background = "rgb(200, 150, 40)"

        let data = {
          id: id,
          user_id: this.user_id
        }

        api.vote(data)
          .then(resp => {
            if (resp.data.code == 200) {
              alert('投票成功')
              e.target.parentNode.children[0].innerHTML = resp.data.data
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      _getVotes() {
        let data = {
          user_id: this.user_id
        }

        api.getVotes(data)
          .then(resp => {
            if (resp.data.code == 200) {
              this.voteList = resp.data.data
            }
            this.voteList.map((item) => {
              if (item.isVoted == '1') {
                this.count++
              }
            })
          })
          .catch(err => {
            console.log(err)
          })
      },
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
  ul.menu li>div{
    flex-direction: row;
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
  button.isVoted {
    background: rgb(200, 150, 40);
  }
</style>
