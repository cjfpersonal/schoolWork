<template>
<div class="a100">
  <p class="create-activity" @click="gotoRouter($event, '/notice/create/course')">发布课程公告</p>
  <p class="create-activity" @click="gotoRouter($event, '/notice/create/college')">发布社团公告</p>
  <p class="create-activity" @click="gotoRouter($event, '/notice/create/activity')">发布活动公告</p>
</div>
</template>
<script>
export default {
  name: 'list',
  data () {
    return {}
  },
  created () {
    console.log(3456)
  },
  methods: {
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    }
  }
}
</script>
