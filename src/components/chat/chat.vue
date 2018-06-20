<template>
  <div>
    <div class="wrapper">
      <div class="content" id="chat" ref="chatBody">
        <ul id="chat_conatiner" ref="chat">
          <li v-for="item in chatMessage" v-bind:class="{last: item.user_id == loginUser.user_id}">
            <p>{{item.user_name}}&nbsp;: </p>
            <p>{{item.text}}</p>
          </li>
          <!--<li>-->
            <!--<p>dapan: </p>-->
            <!--<p>你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊</p>-->
          <!--</li>-->
          <!--<li>-->
            <!--<p>dapan: </p>-->
            <!--<p>你好啊</p>-->
          <!--</li>-->
          <!--<li class="last">-->
            <!--<p></p>-->
            <!--<p>你好 我是答案 大的sad啊大大大但是的阿达的啊阿达大大大大的大</p>-->
          <!--</li>-->
        </ul>
      </div>
      <div class="action">
        <input v-model="sendMessage.text">
        <button class="normal-bg white-color" id="clear" @click="clear">清屏</button>
        <button class="normal-bg white-color" id="send" @click="send">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "chat",
    data() {
      return {
        sendMessage: {},
        chatMessage: [],
        loginUser: {}
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.loginUser = JSON.parse(localStorage.loginUser)
        this._joinChat()
        window.addEventListener('keyup', (e) => {
          e = e || window.event
          if (e.keyCode == 13) {
            if (!this._checkSendMessage()) {
              return
            }
            this.send()
          }

        })
      })
    },
    methods: {
      clear() {
        this.chatMessage = []
      },
      send() {
        if (!this._checkSendMessage()) {
          alert('不能发送空消息！')
          return
        }
        this.sendMessage.user_id = this.loginUser.user_id
        this.sendMessage.user_name = this.loginUser.user_name
        this.$socket.emit('send.message', this.sendMessage)
        this.sendMessage = {}
      },
      _joinChat() {
        this.$socket.emit('join', this.loginUser)
      },
      _checkSendMessage() {
        if (this.sendMessage.text) {
          return true
        } else {
          return false
        }
      }
    },
    sockets: {
      connected: function(msg) {

      },
      message: function (msg) {
        if (msg.user_id == this.loginUser.user_id) {
          this.chatMessage.push({
            user_name: msg.text,
            user_id: msg.user_id,
            text: msg.user_name,
          })

          if (this.$refs.chat.offsetHeight > 280) {
            this.$refs.chatBody.scrollTop = 9999
          }

        } else {
          this.chatMessage.push(msg)
        }
      }
    }
  }
</script>

<style scoped>
  .content{
    border: 1px solid rgb(239, 241, 243);
    background: #fff;
    height: 300px;
    margin-top: -40px;
    overflow: auto;
  }
  #chat_conatiner{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }
  #chat_conatiner li{
    display: flex;
    flex-direction: row;
  }
  #chat_conatiner li.last{
    align-self: flex-end;
  }
  #chat_conatiner li p:first-of-type{
    font: bold 15px/20px '微软雅黑';
    color: #000
  }
  #chat_conatiner li p:nth-of-type(2){
    font: normal 13px/20px '微软雅黑';
    margin-left: 9px;
    text-align: left;
  }
  #chat_conatiner li.last p:first-of-type{
    font: normal 13px/20px '微软雅黑';
  }
  #chat_conatiner li.last p:nth-of-type(2){
    font: bold 15px/20px '微软雅黑';
    text-align: right;
  }
  .action input{
    width: 100%;
    height: 30px;
    border: 1px solid rgb(239, 241, 243);
  }
  button{
    width: 50px;
    height: 30px;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
  }
</style>
