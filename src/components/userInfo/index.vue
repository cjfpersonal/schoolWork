<template>
<div>
    <div class="user-head-box">
        <el-row>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" @click.native="gotoMain">
                <div class="activity-head-left-back">
                    <i class="el-icon-arrow-left"></i>
                    <span>返回</span>
                </div>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3">
                <div class="activity-head-left-back">
                    <span>个人信息</span>
                </div>
            </el-col>
        </el-row>
    </div>
    <date-time dateType="date" :openTime="showTime" :startTime="data.birthday" v-on:time="getNewBirthday"></date-time>
    <mt-cell title="头像" is-link>
        <img :src="data.wx_head_img" class="user-head-show" />
    </mt-cell>
    <mt-cell title="用户名" :value="data.name" is-link @click.native="change('用户名', 'name')"></mt-cell>
    <mt-cell title="真实姓名" :value="data.realname"></mt-cell>
    <mt-cell title="学生号" :value="data.student_id"></mt-cell>
    <mt-cell title="大学" :value="data.college" is-link @click.native="change('大学', 'college')"></mt-cell>
    <mt-cell title="年级" :value="data.grade" is-link @click.native="change('年级', 'grade')"></mt-cell>
    <mt-cell title="性别" :value="data.gender"></mt-cell>
    <mt-cell title="生日" :value="data.birthday" is-link @click.native="getBirthday"></mt-cell>
    <mt-cell title="手机号" :value="data.phone" is-link @click.native="change('手机号', 'phone')"></mt-cell>
    <mt-cell title="微信号" :value="data.wx_openid"></mt-cell>
</div>
</template>
<script>
import { MessageBox, Toast } from 'mint-ui'
import dateTime from '../common/dateTime'

export default {
  name: 'userInfo',
  components: {
    'date-time': dateTime
  },
  data () {
    return {
      showTime: false,
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
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    gotoMain () {
      this.$router.push('/')
    },
    init () {
      this.data = {
        name: '多撒谎家乐福',
        realname: '答复',
        student_id: '1232132132',
        college: '深圳大学',
        grade: '大一',
        gender: '男',
        phone: 18218025628,
        wx_openid: 'dsafdsafdas',
        birthday: '1994-08-06',
        wx_head_img: require('../../assets/src/course.png')
      }
    },
    change (text, type) {
      let _self = this
      MessageBox.prompt('请输入新的' + text).then(({ value, action }) => {
        console.log(value, action)
        if (action === 'confirm') {
          _self.data[type] = value
        }
      }).catch(function () {
        Toast({
          message: '修改失败',
          position: 'bottom',
          duration: 1000
        })
      })
    },
    getBirthday () {
      this.showTime = true
    },
    getNewBirthday (value) {
      console.log(value)
      this.showTime = false
      this.data.birthday = value
    }
  }
}
</script>
<style>
.user-head-box {
    background: white;
    margin-bottom: 20px;
    box-shadow: 0 0 10px #888
}
.user-head-show {
    padding: 8px;
    height: 50px;
    width: 50px;
}
</style>
