<template>
  <div class="a100" style="background: #f3f4f3">
    <!--<headl title="活动详情" :backRouth="'/activity/detail/'+data.id"></headl>-->
    <!--<div class="activity-head-box">
      <h3 class="acitivity-head-name">{{data.name}}</h3>
    </div>
    <div class="m5" style="background: white">
      <p class="activity-content-box">
        <i class="activity-time-logo logo-style3" style="transform: translateY(25%)"></i>
        <span style="padding-left: 10px">时间: {{data.created_at}}</span></p>
      <p class="activity-content-box">
        <i class="activity-local-logo activity-style4" style="transform: translateY(25%)"></i>
        <span style="padding-left: 10px">地址: {{data.address}}</span></p>
      <p class="activity-content-box noborder">
        <i class="activity-money-logo activity-style5" style="transform: translateY(25%)"></i>
        <span style="padding-left: 10px">人数: {{data.amount}}</span></p>
    </div>-->
    <div class="activity-head-box">
      <h3 class="acitivity-head-name">{{data.name}}</h3>
      <p class="acitivity-head-des">参与人数{{data.amount}}人  剩余名额{{data.amount}}人</p>
      <p class="acitivity-head-des">社团创建时间 {{data.created_at}}</p>
    </div>
    <div class="m5" style="background: white">
      <p class="activity-content-description">社团详情
      </p>
      <p class="activity-content-des-con">{{data.introduction}}</p>
    </div>
    <p class="notice-mid-info">创建人</p>
    <el-row class="show-list-box" @click.native="gotoRouter($event, '/userInfo')">
      <el-col :xs="8" class="show-list-img-box">
          <img :src="user.wx_head_img" class="show-list-img" />
      </el-col>
      <el-col :xs="14" class="show-list-font-box">
        <div class="show-list-font">
          <p>
            <span class="show-list-name">{{user.name?user.name:'姓名'}}</span>
            <i class="ident-small logo-style1 logo-change" v-if="user.is_certified"></i>
          </p>
          <p style="margin-top: 10px">
            <span style="padding-right: 10px">{{user.gender?(user.gender===1? '男': '女'):'性别'}}</span>
            <span>{{user.grade?user.grade:'年级'}}</span>
          </p>
          <p>{{user.college?user.college:'学校'}}</p>
        </div>
      </el-col>
      <el-col :xs="2" class="right-point"><i class="el-icon-arrow-right"></i></el-col>
    </el-row>
    <p class="create-activity" @click="confirmInfo($event)">确认加入</p>
  </div>
</template>

<script>
import headl from '../common/head'
import { MessageBox } from 'mint-ui'
export default {
  name: 'activityDetail',
  components: {
    'headl': headl
  },
  data: function () {
    return {
      data: {},
      user: {}
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init: function () {
      let _self = this
      _self.getHttp('/api/league/detail/' + _self.$route.params.id).then(function (data) {
        _self.data = data.league
        _self.getHttp('/api/user/info/' + data.league.user_id).then(function (user) {
          _self.user = user.user.info
        })
      })
    },
    gotoRouter: function (e, value) {
      e.stopPropagation()
      this.$router.push(value)
    },
    confirmInfo (e) {
      e.stopPropagation()
      let _self = this
      MessageBox.confirm('确定加入该社团？').then(action => {
        _self.getHttp('/api/league/apply/' + _self.data.id, 'toast').then(function (data) {
          _self.$router.push('/college/addSuccess/' + _self.$route.params.id)
        })
      }).catch(function () {
        _self.$router.push('/college/addSuccess/' + _self.$route.params.id)
      })
    }
  }
}
</script>
<style>
.acitivity-head-pay {
    padding: 20px 30px;
    color: #9e9e9e;
    font-size: 20px;
    border-bottom: 1px solid #eaeaea;
}
.wechart-pay {
    font-size: 16px;
    color: black
}
.total-show {
    line-height: 50px;
    color: #4b99ff;
    font-size: 18px;
    text-align: center;
    background: white
}
</style>
