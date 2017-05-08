<template>
<div class="a100 clearfix">
    <!--<headl :choice="choice" :search="true" title="课程信息" backRouth="/home/user" v-if="getRoute !== '/home/course'"></headl>-->
    <div class="activity-list-box" v-show="$route.fullPath==='/course/index'">
      <p class="activity-list-activity" :class="{'active': !isFocus }" @click.active="addActive($event, 0)">我参与的</p>
      <p class="activity-list-activity" :class="{'active': isFocus }" @click.active="addActive($event, 1)">我创建的</p>
    </div>
    <div :class="{'a100':$route.fullPath!=='/course/index','personal-index-box':$route.fullPath==='/course/index'}"
     v-if='course.data.length > 0'
    style="overflow: scroll"
    v-on:scroll='scrollData'>
        <div v-for="data in course.data"
        class="trends-detail-list clearfix" @click="gotoRouter($event, '/course/detail/' + data.id)">
          <div class="common-detail-list clearfix">
              <p class="detail-main-title">{{data.name}}</p>
              <p><span>课程编号2:</span><span>{{data.number}}</span></p>
              <p><span>主讲教授:</span><span>{{data.teacher}}</span></p>
              <p><span>创建时间:</span><span>{{data.created_at}}</span></p>
          </div>
          <div style="padding: 10px 0;text-align:right">
            <!--<button class="enjoy-resource" @click="gotoRouter($event)">共享资料</button>-->
            <button class="enjoy-resource">详情</button>
          </div>
        </div>
    </div>
    <div v-if='course.data.length === 0' class="empty-box">
      <p class="empty-logo">(ㆆᴗㆆ)</p>
      <p class="empty-description">暂时未查到相关课程</p>
    </div>
    <p class="create-activity" v-show="$route.fullPath==='/course/index'" 
    @click="gotoRouter($event, '/course/create')">创建课程</p>
</div>
</template>
<script>
export default {
  name: 'notice',
  data () {
    return {
      isFocus: false,
      course: {
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
      if (_self.$route.fullPath === '/course/index') {
        if (_self.isFocus) {
          url = '/api/user/courses?page=1'
        } else {
          url = '/api/user/apply/courses?page=1'
        }
      } else {
        url = '/api/course/list?page=1'
      }
      _self.getHttp(url).then(function (data) {
        _self.course = data.courses
        _self.page = data.courses.current_page ? data.courses.current_page : 1
      })
    },
    scrollData (e) {
      e.stopPropagation()
      let dom = e.target
      let _self = this
      let url
      if (_self.$route.fullPath === '/course/index') {
        if (_self.isFocus) {
          url = '/api/user/courses?page='
        } else {
          url = '/api/user/apply/courses?page='
        }
      } else {
        url = '/api/course/list?page='
      }
      if (this.page < this.course.last_page) {
        url = url + (parseInt(this.page) + 1)
        if (dom.offsetHeight + dom.scrollTop >= dom.scrollHeight) {
          _self.getHttp(url).then(function (data) {
            _self.course.data = _self.course.data.concat(data.courses.data)
            _self.page = data.courses.current_page
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
.enjoy-resource {
  color: #4c9cff;
  border: 1px solid #4c9cff;
  padding: 2px 15px;
  background: white;
  margin-right: 15px;
}
.had-sign {
  color: #d9d9d9;
  border: 1px solid #d9d9d9;
}
.personal-index-box {
  width: 100%;
  overflow: scroll;
  height: calc(100% - 110px)
}
</style>
