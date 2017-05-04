<template>
<div>
    <!--<headl :bar='true' :search="true" title="公告信息" backRouth="/home" :barContent="barContent"></headl>-->
  <div class="activity-list-box">
    <p class="activity-list-activity" :class="{'active': !isFocus }" @click.active="addActive($event, 0)">公告信息</p>
    <p class="activity-list-activity" :class="{'active': isFocus }" @click.active="addActive($event, 1)">兼职信息</p>
  </div>
  <div v-if="!isFocus" class="work-box" v-on:scroll='userScrollData'>
    <div class="m15">
      <el-row class="show-list-box" style="height: 50px;line-height: 50px"
     @click.native="gotoRouter($event, '/notice/list/course')">
       <el-col :xs="6" style="text-align: center">
         <i class="course-logo-active logo-style1" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="16">
         课程公告
       </el-col>
       <el-col :xs="2"><i class="el-icon-arrow-right" style="color: #dfdfdf"></i></el-col>
      </el-row>
     </div>
     <el-row class="show-list-box" style="height: 50px;line-height: 50px"
     @click.native="gotoRouter($event, '/notice/list/college')">
       <el-col :xs="6" style="text-align: center">
         <i class="college-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="16">
         社团公告
       </el-col>
       <el-col :xs="2"><i class="el-icon-arrow-right" style="color: #dfdfdf"></i></el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 50px;line-height: 50px"
     @click.native="gotoRouter($event, '/notice/list/activity')">
       <el-col :xs="6" style="text-align: center">
         <i class="foot-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="16">
         活动公告
       </el-col>
       <el-col :xs="2"><i class="el-icon-arrow-right" style="color: #dfdfdf"></i></el-col>
     </el-row>
    <p class="notice-head-title">系统公告</p>  
    <el-row v-for="data in system.data" class="work-content"
    @click.native="gotoRouter($event, '/notice/detail/user/' + data.id)">
      <el-col :xs="2">
        <i class="system-logo logo-style5"></i>
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
    </div>
  <div v-if="isFocus" class="work-box">
    <div class="work-content-box" v-on:scroll='scrollData'>
      <el-row class="work-content" 
      v-for="work in works.data" @click.native="gotoRouter($event, '/notice/detail/work/' + work.id)">
        <el-col :xs="18">
          <p class="notice-detail-position">{{work.position}}</p>
          <p class="notice-detail-company-name">{{work.company_name}}</p>
          <p class="notice-detail-content"><span>学历要求:</span><span>{{work.education}}</span></p>
          <p class="notice-detail-content"><span>公司类别:</span><span>{{work.company_type}}</span></p>
        </el-col>
        <el-col :xs="6">
          <p class="work-salary">{{work.salary}}</p>
          <p class="work-end-time">{{work.end_time | date}}</p>
        </el-col>
      </el-row>
    </div>
    <div class="publish-box" @click="gotoRouter($event, '/notice/create/work')">
      <i class="publish-logo publish-style"></i>
      <span class="publish-font">发布兼职</span>
    </div>
  </div>
</div>
</template>
<script>
import headl from '../common/head'
export default {
  name: 'notice',
  components: {
    'headl': headl
  },
  data () {
    return {
      isFocus: false,
      barContent: [{
        title: '发布公告',
        path: '/notice/create/notice'
      }, {
        title: '发布招聘',
        path: '/notice/create/work'
      }],
      page: 1,
      userPage: 1,
      works: [],
      system: [],
      datas: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let _self = this
      _self.getHttp('/api/info/partimeList?page=1').then(function (data) {
        _self.works = data.partime
      })
      _self.getHttp('/api/info/announcementList?page=1').then(function (data) {
        _self.system = data.announcements
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
    scrollData (e) {
      e.stopPropagation()
      if (this.page < this.works.last_page) {
        let url = '/api/info/partimeList?page=' + (parseInt(this.page) + 1)
        let dom = e.target
        let _self = this
        if (dom.offsetHeight + dom.scrollTop >= dom.scrollHeight) {
          _self.getHttp(url).then(function (data) {
            _self.works.data = _self.works.data.concat(data.partime.data)
            _self.page = data.partime.current_page
          })
        }
      }
    },
    addActive (e, type) {
      e.stopPropagation()
      if (type === 0) {
        this.isFocus = false
      } else if (type === 1) {
        this.isFocus = true
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
.tab-choice {
    background: white;
    padding: 20px 0;
    text-align: center;
    margin-bottom: 20px;
}
.tab-choice.active {
    color: #26a2ff;
    border-bottom: 4px solid #26a2ff
}
.work-content-box {
  height: calc(100% - 70px);
  overflow: scroll
}
.work-content {
  width: 100%;
  background: white;
  margin-top: 10px;
  padding: 10px 15px
}
.work-box {
  padding: 0 20px;
  width: 100%;
  overflow: scroll;
  height: calc(100% - 60px)
}
.publish-box {
  width: calc(100% - 40px);
  background: white;
  padding: 15px 0;
  border-radius: 5px;
  text-align: center;
  position: fixed;
  bottom: 70px
}
.publish-font {
  color: #56A5FF;
  font-size: 15px
}
.work-name {
  font-size: 16px;
  padding-bottom: 5px;
  color: black
}
.work-business {
  font-size: 14px;
  color: #464646
}
.work-salary {
  color: #FF6E44;
  float: right
}
.work-end-time {
  color: #ADADAD;
  float: right;
  min-width: 74px;
  padding-top: 15px
}
.notice-head-title {
  color: #A0A0A0;
  font-size: 12px;
  padding: 5px 20px;
  text-align: center;
  width: 100%;
  position: relative
}
.notice-head-title::before {
  content: '';
  width: calc(45% - 24px);
  background: #A0A0A0;
  opacity: .2;
  height: 2px;
  position: absolute;
  left: 0;
  top: 13px;
}
.notice-head-title::after {
  content: '';
  width: calc(48% - 24px);
  background: #A0A0A0;
  opacity: .2;
  height: 2px;
  position: absolute;
  right: 0;
  top: 13px;
}
</style>
