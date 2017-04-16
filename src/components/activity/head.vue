<template>
  <div id="activityIndex" class="a100">
    <!--<div class="activity-head">
      <el-row>
        <el-col :xs="8" :sm="6" :md="4" :lg="3">
          <div class="activity-head-left" v-if="routeRecord === '/activity/index'" @click="gotoRouter($event, '/')">
            <img class='szu-logo' src='../../assets/src/szu_logo.jpg' />
            <p class="szu-logo-font">深大活动</p>
          </div>
          <div class="activity-head-left-back" 
          @click="gotoBack($event, routeRecord.substr(0, routeRecord.lastIndexOf('/')))"
          v-if="routeRecord !== '/activity/index'">
            <i class="el-icon-arrow-left"></i>
            <span>返回</span>
          </div>
        </el-col>
        <el-col :offset='8' :xs="8" :sm="6" :md="4" :lg="3" style="float: right" 
        v-if="routeRecord.split('/')[routeRecord.split('/').length-1] !== 'create'">
          <div class="activity-head-right">
            <i class="el-icon-search activity-head-search" 
            v-if="routeRecord !== '/activity/create'"
            @click='changeActive($event, 0)'></i>
            <button class="navbar-toggle" @click='changeActive($event, 1)' v-if="routeRecord === '/activity/index'">
              <p class="icon-toggle-line"></p>  
              <p class="icon-toggle-line"></p>
              <p class="icon-toggle-line"></p>
            </button>
            <span v-if="routeRecord !== '/activity/index'" 
            @click="gotoBack($event, '/activity/' + activityType + '/create')">发布</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <mt-popup v-model="popupVisible" position="right" style="width: 100%; height: 100%">
      <div class="headPop">
        <span class="gobackHead" @click="popupVisibleHide"><i class="el-icon-arrow-left"></i>返回</span>
        <span class="head-title">活动筛选</span>
      </div>
      <p class="commonShow" @click="choiceActivity('all')">全部</p>
      <p class="commonShow" @click="choiceActivity('trends')">活动</p>
      <p class="commonShow" @click="choiceActivity('course')">课程</p>
      <p class="commonShow" @click="choiceActivity('college')">社团</p>
      <p class="commonShow" @click="choiceActivity('notice')">公告</p>
      <p class="commonShow" @click="choiceActivity('work')">招聘信息</p>
      <p class="commonShow" @click="choiceActivity('attend')">已参与的活动</p>
    </mt-popup>
    <div class="activity-head-bottom-pop-search content-wrap" 
    style="position: fixed; top: 60px"
    :class='{heightSearch: getActive[0]}'>
      <div class="activity-head-bottom-content">
        <i class="el-icon-search activity-head-bottom-search"></i>
        <input type="text" class="activity-head-bottom-input" 
        v-on:blur='lineActive($event, "remove", "bottom-border-bar")'
        v-on:focus='lineActive($event, "add", "bottom-border-bar")'/>
        <div class="bottom-border-bar"></div>
      </div>
    </div>
    <div class="activity-head-bottom-pop-list content-wrap"
    style="position: fixed; top: 60px"
    :class='{heightList: getActive[1]}'>
      <div class="activity-head-bottom-content">
        <ul class="activity-head-bottom-pop-ul">
          <li @click="gotoRouter($event, '/activity/trends')">动态</li>
          <li @click="gotoRouter($event, '/activity/course')">课程</li>
          <li @click="gotoRouter($event, '/activity/college')">社团</li>
          <li @click="gotoRouter($event, '/activity/notice')">公告</li>
          <li @click="gotoRouter($event, '/activity/work')">招聘信息</li>
          <li @click="gotoRouter($event, '/')" v-if="routeRecord === '/activity/index'">返回主页</li>
          <li @click="gotoRouter($event, '/activity')" v-if="routeRecord !== '/activity/index'">返回活动</li>
        </ul>
      </div>
    </div>-->
    <router-view></router-view>
  </div>
</template>

<script>
import '../../assets/css/activity.css'
export default {
  name: 'activityIndex',
  data () {
    return {
      getActive: [false, false],
      routeRecord: '',
      activityType: '',
      choiceActivityInfo: 'trends',
      popupVisible: false
    }
  },
  watch: {
    '$route.fullPath': function (newVal, oldVal) {
      this.routeRecord = newVal
      this.activityType = this.$route.params.type
    }
  },
  created: function () {
    this.routeRecord = this.$route.fullPath
  },
  methods: {
    gotoBack (e, value) {
      e.stopPropagation()
      this.$router.push(value)
    },
    gotoRouter (e, value) {
      e.stopPropagation()
      this.$router.push(value)
      this.changeActive(e, 1)
    },
    changeActive: function (e, index) {
      e.stopPropagation()
      let _self = this
      _self.getActive.forEach(function (v, n) {
        if (n !== index) {
          _self.$set(_self.getActive, n, false)
        }
      })
      _self.$set(_self.getActive, index, !_self.getActive[index])
    },
    lineActive: function (e, type, className) {
      e.stopPropagation()
      let element = document.getElementsByClassName(className)[0]
      if (type === 'add') {
        element.classList.add('active')
      } else {
        element.classList.remove('active')
      }
    },
    popupVisibleHide: function () {
      this.popupVisible = false
    },
    choiceActivity: function (type) {
      this.choiceActivityInfo = type
      this.popupVisible = false
    }
  }
}
</script>

<style>

</style>
