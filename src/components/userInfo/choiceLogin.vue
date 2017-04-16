<template>
<div class="a100" style="background: white; display: table">
    <el-carousel :interval="3000" arrow="always" class="swiper-box">
        <el-carousel-item>
            <div class="swiper-img-box"><img src="../../assets/src/login-register/swiper1.png" /></div>
            <p class="swiper-head">Stay Connected</p>
            <p class="swiper-description">Doing great work in our campus</p>
            <p class="swiper-description">Stay Connected wherever</p>
        </el-carousel-item>
        <el-carousel-item>
            <div class="swiper-img-box"><img src="../../assets/src/login-register/swiper2.png" /></div>
            <p class="swiper-head">Stay Connected</p>
            <p class="swiper-description">Doing great work in our campus</p>
            <p class="swiper-description">Stay Connected wherever</p>
        </el-carousel-item>
        <el-carousel-item>
            <div class="swiper-img-box"><img src="../../assets/src/login-register/swiper3.png" /></div>
            <p class="swiper-head">Stay Connected</p>
            <p class="swiper-description">Doing great work in our campus</p>
            <p class="swiper-description">Stay Connected wherever</p>
        </el-carousel-item>
  </el-carousel>
  <el-row class="m25">
    <el-col :offset="2" :xs="20" class="input-box">
        <p class="login-btn" v-on:click="gotoRouter($event, '/register')">马上注册</p>
    </el-col>
    </el-row>
    <p class="no-login">
        已有账号，去<span class="important-font" v-on:click="gotoRouter($event, '/login')">登录</span>
    </p>
</div>
</template>
<script>
export default {
  name: 'beforeLogin',
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
<style>
.el-carousel__arrow--right,.el-carousel__arrow--left {
    display: none
}
.el-carousel__button {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: #d0d0d0
}
..el-carousel__indicator {
    padding: 0 5px;
}
.el-carousel__indicator.is-active .el-carousel__button {
    background: #4d99ff
}
</style>
