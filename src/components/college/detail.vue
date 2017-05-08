<template>
  <div class="a100" style="background: #f3f4f3">
    <!--<headl title="活动详情" backRouth="/activity/detail"></headl>-->
    <div class="activity-detail-list-content">
      <img :src="data.poster" style="width: 100%;min-height: 200px" />
      <div class="activity-head-box">
        <h3 class="acitivity-head-name">{{data.name}}</h3>
        <p class="acitivity-head-des">参与人数{{data.amount}}人  剩余名额{{data.amount}}人</p>
        <p class="acitivity-head-des">社团创建时间 {{data.created_at}}</p>
      </div>
      <div class="m5" style="background: white">
        <p class="activity-content-description">社团详情
        </p>
        <p class="activity-content-des-con">{{data.introduction}}</p>
      </div>
    </div>
    <p class="create-activity" 
    v-if="!applied"
    @click="gotoRouter($event, '/college/decide/' + data.id)">加入社团</p>
    <p class="create-activity" v-if="applied&&publish===0" @click="gotoRouter($event, '/userList/league/' + data.id)">查看成员</p>
    <el-row style="width: 100%; position: fixed; bottom: 0" v-if="publish === 1">
      <el-col :xs="12" class="total-show" @click.native="gotoRouter($event, '/notice/create/league/' + data.id)">发布公告</el-col>
      <el-col :xs="12" class="apply" @click="gotoRouter($event, '/userList/league/' + data.id)">查看成员</el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: 'activityDetail',
  data: function () {
    return {
      data: {},
      publish: 0,
      applied: false
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init: function () {
      let _self = this
      _self.getHttp('/api/league/detail/' + _self.$route.params.id).then(function (data) {
        _self.data = data.league
        _self.applied = data.applied
        _self.publish = data.can_publish
      })
    },
    gotoRouter: function (e, value) {
      e.stopPropagation()
      this.$router.push(value)
    }
  }
}
</script>
