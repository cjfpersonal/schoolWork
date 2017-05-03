<template>
<div class="a100">
  <div class="activity-detail-list-content">
    <el-row class="show-list-box" style="height: 70px;line-height: 70px">
       <el-col :xs="7" style="text-align: center">
         <i class="success-logo logo-style4" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="17" class="a100">
         <span style="color: #4b99ff; font-size: 22px">报名成功</span>
       </el-col>
     </el-row>
    <div class="activity-head-box">
      <h3 class="acitivity-head-name">{{data.name}}</h3>
      <p class="acitivity-head-des">报名{{data.person}}人  剩余{{data.count - data.person}}人</p>
      <p class="acitivity-head-des">报名截止时间:{{data.time}}</p>
    </div>
    <div class="m5" style="background: white">
      <p class="activity-content-box">
        <i class="activity-time-logo logo-style3" style="transform: translateY(25%)"></i>
        <span style="padding-left: 10px">时间: {{data.time}}</span></p>
      <p class="activity-content-box clearfix">
        <i class="activity-local-logo activity-style4 fl" style="transform: translateY(25%)"></i>
        <span  class="address-left">地址: {{data.address}}</span></p>
      <p class="activity-content-box noborder">
        <i class="activity-money-logo activity-style5" style="transform: translateY(25%)"></i>
        <span style="padding-left: 10px">费用: {{data.money === 0?'免费':data.money}}</span></p>
      <p class="activity-content-box noborder">
        <i class="activity-phone-active-logo logo-style2" style="transform: translateY(25%)"></i>
        <span style="padding-left: 10px">联系: {{data.phone}}</span></p>
    </div>
    <div class="m5" style="background: white">
      <p class="activity-content-description">活动详情
      </p>
      <p class="activity-content-des-con">{{data.description}}</p>
    </div>
  </div>
  <div class="dialog-footer" style="width: 100%; position: fixed; bottom: 0;box-shadow: 0 0 10px #888">
      <div class="half-btn-box" v-on:click="gotoRouter($event, '/home/activity')">
          <i class="map-logo activity-style6" style="transform: translateY(25%)"></i>
          <span>活动地图</span>
      </div>
      <div class="half-btn-box" @click="gotoRouter($event, '/activity/detail')">
          <i class="go-home-active-logo activity-style7" style="transform: translateY(25%)"></i>
          <span>我的活动</span>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'notice',
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let _self = this
      _self.getHttp('/api/active/detail/' + _self.$route.params.id).then(function (data) {
        _self.data = data.active
      })
    },
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    }
  }
}
</script>
