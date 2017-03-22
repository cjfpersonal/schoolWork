<template>
  <div class="activity-detail-list-content">
    <div v-for="data in trends" v-if="routeRecord === 'trends'">
      <div class="trends-detail-list clearfix" @click="gotoRouter($event, routeRecord + '/243243')">
        <p style="clear: both;text-align: right;padding-bottom: 10px">活动</p>
        <img v-if="data.imgagePicture" :src="data.imgagePicture" class="imageDetail" />
        <img v-if="!data.imgagePicture" src="../../assets/src/location.png" class="imageDetail" />
        <div class="trends-detail-content">
          <p class="detail-main-title">{{data.name}}</p>
          <p><span>地点:</span><span>{{data.address}}</span></p>
          <p><span>活动时间:</span><span>{{data.time | time}}</span></p>
        </div>
        <p style="float:left; padding: 10px 0">{{data.description | checkLength}}</p>
        <p style="float:right;color: #93d1ff;">详情</p>        
      </div>
    </div>
    <div v-for="data in course" v-if="routeRecord === 'course'" class="trends-detail-list clearfix" @click="gotoRouter($event, routeRecord + '/243243')">
      <p style="clear: both;text-align: right;padding-bottom: 10px">课程</p>
      <div class="trends-detail-content clearfix">
        <p class="detail-main-title">{{data.name}}</p>
        <p><span>编号:</span><span>{{data.number}}</span></p>
        <p><span>导师:</span><span>{{data.teacher}}</span></p>
      </div>
      <p style="clear: both;color: #93d1ff;text-align: right">详情</p>
    </div>
    <div v-for="data in college" v-if="routeRecord === 'college'" class="trends-detail-list clearfix"
     @click="gotoRouter($event, routeRecord + '/243243')">
      <p style="clear: both;text-align: right;padding-bottom: 10px">社团</p>
      <div class="trends-detail-content clearfix">
        <p class="detail-main-title">{{data.name}}</p>
        <p><span>人数:</span><span>{{data.amount}}</span></p>
        <p><span>类型:</span><span>{{data.type}}</span></p>
        <p>{{data.introduction | maxLength}}</p>
      </div>
      <p style="float:right;color: #93d1ff;">详情</p>
    </div>
    <div v-for="data in notice" v-if="routeRecord === 'notice'" class="trends-detail-list clearfix" 
    @click="gotoRouter($event, routeRecord+'/243243')">
      <p style="clear: both;text-align: right;padding-bottom: 10px">公告</p>
      <div class="trends-detail-content clearfix">
        <p class="detail-main-title">{{data.title}}</p>
        <p>{{data.content | maxLength}}</p>
      </div>
      <p style="float:right;color: #93d1ff;">详情</p>
    </div>
    <div v-for="data in work" v-if="routeRecord === 'work'" class="trends-detail-list clearfix" @click="gotoRouter($event, routeRecord+'/243243')">
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
</template>

<script>
export default {
  name: 'activityDetail',
  props: ['choiceActivityInfo'],
  data () {
    return {
      routeRecord: '',
      trends: [],
      course: [],
      college: [],
      notice: [],
      work: []
    }
  },
  watch: {
    'choiceActivityInfo': function (newVal, oldVal) {
      console.log(newVal, oldVal)
    },
    '$route.params.type': function (newVal, oldVal) {
      this.routeRecord = newVal
    }
  },
  created: function () {
    this.routeRecord = this.$route.params.type
    this.trends = [{
      activityType: 'trends',
      name: '活动测试',
      time: new Date(),
      address: '深圳大学石头屋',
      lat: '',
      lnt: '',
      count: 1,
      phone: '18218025628',
      description: '本次活动是以交友为主，给大家一个脱单的平台；生活就像海洋，只有意志坚强的人才能到达生活的彼岸。防静电撒开了家范德萨解放东路撒娇的撒解放啦世纪东方。',
      money: 0,
      condition: '1、仅限大三以下学生；<br>2、仅限计算机与软件学院。<br>3、长得帅和漂亮',
      imagePost: '../../assets/src/trends.png',
      imgagePicture: require('../../assets/src/trends.png')
    }, {
      activityType: 'trends',
      name: '活动测试2',
      time: new Date(),
      address: '深圳大学石头屋2',
      lat: '',
      lnt: '',
      count: 12,
      phone: '18218025628',
      description: '本次活动是以交友为主，给大家一个脱单的平台；生活就像海洋，只有意志坚强的人才能到达生活的彼岸。防静电撒开了家范德萨解放东路撒娇的撒解放啦世纪东方。',
      money: 0,
      condition: '1、仅限大三以下学生；<br>2、仅限计算机与软件学院。<br>3、长得帅和漂亮',
      imagePost: '../../assets/src/trends.png',
      imgagePicture: ''
    }]
    this.course = [{
      activityType: 'course',
      number: '2324647382478329',
      name: '计算机编程信息',
      teacher: 'cjf超级导师'
    }, {
      activityType: 'course',
      number: '2324647382478329',
      name: '计算机编程信息',
      teacher: 'cjf超级导师'
    }]
    this.college = [{
      activityType: 'college',
      name: '深大创客社团',
      amount: 123,
      type: '创业型',
      introduction: '深大发生快乐多撒谎发大水你开房剪短发哈尽快发货记得；看撒娇几点返回房间看电视；啊很多事；啊口袋啥尽快发货的萨拉能发货科技活动方式即可浪费好多撒'
    }, {
      activityType: 'college',
      name: '深大创客社团',
      amount: 123,
      type: '创业型',
      introduction: '深大发生快乐多撒谎发大水你开房剪短发哈尽快发货记得；看撒娇几点返回房间看电视；啊很多事；啊口袋啥尽快发货的萨拉能发货科技活动方式即可浪费好多撒'
    }]
    this.notice = [{
      activityType: 'notice',
      title: '校公告',
      content: '的撒建立符合对方即可撒拉黑房间蒂萨浪费不看了多少遍你发的把历史记录和发动机来撒会放假到拉萨回房间都累死了安静环境反倒是拉横幅几点上课'
    }, {
      activityType: 'notice',
      title: '校公告',
      content: '的撒建立符合对方即可撒拉黑房间蒂萨浪费不看了多少遍你发的把历史记录和发动机来撒会放假到拉萨回房间都累死了安静环境反倒是拉横幅几点上课'
    }]
    this.work = [{
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
  methods: {
    gotoRouter: function (e, value) {
      e.stopPropagation()
      this.$router.push(value)
    }
  }
}
</script>

<style>
</style>
