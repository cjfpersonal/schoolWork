<template>
<div class="a100">
    <!--<headl :search="true" title="社团信息" backRouth="/home/user"></headl>-->
    <!--<div class="activity-detail-list-content"-->
    <div class="activity-list-box" v-show="$route.fullPath==='/college/index'">
      <p class="activity-list-activity" :class="{'active': !isFocus }" @click.active="addActive($event, 0)">我参与的</p>
      <p class="activity-list-activity" :class="{'active': isFocus }" @click.active="addActive($event, 1)">我创建的</p>
    </div>
    <div :class="{'a100':$route.fullPath!=='/college/index','personal-index-box':$route.fullPath==='/college/index'}"
     style="overflow: scroll"
    v-on:scroll='scrollData($event)'>
      <div v-for="data in college.data"
      style="padding: 15px 5px; background: white"
      class="trends-detail-list clearfix" @click="gotoRouter($event, '/college/detail/' + data.id)">
      <el-row>
        <el-col :xs="10" style="text-align: center;min-height:120px">
          <img :src="data.poster" style="min-height:120px;width: 90%" />
        </el-col>
        <el-col :xs="13" style="height: 120px;">
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
  <div v-if='college.data.length === 0' class="empty-box">
      <p class="empty-logo">(ㆆᴗㆆ)</p>
      <p class="empty-description">没有搜索到您需要的商品，请尝试更换条件</p>
    </div>
    <p class="create-activity" v-show="$route.fullPath==='/college/index'" 
    @click="gotoRouter($event, '/college/create')">创建活动</p>
  <!--<p class="create-activity" @click="gotoRouter($event, '/college/create')">创建社团</p>-->
</div>
</template>
<script>
export default {
  name: 'notice',
  data () {
    return {
      isFocus: false,
      college: {
        data: []
      },
      page: 1
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let _self = this
      let url
      if (_self.$route.fullPath === '/college/index') {
        if (_self.isFocus) {
          url = '/api/league/list?page=1' // /api/user/leagues
        } else {
          url = '/api/league/list?page=1' // /api/user/apply/leagues
        }
      } else {
        url = '/api/league/list?page=1'
      }
      _self.getHttp(url).then(function (data) {
        _self.college = data.leagues
        _self.page = data.leagues.current_page ? data.leagues.current_page : 1
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
    addActive (e, type) {
      e.stopPropagation()
      if (type === 0) {
        this.isFocus = false
      } else if (type === 1) {
        this.isFocus = true
      }
      this.init()
    },
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    }
  }
}
</script>
