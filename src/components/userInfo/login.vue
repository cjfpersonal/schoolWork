<template>
<div class="a100 clearfix" style="background: #f4f3f4">
    <img class="loginHead" src="../../assets/src/login-register/head.png" />
    <el-row>
        <el-col :offset="2" :xs="20" class="input-box">
            <i class="user-logo login-logo-local"></i>
            <input class="login-input-all" />
        </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
        <el-col :offset="2" :xs="20" class="input-box clearfix">
            <i class="repassword-logo login-logo-local"></i>
            <input class="login-input-all" />
            <span class="forget-password">忘记密码</span>
        </el-col>
    </el-row>
    <el-row class="m25">
        <el-col :offset="2" :xs="20" class="input-box">
            <p class="login-btn" v-on:click="gotoRouter($event, '/home')">登录</p>
        </el-col>
    </el-row>
    <p class="no-login">
        没有账号，去<span class="important-font"  v-on:click="gotoRouter($event, '/register')">注册</span>
    </p>
</div>
</template>

<script>
import '../../assets/css/login.css'
export default {
  name: 'login',
  data () {
    return {}
  },
  methods: {
    gotoRouter: function (e, value) {
      e.stopPropagation()
      this.$router.push(value)
    }
  }
}
</script>
