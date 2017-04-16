<template>
<div>
    <div class="user-head-box">
        <el-row>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" @click.native="goBack">
                <div class="activity-head-left-back">
                    <i class="el-icon-arrow-left"></i>
                    <span>返回</span>
                </div>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3">
                <div class="activity-head-left-back">
                    <span>{{data.name + '信息'}}</span>
                </div>
            </el-col>
        </el-row>
    </div>
    <mt-cell title="头像" is-link>
        <img :src="data.wx_head_img" class="user-head-show" />
    </mt-cell>
    <mt-cell title="用户名" :value="data.name"></mt-cell>
    <mt-cell title="真实姓名" :value="data.realname"></mt-cell>
    <mt-cell title="学生号" :value="data.student_id"></mt-cell>
    <mt-cell title="大学" :value="data.college"></mt-cell>
    <mt-cell title="年级" :value="data.grade"></mt-cell>
    <mt-cell title="性别" :value="data.gender"></mt-cell>
    <mt-cell title="生日" :value="data.birthday"></mt-cell>
    <mt-cell title="手机号" :value="data.phone"></mt-cell>
    <mt-cell title="微信号" :value="data.wx_openid"></mt-cell>
</div>
</template>
<script>
export default {
  name: 'userInfo',
  data () {
    return {
      showTime: false,
      data: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    gotoMain () {
      this.$router.go(-1)
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
    }
  }
}
</script>
