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
