<template>
<div>
    <headl :bar='false' :search="false" title="发布信息" backRouth="/notice"></headl>
    <div v-if="createType === 'notice'">
      <mt-field label="公告标题" v-model="notice.title" placeholder="请输入公告标题" class="activity-create-input"></mt-field>
      <mt-field label="公告内容" v-model="notice.content" placeholder="公告内容" type="textarea" rows="4" class="activity-create-input"></mt-field>
    </div>
    <div v-if="createType === 'work'">
      <date-time-show v-on:time="getTime" :startTime="''" dateType="datetime" :openTime='sh.time'></date-time-show>      
      <mt-field label="招聘职位" v-model="work.job" placeholder="请输入招聘职位" class="activity-create-input"></mt-field>
      <mt-field label="公司名称" v-model="work.company_name" placeholder="请输入公司名称" class="activity-create-input"></mt-field>
      <mt-field label="办公地点" v-model="work.address" placeholder="请输入办公地点" class="activity-create-input"></mt-field>
      <mt-field label="公司电话" v-model="work.phone" type="pohone" placeholder="请输入公司电话" class="activity-create-input"></mt-field>
      <mt-field label="公司邮箱" v-model="work.email" type="email" placeholder="请输入公司邮箱" class="activity-create-input"></mt-field>
      <mt-field label="薪资" v-model="work.salary" type="num"placeholder="请输入薪资" class="activity-create-input"></mt-field>
      <mt-field label="工作时间" v-model="work.job_time" 
      @click.native="showTime($event, 'work', 'job_time')" placeholder="请输入工作时间" class="activity-create-input"></mt-field>
      <mt-field label="公司类型" v-model="work.company_type" placeholder="请输入公司类型" class="activity-create-input"></mt-field>
      <mt-field label="工作至少时长" v-model="work.duration" placeholder="请输入至少时长" class="activity-create-input"></mt-field>
      <mt-field label="学历" v-model="work.education" placeholder="请输入学历" class="activity-create-input"></mt-field>
      <mt-field label="人数" v-model="work.amount" placeholder="请输入人数" class="activity-create-input"></mt-field>
      <mt-field label="截止时间" v-model="work.end_time"
      @click.native="showTime($event, 'work','end_time')" placeholder="请输入截止时间" class="activity-create-input"></mt-field>
      <mt-field label="兼职招聘描述" v-model="work.description" placeholder="兼职招聘描述" type="textarea" rows="4" class="activity-create-input"></mt-field>
    </div>
    <div slot="footer" class="dialog-footer" style="width: 100%; margin: 15px 0;text-align: center">
      <mt-button type="default" @click="gotoRouter($event, '/notice')" style="width: 150px">取 消</mt-button>
      <mt-button type="primary" @click="confirmInfo($event)" style="width: 150px">确 定</mt-button>
    </div>
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
        job: '',
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
    }
  }
}
</script>
