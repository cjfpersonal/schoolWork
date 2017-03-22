<template>
  <div id='activityInfo'></div>
</template>

<script>
export default {
  name: 'activity',
  created: function () {
    let _self = this
    setTimeout(function () {
      _self.init()
    })
  },
  methods: {
    init: function () {
      let map = new window.BMap.Map('activityInfo')
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
    }
  }
}
</script>

<style>
#activityInfo {
  width: 100%;
  height: calc(100% - 60px);
  position: absolute;
  overflow: hidden;
  top: 60px;
  z-index: 0
}
</style>
