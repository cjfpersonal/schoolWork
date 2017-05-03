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
        <div class="activity-one-detail-content">
            <p class="detail-main-title">
              <span>{{data.job}}</span>
              <span>{{data.salary}}</span>
              <span>{{data.job_time | date}}</span>
            </p>
            <p class="m25"><span>学历要求:</span><span>{{data.education}}</span></p>
            <p class="m25">
              <span>招聘人数:</span>
              <span>{{data.amount}}人,</span>
            </p>
            <p class="m25"><span>截止时间:</span><span>{{data.end_time | date}}</span></p>
            <p class="m25"><span>办公地点:</span><span>{{data.address}}</span></p>
        </div>
        <p>公司信息</p>
        <div>
            <p class="m25"><span>公司名称:</span><span>{{data.company_name}}</span></p>
            <p class="m25"><span>联系电话:</span><span>{{data.phone}}</span></p>
            <p class="m25"><span>公司email:</span><span>{{data.email}}</span></p>
        </div>
        <p>兼职详情</p>
        <div>
            <p>应聘详情:</p>{{data.description}}
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
      let id = this.$route.params.id
      let _self = this
      let url = ''
      if (this.typeInfo === 'notice') {
        url = ''
      } else if (this.typeInfo === 'work') {
        url = '/api/info/partime/detail/'
      }
      _self.getHttp(url + id).then(function (data) {
        console.log(data)
      })
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
