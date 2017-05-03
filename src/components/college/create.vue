<template>
  <div style="overflow-x: hidden;font-size: 16px;height: calc(100% - 55px)">
    <!--<headl title="发布活动" backRouth="/activity/detail"></headl>-->
    <div class="a100">
      <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="社团名称" v-model="data.name" />
       </el-col>
     </el-row>
    <el-row class="poster-box">
      <el-col :offset="2" :xs="16" class="poster-des line60">社团封面</el-col>
      <el-col :xs="6" style="height: 60px;position: relative">
        <span class="img-replace" v-if="poster"></span>
        <img class="img-replace" v-if="!poster" :src="poster" />
        <input type="file" class="file-upload" v-on:change="upload($event)" />
      </el-col>
    </el-row>
      <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="社团类型" v-model="data.type" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="限制人数" v-model="data.amount" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;line-height: 60px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="社团费用" v-model="data.money" />
       </el-col>
     </el-row>
     <el-row class="show-list-box" style="height: 60px;margin-top: 10px">
       <el-col :xs="4" style="text-align: center">
         <i class="input-logo logo-style2" style="transform: translateY(25%)"></i>
       </el-col>
       <el-col :xs="20" class="a100">
         <input class="login-input-all create-input" placeholder="社团详情" v-model="data.introduction" />
       </el-col>
     </el-row>
    </div>
    <p class="create-activity" @click="confirmInfo($event, '/college/create')">确认创建</p>
  </div>
</template>

<script>
export default {
  name: 'createPage',
  data () {
    return {
      data: {
        name: '',
        amount: '',
        introduction: '',
        type: '',
        money: ''
      },
      poster: ''
    }
  },
  methods: {
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    },
    upload (e) {
      e.stopPropagation()
      let file = e.target.files[0]
      let _self = this
      let url = '/api/league/upload/poster'
      const formData = new FormData()
      // file.name = 'image'
      // console.log(file)
      formData.append('image', file)
      _self.postHttp(url, formData).then(function (data) {
        console.log(data)
      })
    },
    cancel: function (e) {
      e.stopPropagation()
    },
    confirmInfo: function (e, path) {
      e.stopPropagation()
      let _self = this
      _self.postHttp('/api/league/store', _self.data).then(function (data) {
        console.log(data)
      })
    }
  }
}
</script scoped>
