<template>
  <div>
    <header>
      <span @click="_back"><</span>
      <span>{{title}}</span>
      <span></span>
    </header>
    <content>
      <ul>
        <li v-for="item in dish" @click="_showDishDetail(item.id)">
          <div>
            <p>{{item.dish_name}}</p>
            <p>{{item.dish_desc}}</p>
            <p>
              <span>
                <img :src="item.dish_pic" alt="">
              </span>
              <span>{{item.dish_author}}</span>
            </p>
          </div>
          <div>
            <img :src="item.dish_pic" alt="">
          </div>
        </li>
      </ul>
      <div v-show="loading">
        正在加载，请稍等...
      </div>
      <div v-show="hasNum">
        没有数据了...
      </div>
    </content>
  </div>
</template>

<script>
  import * as api from '@/api/type_dish'
  import * as code from "@/common/js/config"
  export default {
    name: "type_dish",
    data() {
      return {
        title: '',
        desc: '',
        page: 1,
        pageSize: 10000,
        dish: [],
        hasNum: false,
        loading: false,
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$parent.$data.routePath = this.$route.path
        this.title = this.$route.query.type_name
        this._getDishByType()
        this.sw = true
        window.addEventListener('scroll', () => {
          if(document.documentElement.scrollTop + window.innerHeight >= document.body.offsetHeight) {
            if (this.sw == true) {
              this.sw = false
              this.loading = true
              this.page += 1
              this._getDishByType()
            }
          }
        })
      })
    },
    methods: {
      _getDishByType() {
        let data = {
          type_id: this.$route.query.type_id,
          page: this.page,
          pageSize: this.pageSize
        }
        api.getDishByType(data)
          .then(resp => {
            if (resp.data.code == code.ERR_OK) {
              this.loading = false
              this.hasNum = resp.data.data.length == 0 ? true : false
              for (let i = 0; i < resp.data.data.length; i++) {
                if (resp.data.data[i].dish_desc.length > 8) {
                  resp.data.data[i].dish_desc = resp.data.data[i].dish_desc.substring(0, 8) + '...'
                }
                this.dish.push(resp.data.data[i])
              }
              this.sw = true
            } else if (resp.data.code == code.LOGIN_ERR) {
              alert(resp.data.message)
              this.$router.push('login')
            } else {
              alert(resp.data.message)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      _back() {
        this.$router.push('/recommend')
      },
      _showDishDetail(dish_id) {
        this.$router.push({
          name: 'menuDetail',
          query: {
            id: dish_id
          }
        })
      }
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
    border-radius: 50%;
    overflow: hidden;
  }
  content li>div:first-of-type p:nth-of-type(3) span:first-of-type img{
    width: 100%;
    height: 30px;
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
