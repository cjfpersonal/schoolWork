import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import MintUI from 'mint-ui'

import './assets/base.css'
import './assets/common.css'
import './assets/logo.css'
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-default/index.css'

import './assets/js/common'
import './assets/js/server'

// 0. 如果使用模块化机制编程， 要调用 Vue.use(VueRouter)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(MintUI)
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
// import home from './components/home'
import homeList from './components/home/home'
import homeUser from './components/home/user'

import userInfo from './components/userInfo/index'
import userDetail from './components/common/userInfo'
import userChoice from './components/userInfo/choiceLogin'
import userLogin from './components/userInfo/login'
import userRegister from './components/userInfo/register'

import noticeHome from './components/notice/home'
import noticeIndex from './components/notice/index'
import noticeCreate from './components/notice/create'
import noticeDetail from './components/notice/detail'

import courseHome from './components/course/home'
import courseIndex from './components/course/index'
import courseCreate from './components/course/create'
import courseDetail from './components/course/detail'
import courseUpload from './components/course/upload'
import successCourse from './components/course/addSuccess'

import collegeHome from './components/college/home'
import collegeIndex from './components/college/index'
import collegeCreate from './components/college/create'
import collegeDetail from './components/college/detail'

import activityHome from './components/activity/home'
import activityIndex from './components/activity/index'
import activityCreate from './components/activity/create'
import activityDetail from './components/activity/detail'
import activityoneDetail from './components/activity/oneDetail'
import activityDecideAttend from './components/activity/decideAttend'
import successActivity from './components/activity/addSuccess'

import tradeIndex from './components/app_second_trade/index'
import tradeHead from './components/app_second_trade/head'
import tradeCreate from './components/app_second_trade/create'
import tradeManage from './components/app_second_trade/manage'
import tradeDetail from './components/app_second_trade/detail'
import tradeCar from './components/app_second_trade/shopping-car'

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/', redirect: '/beforeLogin' },
  { path: '/home',
    component: homeList,
    children: [
      { path: '', redirect: 'activity' },
      { path: 'activity', component: activityIndex },
      { path: 'user', component: homeUser },
      { path: 'course', component: courseIndex },
      { path: 'notice', component: noticeIndex },
      { path: 'trade', component: tradeIndex }
    ]
  },
  { path: '/user/detail/:id', component: userDetail },
  { path: '/userInfo', component: userInfo },
  { path: '/login', component: userLogin },
  { path: '/beforeLogin', component: userChoice },
  { path: '/register', component: userRegister },
  { path: '/notice',
    component: noticeHome,
    children: [
      { path: '', redirect: 'index' },
      { path: 'index', component: noticeIndex },
      { path: 'create/:type', component: noticeCreate },
      { path: 'detail/:type/:id', component: noticeDetail }
    ]
  },
  { path: '/course',
    component: courseHome,
    children: [
      { path: '', redirect: 'index' },
      { path: 'index', component: courseIndex },
      { path: 'create', component: courseCreate },
      { path: 'detail/:id', component: courseDetail },
      { path: 'addsuccess/:id', component: successCourse },
      { path: 'upload/:id', component: courseUpload }
    ]
  },
  { path: '/college',
    component: collegeHome,
    children: [
      { path: '', redirect: 'index' },
      { path: 'index', component: collegeIndex },
      { path: 'create', component: collegeCreate },
      { path: 'detail/:id', component: collegeDetail }
    ]
  },
  { path: '/tradeIndex', component: tradeIndex },
  { path: '/activity',
    component: activityHome,
    children: [
      { path: '', redirect: 'index' },
      { path: 'index', component: activityIndex },
      { path: 'detail', component: activityDetail },
      { path: 'create', component: activityCreate },
      { path: 'detail/:id', component: activityoneDetail },
      { path: 'decide/:id', component: activityDecideAttend },
      { path: 'addsuccess/:id', component: successActivity }
    ]
  },
  { path: '/shopping',
    component: tradeHead,
    children: [
      { path: '', redirect: 'index' },
      { path: 'index', component: tradeIndex },
      { path: 'create', component: tradeCreate },
      { path: 'manage', component: tradeManage },
      { path: 'manage/:id', component: tradeDetail },
      { path: 'shoppingCar', component: tradeCar }
    ]
  }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes: routes // （缩写）相当于 routes: routes
})

// 4.路由拦截器，对http协议的状态拦截
router.beforeEach((to, from, next) => {
  next()
})
// 5. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: {
    'App': App
  }
}).$mount('#app')

