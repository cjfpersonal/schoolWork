<template>
<div>
    <!--<headl :bar='false' :search="false" title="发布课程" backRouth="/course"></headl>-->
    <date-time-show v-on:time="getTime" :startTime="''" dateType="datetime" :openTime='sh.time'></date-time-show>
    <div>
      <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="课程编号" v-model="course.number" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="课程名称" v-model="course.name" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="主讲教师" v-model="course.teacher" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px" 
     v-on:click.native="showTime($event, 'course', 'time')" >
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="创建时间" v-model="course.time" readonly />
       </el-col>
     </el-row>
    </div>
    <div slot="footer" class="dialog-footer" style="width: 100%; position: fixed; bottom: 0">
      <mt-button type="primary" @click="confirmInfo($event)" class="create-btn">创建课程</mt-button>
    </div>
</div>
</template>
<script>
import dateTime from '../common/dateTime'
import headl from '../common/head'
export default {
  components: {
    'headl': headl,
    'date-time-show': dateTime
  },
  name: 'notice',
  data () {
    return {
      sh: {
        time: false,
        record: ''
      },
      course: {
        number: '',
        name: '',
        teacher: '',
        time: ''
      }
    }
  },
  created () {
  },
  methods: {
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    },
    confirmInfo (e) {
      e.stopPropagation()
      let _self = this
      _self.postHttp('/api/course/store', _self.course, 'toast').then(function (data) {
        _self.$router.go(-1)
      })
    },
    showTime (e, moduleType, character) {
      e.stopPropagation()
      this.sh.time = true
      this.sh.record = moduleType + ';' + character
    },
    getTime (time) {
      this.sh.time = false
      this[this.sh.record.split(';')[0]][this.sh.record.split(';')[1]] = time
    }
  }
}
</script>
