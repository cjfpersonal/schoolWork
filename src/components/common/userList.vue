<template>
<div class="a100">
  <el-row class="show-list-box" style="margin-bottom: 5px;" v-for="data in datas"
  :key="data" v-if="datas.length>0"
  @click.native="startChart($event, data.id, data.name)">
    <el-col :xs="8" class="show-list-img-box">
        <img :src="data.wx_head_img" class="show-list-img" />
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
  </el-row>
  <el-row class="show-list-box" 
  v-if="$route.params.type === 'personal'&&datas.length>0"
  style="height: 60px;line-height: 60px">
    <el-col :xs="4" style="text-align: center">
      <i class="info-logo logo-style3" style="transform: translateY(25%)"></i>
    </el-col>
    <el-col :xs="20" class="a100">
      <span>电话:{{datas[0].phone?datas[0].phone:'保密'}}</span>
    </el-col>
  </el-row>
  <el-row class="show-list-box" 
  v-if="$route.params.type === 'personal'&&datas.length>0"
  style="height: 60px;line-height: 60px">
    <el-col :xs="4" style="text-align: center">
      <i class="info-logo logo-style3" style="transform: translateY(25%)"></i>
    </el-col>
    <el-col :xs="20" class="a100">
      <span>生日:{{datas[0].birthday?datas[0].birthday:'保密'}}</span>
    </el-col>
  </el-row>
  <el-row class="show-list-box" 
  v-if="$route.params.type === 'personal'&&datas.length>0"
  style="height: 60px;line-height: 60px">
    <el-col :xs="4" style="text-align: center">
      <i class="info-logo logo-style3" style="transform: translateY(25%)"></i>
    </el-col>
    <el-col :xs="20" class="a100">
      <span>微信:{{datas[0].wx_nickname?datas[0].wx_nickname:'保密'}}</span>
    </el-col>
  </el-row>
  <div style="background: white; padding: 15px 0"
  class="a100"
  v-if="datas.length === 0">
    <p class="empty-logo">(ㆆᴗㆆ)</p>
    <p class="empty-description">暂无同学参与</p>
  </div>
  <p class="create-activity" 
    v-if="$route.params.type === 'personal'&&datas.length>0"
    @click="startChart($event, datas[0].id, datas[0].name)">发起聊天</p>
</div>
</template>
<script scoped>
import { MessageBox } from 'mint-ui'

export default {
  name: 'user_list',
  data () {
    return {
      datas: []
    }
  },
  created () {
    let type = this.$route.params.type
    if (type === 'activity') {
      this.getActivityList()
    } else if (type === 'league') {
      this.getCollegeList()
    } else if (type === 'personal') {
      this.getPerson()
    }
  },
  methods: {
    getPerson () {
      let _self = this
      _self.datas = []
      _self.getHttp('/api/user/info/' + _self.$route.params.id).then(function (data) {
        _self.datas.push(data.user.info)
      })
    },
    getActivityList () {
      let _self = this
      _self.getHttp('/api/active/getApplyActiveUsers/' + _self.$route.params.id).then(function (data) {
        _self.datas = data.users
      })
    },
    getCollegeList () {
      let _self = this
      _self.getHttp('/api/course/applyCourseUsers/' + _self.$route.params.id).then(function (data) {
        _self.datas = data.users
      })
    },
    startChart (e, id, name) {
      e.stopPropagation()
      let _self = this
      MessageBox.confirm('是否发起对' + name + '聊天？').then(({ value, action }) => {
        _self.$parent.$refs.toastChart.click()
        setTimeout(function () {
          _self.$parent.$children[1].$refs.checkChartId.$parent.outEntry(id)
        })
      }).catch(function () {
      })
    }
  }
}
</script>
