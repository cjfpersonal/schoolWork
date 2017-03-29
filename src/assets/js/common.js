import Vue from 'vue'
import VueResource from 'vue-resource'
import { Toast } from 'mint-ui'

Vue.use(VueResource)

Vue.filter('time', function (value) {
  let date = new Date(value)
  let Y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let H = date.getHours()
  let i = date.getMinutes()
  let s = date.getSeconds()
  if (m < 10) {
    m = '0' + m
  } if (d < 10) {
    d = '0' + d
  } if (H < 10) {
    H = '0' + H
  } if (i < 10) {
    i = '0' + i
  } if (s < 10) {
    s = '0' + s
  }
  let t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s
  return t
})

Vue.filter('date', function (value) {
  let date = new Date(value)
  let Y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  if (m < 10) {
    m = '0' + m
  } if (d < 10) {
    d = '0' + d
  }
  let t = Y + '-' + m + '-' + d
  return t
})

Vue.filter('checkLength', function (value) {
  if (value.length > 50) {
    return value.substr(0, 50) + '...'
  } else {
    return value
  }
})
Vue.filter('checkNull', function (value) {
  if (!value.trim() || value === null) {
    return '--'
  } else {
    return value
  }
})
Vue.filter('maxLength', function (value) {
  if (value.length > 100) {
    return value.substr(0, 100) + '...'
  } else {
    return value
  }
})
Vue.prototype.getHttp = function (url) {
  let _self = this
  return new Promise(function (resolve) {
    _self.$http.get(url).then(function (response) {
      return response.json()
    }).then(function (data) {
      if (data.status === 0) {
        resolve(data.data)
      } else {
        Toast({
          message: '操作失败',
          iconClass: 'el-icon-circle-cross'
        })
        return false
      }
    }).catch(function () {
      Toast({
        message: '服务爆炸',
        iconClass: 'el-icon-circle-cross'
      })
      return false
    })
  })
}
Vue.prototype.postHttp = function (url, data) {
  let _self = this
  return new Promise(function (resolve) {
    _self.$http.post(url, data).then(function (response) {
      return response.json()
    }).then(function (data) {
      if (data.status === 0) {
        resolve(data)
      } else {
        Toast({
          message: '操作失败',
          iconClass: 'el-icon-circle-cross'
        })
        return false
      }
    }).catch(function () {
      Toast({
        message: '服务爆炸',
        iconClass: 'el-icon-circle-cross'
      })
      return false
    })
  })
}
Vue.prototype.ComplexCustomOverlay = function (point, text) {
  this._point = point
  this._text = text
}
Vue.prototype.ComplexCustomOverlay.prototype = new window.BMap.Overlay()
Vue.prototype.ComplexCustomOverlay.prototype.initialize = function (map) {
  this._map = map
  if (document.getElementsByClassName('float-window-box')[0]) {
    document.getElementsByClassName('float-window-box')[0].remove()
  }
  var div = this._div = document.createElement('div')
  div.classList.add('float-window-box')
  div.style.zIndex = window.BMap.Overlay.getZIndex(this._point.lat)
  div.appendChild(document.createTextNode(this._text.name))
  map.getPanes().labelPane.appendChild(div)
  return div
}
Vue.prototype.ComplexCustomOverlay.prototype.draw = function () {
  this._div.style.left = 0 + 'px'
  this._div.style.bottom = 0 + 'px'
}
