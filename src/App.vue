<template>
  <div id="app">
    <el-table
    id="loadding"
    class="loadding"
    v-loading="true"
    element-loading-text="拼命请求中">
    </el-table>
    <chart :showChartChoice="showChartChoice" title="活动聊天" v-on:back="hideChart"></chart>
    <i v-if="!showChartChoice&&checkRoute" class="chart-logo right-bottom"
    id="chartMove"
    v-on:click="showChart()" ref="toastChart"></i>
    <router-view class="a100"></router-view>
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
      dataTable: [],
      getDetail: false,
      showChartChoice: false,
      checkRoute: true
    }
  },
  created () {
    let path = this.$route.path
    if (path === '/login' || path === '/register' || path === '/beforeLogin') {
      this.checkRoute = false
    }
  },
  methods: {
    showChart () {
      let dom = document.getElementById('chartMove')
      if (dom.classList.contains('active')) {
        dom.classList.remove('active')
      }
      this.showChartChoice = true
    },
    showChart2 () {
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
.el-table__empty-text {
  display: none
}
.right-bottom {
  position: fixed;
  right: 20px;
  bottom: 60px;
  z-index: 99
}
</style>
