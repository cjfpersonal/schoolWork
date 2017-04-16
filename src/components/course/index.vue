<template>
<div class="a100 clearfix">
    <headl :choice="choice" :search="true" title="课程信息" backRouth="/home/user"
     v-if="getRoute !== '/home/course'"></headl>
    <div class="activity-detail-list-content"
    v-on:scroll='scrollData'>
        <div v-for="data in course.data"
        class="trends-detail-list clearfix" @click="gotoRouter($event, '/course/detail/' + data.id)">
          <div class="common-detail-list clearfix">
              <p class="detail-main-title">{{data.name}}</p>
              <p><span>课程编号:</span><span>{{data.number}}</span></p>
              <p><span>主讲教授:</span><span>{{data.teacher}}</span></p>
              <p><span>创建时间:</span><span>{{data.created_at}}</span></p>
          </div>
          <div style="padding: 10px 0;text-align:right">
            <button class="enjoy-resource">共享资料</button>
            <button class="enjoy-resource">签到</button>
            <button class="enjoy-resource had-sign">已签到</button>
          </div>
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
      choice: {
        title: '发布',
        show: true,
        path: '/course/create'
      },
      getRoute: '',
      course: [],
      page: 1
    }
  },
  created () {
    this.init()
    this.getRoute = this.$route.fullPath
  },
  methods: {
    init () {
      let _self = this
      _self.getHttp('/api/course/list?page=1').then(function (data) {
        _self.course = data.courses
        _self.page = data.courses.current_page
      })
    },
    scrollData (e) {
      e.stopPropagation()
      if (this.page < this.course.last_page) {
        let url = '/api/course/list?page=' + (parseInt(this.page) + 1)
        let dom = e.target
        let _self = this
        if (dom.offsetHeight + dom.scrollTop >= dom.scrollHeight) {
          _self.getHttp(url).then(function (data) {
            _self.course.data = _self.course.data.concat(data.courses.data)
            _self.page = data.courses.current_page
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
</style>
