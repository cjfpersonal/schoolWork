<template>
  <div class="a100" style="background: #f3f4f3">
    <!--<headl title="活动详情" :backRouth="'/activity/detail/'+data.id"></headl>-->
    <div class="activity-head-box">
      <h3 class="acitivity-head-name">{{data.name}}</h3>
    </div>
    <div class="m5" style="background: white">
      <p class="activity-content-box">
        <i class="activity-time-logo logo-style3" style="transform: translateY(25%)"></i>
        <span style="padding-left: 10px">时间: {{data.time}}</span></p>
      <p class="activity-content-box clearfix">
        <i class="activity-local-logo activity-style4 fl" style="transform: translateY(25%)"></i>
        <span class="address-left">地址: {{data.address}}</span></p>
      <p class="activity-content-box noborder">
        <i class="activity-money-logo activity-style5" style="transform: translateY(25%)"></i>
        <span style="padding-left: 10px">费用: {{data.money === 0?'免费':data.money}}</span></p>
    </div>
    <div class="m25" style="background: white" v-if="data.money!=0">
        <p class="acitivity-head-pay">支付方式</p>
        <el-row style="padding: 15px 0">
            <el-col :xs="4" style="text-align: center">
                <i class="wechart-logo logo-style4"></i>
            </el-col>
            <el-col :xs="16">
                <p class="wechart-pay">微信支付</p>
                <p>唯一的线上支付渠道</p>
            </el-col>
            <el-col :xs="4" style="text-align: center">
                <i class="wechart-choice-logo logo-style4"></i>
            </el-col>
        </el-row>
    </div>
    <div slot="footer" class="dialog-footer" style="width: 100%; position: fixed; bottom: 0" v-if="data.money===0">
      <mt-button type="primary" @click="confirmInfo($event)" class="create-btn">确认报名</mt-button>
    </div>
    <el-row style="width: 100%; position: fixed; bottom: 0" v-if="data.money!=0">
        <el-col :xs="12" class="total-show">合计: {{data.money}}元</el-col>
        <el-col :xs="12" class="apply" @click="confirmInfo($event)">确认支付</el-col>
    </el-row>
  </div>
</template>

<script>
import headl from '../common/head'
import { MessageBox } from 'mint-ui'
export default {
  name: 'activityDetail',
  components: {
    'headl': headl
  },
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
      _self.getHttp('/api/active/detail/' + _self.$route.params.id).then(function (data) {
        _self.data = data.active
      })
    },
    gotoRouter: function (e, value) {
      e.stopPropagation()
      this.$router.push(value)
    },
    confirmInfo (e) {
      e.stopPropagation()
      let _self = this
      MessageBox.confirm('确定加入活动？').then(action => {
        _self.getHttp('/api/active/apply/' + _self.data.id).then(function (data) {
          _self.$router.push('/activity/addSuccess/' + _self.$route.params.id)
        })
      }).catch(function () {
        console.log(456)
      })
    }
  }
}
</script>
<style>
.acitivity-head-pay {
    padding: 20px 30px;
    color: #9e9e9e;
    font-size: 20px;
    border-bottom: 1px solid #eaeaea;
}
.wechart-pay {
    font-size: 16px;
    color: black
}
.total-show {
    line-height: 50px;
    color: #4b99ff;
    font-size: 18px;
    text-align: center;
    background: white
}
</style>
