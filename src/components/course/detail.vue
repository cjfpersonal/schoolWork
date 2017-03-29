<template>
<div>
    <headl :bar='false' :search="false" title="课程详情" backRouth="/course"></headl>
    <div class="activity-one-detail-content">
        <p class="detail-main-title">{{data.name}}</p>
        <p class='m25'><span>课程编号:</span><span>{{data.number}}</span></p>
        <p class='m25'><span>导师:</span><span>{{data.teacher}}</span></p>
    </div>
    <mt-button type="primary" class="attend-activity" @click="attendActivity($event, 'course')">参与课程</mt-button>
</div>
</template>
<script>
import { MessageBox, Toast } from 'mint-ui'
import headl from '../common/head'
export default {
  components: {
    'headl': headl
  },
  name: 'notice',
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.data = {
        number: '2324647382478329',
        name: '计算机编程信息',
        teacher: 'cjf超级导师'
      }
    },
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    },
    attendActivity: function (e, type) {
      console.log(3456765456)
      e.stopPropagation()
      if (type === 'trends') {
        MessageBox.confirm('参与活动需要' + this.data.money + ',确定参与?').then(action => {
          Toast({
            message: '支付成功',
            position: 'middle',
            duration: 1500
          })
        }).catch(function () {
          Toast({
            message: '已取消支付',
            position: 'middle',
            duration: 1500
          })
        })
      } else if (type === 'course') {
        MessageBox.confirm('确定参与该课程?').then(action => {
          Toast({
            message: '参与成功',
            position: 'middle',
            duration: 1500
          })
        }).catch(function () {
          Toast({
            message: '已取消参与',
            position: 'middle',
            duration: 1500
          })
        })
      } else if (type === 'work') {
        MessageBox.confirm('确定应聘该职位?').then(action => {
          Toast({
            message: '应聘成功',
            position: 'middle',
            duration: 1500
          })
        }).catch(function () {
          Toast({
            message: '取消应聘',
            position: 'middle',
            duration: 1500
          })
        })
      }
    }
  }
}
</script>
