<template>
<div>
    <!--<headl :bar='true' :search="true" title="公告信息" backRouth="/home" :barContent="barContent"></headl>-->
  <div class="activity-list-box">
    <p class="activity-list-activity" :class="{'active': !isFocus }" @click.active="addActive($event, 0)">公告信息</p>
    <p class="activity-list-activity" :class="{'active': isFocus }" @click.active="addActive($event, 1)">兼职信息</p>
  </div>
  <div v-if="!isFocus">
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
    </div>
    <div class="m15">
      <div v-for="data in datas">
          <div v-if="data.activityType === 'notice'" class="trends-detail-list clearfix" 
          @click="gotoRouter($event, 'detail/'+data.activityType+'/243243')">
              <p style="clear: both;text-align: right;padding-bottom: 10px">公告</p>
              <div class="trends-detail-content clearfix">
                  <p class="detail-main-title">{{data.title}}</p>
                  <p>{{data.content | maxLength}}</p>
              </div>
              <p style="float:right;color: #93d1ff;">详情</p>
          </div>
          <div  v-if="data.activityType === 'work'" class="trends-detail-list clearfix" 
          @click="gotoRouter($event, 'detail/'+data.activityType+'/243243')">
              <p style="clear: both;text-align: right;padding-bottom: 10px">招聘信息</p>
              <div class="trends-detail-content clearfix">
                  <p class="detail-main-title">{{data.job}}</p>
                  <p><span>公司名称:</span><span>{{data.company_name}}</span></p>
                  <p><span>薪资:</span><span>{{data.salary}}</span></p>
                  <p><span>招聘人数:</span><span>{{data.amount}}</span></p>
                  <p>{{data.description | maxLength}}</p>
              </div>
              <p style="float:right;color: #93d1ff;">详情</p> 
          </div>
      </div>
    </div>
  </div>
  <div v-if="isFocus" class="work-box">
    <div class="work-content-box" v-on:scroll='scrollData'>
      <el-row class="work-content" v-for="work in works.data" @click.native="gotoRouter($event, '/notice/detail/work/' + work.id)">
        <el-col :xs="18">
          <p class="work-name">{{work.position}}</p>
          <p class="work-business">{{work.company_name}}</p>
          <p><span>学历要求:</span><span>{{work.teacher}}</span></p>
          <p><span>公司类别:</span><span>{{work.company_type}}</span></p>
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
      works: [],
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
      this.datas = [{
        activityType: 'notice',
        title: '校公告',
        content: '的撒建立符合对方即可撒拉黑房间蒂萨浪费不看了多少遍你发的把历史记录和发动机来撒会放假到拉萨回房间都累死了安静环境反倒是拉横幅几点上课'
      }, {
        activityType: 'notice',
        title: '校公告',
        content: '的撒建立符合对方即可撒拉黑房间蒂萨浪费不看了多少遍你发的把历史记录和发动机来撒会放假到拉萨回房间都累死了安静环境反倒是拉横幅几点上课'
      }, {
        job: 'web前端开发',
        activityType: 'work',
        company_name: '深圳大学',
        address: '地方撒立即回复记得撒很费劲考虑到三复读机啊',
        phone: '18218025628',
        email: '495673294@qq.com',
        salary: '2132/元',
        job_time: new Date(),
        company_type: '创业d轮',
        duration: '三个月',
        education: '本科',
        amount: '123',
        end_time: new Date(),
        description: 'dfsajlhfjds对方即可撒拉黑防静电数据库地方撒很费劲的快乐撒谎电视剧克拉回复就对了撒胡椒粉了决定是否健康拉速度回房间经济大厦附近'
      }, {
        job: 'web前端开发',
        activityType: 'work',
        company_name: '深圳大学',
        address: '地方撒立即回复记得撒很费劲考虑到三复读机啊',
        phone: '18218025628',
        email: '495673294@qq.com',
        salary: '2132/元',
        job_time: new Date(),
        company_type: '创业d轮',
        duration: '三个月',
        education: '本科',
        amount: '123',
        end_time: new Date(),
        description: 'dfsajlhfjds对方即可撒拉黑防静电数据库地方撒很费劲的快乐撒谎电视剧克拉回复就对了撒胡椒粉了决定是否健康拉速度回房间经济大厦附近'
      }]
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
  margin-top: 20px;
  padding: 10px 15px
}
.work-box {
  padding: 0 20px;
  width: 100%;
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
  padding-top: 20px
}
</style>
