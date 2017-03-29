<template>
<div>
    <headl :choice="choice" :search="true" title="课程信息" backRouth="/"></headl>
    <div class="activity-detail-list-content">
        <div v-for="data in course"
        class="trends-detail-list clearfix" @click="gotoRouter($event, 'detail/243243')">
        <p style="clear: both;text-align: right;padding-bottom: 10px">课程</p>
        <div class="trends-detail-content clearfix">
            <p class="detail-main-title">{{data.name}}</p>
            <p><span>编号:</span><span>{{data.number}}</span></p>
            <p><span>导师:</span><span>{{data.teacher}}</span></p>
        </div>
        <p style="clear: both;color: #93d1ff;text-align: right">详情</p>
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
      course: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.course = [{
        activityType: 'course',
        number: '2324647382478329',
        name: '计算机编程信息',
        teacher: 'cjf超级导师'
      }, {
        activityType: 'course',
        number: '2324647382478329',
        name: '计算机编程信息',
        teacher: 'cjf超级导师'
      }]
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
</style>
