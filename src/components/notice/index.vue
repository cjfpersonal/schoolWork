<template>
<div>
    <headl :bar='true' :search="true" title="公告信息" backRouth="/home" :barContent="barContent"></headl>
    <el-row>
        <el-col :xs="8" class="tab-choice active">全部</el-col>
        <el-col :xs="8" class="tab-choice">公告</el-col>
        <el-col :xs="8" class="tab-choice">招聘信息</el-col>
    </el-row>
    <div v-for="data in datas" class="activity-detail-list-content">
        <div  v-if="data.activityType === 'notice'" class="trends-detail-list clearfix" 
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
      barContent: [{
        title: '发布公告',
        path: '/notice/create/notice'
      }, {
        title: '发布招聘',
        path: '/notice/create/work'
      }],
      datas: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
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
</style>
