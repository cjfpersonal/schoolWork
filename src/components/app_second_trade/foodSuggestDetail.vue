<template>
<div class="a100">
    <div v-for="item, index in data" :key="index">
        <p class="notice-mid-info" v-if="index===0">{{item.title}}</p>
        <p class="notice-mid-info" v-if="index>0 && item.title !== data[index-1].title">{{item.title}}</p>
        <div class='activity-detail-list-content clearfix'>
          <el-row class="food-suggest-box">
            <el-col :xs="10" style="text-align: center;min-height:120px">
                <img :src="item.img" style="min-height:120px;width: 90%" />
            </el-col>
            <el-col :xs="14" style="height: 120px;">
                <div class="content-right-box">
                <p class="activity-main-title m5">{{item[0]}}</p>
                <p class="notice-detail-content" style="margin-top: 10px">{{item[1]}}</p>
                <p class="notice-detail-content">
                    <span>{{item[2]}}</span>
                    <span style="padding-left: 5px">{{item[3]}}</span></p>
                <p class="notice-detail-content">
                    <span>售价:</span><span>{{item[4]}}</span>
                    <span style="padding-left: 5px">原价:{{item[5]?item[5]:'暂无'}}</span></p>
                </div>
            </el-col>
          </el-row>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'foodSugestDetail',
  data () {
    return {
      data: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let _self = this
      _self.getHttp('/login/grabbing/' + _self.$route.params.id).then(function (data) {
        _self.data = data
      })
    }
  }
}
</script>
