<template>
<div class="a100">
    <!--<headl :search="true" title="社团信息" backRouth="/home/user"></headl>-->
    <div class="activity-detail-list-content"
    v-on:scroll='scrollData($event)'>
      <div v-for="data in college.data"
      style="padding: 15px 5px; background: white"
      class="trends-detail-list clearfix" @click="gotoRouter($event, '/college/detail/' + data.id)">
      <el-row>
        <el-col :xs="20" :offset="2" style="height: 120px;">
            <div class="content-right-box">
              <p class="activity-main-title">{{data.name}}</p>
              <p>
                <span>创建时间:</span><span>{{data.created_at}}</span></p>
              <p>
                <span>参与人数:</span><span>{{data.amount}}</span></p>
              <p>
                <span>限制人数:</span><span>{{data.amount}}</span></p>
              <p>
                <span>社团描述:</span><span>{{data.introduction}}</span></p>
              <p>
                <span>社团类型:</span><span>{{data.type}}</span></p>
            </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <p class="create-activity" @click="gotoRouter($event, '/college/create')">创建社团</p>
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
      college: [],
      page: 1
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let _self = this
      _self.getHttp('/api/league/list?page=1').then(function (data) {
        _self.college = data.leagues
        _self.page = data.leagues.current_page
      })
    },
    scrollData (e) {
      e.stopPropagation()
      if (this.page < this.college.last_page) {
        let url = '/api/league/list?page=' + (parseInt(this.page) + 1)
        let dom = e.target
        let _self = this
        if (dom.offsetHeight + dom.scrollTop >= dom.scrollHeight) {
          _self.getHttp(url).then(function (data) {
            _self.college.data = _self.college.data.concat(data.leagues.data)
            _self.page = data.leagues.current_page
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
