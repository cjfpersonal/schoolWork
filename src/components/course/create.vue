<template>
<div>
    <headl :bar='false' :search="false" title="发布信息" backRouth="/course"></headl>
    <div>
      <mt-field label="课程编号" v-model="course.number" placeholder="请输入课程编号" class="activity-create-input"></mt-field>
      <mt-field label="课程名称" v-model="course.name" placeholder="请输入课程名称" class="activity-create-input"></mt-field>
      <mt-field label="主讲教师" v-model="course.teacher" placeholder="请输入主讲教师" class="activity-create-input"></mt-field>
      <mt-field label="上课时间" v-model="course.time" 
      @click.native="showTime('course', 'time')" placeholder="请选择上课时间" class="activity-create-input"></mt-field>
    </div>
    <div slot="footer" class="dialog-footer" style="width: 100%; margin: 15px 0;text-align: center">
      <mt-button type="default" @click="gotoRouter($event, '/course')" style="width: 150px">取 消</mt-button>
      <mt-button type="primary" @click="confirmInfo($event)" style="width: 150px">确 定</mt-button>
    </div>
</div>
</template>
<script>
import headl from '../common/head'
export default {
  components: {
    'headl': headl
  },
  name: 'notice',
  data () {
    return {
      course: {
        number: '',
        name: '',
        teacher: '',
        time: ''
      }
    }
  },
  created () {
    this.init()
    this.createType = this.$route.params.type
  },
  methods: {
    init () {
      console.log(34567)
    },
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    }
  }
}
</script>
