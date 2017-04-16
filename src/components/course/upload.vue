<template>
<div class="a100" style="background: #f3f4f3">
    <headl title="上传资料" :backRouth="'/course/detail/'+data.id"></headl>
    <p class="course-upload">{{data.name}}</p>
    <el-row class="m15 course-upload">
        <el-col :xs="13">
            <input type="input" class="upload-name" readonly v-model="uploadName" />
        </el-col>
        <el-col :offset="1" :xs="10" class="course-upload-box">
            <input type="file" class="uploadHide" v-on:change="uploadFile($event)" />
            <span class="uploadShow">选择文件</span>
        </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer" style="width: 100%; position: fixed; bottom: 0">
      <mt-button type="primary" @click="confirmInfo($event)" class="create-btn">确认上传</mt-button>
    </div>
</div>
</template>
<script>
import headl from '../common/head'
export default {
  name: 'activityDetail',
  components: {
    'headl': headl
  },
  data: function () {
    return {
      data: {},
      uploadName: '',
      fileRecord: ''
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init: function () {
      let _self = this
      _self.getHttp('/api/course/detail/' + _self.$route.params.id).then(function (data) {
        _self.data = data.course
      })
    },
    gotoRouter: function (e, value) {
      e.stopPropagation()
      this.$router.push(value)
    },
    uploadFile (e) {
      e.stopPropagation()
      let name = e.target.files[0]['name'].split('.')
      this.fileRecord = e.target.files[0]
      this.uploadName = name[0]
    },
    confirmInfo (e) {
      e.stopPropagation()
      let _self = this
      const formData = new FormData()
      formData.append('file', this.fileRecord)
      _self.postHttp('/api/course/upload', formData).then(function (data) {
        console.log(data)
      })
    }
  }
}
</script>
<style>
.course-upload {
    padding: 20px;
    font-size: 20px;
    color: black;
    background: white
}
.course-upload-box {
    position: relative
}
.uploadHide {
    position: absolute;
    opacity: 0;
    width: 120px;
    height: 35px;
    z-index: 2
}
.upload-name {
    height: 35px;
    font-size: 16px;
    border: none;
    width: 100%
}
.uploadShow {
    position: absolute;
    width: 120px;
    height: 35px;
    font-size: 18px;
    background: #e2e2e2;
    border-radius: 4px;
    line-height: 35px;
    text-align: center    
}
</style>
