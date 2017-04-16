<template>
<div class="a100">
    <headl :search="true" title="社团信息" backRouth="/home/user"></headl>
    <div class="activity-detail-list-content" v-on:scroll="scrollData($event)">
        <div v-for="data in college.data" class="trends-detail-list clearfix"
        @click="gotoRouter($event, 'detail/' + data.id)">
            <p style="clear: both;text-align: right;padding-bottom: 10px">社团</p>
            <div class="trends-detail-content clearfix">
                <p class="detail-main-title">{{data.name}}</p>
                <p><span>人数:</span><span>{{data.amount}}</span></p>
                <p><span>类型:</span><span>{{data.type}}</span></p>
                <p>{{data.introduction | maxLength}}</p>
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
