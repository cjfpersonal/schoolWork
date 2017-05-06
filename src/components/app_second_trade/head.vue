<template>
  <div>
    <!--<div class="activity-head">
      <el-row>
        <el-col :xs="8" :sm="6" :md="4" :lg="3">
          <div class="activity-head-left" v-if="routeRecord === '/shopping/index'" @click="gotoRouter($event, '/')">
            <img class='szu-logo' src='../../assets/src/szu_logo.jpg' />
            <p class="szu-logo-font">深大交易</p>
          </div>
          <div class="activity-head-left-back" 
          @click="gotoRouter($event, routeRecord.substr(0, routeRecord.lastIndexOf('/')))"
          v-if="routeRecord !== '/shopping/index'">
            <i class="el-icon-arrow-left"></i>
            <span>返回</span>
          </div>
        </el-col>
        <el-col :offset='8' :xs="8" :sm="6" :md="4" :lg="3" style="float: right">
          <div class="activity-head-right">
            <i class="shopping-cart shopping-cart-lo" @click="gotoRouter($event, '/shopping/shoppingcar')"></i>
            <button class="navbar-toggle" @click="changeActive($event, 1)">
              <p class="icon-toggle-line"></p>  
              <p class="icon-toggle-line"></p>
              <p class="icon-toggle-line"></p>
            </button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="activity-head-bottom-pop-list content-wrap activity-body"
    style="position: fixed"
    :class='{heightList: getActive[1]}'>
      <div class="activity-head-bottom-content">
        <ul class="activity-head-bottom-pop-ul">
          <li @click="gotoRouter($event, '/shopping/create')">商品创建</li>
          <li @click="gotoRouter($event, '/shopping/manage')">商品管理</li>
          <li @click="gotoRouter($event, '/shopping/shoppingcar')">购物车</li>
          <li @click="gotoRouter($event, '/')" v-if="routeRecord === '/shopping/index'">返回主页</li>
          <li @click="gotoRouter($event, '/shopping')" v-if="routeRecord !== '/shopping/index'">商品主页</li>
        </ul>
      </div>
    </div>-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'activity',
  data () {
    return {
      getActive: [false, false],
      routeRecord: ''
    }
  },
  watch: {
    '$route.fullPath': function (newVal, oldVal) {
      this.routeRecord = newVal
    }
  },
  created: function () {
    this.routeRecord = this.$route.fullPath
  },
  methods: {
    changeActive (e, index) {
      e.stopPropagation()
      let _self = this
      _self.getActive.forEach(function (v, n) {
        if (n !== index) {
          _self.$set(_self.getActive, n, false)
        }
      })
      _self.$set(_self.getActive, index, !_self.getActive[index])
    },
    gotoRouter (e, value) {
      e.stopPropagation()
      this.$router.push(value)
      this.getActive[1] = false
    }
  }
}
</script>

<style>
.heightList {
    height: 250px
}
.activity-head {
  position: fixed
}
.activity-body {
  position: absolute;
  top: 60px;
  width: 100%
}
.shopping-cart-lo {
  position: relative;
  top: 10px;
  right: 6px
}
</style>
