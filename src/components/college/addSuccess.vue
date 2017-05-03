<template>
<div class="a100">
  <div class="activity-detail-list-content">
    <el-row class="show-list-box" style="height: 70px">
       <el-col :xs="7" style="text-align: center">
         <i class="success-logo logo-style4" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="17" class="a100">
         <p style="color: #4b99ff; font-size: 22px">申请成功</p>
         <p style="color: #4b99ff; font-size: 22px">请等待审核结果</p>
       </el-col>
     </el-row>
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
    <div class="dialog-footer" style="width: 100%; position: fixed; bottom: 0;box-shadow: 0 0 10px #888">
        <div class="half-btn-box" v-on:click="gotoRouter($event, '/college/index')">
            <i class="map-logo activity-style6" style="transform: translateY(25%)"></i>
            <span>社团地图</span>
        </div>
        <div class="half-btn-box" @click="gotoRouter($event, '/college/index')">
            <i class="go-home-active-logo activity-style7" style="transform: translateY(25%)"></i>
            <span>我的社团</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
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
      let _self = this
      _self.getHttp('/api/league/detail/' + _self.$route.params.id).then(function (data) {
        _self.data = data.league
      })
    },
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    }
  }
}
</script>
