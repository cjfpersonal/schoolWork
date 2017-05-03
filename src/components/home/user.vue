<template>
<div class="a100 clearfix">
   <el-row class="show-list-box" @click.native="gotoRouter($event, '/userInfo')">
      <el-col :xs="8" class="show-list-img-box">
          <img src="../../assets/src/szu_logo.jpg" class="show-list-img" />
      </el-col>
      <el-col :xs="14" class="show-list-font-box">
        <div class="show-list-font">
          <p>
            <span class="show-list-name">{{data.name?data.name:'姓名'}}</span>
            <i class="ident-small logo-style1 logo-change" v-if="data.is_certified"></i>
          </p>
          <p style="margin-top: 10px">
            <span style="padding-right: 10px">{{data.gender?(data.gender===1? '男': '女'):'性别'}}</span>
            <span>{{data.grade?data.grade:'年级'}}</span>
          </p>
          <p>{{data.college?data.college:'学校'}}</p>
        </div>
      </el-col>
      <el-col :xs="2" class="right-point"><i class="el-icon-arrow-right"></i></el-col>
     </el-row>
     <el-row class="show-list-box" 
     style="padding: 3px 0;font-size: 12px; color: #888">
       <el-col :xs="6" style="text-align: center">
         签名
       </el-col>
       <el-col :xs="18">
         {{data.realname?data.realname:'真实签名'}}
       </el-col>
     </el-row>
     <el-row class="show-list-box m25" style="height: 50px;line-height: 50px"
     @click.native="reCertified($event)">
       <el-col :xs="6" style="text-align: center">
         <i class="ident-big logo-style1" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="16">
         {{ data.is_certified ? '已认证' : '未认证' }}
       </el-col>
       <el-col :xs="2"><i class="el-icon-arrow-right" style="color: #dfdfdf"></i></el-col>
     </el-row>
     <el-row class="show-list-box m25" style="height: 50px;line-height: 50px"
     @click.native="gotoRouter($event, '/course')">
       <el-col :xs="6" style="text-align: center">
         <i class="course-logo-active logo-style1" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="16">
         我的课程
       </el-col>
       <el-col :xs="2"><i class="el-icon-arrow-right" style="color: #dfdfdf"></i></el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 50px;line-height: 50px"
     @click.native="gotoRouter($event, '/college')">
       <el-col :xs="6" style="text-align: center">
         <i class="college-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="16">
         我的社团
       </el-col>
       <el-col :xs="2"><i class="el-icon-arrow-right" style="color: #dfdfdf"></i></el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 50px;line-height: 50px"
     @click.native="gotoRouter($event, '/activity/detail')">
       <el-col :xs="6" style="text-align: center">
         <i class="foot-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="16">
         我的活动
       </el-col>
       <el-col :xs="2"><i class="el-icon-arrow-right" style="color: #dfdfdf"></i></el-col>
     </el-row>
     <el-row class="show-list-box m25" style="height: 50px;line-height: 50px"
     @click.native="gotoRouter($event, '/shopping')">
       <el-col :xs="6" style="text-align: center">
         <i class="order-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="16">
         我的订单
       </el-col>
       <el-col :xs="2"><i class="el-icon-arrow-right" style="color: #dfdfdf"></i></el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 50px;line-height: 50px"
     @click.native="logout($event, '/')">
       <el-col :xs="6" style="text-align: center">
         <i class="logout-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="16">
         用户注销
       </el-col>
       <el-col :xs="2"><i class="el-icon-arrow-right" style="color: #dfdfdf"></i></el-col>
     </el-row>
</div>
</template>
<script>
import { MessageBox } from 'mint-ui'

export default {
  name: 'user',
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
      _self.getHttp('/api/user/info/' + _self.getCookie('user_id')).then(function (data) {
        console.log(data)
      })
      // this.data = {
      //   name: 'cjfpersonal',
      //   gender: 1,
      //   grade: '大四',
      //   college: '计算机与软件学院',
      //   realname: '生活就像海洋'
      // }
    },
    reCertified (e) {
      e.stopPropagation()
      let _self = this
      MessageBox.confirm('是否发送认证到邮箱?').then(function () {
        _self.getHttp('/api/user/sendActivationCode', 'toast').then(function (data) {
          console.log(data)
        })
      })
    },
    logout (e, path) {
      let _self = this
      _self.getHttp('/api/user/logout').then(function (data) {
        _self.gotoRouter(e, path)
      })
    },
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    }
  }
}
</script>
<style>
.show-list-box {
  background: white;
  border-bottom: 1px solid #f4f3f4
}
.show-list-img {
  width: 90px;
  height: 90px;
  margin: 15px 0
}
.show-list-img-box {
  height: 120px;  
  text-align: center
}
.show-list-font {
  display: table-cell;
  vertical-align: middle  
}
.show-list-font-box {
  display: table;
  height: 120px;
  font-size: 12px
}
.show-list-name {
  font-size: 15px;
  font-weight: 800
}
.logo-change {
  width: 15px;
  height: 15px
}
.right-point {
  font-size: 18px;
  line-height: 120px;
  color: #dfdfdf
}
</style>
