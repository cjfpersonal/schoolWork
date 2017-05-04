<template>
<div>
    <!--<headl :bar='false' :search="false" title="信息详情" backRouth="/notice"></headl>-->
    <div v-if="typeInfo === 'notice'">
        <div class="activity-one-detail-content">
            <p class="detail-main-title">{{data.title}}</p>
            <p class="m25"><p>公告信息</p>{{data.content}}</p>
        </div>
    </div>
    <div v-if="typeInfo === 'work'">
        <div class="notice-content-box">
            <div style="padding-bottom: 10px">
              <span class="notice-detail-position">{{data.position}}</span>
              <span class="notice-detail-salary">{{ '【' + data.salary + '】'}}</span>
              <span class="notice-detail-job-time">{{data.job_time | date}}</span>
            </div>
            <p class="notice-detail-content"><span>学历要求: </span><span>{{data.education}}</span></p>
            <div class="notice-detail-content">
              <span>招聘人数: </span>
              <span style="color: #FF5618">{{data.amount}}</span>人,每周
              <span style="color: #FF5618">{{data.job_time}}</span>天
            </div>
            <div class="notice-detail-content"><span>截止时间: </span><span>{{data.end_time | date}}</span></div>
            <div class="notice-detail-content"><span>办公地点: </span><span>{{data.address}}</span></div>
        </div>
        <p class="notice-mid-info">公司信息</p>
        <div class="notice-content-box">
            <div class="notice-detail-company-name"><span>{{data.company_name}}</span></div>
            <div class="notice-detail-content"><span>公司类别: </span><span>{{data.company_type}}</span></div>
            <div class="notice-detail-content"><span>公司电话: </span><span>{{data.phone}}</span></div>
            <div class="notice-detail-content"><span>公司邮箱: </span><span>{{data.email}}</span></div>
        </div>
        <p class="notice-mid-info">兼职详情</p>
        <div class="notice-content-box">
            <p>{{data.description}}</p>
        </div>
        <p class="notice-mid-info">发布者</p>
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
    </div>
    <div v-if="typeInfo != 'work'">
      <el-row class="work-content2">
        <el-col :xs="2">
          <i class="back-course-logo logo-style6" v-if="typeInfo === 'course'"></i>
          <i class="back-course-logo logo-style6" v-if="typeInfo === 'user'"></i>
          <i class="notice-activity-logo logo-style5" v-if="typeInfo === 'activity'"></i>
          <i class="notice-college-logo logo-style6" v-if="typeInfo === 'college'"></i>
        </el-col>
        <el-col :xs="22">
          <p class="notice-detail-position">{{data.title}}</p>
          <p class="notice-detail-content">
            {{data.created_at | date}}
            <span class="fr">
              <i class="scan-logo logo-style7"></i>
              {{data.view ? data.view : '0'}}
            </span>
          </p>
        </el-col>
      </el-row>
      <div class="notice-content-box">
          <p>{{data.content}}</p>
      </div>
      <p class="notice-mid-info">
        评论区
        <span class="fr comment-box" 
        @click="gotoRouter($event, '/notice/comment/'+typeInfo+'/'+data.id)">
          <i class="comment-logo logo-style6"></i>
          我要评论
        </span>
      </p>
      <el-row class="show-list-box" 
       v-if="comments.length > 0">
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
      <div style="background: white; padding: 15px 0" v-if="comments.length === 0">
        <p class="empty-logo">(ㆆᴗㆆ)</p>
        <p class="empty-description">暂无评论，是否即兴表演展示下</p>
      </div>
    </div>
</div>
</template>
<script>
import headl from '../common/head'
export default {
  components: {
    'headl': headl
  },
  name: 'notice',
  data () {
    return {
      typeInfo: '',
      data: {},
      user: {},
      comments: []
    }
  },
  created () {
    this.init()
    this.createType = this.$route.params.type
  },
  methods: {
    init () {
      this.typeInfo = this.$route.params.type
      let id = this.$route.params.id
      let _self = this
      if (this.typeInfo !== 'work') {
        _self.getHttp('/api/info/announcement/detail/' + id).then(function (data) {
          _self.data = data.announcement
          _self.getHttp('/api/info/comment/list/' + data.announcement.id).then(function (user) {
            _self.comments = user.comments
          })
        })
      } else {
        _self.getHttp('/api/info/partime/detail/' + id).then(function (data) {
          _self.data = data.partime
          _self.getHttp('/api/user/info/' + data.partime.user_id).then(function (user) {
            _self.user = user.userInfo
          })
        })
      }
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
<style>
.notice-content-box {
  background: white;
  padding: 10px 15px;
}
.notice-detail-position {
  font-size: 15px;
  color: black;
  font-weight: 600
}
.notice-detail-salary {
  color: #FF5618;
  font-size: 15px
}
.notice-detail-job-time {
  float: right;
  font-size: 13px;
  min-width: 63px
}
.notice-mid-info {
  padding: 5px 15px;
  font-size: 16px;
  color: #8E8E8E
}
.notice-detail-company-name {
  color: rgba(0 , 0, 0, .8);
  font-size: 13px;
}
.notice-detail-content {
  color: #B6B6B6;
  font-size: 12px;
}
.comment-box {
  position: relative;
  top: 5px;
  font-size: 12px;
}
</style>
