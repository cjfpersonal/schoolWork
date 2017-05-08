<template>
<div>
    <mt-popup class="toastChoice"
        v-model="showChartChoice"
        position="bottom">
        <el-row class="chart-title">
            <el-col :xs="4" @click.native="goback">隐藏</el-col>
            <el-col :xs="16">{{title}}</el-col>
            <el-col :xs="4" @click.native="gotoRouter($event, '/home')">菜单</el-col>
        </el-row>
        <el-row v-for="(item, index) in data" :key="index" 
        v-if='data.length > 0'
        class="chart-list-box" @click.native="showDetail(item.send_to)">
            <el-col :xs="7">
              <el-badge :value="item.readed" class="item">
                <el-button size="small"><img :src="item.to_user.info.wx_head_img" class="chart-list-img" /></el-button>
              </el-badge>
            </el-col>
            <el-col :xs="17">
                <h3 class="chart-list-name">
                  {{item.to_user.info.name?item.to_user.info.name:(item.to_user.info.wx_nickname?item.to_user.info.wx_nickname:item.to_user.username)}}
                </h3>
            </el-col>
        </el-row>
        <div v-if='data.length === 0' class="empty-box">
              <p class="empty-logo">(ㆆᴗㆆ)</p>
              <p class="empty-description">暂无朋友聊天</p>
            </div>
    </mt-popup>
    <mt-popup v-model="showChartDetail" position="right"
    ref="checkChartId"
    class="toastChoice">
        <h1 class="chart-title">
            <span @click="hideDetail" class="chart-back">返回</span>
            聊天信息
        </h1>
        <div class="chart-detail-box" id="chartScroll"
        v-on:scroll='scrollData'>
            <el-row v-if="chartContent.messages.data.length > 0" 
              v-for="(content, index) in chartContent.messages.data" :key="index" class="m25">
                <el-col :xs="4" style="text-align: center" v-if="content.send_from!==chartContent.form_user.id">
                    <img :src="chartContent.to_user.wx_head_img" class="chart-list-img" />                
                </el-col>
                <el-col :xs="17" v-if="content.send_from!==chartContent.form_user.id">
                    <p>{{chartContent.to_user.name}}</p>
                    <h3 class="chart-detail-message">{{content.content}}</h3>
                </el-col>
                <el-col :offset="3" :xs="17" v-if="content.send_from===chartContent.form_user.id">
                    <p style="text-align: right">{{chartContent.form_user.name}}</p>
                    <h3 class="chart-detail-message" style="background:#20a0ff; color: white">{{content.content}}</h3>
                </el-col>
                <el-col :xs="4" style="text-align: center" v-if="content.send_from===chartContent.form_user.id">
                    <img :src="chartContent.form_user.wx_head_img" class="chart-list-img" />                
                </el-col>
            </el-row>
            <div v-if='chartContent.messages.data.length === 0' class="empty-box">
              <p class="empty-logo">(ㆆᴗㆆ)</p>
              <p class="empty-description">暂无聊天记录</p>
            </div>
        </div>
        <div class="chart-footer">
            <mt-field placeholder="输入信息" type="textarea" rows="4" 
            v-model="send.content"
            @keyup.enter.native="sendMessage"
            class="textarea-chart"></mt-field>
            <mt-button type="primary" class="btn-chart" @click.native="sendMessage">发送</mt-button>
        </div>
    </mt-popup>
</div>
</template>
<script>
export default {
  name: 'chart',
  props: ['showChartChoice', 'title'],
  data () {
    return {
      data: [],
      pusher: '',
      recordTitle: '',
      showChartDetail: false,
      chartContent: {
        messages: {
          data: []
        }
      },
      page: 1,
      send: {
        send_to: 0,
        content: ''
      }
    }
  },
  watch: {
    'showChartChoice' (newVal, oldVal) {
      this.listInit()
    }
  },
  created () {
    window.Pusher.logToConsole = true
    this.pusher = new window.Pusher('5a573c7b51d3fbfc6713', {
      cluster: 'ap1',
      encrypted: true
    })
    this.listInit()
    this.init()
  },
  methods: {
    listInit () {
      let _self = this
      _self.getHttp('/api/message/user/list').then(function (data) {
        _self.data = data.messages
      })
    },
    init () {
      let _self = this
      var channel = this.pusher.subscribe('message-channel')
      channel.bind('message-event-' + parseInt(_self.getCookie('user_id')), function (data) {
        _self.listInit()
        if (!_self.showChartChoice) {
          let dom = document.getElementById('chartMove')
          dom.classList.add('active')
        }
      })
    },
    goback () {
      this.$emit('back')
    },
    gotoRouter (e, path) {
      e.stopPropagation()
      this.goback()
      this.$router.push(path)
    },
    outEntry (id) {
      this.showDetail(id)
    },
    showDetail (id) {
      console.log(id)
      let _self = this
      _self.send.send_to = id
      var channel = this.pusher.subscribe('message-channel')
      channel.bind('message-event-' + parseInt(_self.getCookie('user_id')) + '-' + id, function (data) {
        _self.chartContent.messages.data.push({
          send_from: id,
          content: data.content
        })
        _self.gotoBottom()
      })
      _self.getHttp('/api/message/list/' + id).then(function (data) {
        _self.chartContent = data
        _self.chartContent.messages.data = data.messages.data.reverse()
        _self.gotoBottom()
      })
      this.showChartDetail = true
    },
    hideDetail () {
      let _self = this
      _self.showChartDetail = false
      _self.getHttp('/api/message/out/' + _self.send.send_to).then(function (data) {
        _self.listInit()
      })
    },
    sendMessage () {
      let _self = this
      if (!this.send.content.trim()) return false
      _self.postHttp('/api/message/store', _self.send).then(function (data) {
      })
      _self.chartContent.messages.data.push({
        send_from: parseInt(_self.getCookie('user_id')),
        content: _self.send.content
      })
      _self.send.content = ''
      this.gotoBottom()
    },
    gotoBottom () {
      setTimeout(function () {
        let getChart = document.getElementById('chartScroll')
        getChart.scrollTop = getChart.scrollHeight
      })
    },
    scrollData (e) {
      e.stopPropagation()
      let _self = this
      if (_self.page < _self.chartContent.messages.last_page) {
        let url = '/api/message/list/' + _self.send.send_to + '?page=' + (parseInt(this.page) + 1)
        let dom = e.target
        let old = dom.scrollHeight
        if (dom.scrollTop <= 0) {
          _self.getHttp(url).then(function (data) {
            _self.chartContent.messages.data = data.messages.data.concat(_self.chartContent.messages.data)
            _self.page = data.messages.current_page
            setTimeout(function () {
              dom.scrollTop = dom.scrollHeight - old
            })
          })
        }
      }
    }
  }
}
</script>
<style>
.chart-back {
    font-size: 16px;
    position: absolute;
    left: 10px;
}
.chart-title {
    text-align: center;
    width: 100%;
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    position: fixed !important;
    box-shadow: 0 0 10px #888;
    border-bottom: 1px solid rgba(0, 0, 0, .2)
}
.chart-list-img {
  width: 40px;
  height: 40px
}
.chart-list-box {
    top: 50px;
    margin: 10px 2px 0 2px;
    padding: 5px 5px;
    border-bottom: 1px solid rgba(0, 0, 0, .1)
}
.chart-list-name {
    font-size: 18px;
}
.chart-detail-box {
    height: calc(100% - 200px);
    overflow: scroll;
    background: #f5f5f5;
    top: 50px;
    padding: 30px;
    position: relative
}
.chart-detail-message {
    background: white;
    padding: 10px 15px;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 6px;
}
.chart-footer {
    height: 150px;
    position: fixed;
    bottom: 0;
    width: 100%;
}
.btn-chart {
    width: 50px;
    height: 100px !important;
    position: absolute !important;
    right: 15px;
    top: 25px;
}
.textarea-chart {
    width: calc(100% - 80px);
    height: 100%
}
</style>
