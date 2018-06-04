<template>
  <div class="search flex">
    <div class="search-box">
      <span>
        ＜
      </span>
      <input type="text" placeholder="搜索菜品" v-model="searchData">
      <span v-show="hasData" @click="_substrData">×</span>
      <span v-show="hasData" @click="_search">搜索</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "search",
    data() {
      return {
        searchData: '',
        hasData: false
      }
    },
    watch: {
      searchData: function() {
        if (this.searchData) {
          this.hasData = true
        } else {
          this.hasData = false
        }
      }
    },
    methods: {
      _substrData() {
        this.searchData = this.searchData.substr(0, this.searchData.length-1)
      },
      _search() {
        this.$emit('searchData', this.searchData)
      }
    }
  }
</script>

<style scoped>
  .search{
    position: fixed;
    top: 0;
    justify-content: space-between;
    width: 100%;
    background: rgb(84, 92, 100);
  }
  .search-box{
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
    box-sizing: border-box;
    padding: 5px 10px;
    background: rgb(84, 92, 100);
    height: 40px;
  }
  .search-box input{
    flex: 1;
    border: none;
    border-radius: 4px 0 0 4px;
    box-sizing: border-box;
    padding-left: 35px;
    outline: none;
    background: #efefef url("../../assets/search.png") no-repeat;
  }
  .search-box span:first-of-type{
    flex-basis: 32px;
    font-size: 20px;
    color: #efefef;
  }
  .search-box span:nth-of-type(2){
    flex-basis: 30px;
    font: normal 20px/26px '微软雅黑';
    color: #efefef;
    cursor: pointer;
    background: #efefef;
    border-radius: 0px 4px 4px 0px;
  }
  .search-box span:nth-of-type(3){
    flex-basis: 40px;
    font: normal 13px/30px '微软雅黑';
    color: #efefef;
    cursor: pointer;
  }
</style>
