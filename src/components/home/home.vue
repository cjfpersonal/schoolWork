<template>
<div class="a100 clearfix">
    <router-view style="height: calc(100% - 60px);overflow: scroll"></router-view>
    <el-row class="home-head">
      <el-col class="home-list" :class="{'active': choiceIndex===0}" v-on:click.native="chooseHome($event, 0)">
        <i class="home-style1" :class="{'home-logo-active': choiceIndex===0,'home-logo': choiceIndex!=0}"></i>
        <p>主页</p>
      </el-col>
      <el-col class="home-list" :class="{'active': choiceIndex===1}" v-on:click.native="chooseHome($event, 1)">
        <i class="home-style2"  :class="{'course-logo-active': choiceIndex===1,'course-logo': choiceIndex!=1}"></i>
        <p>课程</p>
      </el-col>
      <el-col class="home-list" :class="{'active': choiceIndex===2}" v-on:click.native="chooseHome($event, 2)">
        <i class="home-style3"  :class="{'notice-logo-active': choiceIndex===2,'notice-logo': choiceIndex!=2}"></i>
        <p>公告</p>
      </el-col>
      <el-col class="home-list" :class="{'active': choiceIndex===3}" v-on:click.native="chooseHome($event, 3)">
        <i class="home-style4"  :class="{'shop-logo-active': choiceIndex===3,'shop-logo': choiceIndex!=3}"></i>
        <p>二手市场</p>
      </el-col>
      <el-col class="home-list" :class="{'active': choiceIndex===4}" v-on:click.native="chooseHome($event, 4)">
        <i class="home-style5"  :class="{'user-logo-active': choiceIndex===4,'user-logo': choiceIndex!=4}"></i>
        <p>我的</p>
      </el-col>
    </el-row>
</div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      choiceIndex: 0,
      list: ['activity', 'course', 'notice', 'trade', 'user']
    }
  },
  watch: {
    '$route.fullPath' (newVal, oldVal) {
      this.init()
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let path = this.$route.fullPath.split('/')
      this.choiceIndex = this.list.indexOf(path[path.length - 1])
    },
    chooseHome (e, index) {
      e.stopPropagation()
      this.choiceIndex = index
      this.$router.push('/home/' + this.list[index])
    }
  }
}
</script>
<style>
.home-head {
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: 0 0 10px #888
}
.home-list {
  width: 20%;
  text-align: center;
  background: white;
  padding: 3px 0;
  font-size: 12px
}
.home-list.active p {
  color: #4b99ff
}
</style>
