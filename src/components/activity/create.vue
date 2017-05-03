<template>
  <div style="overflow-x: hidden;font-size: 16px;height: calc(100% - 55px)">
    <!--<headl title="发布活动" backRouth="/activity/detail"></headl>-->
    <date-time-show v-on:time="getTime" :startTime="''" dateType="datetime" :openTime='sh.time'></date-time-show>
    <div id="positionChoice"></div>
    <div class="a100">
      <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="活动名称" v-model="data.name" />
       </el-col>
     </el-row>
    <el-row class="poster-box">
      <el-col :offset="2" :xs="16" class="poster-des line60">活动海报</el-col>
      <el-col :xs="6" style="height: 60px;position: relative">
        <span class="img-replace" v-if="data.poster===''"></span>
        <img class="img-replace" v-if="data.poster!==''" :src="data.poster" />
        <input type="file" class="file-upload" v-on:change="upload($event)" />
      </el-col>
    </el-row>
      <el-row class="show-list-box" style="height: 60px;line-height: 60px"
      v-on:click.native="showTime('data', 'time')" >
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="活动时间" v-model="data.time" readonly />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="活动地址" v-model="data.address" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px" @click.native="positionChoice">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="活动定位" v-model="address" readonly />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="活动费用" v-model="data.money" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px" >
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="参与人数限制" v-model="data.person" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="联系人电话" v-model="data.phone" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px;margin-top: 10px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="活动详情" v-model="data.description" />
       </el-col>
     </el-row>
    </div>
    <p class="create-activity" @click="confirmInfo($event, '/activity/create')">确认活动</p>
  </div>
</template>

<script>
import dateTime from '../common/dateTime'
import headl from '../common/head'

export default {
  name: 'createPage',
  components: {
    'headl': headl,
    'date-time-show': dateTime
  },
  data () {
    return {
      sh: {
        time: false,
        record: ''
      },
      address: '',
      data: {
        phone: '',
        poster: '',
        name: '',
        lng: '',
        lat: '',
        time: '',
        address: '',
        money: '',
        person: '',
        description: ''
      }
    }
  },
  methods: {
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    },
    positionChoice () {
      let positionChoice = document.getElementById('positionChoice')
      positionChoice.classList.add('active')
      let map = new window.BMap.Map('positionChoice')
      map.centerAndZoom('深圳大学', 16) // 启用城市名称作为中心
      map.enableScrollWheelZoom(true) // 启用滚轮放大
      map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT, type: window.BMAP_NAVIGATION_CONTROL_SMALL})) // 添加放大缩小button
      // 创建标注
      map.addEventListener('click', this.showInfo)
    },
    showInfo (e) {
      this.$set(this.data, 'lng', e.point.lng)
      this.$set(this.data, 'lat', e.point.lat)
      this.address = '经度:' + e.point.lng + ',维度:' + e.point.lat
      setTimeout(function () {
        let positionChoice = document.getElementById('positionChoice')
        positionChoice.classList.remove('active')
      })
    },
    upload (e) {
      e.stopPropagation()
      let file = e.target.files[0]
      let _self = this
      let url = '/api/active/upload/poster'
      const formData = new FormData()
      formData.append('image', file)
      _self.postHttp(url, formData).then(function (data) {
        _self.data.poster = 'http://cjfpersonal.com:8889/' + data.data.image
      })
    },
    showTime (moduleType, character) {
      this.sh.time = true
      this.sh.record = moduleType + ';' + character
    },
    getTime (time) {
      this.sh.time = false
      this[this.sh.record.split(';')[0]][this.sh.record.split(';')[1]] = time
    },
    cancel: function (e) {
      e.stopPropagation()
    },
    confirmInfo: function (e) {
      e.stopPropagation()
      let _self = this
      _self.postHttp('/api/active/storeActive', _self.data, 'toast').then(function (data) {
        _self.$router.push('/activity/detail')
      })
    }
  }
}
</script scoped>
<style>
#positionChoice {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1000000;
  display: none;
  top: 0
}
#activityCreateShow {
  display: inline-block;
  width: 100%;
  height: 150px
}
#positionChoice.active {
  display: block
}
.el-upload-list.el-upload-list--text {
  width: calc(100% - 80px);
  padding-left: 65px;
}
.el-dialog.el-dialog--small {
  width: 100%;
  min-height: 100%;
  margin: 0 !important
}
.el-dialog__body {
  padding: 0
}
.el-dialog__wrapper {
  position: absolute
}
.el-dialog__header {
  padding: 20px;
  background: #FAFAFA
}
.activity-create {
  width: 100%;
  text-align: center;
  margin-top: 15px;
}
.activity-create li {
  background: white;
  box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
  width: 80%;
  border-radius: 8px;
  padding: 15px 0 15px 30px;
  text-align: left;
  margin: 6px 0;
  display: inline-block;
}
.avatar {
  max-width: 100px;
  max-height: 100px;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  float: left;
  padding: 20px;
  font-size: 30px
}
.remain-font {
  color: rgba(0, 0, 0, .3);
  font-size: 12px;
  margin-left: 80px;
  float: left;
  width: 100%
}
.activity-create-logo {
  width: 30px;
  height: 30px;
  float: left;
}
.activity-create-title {
  display: inline-block;
  font-size: 20px;
  padding-left: 15px;
  line-height: 30px;
  float: left
}
.activity-create-label {
  width: 80px;
  padding-left: 10px;
  float: left
}
.activity-create-input input {
  border: none !important
}
.nullLocation {
  background: #FAFAFA;
  height: 30px;
  width: 100%;
  border-top: 1px solid #ECECEC;
  border-bottom: 1px solid #ECECEC;
}
.poster-box {
  margin: 5px 0;
  background: white;
  padding: 10px 0;
  color: #e2e2e2
}
.img-replace {
  width: 60px;
  height: 60px;
  background: #e2e2e2;
  border-radius: 5px;
  display: inline-block
}
.line60 {
  line-height: 60px
}
</style>
