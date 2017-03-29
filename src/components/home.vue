<template>
<div style="width: 100%; height:100%; overflow: hidden;position: absolute">
    <div id='contain'></div>
    <img class='showList' src='../assets/src/showList.png' v-on:click='ListEdit("show")' />
    <div class="mainMume" v-on:click='ListEdit("hide")'>
        <i class="el-icon-close closeButton" v-on:click='ListEdit("hide")'></i>
        <ul class="mainMumeUl">
          <li @click="gotoRouter($event, '/userInfo')">用户信息</li>
          <li @click="gotoRouter($event, '/notice')">公告信息</li>
          <li @click="gotoRouter($event, '/activity')">活动项目</li>
          <li @click="gotoRouter($event, '/tradeIndex')">课程共享</li>
          <li @click="gotoRouter($event, '/course')">加入社团</li>
          <li @click="gotoRouter($event, '/food')">饮食推荐</li>
          <li @click="gotoRouter($event, '/shopping')">二次商品</li>
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
      let _self = this
      let map = new window.BMap.Map('contain')
      let point = new window.BMap.Point(113.9425010000, 22.5390130000)
      // let pointStop = new window.BMap.Point(113.944307， 22.53908)
      map.centerAndZoom(point, 16.5) // 启用城市名称作为中心
      map.enableScrollWheelZoom(true) // 启用滚轮放大
      map.enableDragging() // 可拖拽
      // map.disableDragging()
      map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT, type: window.BMAP_NAVIGATION_CONTROL_SMALL})) // 添加放大缩小button
      // 创建标注
      // let myIcon = new window.BMap.Icon('./assets/src/showList.png', new window.BMap.Size(300, 157)) // 设置新图标
      // let marker = new window.BMap.Marker(point) // 创建标注
      // map.addOverlay(marker) // 将标注添加到地图中
      // let local = new window.BMap.LocalSearch(map, {
      //   renderOptions: {map: map, panel: 'r-result'}
      // })
      // local.search('餐饮')
      // 随机向地图添加25个标注
      let pointArray = [{
        lng: 113.93976962708149,
        lat: 22.538992503476088,
        content: {
          name: '剑锋一',
          description: 'dsafdasfdsa'
        }
      }, {
        lng: 113.93806254889088,
        lat: 22.54520288017499,
        content: {
          name: '剑锋一dsafdsa',
          description: 'dsafda答复sfdsa'
        }
      }, {
        lng: 113.93923881326404,
        lat: 22.548833282254762,
        content: {
          name: '剑锋一dsaf',
          description: 'dsaf答复dasfdsa'
        }
      }, {
        lng: 113.93923881326404,
        lat: 22.548833282254762,
        content: {
          name: '剑dsaf锋一',
          description: 'dvcxbsafdasfdsa'
        }
      }, {
        lng: 113.94131058547413,
        lat: 22.535289391866453,
        content: {
          name: '剑锋一dsaf',
          description: 'dxcvsafdasfdsa'
        }
      }, {
        lng: 113.94083853705517,
        lat: 22.549692337900506,
        content: {
          name: '剑锋一ewr',
          description: 'rteydsafdasfdsa'
        }
      }, {
        lng: 113.9410774982036,
        lat: 22.54633826333686,
        content: {
          name: '剑fds锋一',
          description: 'dsafdasfdsa21345'
        }
      }, {
        lng: 113.94053605173723,
        lat: 22.548730698331983,
        content: {
          name: '剑锋4567一',
          description: 'dsa4356fdasfdsa'
        }
      }, {
        lng: 113.93924528478476,
        lat: 22.545313158122553,
        content: {
          name: '剑锋345一',
          description: 'dsaf435dasfdsa'
        }
      }, {
        lng: 113.93683339029867,
        lat: 22.545902465996498,
        content: {
          name: '剑锋wert一',
          description: 'dsafdas4565fdsa'
        }
      }]
      pointArray.forEach(function (item, index) {
        let point = new window.BMap.Point(item.lng, item.lat)
        let marker = new window.BMap.Marker(point)
        marker.addEventListener('click', function () {
          let myCompOverlay = new _self.ComplexCustomOverlay(point, item.content)
          map.addOverlay(myCompOverlay)
        })
        marker.setAnimation(window.BMAP_ANIMATION_BOUNCE) // 跳动的动画
        map.addOverlay(marker)
      })
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
