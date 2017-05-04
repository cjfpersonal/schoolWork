<template>
<div class="a100" style="padding: 0 20px" v-on:scroll='userScrollData'>
  <p class="notice-head-title">{{title}}</p> 
  <el-row v-for="data in datas.data" 
  @click.native="gotoRouter($event, '/notice/detail/' + type + '/' + data.id)"
  class="work-content2" 
  v-if='datas.data.length > 0'>
    <el-col :xs="2">
      <i class="back-course-logo logo-style6" v-if="type === 'course'"></i>
      <i class="notice-activity-logo logo-style5" v-if="type === 'activity'"></i>
      <i class="notice-college-logo logo-style6" v-if="type === 'college'"></i>
    </el-col>
    <el-col :xs="22">
      <p class="notice-detail-position">{{data.title}}</p>
      <p class="notice-detail-company-name more-content-hide">{{data.content}}</p>
      <p class="notice-detail-content">
        {{data.created_at | date}}
        <span class="fr">
          <i class="scan-logo logo-style7"></i>
          {{data.view ? data.view : '0'}}
        </span>
      </p>
    </el-col>
  </el-row>
  <div v-if='datas.data.length === 0' class="empty-box">
    <p class="empty-logo">(ㆆᴗㆆ)</p>
    <p class="empty-description">参与的活动暂无公告，请查看其他活动</p>
  </div>
</div>
</template>
<script>
export default {
  name: 'list',
  data () {
    return {
      type: '',
      datas: {
        data: []
      },
      title: ''
    }
  },
  created () {
    this.type = this.$route.params.type
    this.init()
  },
  methods: {
    init () {
      let _self = this
      let url = ''
      if (this.type === 'course') {
        url = '/api/info/list/course?page=1'
        _self.title = '课程公告'
      } else if (this.type === 'college') {
        url = '/api/info/list/league?page=1'
        _self.title = '社团公告'
      } else if (this.type === 'activity') {
        url = '/api/info/list/active?page=1'
        _self.title = '活动公告'
      }
      _self.getHttp(url).then(function (data) {
        _self.datas = data.announcements
      })
    },
    userScrollData (e) {
      e.stopPropagation()
      if (this.userPage < this.system.last_page) {
        let url = '/api/info/announcementList?page=' + (parseInt(this.userPage) + 1)
        let dom = e.target
        let _self = this
        if (dom.offsetHeight + dom.scrollTop >= dom.scrollHeight) {
          _self.getHttp(url).then(function (data) {
            _self.system.data = _self.system.data.concat(data.announcements.data)
            _self.userPage = data.announcements.current_page
          })
        }
      }
    },
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    }
  }
}
</script>
<style>
.work-content2 {
  padding: 10px 20px;
  margin-bottom: 10px;
  background: white
}
</style>
