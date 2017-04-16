import Vue from 'vue'

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
/**
 * @description 点击增加覆盖物
 */
Vue.prototype.ComplexCustomOverlay = function (point, text) {
  this._point = point
  this._text = text
}
Vue.prototype.ComplexCustomOverlay.prototype = new window.BMap.Overlay()
Vue.prototype.ComplexCustomOverlay.prototype.initialize = function (map) {
  this._map = map
  if (document.getElementsByClassName('float-window-box')[0]) {
    document.getElementsByClassName('float-window-box')[0].classList.remove('active')
    setTimeout(function () {
      document.getElementsByClassName('float-window-box')[0].remove()
    }, 500)
  }
  let div = this._div = document.createElement('div')
  div.classList.add('float-window-box')
  let content = '<div class="float-window-content-box">' +
  '<button class="more-list" id="more">更多</button><button class="detail-btn">详情</button>' +
  '<span>' + this._text.name + '</span>' +
  '</div>'
  setTimeout(function () {
    document.getElementById('more').addEventListener('touchstart', function (e) {
      e.stopPropagation()
    })
  })
  div.style.zIndex = window.BMap.Overlay.getZIndex(this._point.lat)
  div.innerHTML = content
  map.getPanes().labelPane.appendChild(div)
  return div
}
Vue.prototype.ComplexCustomOverlay.prototype.draw = function () {
  this._div.style.position = 'fixed'
  this._div.style.left = 0
  let _self = this
  if (document.getElementsByClassName('float-window-box')[0]) {
    setTimeout(function () {
      _self._div.classList.add('active')
    }, 500)
  } else {
    _self._div.classList.add('active')
  }
}
/**
 * @description 初始化market
 */
Vue.prototype.InitMarket = function (point, myIcon) {
  this._point = point
  this._icon = myIcon
}
Vue.prototype.InitMarket.prototype = new window.BMap.Overlay()
Vue.prototype.InitMarket.prototype.initialize = function (map) {
  this._map = map
  let div = this._div = document.createElement('div')
  div.classList.add('market-img-box')
  div.innerHTML = '<img class="market-img" src="' + this._icon + '" />'
  map.getPanes().labelPane.appendChild(div)
  return div
}
Vue.prototype.InitMarket.prototype.draw = function () {
  let map = this._map
  let point = this._point
  var bounds = map.getBounds()
  var sw = bounds.getSouthWest()
  var ne = bounds.getNorthEast()
  console.log(sw, ne)
  console.log(point.lng, point.lat)
  map.pointToOverlayPixel(new window.BMap.Point(point.lng, point.lat))
}
