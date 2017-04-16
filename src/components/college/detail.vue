<template>
<div style="height: 100%">
    <headl title="社团详情" backRouth="/college"></headl>
    <div v-if="data.attend==='true'">
      <div class="activity-one-detail-content">
          <p class="detail-main-title">{{data.name}}</p>
          <p class="m25"><span>人数:</span><span>{{data.amount}}</span></p>
          <p class="m25"><span>类型:</span><span>{{data.type}}</span></p>
          <div class="m25"><p>社团描述</p>{{data.introduction}}</div>
      </div>
      <mt-button type="primary" class="attend-activity" @click="attendActivity($event, 'course')">参与社团</mt-button>
    </div>
    <div v-if="data.attend === 'false'" id="userLocal" class="clearfix"></div>
</div>
</template>
<script>
import { MessageBox, Toast } from 'mint-ui'
import headl from '../common/head'
export default {
  components: {
    'headl': headl
  },
  name: 'notice',
  data () {
    return {
      data: {}
    }
  },
  created () {
    let _self = this
    this.init()
    if (_self.$route.params.id === 'false') {
      setTimeout(function () {
        _self.localInit()
      })
    }
  },
  methods: {
    init () {
      this.data = {
        attend: this.$route.params.id,
        name: '深大创客社团',
        amount: 123,
        type: '创业型',
        introduction: '深大发生快乐多撒谎发大水你开房剪短发哈尽快发货记得；看撒娇几点返回房间看电视；啊很多事；啊口袋啥尽快发货的萨拉能发货科技活动方式即可浪费好多撒'
      }
    },
    localInit: function () {
      let _self = this
      let map = new window.BMap.Map('userLocal')
      let point = new window.BMap.Point(113.9425010000, 22.5390130000)
      map.centerAndZoom(point, 16.5) // 启用城市名称作为中心
      map.enableScrollWheelZoom(true) // 启用滚轮放大
      map.enableDragging()
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
        marker.addEventListener('click', function (e) {
          console.log(e)
          window.event ? window.event.cancelBubble = true : e.stopPropagation()
          let myCompOverlay = new _self.ComplexCustomOverlay(point, item.content)
          map.addOverlay(myCompOverlay)
        })
        marker.setAnimation(window.BMAP_ANIMATION_BOUNCE) // 跳动的动画
        map.addOverlay(marker)
      })
      map.addEventListener('touchmove', this.positionChoice)
    },
    positionChoice () {
      console.log(345)
      if (document.getElementsByClassName('float-window-box')[0]) {
        document.getElementsByClassName('float-window-box')[0].remove()
      }
    },
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    },
    attendActivity: function (e, type) {
      console.log(3456765456)
      e.stopPropagation()
      MessageBox.confirm('确定参与该课程?').then(action => {
        Toast({
          message: '参与成功',
          position: 'middle',
          duration: 1500
        })
      }).catch(function () {
        Toast({
          message: '已取消参与',
          position: 'middle',
          duration: 1500
        })
      })
    }
  }
}
</script>
<style>
#userLocal {
  height: 100%;
  width: 100%
}
</style>
