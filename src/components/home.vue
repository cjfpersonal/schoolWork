<template>
<div style="width: 100%; height:100%; overflow: hidden;position: absolute">
    <div id='contain'></div>
    <img class='showList' src='../assets/src/showList.png' v-on:click='ListEdit("show")' />
    <div class="mainMume" v-on:click='ListEdit("hide")'>
        <i class="el-icon-close closeButton" v-on:click='ListEdit("hide")'></i>
        <ul class="mainMumeUl">
        <li @click="gotoRouter($event, '/tradeIndex')">用户信息</li>
        <li @click="gotoRouter($event, '/activity')">活动项目</li>
        <li @click="gotoRouter($event, '/food')">饮食推荐</li>
        <li @click="gotoRouter($event, '/shopping')">商品交易</li>
        <li @click="gotoRouter($event, '/shoping')" style="color:red">注销</li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
  name: 'home',
  created: function () {
    let _self = this
    setTimeout(function () {
      _self.init()
    })
  },
  methods: {
    init: function () {
      let map = new window.BMap.Map('contain')
      let point = new window.BMap.Point(113.9425010000, 22.5390130000)
      map.centerAndZoom('深圳大学', 16) // 启用城市名称作为中心
      map.enableScrollWheelZoom(true) // 启用滚轮放大
      // map.enableDragging() // 可拖拽
      map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT, type: window.BMAP_NAVIGATION_CONTROL_SMALL})) // 添加放大缩小button
      // 创建标注
      // let myIcon = new window.BMap.Icon('./assets/src/showList.png', new window.BMap.Size(300, 157)) // 设置新图标
      let marker = new window.BMap.Marker(point) // 创建标注
      map.addOverlay(marker) // 将标注添加到地图中
      // let local = new window.BMap.LocalSearch(map, {
      //   renderOptions: {map: map, panel: 'r-result'}
      // })
      // local.search('餐饮')
      marker.setAnimation(window.BMAP_ANIMATION_BOUNCE) // 跳动的动画
    },
    ListEdit: function (type) {
      let showList = document.getElementsByClassName('showList')[0]
      let mainMumeShow = document.getElementsByClassName('mainMume')[0]
      if (type === 'show') {
        showList.classList.add('showListChoice')
        mainMumeShow.classList.add('mainMumeShow')
      } else {
        showList.classList.remove('showListChoice')
        mainMumeShow.classList.remove('mainMumeShow')
      }
    },
    gotoRouter: function (e, value) {
      e.stopPropagation()
      this.$router.push(value)
    }
  }
}
</script>
<style>
#contain {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden
}
.showList {
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  opacity: .7;
  transition: all .3s;
}
.closeButton {
  float: right;
  font-size: 20px;
  position: relative;
  right: 20px;
  top: 20px;
  color: white
}
.showListChoice {
  animation: mymove .3s forwards;
}
@keyframes mymove {
  0% {transform: rotate(0deg); opacity: .7}
  100% {opacity: 0;display: none; transform: rotate(360deg);}
}
.mainMume {
  width: 0%;
  left: calc(100% - 10px);
  top: calc(100% - 10px);
  position: absolute;
  height: 0%;
  background: rgba(0, 0, 0, .6);
  transition: all .3s
}
.mainMumeShow {
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  transition: all .3s;
}
.mainMumeUl {
  margin-top: 50px
}
.mainMumeUl li {
  text-align: center;
  width: 100%;
  font-size: 16px;
  padding: 15px 0;
  color: white;
  border-bottom: 2px solid rgba(255, 255, 255, .5);
}
</style>
