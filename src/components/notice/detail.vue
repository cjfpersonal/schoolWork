<template>
<div>
    <headl :bar='false' :search="false" title="信息详情" backRouth="/notice"></headl>
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
      data: {}
    }
  },
  created () {
    this.init()
    this.createType = this.$route.params.type
  },
  methods: {
    init () {
      this.typeInfo = this.$route.params.type
      if (this.typeInfo === 'notice') {
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
