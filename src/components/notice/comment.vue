<template>
<div class="a100">
  <el-row class="work-content2">
    <el-col :xs="2">
        <i class="back-course-logo logo-style6" v-if="typeInfo === 'course'"></i>
        <i class="back-course-logo logo-style6" v-if="typeInfo === 'user'"></i>
        <i class="notice-activity-logo logo-style5" v-if="typeInfo === 'activity'"></i>
        <i class="notice-college-logo logo-style6" v-if="typeInfo === 'college'"></i>
    </el-col>
    <el-col :xs="22">
        <p class="notice-detail-position">{{data.title}}</p>
        <p class="notice-detail-content">
        {{data.created_at | date}}
        <span class="fr">
            <i class="scan-logo logo-style7"></i>
            {{data.view.count ? data.view.count : '0'}}
        </span>
        </p>
    </el-col>
  </el-row>
  <div class="comment-action-box">
      <textarea placeholder="写下你的评论...." v-model="form.content" class="comment-content"></textarea>
  </div>
  <div class="m25" style="text-align: center">
      <p class="comment-action" @click="getComment($event)">发布评论</p>
  </div>
</div>
</template>
<script>
export default {
  name: 'comment',
  data () {
    return {
      data: {},
      form: {
        content: ''
      }
    }
  },
  created () {
    this.typeInfo = this.$route.params.type
    this.init()
  },
  methods: {
    init () {
      let _self = this
      let id = this.$route.params.id
      _self.getHttp('/api/info/announcement/detail/' + id).then(function (data) {
        _self.data = data.announcement
      })
    },
    getComment (e) {
      e.stopPropagation()
      let _self = this
      _self.postHttp('/api/info/comment/store/' + _self.$route.params.id, _self.form, 'toast').then(function (data) {
        _self.$router.go(-1)
      })
    }
  }
}
</script>
<style>
.comment-action-box {
    width: 100%;
    padding: 20px;
    height: 250px;
    background: white
}
.comment-content {
    border: none;
    width: 100%;
    height: 100%;
    font-size: 14px;
}
.comment-action-box {
    width: 100%;
    text-align: center
}
.comment-action {
    width: 80%;
    text-align: center;
    padding: 15px 0 ;
    color: white;
    background: #4B99FF;
    border-radius: 5px;
    display: inline-block
}
</style>
