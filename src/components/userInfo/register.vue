<template>
<div class="a100 clearfix" style="background: #f4f3f4">
    <img class="loginHead" src="../../assets/src/login-register/head.png" />
    <el-row>
        <el-col :offset="2" :xs="20" class="input-box">
            <i class="user-logo login-logo-local"></i>
            <input class="login-input-all" 
            placeholder="输入用户名"
            v-model="data.username" />
        </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
        <el-col :offset="2" :xs="20" class="input-box">
            <i class="password-logo login-logo-local"></i>
            <input class="login-input-all" 
            placeholder="输入密码"
            type="password"
            v-model="data.password" />
        </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
        <el-col :offset="2" :xs="20" class="input-box">
            <i class="repassword-logo login-logo-local"></i>
            <input class="login-input-all" 
            placeholder="再次输入密码"
            type="password"
            v-model="data.password_confirmation" />
        </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
        <el-col :offset="2" :xs="20" class="input-box">
            <i class="email-logo login-logo-local" style="margin: 14px 11px"></i>
            <input class="login-input-all"
            placeholder="输入邮箱"
             v-model="data.email" />
        </el-col>
    </el-row>
    <el-row class="m25">
        <el-col :offset="2" :xs="20" class="input-box">
            <p class="login-btn"  v-on:click="register($event)">注册账号</p>
        </el-col>
    </el-row>
    <p class="no-login">
        已有账号，去<span class="important-font"  v-on:click="gotoRouter($event, '/login')">登录</span>
    </p>
</div>
</template>

<script>
import '../../assets/css/login.css'
export default {
  name: 'login',
  data () {
    return {
      data: {
        username: '',
        password: '',
        password_confirmation: '',
        email: ''
      }
    }
  },
  methods: {
    gotoRouter (e, value) {
      e.stopPropagation()
      this.$router.push(value)
    },
    register (e) {
      e.stopPropagation()
      let url = '/api/user/register'
      let _self = this
      _self.postHttp(url, _self.data).then(function (data) {
        _self.gotoRouter(e, '/login')
      })
    }
  }
}
</script>
