<template>
  <div style="overflow-x: hidden">
    <div id='positionChoice'></div>
    <!--<ul class="activity-create">
      <li @click="activityForm($event, 'trends')">
        <img src="../../assets/src/trends.png" class="activity-create-logo" />
        <span class="activity-create-title">动态</span>
      </li>
      <li @click="activityForm($event, 'course')">
        <img src="../../assets/src/course.png" class="activity-create-logo" />
        <span class="activity-create-title">课程</span>
      </li>
      <li @click="activityForm($event, 'college')">
        <img src="../../assets/src/college.png" class="activity-create-logo" />
        <span class="activity-create-title">社团</span>
      </li>
      <li @click="activityForm($event, 'notice')">
        <img src="../../assets/src/notice.png" class="activity-create-logo" />
        <span class="activity-create-title">公告</span>
      </li>
      <li @click="activityForm($event, 'work')">
        <img src="../../assets/src/work.png" class="activity-create-logo" />
        <span class="activity-create-title">招聘信息</span>
      </li>
    </ul>
    <el-dialog title="信息输入" v-model="dialogFormVisible" top="0">-->
    <div v-if="createType === 'trends'">
      <mt-field label="活动名称" v-model="trends.name" placeholder="请输入活动名称" class="activity-create-input"></mt-field>
      <mt-field label="活动地址" v-model="trends.address" placeholder="请输入活动地址" class="activity-create-input"></mt-field>
      <mt-field label="限制人数" v-model="trends.count" placeholder="请输入限制人数" class="activity-create-input"></mt-field>
      <mt-field label="活动时间" v-model="trends.time" placeholder="请选择活动时间" type="time" class="activity-create-input"></mt-field>
      <mt-field label="联系手机" v-model="trends.phone" placeholder="请输入手机号" type="tel" class="activity-create-input"></mt-field>
      <mt-field label="报名金额" v-model="trends.money" placeholder="请输入报名金额" type="num" class="activity-create-input"></mt-field>
      <mt-field label="活动描述" v-model="trends.description" placeholder="活动描述" type="textarea" rows="4" class="activity-create-input"></mt-field>
      <mt-field label="活动条件" v-model="trends.condition" placeholder="活动条件" type="textarea" rows="4" class="activity-create-input"></mt-field>
      <div class="pictureOperation">
        <div class="m25 clearfix">
          <label class="activity-create-label">活动图片</label>
          <el-upload
            action="//jsonplaceholder.typicode.com/posts/"
            list-type="text"
            :on-success="handlePictureAvatarScucess"
            :before-upload="beforePictureAvatarUpload">
            <img v-if="trends.imagePicture" :src="trends.imagePicture" class="avatar">
            <i v-else class="el-icon-upload avatar-uploader"></i>
          </el-upload>
          <p class='activity-create-input remain-font'>注意:图片不超过5m</p>
        </div>
        <div class="m25 clearfix">
          <label class="activity-create-label">活动海报</label>
          <el-upload
            action="//jsonplaceholder.typicode.com/posts/"
            list-type='text'
            :on-success="handlePostAvatarScucess"
            :before-upload="beforePostAvatarUpload">
            <img v-if="trends.imagePost" :src="trends.imagePost" class="avatar">
            <i v-else class="el-icon-upload avatar-uploader"></i>
          </el-upload>
          <p class='activity-create-input remain-font'>注意:图片不超过5m</p>
        </div>
      </div>
      <div class='activity-create-input remain-font'
      @click='positionChoice' 
      style="margin: 15px 0;display: block">
        <div id='activityCreateShow'></div>
        <i class='location-ico' style="opacity: .4"></i>
        <span style="font-size: 15px" v-if="trends.lnt">已定位，点击重新定位</span>
        <span style="font-size: 15px" v-if="!trends.lnt">点击进行定位</span>
        <input type='hidden' v-model="trends.lnt"/>
        <input type='hidden' v-model="trends.lat"/>
      </div>
    </div>
    <div v-if="createType === 'course'">
      <mt-field label="课程编号" v-model="course.number" placeholder="请输入课程编号" class="activity-create-input"></mt-field>
      <mt-field label="课程名称" v-model="course.name" placeholder="请输入课程名称" class="activity-create-input"></mt-field>
      <mt-field label="主讲教师" v-model="course.teacher" placeholder="请输入主讲教师" class="activity-create-input"></mt-field>
      <mt-field label="上课时间" v-model="course.time" placeholder="请选择上课时间" class="activity-create-input"></mt-field>
    </div>
    <div v-if="createType === 'college'">
      <mt-field label="社团名称" v-model="college.name" placeholder="请输入社团名称" class="activity-create-input"></mt-field>
      <mt-field label="限制人数" v-model="college.amount" type="num" placeholder="请输入限制人数" class="activity-create-input"></mt-field>
      <mt-field label="社团类型" v-model="college.type" placeholder="请输入社团类型" class="activity-create-input"></mt-field>
      <mt-field label="社团介绍" v-model="college.introduction" placeholder="社团介绍" type="textarea" rows="4" class="activity-create-input"></mt-field>
    </div>
    <div v-if="createType === 'notice'">
      <mt-field label="公告标题" v-model="notice.title" placeholder="请输入公告标题" class="activity-create-input"></mt-field>
      <mt-field label="公告内容" v-model="notice.content" placeholder="公告内容" type="textarea" rows="4" class="activity-create-input"></mt-field>
    </div>
    <div v-if="createType === 'work'">
      <mt-field label="招聘职位" v-model="work.job" placeholder="请输入招聘职位" class="activity-create-input"></mt-field>
      <mt-field label="公司名称" v-model="work.company_name" placeholder="请输入公司名称" class="activity-create-input"></mt-field>
      <mt-field label="办公地点" v-model="work.address" placeholder="请输入办公地点" class="activity-create-input"></mt-field>
      <mt-field label="公司电话" v-model="work.phone" type="pohone" placeholder="请输入公司电话" class="activity-create-input"></mt-field>
      <mt-field label="公司邮箱" v-model="work.email" type="email" placeholder="请输入公司邮箱" class="activity-create-input"></mt-field>
      <mt-field label="薪资" v-model="work.salary" type="num"placeholder="请输入薪资" class="activity-create-input"></mt-field>
      <mt-field label="工作时间" v-model="work.job_time" placeholder="请输入工作时间" class="activity-create-input"></mt-field>
      <mt-field label="公司类型" v-model="work.company_type" placeholder="请输入公司类型" class="activity-create-input"></mt-field>
      <mt-field label="工作至少时长" v-model="work.duration" placeholder="请输入至少时长" class="activity-create-input"></mt-field>
      <mt-field label="学历" v-model="work.education" placeholder="请输入学历" class="activity-create-input"></mt-field>
      <mt-field label="人数" v-model="work.amount" placeholder="请输入人数" class="activity-create-input"></mt-field>
      <mt-field label="截止时间" v-model="work.end_time" type="time" placeholder="请输入截止时间" class="activity-create-input"></mt-field>
      <mt-field label="兼职招聘描述" v-model="work.description" placeholder="兼职招聘描述" type="textarea" rows="4" class="activity-create-input"></mt-field>
    </div>
    <div slot="footer" class="dialog-footer" style="width: 100%; margin: 15px 0;text-align: center">
      <mt-button type="default" @click="cancel($event)" style="width: 150px">取 消</mt-button>
      <mt-button type="primary" @click="confirmInfo($event)" style="width: 150px">确 定</mt-button>
    </div>
    <!--</el-dialog>-->
  </div>
</template>

<script>
export default {
  name: 'createPage',
  data () {
    return {
      dialogFormVisible: false,
      createType: 'trends',
      // 活动字段
      trends: {
        name: '',
        time: new Date(),
        address: '',
        lat: '',
        lnt: '',
        count: 1,
        phone: '',
        description: '',
        money: 0,
        condition: '',
        imagePost: '',
        imgagePicture: ''
      },
      // 课程
      course: {
        number: '',
        name: '',
        teacher: '',
        time: ''
      },
      // 社团
      college: {
        name: '',
        amount: '',
        type: '',
        introduction: ''
      },
      // 公告
      notice: {
        title: '',
        content: ''
      },
      // 招聘信息
      work: {
        job: '',
        company_name: '',
        address: '',
        phone: '',
        email: '',
        salary: '',
        job_time: '',
        company_type: '',
        duration: '',
        education: '',
        amount: '',
        end_time: '',
        description: ''
      }
    }
  },
  watch: {
    '$route.params.type' (newVal, oldVal) {
      this.createType = this.$route.params.type
    }
  },
  created () {
    let _self = this
    _self.createType = _self.$route.params.type
    if (_self.createType === 'trends') {
      setTimeout(function () {
        _self.init()
      })
    }
  },
  methods: {
    init: function () {
      let map = new window.BMap.Map('activityCreateShow')
      let point = ''
      if (this.trends.lat) {
        point = new window.BMap.Point(this.trends.lnt, this.trends.lat)
        let marker = new window.BMap.Marker(point) // 创建标注
        map.addOverlay(marker) // 将标注添加到地图中
        marker.setAnimation(window.BMAP_ANIMATION_BOUNCE) // 跳动的动画
      } else {
        point = new window.BMap.Point(113.9425010000, 22.5390130000)
      }
      map.centerAndZoom(point, 16) // 启用城市名称作为中心
      map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT, type: window.BMAP_NAVIGATION_CONTROL_SMALL})) // 添加放大缩小button
      // 创建标注
      map.addEventListener('click', this.positionChoice)
    },
    handlePostAvatarScucess: function (res, file) {
      this.$set(this.trends, 'imagePost', URL.createObjectURL(file.raw))
    },
    handlePictureAvatarScucess: function (res, file) {
      this.$set(this.trends, 'imagePicture', URL.createObjectURL(file.raw))
    },
    beforePostAvatarUpload: function (file) {
      let regexCheck = /(jpg|png|jpeg)$/
      let isJPG = (regexCheck.test(file.type.toLowerCase().split('/')[1]))
      let isLt5M = file.size / 1024 / 1024 < 5
      if (!isJPG) {
        this.$message.error('上传头像图片只能是jpg、png、jpeg格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    },
    beforePictureAvatarUpload: function (file) {
      let regexCheck = /(jpg|png|jpeg)$/
      let isJPG = (regexCheck.test(file.type.toLowerCase().split('/')[1]))
      let isLt5M = file.size / 1024 / 1024 < 5
      if (!isJPG) {
        this.$message.error('上传头像图片只能是jpg、png、jpeg格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    },
    positionChoice: function () {
      let positionChoice = document.getElementById('positionChoice')
      positionChoice.classList.add('active')
      let map = new window.BMap.Map('positionChoice')
      map.centerAndZoom('深圳大学', 16) // 启用城市名称作为中心
      map.enableScrollWheelZoom(true) // 启用滚轮放大
      map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT, type: window.BMAP_NAVIGATION_CONTROL_SMALL})) // 添加放大缩小button
      // 创建标注
      map.addEventListener('click', this.showInfo)
    },
    showInfo: function (e) {
      let _self = this
      this.$set(this.trends, 'lnt', e.point.lng)
      this.$set(this.trends, 'lat', e.point.lat)
      setTimeout(function () {
        let positionChoice = document.getElementById('positionChoice')
        positionChoice.classList.remove('active')
        _self.init()
      })
    },
    cancel: function (e) {
      e.stopPropagation()
      this.dialogFormVisible = false
    },
    confirmInfo: function (e) {
      e.stopPropagation()
      this.dialogFormVisible = false
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
</style>
