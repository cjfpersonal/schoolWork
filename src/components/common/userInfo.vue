<template>
<div class="a100">
  <img src="../../assets/src/szu_logo.jpg" class="show-list-img" />
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
      let _self = this
      _self.getHttp('/api/user/info/' + _self.$route.params.id).then(function (data) {
        _self.datas = data.userInfo
      })
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
