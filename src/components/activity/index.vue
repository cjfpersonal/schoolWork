<template>
  <div class="a100">
    <div class="activity-list-box">
      <p class="activity-list-activity" :class="{'active': isFocus }" @click.active="addActive($event)">活动</p>
      <p class="activity-list-activity" :class="{'active': !isFocus }" @click.active="addActive($event)">社团</p>
    </div>
    <div id='activityInfo'></div>
    <div class="activity-logo-box" @click="gotoRouter($event, '/activity/detail')">
      <i class="activity-list-logo logo-style3"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'activity',
  data () {
    return {
      isFocus: false,
      data: [],
      recordIndex: 0
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
      let zoom = new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_LEFT, type: window.BMAP_NAVIGATION_CONTROL_SMALL})

      map.centerAndZoom(point, 16.5) // 启用城市名称作为中心
      map.enableScrollWheelZoom(true) // 启用滚轮放大
      map.enableDragging()
      map.addControl(zoom)
      /**
       * @description 初始化自己位置
       */
      let geolocation = new window.BMap.Geolocation()
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
          var mine = new window.BMap.Marker(r.point)
          map.addOverlay(mine)
          var label = new window.BMap.Label('我在这哦', {offset: new window.BMap.Size(-25, -28)})
          label.setStyle({
            padding: '5px 15px',
            fontSize: '12px',
            fontFamily: '微软雅黑',
            border: 'none',
            boxShadow: '0 0 5px #888'
          })
          mine.setLabel(label)
          // map.panTo(mine)
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
          let floatConten = new _self.ComplexCustomOverlay(point, data.actives.data[index])

          map.addOverlay(floatConten)
          map.addOverlay(marker)

          let dom = document.getElementsByClassName('market-img-box')
          let contentDom = document.getElementsByClassName('float-content-box')
          dom[index].addEventListener('touchstart', function (e) {
            e.stopPropagation()
            dom[_self.recordIndex].classList.remove('active')
            contentDom[_self.recordIndex].classList.remove('active')
            _self.recordIndex = index
            this.classList.add('active')
            contentDom[index].classList.add('active')
            map.panTo(point)
          })
          contentDom[index].addEventListener('touchstart', function (e) {
            e.stopPropagation()
            _self.$router.push('/activity/detail/' + data.actives.data[index].id)
          })
        })
        map.addEventListener('touchstart', _self.positionChoice)
      })
    },
    addActive (e) {
      e.stopPropagation()
      this.isFocus = !this.isFocus
    },
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
#activityInfo {
  width: 100%;
  height: calc(100% - 110px) !important;
  position: absolute;
  overflow: hidden;
  z-index: 0
}
</style>
