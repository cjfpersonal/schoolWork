<template>
<div>
    <div class="user-head-box" style="width: 100%;height: 60px;"></div>
    <div class="user-head-box" style="position: fixed;width: 100%; top:0; z-index: 100">
        <el-row>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" @click.native="gotoRouter($event, backRouth)">
                <div class="activity-head-left-back">
                    <i class="el-icon-arrow-left"></i>
                    <span>返回</span>
                </div>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3">
                <div class="activity-head-left-back" style="text-align: center;padding-right: 15px;">
                    <span>{{title}}</span>
                </div>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3">
                <div class="activity-head-right">
                    <i class="el-icon-search activity-head-search" 
                    v-if="search"
                    @click='changeActive($event, 0)'></i>
                    <button class="navbar-toggle" @click='changeActive($event, 1)' v-if="bar">
                        <p class="icon-toggle-line"></p>  
                        <p class="icon-toggle-line"></p>
                        <p class="icon-toggle-line"></p>
                    </button>
                    <span v-if="choice&&choice.show" 
                    class="activity-head-left-back" 
                    @click="gotoRouter($event, choice.path)">
                    {{choice.title}}
                    </span>
                </div>
            </el-col>
        </el-row>
        <div class="activity-head-bottom-pop-search content-wrap" 
        style="position: fixed; top: 61px"
        :class='{heightSearch: getActive[0]}'>
            <div class="activity-head-bottom-content">
                <i class="el-icon-search activity-head-bottom-search"></i>
                <input type="text" class="activity-head-bottom-input" 
                v-on:blur='lineActive($event, "remove", "bottom-border-bar")'
                v-on:focus='lineActive($event, "add", "bottom-border-bar")'/>
                <div class="bottom-border-bar"></div>
            </div>
        </div>
        <div class="activity-head-bottom-pop-list content-wrap"
        style="position: fixed; top: 61px"
        :style="{height: getActive[1]?barContent.length * 50 + 80 + 'px':0}">
            <div class="activity-head-bottom-content">
                <ul class="activity-head-bottom-pop-ul">
                    <li v-for="item in barContent" 
                    @click="gotoRouter($event, item.path)">
                    {{item.title}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'notice',
  props: ['title', 'search', 'bar', 'backRouth', 'barContent', 'choice'],
  data () {
    return {
      getActive: [false, false],
      datas: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
    },
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    },
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
    lineActive (e, type, className) {
      e.stopPropagation()
      let element = document.getElementsByClassName(className)[0]
      if (type === 'add') {
        element.classList.add('active')
      } else {
        element.classList.remove('active')
      }
    }
  }
}
</script>
