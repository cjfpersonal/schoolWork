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
    <p class="create-activity" @click="gotoRouter($event, '/college/decide/' + data.id)">加入社团</p>
  </div>
</template>

<script>
export default {
  name: 'activityDetail',
  data: function () {
    return {
      data: {}
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
      })
    },
    gotoRouter: function (e, value) {
      e.stopPropagation()
      this.$router.push(value)
    }
  }
}
</script>
