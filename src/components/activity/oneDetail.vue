<template>
  <div class="a100" style="background: #f3f4f3">
    <!--<headl title="活动详情" backRouth="/activity/detail"></headl>-->
    <div class="activity-detail-list-content">
      <img :src="data.poster" style="width: 100%;min-height: 200px" />
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
          <i class="activity-local-logo activity-style4 fl" style="transform: translateY(-12.5%)"></i>
          <span class="address-left">地址: {{data.address}}</span></p>
        <p class="activity-content-box noborder">
          <i class="activity-money-logo activity-style5" style="transform: translateY(25%)"></i>
          <span style="padding-left: 10px">费用: {{data.money === 0?'免费':data.money}}</span></p>
      </div>
      <div class="m5 user-attend-box" v-if="users.length>0">
        <img class="user-attend-img" v-for="user,index in users" :key="index" v-if="index<4" :src="user.wx_head_img" />
        <span class="user-total-attend">{{users.length + '人参与'}}</span>
      </div>
      <div class="m5" style="background: white">
        <p class="activity-content-description">活动详情
        </p>
        <p class="activity-content-des-con">{{data.description}}</p>
      </div>
    </div>
    <el-row class="m15 apply-box">
      <el-col :xs="6" class="phone-call">
        <i class="activity-phone-active-logo logo-style2"></i>
        <p>联系</p>
      </el-col>
      <el-col :xs="18" class="apply" @click.native="gotoRouter($event, '/activity/decide/' + data.id)">立即报名</el-col>
    </el-row>
  </div>
</template>

<script>
import headl from '../common/head'
export default {
  name: 'activityDetail',
  components: {
    'headl': headl
  },
  data: function () {
    return {
      data: {},
      users: []
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init: function () {
      let _self = this
      _self.getHttp('/api/active/detail/' + _self.$route.params.id).then(function (data) {
        _self.data = data.active
      })
      _self.getHttp('/api/active/getApplyActiveUsers/' + _self.$route.params.id).then(function (data) {
        _self.users = data.users
      })
    },
    gotoRouter: function (e, value) {
      e.stopPropagation()
      this.$router.push(value)
    }
  }
}
</script>
<style>
.activity-head-box {
  background: white;
  padding: 25px 0 10px 20px;
}
.acitivity-head-name {
  font-size: 20px;
  font-weight: 800;
  padding-bottom: 10px;
  color: black
}
.acitivity-head-des {
  color: #b7b7b7;
  font-size: 12px;
  padding-top: 5px;
}
.activity-content-box {
  padding: 20px 0;
  margin: 0 30px;
  border-bottom: 1px solid #eaeaea;
  font-size: 15px;
  color: #b7b7b7
}
.activity-content-description {
  padding: 15px 0 10px 0;
  margin: 0 20px;
  border-bottom: 3px solid #e5e5e5;
  font-size: 16px;
  color: #9e9e9e
}
.activity-content-des-con {
  padding: 15px 20px 10px 20px;
}
.phone-call {
  text-align: center;
  height: 50px;
  background: white;
  font-size: 12px;
  color: #9e9e9e;
  padding-top: 3px
}
.apply {
  color: white;
  text-align: center;
  line-height: 50px;
  background: #539fff;
}
.apply-box {
  position: fixed;
  bottom: 0;
  width: 100%
}
.address-left {
  padding-left: 10px;
  width:calc(100% - 21px);
  float: left
}
.noborder {
  border: none
}
.user-attend-box {
  background: white;
  height: 60px; 
  line-height: 60px;
  padding: 0 20px
}
.user-total-attend {
  float: right
}
.user-attend-img {
  width: 40px;
  height: 40px;
  background: black;
  border-radius: 50%;
  margin-right: 5px;
  top: 10px;
  position: relative
}
</style>
