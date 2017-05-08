import Vue from 'vue'
import VueResource from 'vue-resource'
import { Toast } from 'mint-ui'

Vue.use(VueResource)

/**
 * @description get请求数据
 */
Vue.prototype.getHttp = function (url, type) {
  let _self = this
  return new Promise(function (resolve) {
    // let url = 'http://cjfpersonal.com' + path
    _self.$http.get(url).then(function (response) {
      return response.json()
    }).then(function (data) {
      if (type === 'toast' && data.errcode === 0) {
        Toast({
          duration: 1000,
          message: data.errmsg
        })
        resolve(data)
      }
      if (data.errcode === 0) {
        resolve(data.data)
      } else {
        Toast({
          duration: 1000,
          message: data.errmsg,
          iconClass: 'el-icon-circle-cross'
        })
        return false
      }
    }).catch(function (data) {
      if (data.status === 401) {
        this.$router.push('/')
        return false
      }
      Toast({
        duration: 1000,
        message: '服务爆炸',
        iconClass: 'el-icon-circle-cross'
      })
      return false
    })
  })
}
/**
 * @description post请求
 */
Vue.prototype.postHttp = function (url, data, type) {
  let _self = this
  return new Promise(function (resolve) {
    // let url = 'http://cjfpersonal.com' + path
    _self.$http.post(url, data).then(function (response) {
      return response.json()
    }).then(function (data) {
      if (type === 'toast' && data.errcode === 0) {
        Toast({
          duration: 1000,
          message: data.errmsg
        })
        resolve(data)
      } else if (data.errcode === 0) {
        resolve(data)
      } else {
        Toast({
          duration: 1000,
          message: data.errmsg,
          iconClass: 'el-icon-circle-cross'
        })
        return false
      }
    }).catch(function (data) {
      if (data.status === 422) {
        let description = ''
        if (data.body.length > 0) return
        for (let key in data.body) {
          description = data.body[key][0]
          break
        }
        Toast({
          duration: 1000,
          message: description,
          iconClass: 'el-icon-circle-cross'
        })
      } else if (data.status === 401) {
        this.$router.push('/')
        return false
      } else {
        Toast({
          duration: 1000,
          message: '服务爆炸',
          iconClass: 'el-icon-circle-cross'
        })
      }
      return false
    })
  })
}
/**
 * @description 拦截器
 */
Vue.http.interceptors.push((request, next) => {
  if (request.url === '/api/message/store' || request.url === '/api/message/user/list') {
    next((response) => {
      return response
    })
  } else {
    setTimeout(function () {
      let loadding = document.getElementById('loadding')
      loadding.style.display = 'block'
      next((response) => {
        loadding.style.display = 'none'
        return response
      })
    })
  }
})
/**
 * @description cookie封装
 */
Vue.prototype.getCookie = function (key) {
  let cookie = document.cookie.split(';')
  for (let n = 0; n < cookie.length; n++) {
    if (cookie[n].split('=') && cookie[n].split('=')[0] === key) {
      return cookie[n].split('=')[1]
    }
  }
  return false
}
