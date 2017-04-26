import Vue from 'vue'
import VueResource from 'vue-resource'
import { Toast } from 'mint-ui'

Vue.use(VueResource)

/**
 * @description get请求数据
 */
Vue.prototype.getHttp = function (url) {
  let _self = this
  return new Promise(function (resolve) {
    // let url = 'http://cjfpersonal.com' + path
    _self.$http.get(url).then(function (response) {
      return response.json()
    }).then(function (data) {
      if (data.errcode === 0) {
        resolve(data.data)
      } else {
        Toast({
          message: data.errmsg,
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
/**
 * @description post请求
 */
Vue.prototype.postHttp = function (url, data) {
  let _self = this
  return new Promise(function (resolve) {
    // let url = 'http://cjfpersonal.com' + path
    _self.$http.post(url, data).then(function (response) {
      return response.json()
    }).then(function (data) {
      if (data.errmsg === 0) {
        resolve(data)
      } else {
        Toast({
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
          message: description,
          iconClass: 'el-icon-circle-cross'
        })
      } else {
        Toast({
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
  next((response) => {
    return response
  })
})
