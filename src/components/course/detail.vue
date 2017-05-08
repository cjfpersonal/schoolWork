<template>
<div class="a100">
    <!--<headl :bar='false' :search="false" title="课程详情" backRouth="/course"></headl>-->
    <!--<toast-choice :operation="operation" :dataChoice="resource" :decideShow="decideShow"
    v-on:get="getResourceDetail"
    v-on:edit="uploadTxt"
    v-on:close="closeResource"></toast-choice>-->
  <el-table
    id="loadding2"
    class="a100 loadding2"
    style="display: none"
    v-loading="true"
    element-loading-text="签到定位中">
    </el-table>
  <div :class="{'activity-detail-list-content':publish===0,'personal-index-box':publish===1}"
   v-on:scroll='scrollData'>
    <el-row class="show-list-box"
    v-if="!apply" 
    style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="invite-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="课程邀请码" v-model="applyNum" />
       </el-col>
     </el-row>
    <p class="notice-mid-info">课程信息</p>
    <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="info-logo logo-style3" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <span>{{data.number}}</span>
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="info-logo logo-style3" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <span>{{data.name}}</span>
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="info-logo logo-style3" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <span>{{data.teacher}}</span>
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px" >
       <el-col :xs="4" style="text-align: center">
         <i class="info-logo logo-style3" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <span>{{data.created_at}}</span>
       </el-col>
     </el-row>
     <p class="notice-mid-info" v-if="apply">课程资源</p>
     <el-row class="show-list-box" 
     v-for="item in resource.data"
     :key="item"
     @click.native="getResourceDetail(item)"
     v-if="resource.data.length>0&&apply"
     style="height: 50px;line-height: 50px">
       <el-col :xs="6" style="text-align: center">
         <i class="course-logo-active logo-style1" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="17" class="more-content-hide">
         {{item.name}}
       </el-col>
     </el-row>
     <div style="background: white; padding: 15px 0"
     v-if="resource.data.length === 0&&apply">
        <p class="empty-logo">(ㆆᴗㆆ)</p>
        <p class="empty-description">暂无同学分享资源</p>
      </div>
     <div slot="footer" class="dialog-footer" 
     v-if="!apply&&publish===0"
     style="width: 100%; position: fixed; bottom: 0">
      <mt-button type="primary" @click="confirmInfo($event, data.id)" class="create-btn">加入课程</mt-button>
    </div>
  </div>
  <div class="publish-box2"
  @click="gotoRouter($event, '/notice/create/course/' + data.id)" v-if="publish === 1">
    <i class="publish-logo publish-style"></i>
    <span class="publish-font">发布课程公告</span>
  </div>
  <el-row style="width: 100%; position: fixed; bottom: 0" v-if="apply && publish===0">
      <el-col :xs="12" class="total-show" @click.native="gotoRouter($event, '/course/upload/' + data.id)">上传资料</el-col>
      <el-col :xs="12" class="apply black" v-if="!hasSign&&!is_sign">未开放签到</el-col>
      <el-col :xs="12" class="apply" v-if="hasSign&&!is_sign" @click.native="sign($event, data.id)">课程签到</el-col>
      <el-col :xs="12" class="apply black" v-if="is_sign" @click="sign($event, data.id)">已签到</el-col>
  </el-row>
  <el-row style="width: 100%; position: fixed; bottom: 0" v-if="publish === 1">
      <el-col :xs="12" class="total-show" @click.native="gotoRouter($event, '/course/upload/' + data.id)">上传资料</el-col>
      <el-col :xs="12" class="apply" v-if="!hasSign" @click.native="startSign($event, data.id)">发起签到</el-col>
      <el-col :xs="12" class="apply black" v-if="hasSign">已发起签到</el-col>
  </el-row>
</div>
</template>
<script>
import { MessageBox, Toast } from 'mint-ui'
export default {
  name: 'notice',
  data () {
    return {
      publish: 0,
      apply: false,
      applyNum: '',
      hasSign: false,
      is_sign: false,
      data: {},
      resource: {
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
      _self.getHttp('/api/course/detail/' + _self.$route.params.id).then(function (data) {
        _self.data = data.course
        _self.apply = data.applied
        _self.publish = data.can_publish
        _self.hasSign = data.hasSign
        _self.is_sign = data.is_sign
        _self.getHttp('/api/course/file/list/' + _self.$route.params.id).then(function (data) {
          _self.resource = data.files
        })
      })
    },
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    },
    getResource () {
      this.decideShow = true
    },
    closeResource () {
      this.decideShow = false
    },
    uploadTxt () {
      let input = document.createElement('input')
      input.setAttribute('type', 'file')
      document.body.appendChild(input)
      input.click()
      setTimeout(function () {
        input.remove()
      })
    },
    getResourceDetail (item) {
      MessageBox.confirm('确定获取' + item.name).then(action => {
        window.open(item.path)
      }).catch(function () {
      })
    },
    scrollData (e) {
      e.stopPropagation()
      if (this.page < this.resource.last_page) {
        let url = '/api/course/file/list/?page=' + (parseInt(this.page) + 1)
        let dom = e.target
        let _self = this
        if (dom.offsetHeight + dom.scrollTop >= dom.scrollHeight) {
          _self.getHttp(url).then(function (data) {
            _self.resource.data = _self.resource.data.concat(data.files.data)
            _self.page = data.files.current_page
          })
        }
      }
    },
    sign (e, id) {
      e.stopPropagation()
      let loadding2 = document.getElementById('loadding2')
      let geolocation = new window.BMap.Geolocation()
      let _self = this
      MessageBox.confirm('确定进行签到？').then(action => {
        loadding2.style.display = 'block'
        geolocation.getCurrentPosition(function (r) {
          loadding2.style.display = 'none'
          _self.postHttp('/api/course/sign/' + id, r.point, 'toast').then(function (data) {
            _self.init()
          })
        })
      }).catch(function () {
        console.log(456)
      })
    },
    startSign (e, id) {
      e.stopPropagation()
      let geolocation = new window.BMap.Geolocation()
      let _self = this
      setTimeout(function () {
        let loadding2 = document.getElementById('loadding2')
        MessageBox.confirm('确定发起签到？').then(action => {
          loadding2.style.display = 'block'
          geolocation.getCurrentPosition(function (r) {
            loadding2.style.display = 'none'
            _self.postHttp('/api/course/initiate/sign/' + id, r.point, 'toast').then(function (data) {
              _self.init()
            })
          })
        }).catch(function () {
          console.log(456)
        })
      })
    },
    confirmInfo (e, id) {
      e.stopPropagation()
      let _self = this
      MessageBox.confirm('确定加入课程？').then(action => {
        _self.getHttp('/api/course/apply/' + id).then(function (data) {
          Toast({
            message: '参与成功',
            position: 'bottom',
            duration: 1500
          })
          _self.init()
        })
      }).catch(function () {
        console.log(456)
      })
    },
    attendActivity (e, type) {
      e.stopPropagation()
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
    }
  }
}
</script>
