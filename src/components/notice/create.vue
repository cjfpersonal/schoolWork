<template>
<div class="activity-detail-list-content">
    <!--<headl :bar='false' :search="false" title="发布信息" backRouth="/notice"></headl>-->

    <div v-if="createType !== 'work'">
      <mt-field label="公告标题" v-model="notice.title" placeholder="请输入公告标题" class="activity-create-input"></mt-field>
      <mt-field label="公告内容" v-model="notice.content" placeholder="公告内容" type="textarea" rows="4" class="activity-create-input"></mt-field>
    </div>
    <div v-if="createType === 'work'">
      <date-time-show v-on:time="getTime" :startTime="''" dateType="datetime" :openTime='sh.time'></date-time-show>
      <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="招聘职位" v-model="work.position" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="公司名称" v-model="work.company_name" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="请输入办公地点" v-model="work.address" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="公司电话" v-model="work.phone" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="公司邮箱" v-model="work.email" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="请输入薪资" v-model="work.salary" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input"
         placeholder="请输入工作几天/周" v-model="work.job_time" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="请输入公司类型" v-model="work.company_type" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="请输入至少时长" v-model="work.duration" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="请输入学历" v-model="work.education" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="请输入人数" v-model="work.amount" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" @click="showTime($event, 'work','end_time')"
         placeholder="请输入截止时间" v-model="work.end_time" readonly />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="兼职招聘描述" v-model="work.description" />
       </el-col>
     </el-row>
    </div>
    <p class="create-activity" @click="confirmInfo($event)">确认发布</p>
</div>
</template>
<script>
import headl from '../common/head'
import dateTime from '../common/dateTime'
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
      createType: '',
      notice: {
        title: '',
        content: ''
      },
      // 招聘信息
      work: {
        position: '',
        company_name: '',
        address: '',
        phone: '',
        email: '',
        salary: '',
        job_time: '',
        company_type: '',
        duration: '',
        education: '',
        amount: '',
        end_time: '',
        description: ''
      }
    }
  },
  created () {
    this.init()
    console.log(this.$route.params.type)
    this.createType = this.$route.params.type
  },
  methods: {
    init () {
      console.log(34567)
    },
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    },
    showTime (e, moduleType, character) {
      e.stopPropagation()
      this.sh.time = true
      this.sh.record = moduleType + ';' + character
    },
    getTime (time) {
      this.sh.time = false
      this[this.sh.record.split(';')[0]][this.sh.record.split(';')[1]] = time
    },
    confirmInfo (e) {
      e.stopPropagation()
      let _self = this
      if (this.createType === 'work') {
        _self.postHttp('/api/info/partime/store', _self.work, 'toast').then(function (data) {
          console.log(data)
        })
      }
    }
  }
}
</script>
