<template>
<div>
    <!--<headl :bar='false' :search="false" title="课程详情" backRouth="/course"></headl>-->
    <toast-choice :operation="operation" :dataChoice="resource" :decideShow="decideShow"
    v-on:get="getResourceDetail"
    v-on:edit="uploadTxt"
    v-on:close="closeResource"></toast-choice>
    <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="invite-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="课程邀请码" v-model="applyNum" />
       </el-col>
     </el-row>
    <el-row class="show-list-box m25" style="height: 60px;line-height: 60px">
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
     <el-row class="show-list-box" style="height: 60px;line-height: 60px" 
     v-on:click.native="showTime($event, 'course', 'time')" >
       <el-col :xs="4" style="text-align: center">
         <i class="info-logo logo-style3" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <span>{{data.created_at}}</span>
       </el-col>
     </el-row>
     <div slot="footer" class="dialog-footer" 
     v-show="false"
     style="width: 100%; position: fixed; bottom: 0">
      <mt-button type="primary" @click="confirmInfo($event)" class="create-btn">加入课程</mt-button>
    </div>
    <el-row style="width: 100%; position: fixed; bottom: 0" v-if="data.money!=0">
        <el-col :xs="12" class="total-show" @click.native="gotoRouter($event, '/course/upload/' + data.id)">上传资料</el-col>
        <el-col :xs="12" class="apply" @click="confirmInfo($event)">课程/发起签到</el-col>
    </el-row>
</div>
</template>
<script>
import { MessageBox, Toast } from 'mint-ui'
import headl from '../common/head'
import toastChoice from '../common/toastChoice'
export default {
  components: {
    'headl': headl,
    'toast-choice': toastChoice
  },
  name: 'notice',
  data () {
    return {
      decideShow: false,
      operation: {
        show: true,
        title: '资源共享',
        edit: '本地分享'
      },
      applyNum: '',
      data: {},
      resource: []
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
      })
      this.resource = [{
        name: '学习资料',
        type: 'txt'
      }, {
        name: '视频',
        type: 'vedio'
      }]
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
        Toast({
          message: '已发送至邮箱',
          position: 'middle',
          duration: 1500
        })
      }).catch(function () {
        Toast({
          message: '已取消',
          position: 'middle',
          duration: 1500
        })
      })
    },
    confirmInfo (e) {
      e.stopPropagation()
      let _self = this
      MessageBox.confirm('确定加入课程？').then(action => {
        _self.$router.push('/course/addSuccess/' + _self.$route.params.id)
      }).catch(function () {
        console.log(456)
      })
    },
    attendActivity: function (e, type) {
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
