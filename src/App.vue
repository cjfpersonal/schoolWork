<template>
  <div id="app">
    <chart :showChartChoice="showChartChoice" title="活动聊天" v-on:back="hideChart"></chart>
    <i v-if="!showChartChoice" class="chart-logo right-bottom" @click="showChart"></i>
    <router-view></router-view>
  </div>
</template>

<script>
import chart from './components/common/chartInterface'
export default {
  name: 'app',
  components: {
    'chart': chart
  },
  data () {
    return {
      showChartChoice: false
    }
  },
  methods: {
    showChart () {
      this.showChartChoice = true
    },
    hideChart () {
      this.showChartChoice = false
    }
  }
}
</script>

<style>
#app {
  position: relative;
  width: 100%;
  height: 100%
}
.right-bottom {
  position: fixed;
  right: 20px;
  bottom: 60px;
  z-index: 99
}
</style>
