<template>
<div>
    <!--<headl title="个人信息" backRouth="/home/user"></headl>-->
    <date-time dateType="date" :openTime="showTime" :startTime="data.birthday" v-on:time="getNewBirthday"></date-time>
    <toast-choice :dataChoice="sex" :decideShow="decideShow" v-on:get="getSex"></toast-choice>
    <toast-choice :dataChoice="college" :decideShow="collegeShow" v-on:get="getGrade"></toast-choice>
    <mt-cell title="头像" is-link>
        <input type="file" class="user-head-show upload-style" v-on:change="uploadFile($event)" />
        <img :src="data.wx_head_img" class="user-head-show" />
    </mt-cell>
    <mt-cell class="m25" title="用户名" :value="data.name" is-link 
    @click.native="change('用户名', 'name')"></mt-cell>
    <mt-cell title="真实姓名" :value="data.realname"></mt-cell>
    <mt-cell title="学生号" :value="data.student_id"></mt-cell>
    <mt-cell title="大学" :value="data.college" is-link @click.native="change('年级', 'college')"></mt-cell>
    <mt-cell title="年级" :value="data.grade" is-link @click.native="choiceGrade"></mt-cell>
    <mt-cell title="性别" :value="data.gender" is-link @click.native="choiceSex"></mt-cell>
    <mt-cell title="生日" v-model="data.birthday" is-link @click.native="getBirthday"></mt-cell>
    <mt-cell title="手机号" :value="data.phone" is-link @click.native="change('手机号', 'phone')"></mt-cell>
    <mt-cell title="微信号" :value="data.wx_openid"></mt-cell>
</div>
</template>
<script>
import { MessageBox, Toast } from 'mint-ui'
import dateTime from '../common/dateTime'
import toastChoice from '../common/toastChoice'

export default {
  name: 'userInfo',
  components: {
    'date-time': dateTime,
    'toast-choice': toastChoice
  },
  data () {
    return {
      showTime: false,
      decideShow: false,
      collegeShow: false,
      data: {
        name: '',
        realname: '',
        student_id: '',
        college: '',
        grade: '',
        gender: '',
        phone: '',
        wx_openid: '',
        birthday: '',
        wx_head_img: ''
      },
      sex: [{
        name: '男',
        value: 1
      }, {
        name: '女',
        value: 2
      }],
      college: [{
        name: '不在校',
        value: '不在校'
      }, {
        name: '大一',
        value: '大一'
      }, {
        name: '大二',
        value: '大二'
      }, {
        name: '大三',
        value: '大三'
      }, {
        name: '大四',
        value: '大四'
      }]
    }
  },
  created () {
    this.init()
  },
  methods: {
    gotoMain () {
      this.$router.push('/home/user')
    },
    init () {
      let _self = this
      _self.getHttp('/api/user/auth/info').then(function (data) {
        _self.data = data.user.info
      })
    },
    choiceSex () {
      this.decideShow = true
    },
    choiceGrade () {
      this.collegeShow = true
    },
    getGrade (item) {
      this.data.grade = item.name
      this.collegeShow = false
      this.updateInfo('grade', item.value)
    },
    getSex (item) {
      this.data.gender = item.name
      this.decideShow = false
      this.updateInfo('gender', item.value)
    },
    getBirthday () {
      this.showTime = true
    },
    getNewBirthday (value) {
      this.showTime = false
      if (value === this.data.birthday) {
        return
      }
      this.$set(this.data, 'birthday', value)
      this.updateInfo('birthday', value)
    },
    change (text, type) {
      let _self = this
      MessageBox.prompt('请输入新的' + text).then(({ value, action }) => {
        if (action === 'confirm') {
          _self.data[type] = value
          _self.updateInfo(type, value)
        }
      }).catch(function () {
        Toast({
          message: '已取消修改',
          position: 'bottom',
          duration: 1000
        })
      })
    },
    uploadFile (e) {
      e.stopPropagation()
      let _self = this
      const formData = new FormData()
      formData.append('image', e.target.files[0])
      _self.postHttp('/api/user/upload/avatar', formData, 'toast').then(function (data) {
        console.log(data)
        _self.data.wx_head_img = data.data.path
      })
    },
    updateInfo (key, value) {
      let _self = this
      let data = {}
      data[key] = value
      _self.postHttp('/api/user/update', data, 'toast').then(function (data) {
        console.log(34567)
      })
    }
  }
}
</script>
<style>
.user-head-box {
    background: white;
    box-shadow: 0 0 10px #888
}
.user-head-show {
    padding: 8px;
    height: 90px;
    width: 90px;
    border-radius: 50%
}
.upload-style {
  opacity: 0;
  position: absolute
}
</style>
