<template>
  <div id='activityInfo'></div>
</template>

<script>
export default {
  name: 'activity',
  data () {
    return {
      data: []
    }
  },
  created: function () {
    let _self = this
    setTimeout(function () {
      _self.init()
    })
  },
  methods: {
    init: function () {
      let _self = this
      let map = new window.BMap.Map('activityInfo')
      let point = new window.BMap.Point(113.9425010000, 22.5390130000)
      map.centerAndZoom(point, 16.5) // 启用城市名称作为中心
      map.enableScrollWheelZoom(true) // 启用滚轮放大
      map.enableDragging()
      /**
       * @description 初始化自己位置
       */
      let geolocation = new window.BMap.Geolocation()
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
          // var mk = new window.BMap.Marker(r.point)
          // map.addOverlay(mk)
          // map.panTo(r.point)
          console.log(r)
          alert(r.point.longitude)
          var mine = new window.BMap.Marker(r.point)
          map.addOverlay(mine)
          var label = new window.BMap.Label('我在这哦', {offset: new window.BMap.Size(20, -10)})
          mine.setLabel(label)
        } else {
          alert('failed' + this.getStatus())
        }
      }, {enableHighAccuracy: true})
      _self.getHttp('/api/active/list?page=1').then(function (data) {
        let pointArray = [{
          lng: 113.93976962708149,
          lat: 22.538992503476088
        }, {
          lng: 113.93806254889088,
          lat: 22.54520288017499
        }, {
          lng: 113.93923881326404,
          lat: 22.548833282254762
        }, {
          lng: 113.93923881326404,
          lat: 22.548833282254762
        }, {
          lng: 113.94131058547413,
          lat: 22.535289391866453
        }, {
          lng: 113.94083853705517,
          lat: 22.549692337900506
        }, {
          lng: 113.9410774982036,
          lat: 22.54633826333686
        }, {
          lng: 113.94053605173723,
          lat: 22.548730698331983
        }, {
          lng: 113.93924528478476,
          lat: 22.545313158122553
        }, {
          lng: 113.93683339029867,
          lat: 22.545902465996498
        }]
        pointArray.forEach(function (item, index) {
          let icon = data.actives.data[index].poster
          let point = new window.BMap.Point(item.lng, item.lat)
          let marker = new _self.InitMarket(point, icon)
          map.addOverlay(marker)
          let dom = document.getElementsByClassName('market-img-box')
          dom[index].addEventListener('touchstart', function (e) {
            console.log(345678654)
          })
        })
        map.addEventListener('touchmove', _self.positionChoice)
      })
    },
    test () {
      console.log(678)
    }
  }
}
</script>

<style scoped>
#activityInfo {
  width: 100%;
  height: calc(100% - 50px) !important;
  position: absolute;
  overflow: hidden;
  z-index: 0
}
</style>
