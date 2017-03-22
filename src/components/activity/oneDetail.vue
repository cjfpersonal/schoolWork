<template>
  <div class="one-activity-detail">
    <div v-if="typeInfo === 'trends'">
        <div class="img-box">
            <img :src='data.imagePost' style="width: 80%;padding: 10px" />
        </div>
        <div class="activity-one-detail-content">
            <p class="detail-main-title">{{data.name}}</p>
            <p class="activity-one-detail-box"><span>地点:</span><span>{{data.address}}</span></p>
            <p class="activity-one-detail-box"><span>活动时间:</span><span>{{data.time | time}}</span></p>
            <p class="activity-one-detail-box"><span>联系手机:</span><span>{{data.phone}}</span></p>
            <p class="activity-one-detail-box"><span>已报名人数:</span><span>{{data.count}}</span></p>
            <p class="activity-one-detail-box"><span>报名费用:</span><span>{{data.money}}</span></p>
            <div class="activity-one-detail-box">
                <p>活动详情：</p>{{data.description}}</div>
            <div class="activity-one-detail-box"><p>活动条件:</p><span>{{data.condition}}</span></div>
            <div class="activity-one-detail-box"><p>活动地点:</p><p id='oneDetailShow'></p></div>
        </div>
        <mt-button type="primary" class="attend-activity" @click="attendActivity($event, 'trends')">参与活动</mt-button>
    </div>
    <div v-if="typeInfo === 'course'">
        <div class="activity-one-detail-content">
            <p class="detail-main-title">{{data.name}}</p>
            <p class='m25'><span>课程编号:</span><span>{{data.number}}</span></p>
            <p class='m25'><span>导师:</span><span>{{data.teacher}}</span></p>
        </div>
        <mt-button type="primary" class="attend-activity" @click="attendActivity($event, 'course')">参与课程</mt-button>
    </div>
    <div v-if="typeInfo === 'college'">
        <div class="activity-one-detail-content">
            <p class="detail-main-title">{{data.name}}</p>
            <p class="m25"><span>人数:</span><span>{{data.amount}}</span></p>
            <p class="m25"><span>类型:</span><span>{{data.type}}</span></p>
            <div class="m25"><p>社团描述</p>{{data.introduction}}</div>
        </div>
    </div>
    <div v-if="typeInfo === 'notice'">
        <div class="activity-one-detail-content">
            <p class="detail-main-title">{{data.title}}</p>
            <p class="m25"><p>公告信息</p>{{data.content}}</p>
        </div>
    </div>
    <div v-if="typeInfo === 'work'">
        <div class="activity-one-detail-content">
            <p class="detail-main-title">{{data.job}}</p>
            <p class="m25"><span>薪资:</span><span>{{data.salary}}</span></p>
            <p class="m25"><span>公司名称:</span><span>{{data.company_name}}</span></p>
            <p class="m25"><span>公司地址:</span><span>{{data.address}}</span></p>
            <p class="m25"><span>联系电话:</span><span>{{data.phone}}</span></p>
            <p class="m25"><span>学历要求:</span><span>{{data.education}}</span></p>
            <p class="m25"><span>招聘人数:</span><span>{{data.amount}}</span></p>
            <p class="m25"><span>公司email:</span><span>{{data.email}}</span></p>
            <p class="m25"><span>招聘人数:</span><span>{{data.amount}}</span></p>
            <p class="m25"><span>开始时间:</span><span>{{data.job_time | time}}</span></p>
            <p class="m25"><span>持续时长:</span><span>{{data.duration}}</span></p>
            <p class="m25"><span>截止时间:</span><span>{{data.end_time | time}}</span></p>
            <div class="m25"><p>应聘详情:</p>{{data.description}}</div>
        </div>
        <mt-button type="primary" class="attend-activity" @click="attendActivity($event, 'work')">应聘职位</mt-button>
    </div>
  </div>
</template>

<script>
import { MessageBox, Toast } from 'mint-ui'
export default {
  name: 'activityDetail',
  props: ['choiceActivityInfo'],
  data: function () {
    return {
      data: {},
      typeInfo: ''
    }
  },
  watch: {
    'choiceActivityInfo': function (newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  },
  created: function () {
    let _self = this
    _self.typeInfo = _self.$route.params.type
    if (this.typeInfo === 'trends') {
      this.data = {
        name: '活动测试',
        time: new Date(),
        address: '深圳大学石头屋',
        lat: '22.5390130000',
        lnt: '113.9425010000',
        count: 1,
        phone: '18218025628',
        description: '本次活动是以交友为主，给大家一个脱单的平台；生活就像海洋，只有意志坚强的人才能到达生活的彼岸。防静电撒开了家范德萨解放东路撒娇的撒解放啦世纪东方。',
        money: 0,
        condition: '1、仅限大三以下学生；<br>2、仅限计算机与软件学院。<br>3、长得帅和漂亮',
        imagePost: require('../../assets/src/trends.png'),
        imgagePicture: require('../../assets/src/trends.png')
      }
      setTimeout(function () {
        _self.init()
      })
    } else if (this.typeInfo === 'course') {
      this.data = {
        number: '2324647382478329',
        name: '计算机编程信息',
        teacher: 'cjf超级导师'
      }
    } else if (this.typeInfo === 'college') {
      this.data = {
        name: '深大创客社团',
        amount: 123,
        type: '创业型',
        introduction: '深大发生快乐多撒谎发大水你开房剪短发哈尽快发货记得；看撒娇几点返回房间看电视；啊很多事；啊口袋啥尽快发货的萨拉能发货科技活动方式即可浪费好多撒'
      }
    } else if (this.typeInfo === 'notice') {
      this.data = {
        title: '校公告',
        content: '的撒建立符合对方即可撒拉黑房间蒂萨浪费不看了多少遍你发的把历史记录和发动机来撒会放假到拉萨回房间都累死了安静环境反倒是拉横幅几点上课'
      }
    } else if (this.typeInfo === 'work') {
      this.data = {
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
      }
    }
  },
  methods: {
    init: function () {
      let map = new window.BMap.Map('oneDetailShow')
      let point = new window.BMap.Point(this.data.lnt, this.data.lat)
      let marker = new window.BMap.Marker(point) // 创建标注
      map.addOverlay(marker) // 将标注添加到地图中
      marker.setAnimation(window.BMAP_ANIMATION_BOUNCE) // 跳动的动画
      map.centerAndZoom(point, 16) // 启用城市名称作为中心
      map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT, type: window.BMAP_NAVIGATION_CONTROL_SMALL})) // 添加放大缩小button
      // 创建标注
    },
    gotoRouter: function (e, value) {
      e.stopPropagation()
      this.$router.push(value)
    },
    attendActivity: function (e, type) {
      console.log(3456765456)
      e.stopPropagation()
      if (type === 'trends') {
        MessageBox.confirm('参与活动需要' + this.data.money + ',确定参与?').then(action => {
          Toast({
            message: '支付成功',
            position: 'middle',
            duration: 1500
          })
        }).catch(function () {
          Toast({
            message: '已取消支付',
            position: 'middle',
            duration: 1500
          })
        })
      } else if (type === 'course') {
        MessageBox.confirm('确定参与该课程?').then(action => {
          Toast({
            message: '参与成功',
            position: 'middle',
            duration: 1500
          })
        }).catch(function () {
          Toast({
            message: '已取消参与',
            position: 'middle',
            duration: 1500
          })
        })
      } else if (type === 'work') {
        MessageBox.confirm('确定应聘该职位?').then(action => {
          Toast({
            message: '应聘成功',
            position: 'middle',
            duration: 1500
          })
        }).catch(function () {
          Toast({
            message: '取消应聘',
            position: 'middle',
            duration: 1500
          })
        })
      }
    }
  }
}
</script>

<style>
#oneDetailShow {
    width: 100%;
    height: 200px;
}
.attend-activity {
    position: fixed;
    bottom: 0;
    width: 100%
}
</style>
