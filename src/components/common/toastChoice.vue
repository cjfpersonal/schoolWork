<template>
  <div class="toastChoice">
    <mt-popup
    class="toastChoice"
    v-model="decideShow"
    position="right">
    <el-row v-if="operation&&operation.show" class="user-head-box">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" @click.native="close($event)">
            <div class="activity-head-left-back">
                <i class="el-icon-arrow-left"></i>
                <span>返回</span>
            </div>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3">
            <div class="activity-head-left-back">
                <span>{{operation.title}}</span>
            </div>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3">
            <div class="activity-head-right">
                <span @click="edit">{{operation.edit}}</span>
            </div>
        </el-col>
    </el-row>
    <p v-for="item in dataChoice" @click="returnChoice($event, item)" class="poppupContent">{{item.name}}</p>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'choice-popup',
  props: ['decideShow', 'dataChoice', 'operation'],
  data () {
    return {
    }
  },
  methods: {
    returnChoice (e, item) {
      e.stopPropagation()
      this.$emit('get', item)
    },
    close () {
      this.$emit('close')
    },
    edit () {
      this.$emit('edit')
    }
  }
}
</script>

<style>
.toastChoice {
    width: 100%;
    height: 100%
}
.poppupContent{
    font-size: 16px;
    padding: 15px 0;
    margin-left: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, .1)
}
</style>
