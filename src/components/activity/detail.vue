<template>
<div class="a100">
  <!--<headl :choice="choice" :search="true" title="活动信息" backRouth="/home/user"></headl>-->
  <!--<div class="activity-detail-list-content"-->
  <div class="activity-list-box" v-show="$route.fullPath==='/activity/detail'">
    <p class="activity-list-activity" :class="{'active': !isFocus }" @click.active="addActive($event, 0)">我参与的</p>
    <p class="activity-list-activity" :class="{'active': isFocus }" @click.active="addActive($event, 1)">我创建的</p>
  </div>
  <div style="overflow: scroll"
  v-if='active.data.length > 0'
  :class="{'a100':$route.fullPath!=='/activity/detail','personal-index-box':$route.fullPath==='/activity/detail'}"
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
    <div v-if='active.data.length === 0' class="empty-box">
      <p class="empty-logo">(ㆆᴗㆆ)</p>
      <p class="empty-description">暂时未查到相关活动</p>
    </div>
    <!--<p class="create-activity" @click="gotoRouter($event, '/activity/create')">发布活动</p>-->
    <p class="create-activity" v-show="$route.fullPath==='/activity/detail'" 
    @click="gotoRouter($event, '/activity/create')">创建活动</p>
  </div>
</template>

<script>
export default {
  name: 'activityDetail',
  data () {
    return {
      isFocus: false,
      choice: {
        title: '发布',
        show: true,
        path: '/activity/create'
      },
      active: {
        data: []
      },
      page: 0
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init () {
      let _self = this
      let url
      if (_self.$route.fullPath === '/activity/detail') {
        if (_self.isFocus) {
          url = '/api/user/actives?page=1' // /api/user/actives
        } else {
          url = '/api/user/apply/actives?page=1' // /api/user/apply/actives
        }
      } else {
        url = '/api/active/list?page=1'
      }
      _self.getHttp(url).then(function (data) {
        _self.active = data.actives
        _self.page = data.actives.current_page ? data.actives.current_page : 1
      })
    },
    scrollData (e) {
      e.stopPropagation()
      let dom = e.target
      let _self = this
      let url
      if (_self.$route.fullPath === '/activity/detail') {
        if (_self.isFocus) {
          url = '/api/user/actives?page='
        } else {
          url = '/api/user/apply/actives?page='
        }
      } else {
        url = '/api/active/list?page='
      }
      if (this.page < this.active.last_page) {
        url = url + (parseInt(this.page) + 1)
        if (dom.offsetHeight + dom.scrollTop >= dom.scrollHeight) {
          _self.getHttp(url).then(function (data) {
            _self.active.data = _self.active.data.concat(data.actives.data)
            _self.page = data.actives.current_page
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
