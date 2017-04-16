<template>
<div class="a100">
    <el-row class="show-list-box" style="height: 70px;line-height: 70px">
       <el-col :xs="7" style="text-align: center">
         <i class="success-logo logo-style4" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="17" class="a100">
         <span style="color: #4b99ff; font-size: 22px">加入课程成功</span>
       </el-col>
     </el-row>
    <el-row class="show-list-box m25" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="info-logo logo-style3" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <span>{{data.number}}</span>
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="info-logo logo-style3" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <span>{{data.name}}</span>
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="info-logo logo-style3" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <span>{{data.teacher}}</span>
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px" 
     v-on:click.native="showTime($event, 'course', 'time')" >
       <el-col :xs="4" style="text-align: center">
         <i class="info-logo logo-style3" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <span>{{data.created_at}}</span>
       </el-col>
     </el-row>
     <el-row class="show-list-box m25" style="height: 60px;line-height: 60px;overflow: hidden">
       <el-col :xs="15" :offset="1">
         <i class="course-logo-active logo-style1" style="transform: translateY(25%);width: 30px;height: 30px;border-radius: 50%;"></i>
         <i class="course-logo-active logo-style1" style="transform: translateY(25%);width: 30px;height: 30px;border-radius: 50%;"></i>
         <i class="course-logo-active logo-style1" style="transform: translateY(25%);width: 30px;height: 30px;border-radius: 50%;"></i>
         <i class="course-logo-active logo-style1" style="transform: translateY(25%);width: 30px;height: 30px;border-radius: 50%;"></i>
       </el-col>
       <el-col :xs="5">
         <span style="font-size: 14px; color: #dbdbdb">220人参与</span>
       </el-col>
       <el-col :xs="2"><i class="el-icon-arrow-right" style="color: #dfdfdf; font-size: 14px;"></i></el-col>
     </el-row>
     <div class="dialog-footer" style="width: 100%; position: fixed; bottom: 0">
        <div class="half-btn-box" v-on:click="gotoRouter($event, '/home/course')">
            <i class="add-course-logo logo-style3" style="transform: translateY(25%)"></i>
            <span>加入课程</span>
        </div>
        <div class="half-btn-box" @click="gotoRouter($event, '/course')">
            <i class="back-course-logo logo-style1" style="transform: translateY(25%)"></i>
            <span>我的课程</span>
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
      _self.getHttp('/api/course/detail/' + _self.$route.params.id).then(function (data) {
        _self.data = data.course
      })
    },
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    }
  }
}
</script>
