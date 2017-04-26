import Vue from 'vue'
import 'element-ui/lib/theme-default/index.css'

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
Vue.prototype.ComplexCustomOverlay = function (point, content) {
  this._point = point
  this._content = content
}
Vue.prototype.ComplexCustomOverlay.prototype = new window.BMap.Overlay()
Vue.prototype.ComplexCustomOverlay.prototype.initialize = function (map) {
  this._map = map
  let div = document.createElement('div')
  div.classList.add('float-content-box')
  let data = this._content
  let content = '<div class="el-row">' +
          '<div class="el-col el-col-24 el-col-xs-10" style="text-align: center;">' +
            '<img src="' + data.poster + '" style="min-height:90px;width: 90%" />' +
          '</div>' +
          '<div class="el-col el-col-24 el-col-xs-14" style="height: 90px;line-height: 22px">' +
              '<div class="content-right-box">' +
                '<p class="activity-main-title">' + data.name + '</p>' +
                '<p>' +
                  '<i class="time-logo activity-style1"></i>' +
                  '<span>时间:</span><span>' + data.time + '</span></p>' +
                '<p>' +
                  '<i class="local-logo activity-style2"></i>' +
                  '<span>地址:</span><span>' + data.address + '</span></p>' +
                '<p>' +
                  '<i class="money-logo activity-style3"></i>' +
                  '<span>费用:</span><span>' + data.money + '</span></p>' +
              '</div>' +
          '</div></div>'
  div.innerHTML = content
  map.getPanes().labelPane.appendChild(div)
  return div
}
Vue.prototype.ComplexCustomOverlay.prototype.draw = function () {
}

/**
 * @description 初始化market
 */
Vue.prototype.InitMarket = function (point, myIcon, index) {
  this._point = point
  this._icon = myIcon
}
Vue.prototype.InitMarket.prototype = new window.BMap.Overlay()
Vue.prototype.InitMarket.prototype.initialize = function (map) {
  this._map = map
  let div = this._div = document.createElement('div')
  div.classList.add('market-img-box')
  div.innerHTML = '<img class="market-img" src="' + this._icon + '" /><span class="triangle"></span>'
  map.getPanes().labelPane.appendChild(div)
  return div
}
Vue.prototype.InitMarket.prototype.draw = function () {
  let map = this._map
  let pixel = map.pointToOverlayPixel(this._point)
  if (this._div.classList.contains('active') === false) {
    this._div.style.left = pixel.x - 26 + 'px'
    this._div.style.top = pixel.y - 60 + 'px'
  } else {
    this._div.style.left = pixel.x - 31 + 'px'
    this._div.style.top = pixel.y - 72 + 'px'
  }
}
