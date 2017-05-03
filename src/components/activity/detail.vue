<template>
<div class="a100">
  <!--<headl :choice="choice" :search="true" title="活动信息" backRouth="/home/user"></headl>-->
  <div class="activity-detail-list-content"
    v-on:scroll='scrollData'>
        <div v-for="data in active.data"
        style="padding: 15px 5px; background: white"
        class="trends-detail-list clearfix" @click="gotoRouter($event, '/activity/detail/' + data.id)">
        <el-row>
          <el-col :xs="10" style="text-align: center;min-height:120px">
            <img :src="data.poster" style="min-height:120px;width: 90%" />
          </el-col>
          <el-col :xs="14" style="height: 120px;">
              <div class="content-right-box">
                <p class="activity-main-title">{{data.name}}</p>
                <p>
                  <i class="time-logo activity-style1"></i>
                  <span>时间:</span><span>{{data.time}}</span></p>
                <p>
                  <i class="local-logo activity-style2"></i>
                  <span>地址:</span><span>{{data.address}}</span></p>
                <p>
                  <i class="money-logo activity-style3"></i>
                  <span>费用:</span><span>{{data.money}}</span></p>
                <p>
                  <i class="attend-person-logo activity-style2"></i>
                  <span>报名人数:</span><span>{{data.person}}</span></p>
                <p>
                  <i class="total-logo activity-style1"></i>
                  <span>剩余人数:</span><span>{{data.count  - data.person}}</span></p>
              </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <p class="create-activity" @click="gotoRouter($event, '/activity/create')">发布活动</p>
  </div>
</template>

<script>
import headl from '../common/head'

export default {
  name: 'activityDetail',
  components: {
    'headl': headl
  },
  data () {
    return {
      choice: {
        title: '发布',
        show: true,
        path: '/activity/create'
      },
      active: [],
      page: 0
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init () {
      let _self = this
      _self.getHttp('/api/active/list?page=1').then(function (data) {
        _self.active = data.actives
        _self.page = data.actives.current_page
      })
    },
    scrollData (e) {
      e.stopPropagation()
      if (this.page < this.active.last_page) {
        let url = '/api/active/list?page=' + (parseInt(this.page) + 1)
        let dom = e.target
        let _self = this
        if (dom.offsetHeight + dom.scrollTop >= dom.scrollHeight) {
          _self.getHttp(url).then(function (data) {
            _self.active.data = _self.active.data.concat(data.actives.data)
            _self.page = data.actives.current_page
          })
        }
      }
    },
    gotoRouter: function (e, value) {
      e.stopPropagation()
      this.$router.push(value)
    }
  }
}
</script>

<style>
.content-right-box {
  vertical-align: middle
}
.content-right-box {
  font-size: 13px;
}
.content-right-box p {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}
.activity-main-title {
  font-size: 15px;
  font-weight: 600
}
</style>
