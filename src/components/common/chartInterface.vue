<template>
<div>
    <mt-popup class="toastChoice"
        v-model="showChartChoice"
        position="bottom">
        <h1 class="chart-title">
            <span @click="goback" class="chart-back">退出</span>
            {{title}}
            </h1>
        <el-row v-for="(item, index) in data" :key="index" class="chart-list-box" @click.native="showDetail(item)">
            <el-col :xs="5">
                <img :src="item.img" class="chart-list-img" />                
            </el-col>
            <el-col :xs="19">
                <h3 class="chart-list-name">{{item.name}}</h3>
            </el-col>
        </el-row>
    </mt-popup>
    <mt-popup v-model="showChartDetail" position="right"
    class="toastChoice">
        <h1 class="chart-title">
            <span @click="hideDetail" class="chart-back">返回</span>
            {{recordTitle}}
        </h1>
        <div class="chart-detail-box" id="chartScroll">
            <el-row v-for="(content, index) in chartContent" :key="index" class="m25">
                <el-col :xs="4" style="text-align: center" v-if="content.role !== 'me'">
                    <img :src="content.img" class="chart-list-img" />                
                </el-col>
                <el-col :xs="17" v-if="content.role !== 'me'">
                    <p>{{content.auth}}</p>
                    <h3 class="chart-detail-message">{{content.message}}</h3>
                </el-col>
                <el-col :offset="3" :xs="17" v-if="content.role === 'me'">
                    <p style="text-align: right">{{content.auth}}</p>
                    <h3 class="chart-detail-message" style="background:#20a0ff; color: white">{{content.message}}</h3>
                </el-col>
                <el-col :xs="4" style="text-align: center" v-if="content.role === 'me'">
                    <img :src="content.img" class="chart-list-img" />                
                </el-col>
            </el-row>
        </div>
        <div class="chart-footer">
            <mt-field placeholder="输入信息" type="textarea" rows="4" 
            v-model="sendContent"
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
      recordTitle: '',
      showChartDetail: false,
      chartContent: [],
      sendContent: ''
    }
  },
  watch: {
  },
  created () {
    this.data = [{
      name: '深大创客群',
      img: require('../../assets/src/college.png')
    }, {
      name: '逗比战斗群',
      img: require('../../assets/src/college.png')
    }, {
      name: '技术交流群',
      img: require('../../assets/src/college.png')
    }]
    this.init()
  },
  methods: {
    init () {
      console.log(3456789)
    },
    goback () {
      this.$emit('back')
    },
    showDetail (item) {
      this.recordTitle = item.name
      this.showChartDetail = true
      this.chartContent = [{
        auth: '减肥胆大f',
        role: 'other',
        img: require('../../assets/src/college.png'),
        message: '代发几款手机了的骄傲是福利大数据量点击阿斯利康回复大家来撒会尽量快多撒谎借口了丰厚的时间安理会几点回来撒谎发垃圾快点哈就离开较好的萨酒喝多了发撒好久'
      }, {
        auth: '减肥范德萨发',
        role: 'other',
        img: require('../../assets/src/college.png'),
        message: '代发几款手机了的骄傲是福利大数据量点击阿斯利康回复大家来撒会尽量快多撒谎借口了丰厚的时间安理会几点回来撒谎发垃圾快点哈就离开较好的萨酒喝多了发撒好久'
      }, {
        auth: '减肥 大师傅',
        role: 'other',
        img: require('../../assets/src/college.png'),
        message: '代发几款手机了的骄傲是福利大数据量点击阿斯利康回复大家来撒会尽量快多撒谎借口了丰厚的时间安理会几点回来撒谎发垃圾快点哈就离开较好的萨酒喝多了发撒好久'
      }, {
        auth: '减肥答复',
        role: 'other',
        img: require('../../assets/src/college.png'),
        message: '代发几款手机了的骄傲是福利大数据量点击阿斯利康回复大家来撒会尽量快多撒谎借口了丰厚的时间安理会几点回来撒谎发垃圾快点哈就离开较好的萨酒喝多了发撒好久'
      }, {
        auth: '减肥',
        role: 'me',
        img: require('../../assets/src/college.png'),
        message: '代发几款手机了的骄傲是福利大数据量点击阿斯利康回复大家来撒会尽量快多撒谎借口了丰厚的时间安理会几点回来撒谎发垃圾快点哈就离开较好的萨酒喝多了发撒好久'
      }, {
        auth: '减肥地方；刷卡；理发店',
        role: 'other',
        img: require('../../assets/src/college.png'),
        message: '代发几款手机了的骄傲是福利大数据量点击阿斯利康回复大家来撒会尽量快多撒谎借口了丰厚的时间安理会几点回来撒谎发垃圾快点哈就离开较好的萨酒喝多了发撒好久'
      }, {
        auth: '减肥范德萨发',
        role: 'other',
        img: require('../../assets/src/college.png'),
        message: '代发几款手机了的骄傲是福利大数据量点击阿斯利康回复大家来撒会尽量快多撒谎借口了丰厚的时间安理会几点回来撒谎发垃圾快点哈就离开较好的萨酒喝多了发撒好久'
      }, {
        auth: '减肥地方撒',
        role: 'other',
        img: require('../../assets/src/college.png'),
        message: '代发几款手机了的骄傲是福利大数据量点击阿斯利康回复大家来撒会尽量快多撒谎借口了丰厚的时间安理会几点回来撒谎发垃圾快点哈就离开较好的萨酒喝多了发撒好久'
      }, {
        auth: '减肥范德萨',
        role: 'other',
        img: require('../../assets/src/college.png'),
        message: '代发几款手机了的骄傲是福利大数据量点击阿斯利康回复大家来撒会尽量快多撒谎借口了丰厚的时间安理会几点回来撒谎发垃圾快点哈就离开较好的萨酒喝多了发撒好久'
      }]
      this.gotoBottom()
    },
    hideDetail () {
      this.showChartDetail = false
    },
    sendMessage () {
      if (!this.sendContent.trim()) return false
      this.chartContent.push({
        auth: '减肥',
        role: 'me',
        img: require('../../assets/src/college.png'),
        message: this.sendContent
      })
      this.sendContent = ''
      this.gotoBottom()
    },
    gotoBottom () {
      setTimeout(function () {
        let getChart = document.getElementById('chartScroll')
        getChart.scrollTop = getChart.scrollHeight
      })
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
    position: fixed;
    box-shadow: 0 0 10px #888;
    border-bottom: 1px solid rgba(0, 0, 0, .2)
}
.chart-list-box {
    top: 50px;
    margin: 10px 2px 0 2px;
    padding: 5px 5px;
    border-bottom: 1px solid rgba(0, 0, 0, .1)
}
.chart-list-name {
    font-size: 14px;
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
