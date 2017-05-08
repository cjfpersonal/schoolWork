<template>
<div class="a100">
  <div class="food-suggest-search clearfix">
    <div class="trade-shop-search-button fl" @click="showChoice($event, 0)">
      <span>商店类型</span>
      <i class="el-icon-arrow-right icon-init" :class="{active: getChoice[0]}"></i>
    </div>
    <div class="trade-shop-search-button fr" @click="showChoice($event, 1)">
      <span>商品价格</span>
      <i class="el-icon-arrow-right icon-init" :class="{active: getChoice[1]}"></i>
    </div>
  </div>
  <div class="type-choice-box" :class="{active: getChoice[0]}">
    <div class="clearfix" style="padding: 10px">
      <mt-radio class="type-choice-radio"
        v-model="shopType.choice"
        :options="classify">
      </mt-radio>
    </div>
  </div>
  <div class="type-choice-box" :class="{active: getChoice[1]}">
    <div class="clearfix" style="padding: 10px">
      <mt-radio class="type-choice-radio"
        v-model="order.choice"
        :options="sort_by">
      </mt-radio>
    </div>
  </div>
  <div class='activity-detail-list-content clearfix' v-on:scroll='scrollData'>
    <el-row  v-if='datas.length > 0' v-for="data,index in datas" :key="index" class="food-suggest-box"
        @click.native="gotoRouter($event, '/foodSuggest/detail/' + data.shop_id)">
      <el-col :xs="10" style="text-align: center;min-height:120px">
        <img :src="data.logo_url" style="min-height:120px;width: 90%" />
      </el-col>
      <el-col :xs="14" style="height: 120px;">
        <div class="content-right-box">
        <p class="activity-main-title m5">{{data.shop_name}}</p>
        <p class="notice-detail-content" style="margin-top: 10px">
            <span>月售:</span><span>{{data.saled_month}}</span>
            <span style="padding-left: 5px">起送:</span><span>￥{{data.takeout_price}}</span></p>
        <p class="notice-detail-content clearfix">
            <span class="fl">评分:</span>
            <el-rate
                class="fl"
                style="font-size: 12px"
                v-model="data.average_score"
                disabled
                show-text
                text-color="#ff9900"
                text-template="{value}"></el-rate></p>
        <p class="notice-detail-content">
            <span>类型:</span><span>{{data.category}}</span></p>
        <p class="notice-detail-content">
            <span>人均:</span><span>{{data.avg_price}}</span></p>
        </div>
      </el-col>
    </el-row>
    <div v-if='datas.length === 0' class="empty-box">
      <p class="empty-logo">(ㆆᴗㆆ)</p>
      <p class="empty-description">没有符合的商店，请尝试更换条件</p>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'food-suggest',
  data () {
    return {
      getChoice: [false, false],
      datas: [],
      page: 1,
      total: 10,
      classify: [],
      sort_by: [],
      shopType: {
        choice: '',
        array: []
      },
      order: {
        choice: '',
        array: []
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let _self = this
      let url = 'http://waimai.baidu.com/waimai/shoplist/364666c7feccf9a9?display=json&page=1&count=10'
      _self.$http.jsonp(url).then(function (response) {
        return response.json()
      }).then(function (data) {
        _self.datas = data.result.shop_info
        _self.total = data.result.total
        _self.classify = []
        data.result.classify.forEach(function (item, index) {
          _self.classify.push({
            label: item.name,
            value: item.id
          })
        })
        data.result.sortby.forEach(function (item, index) {
          _self.sort_by.push({
            label: item.msg,
            value: item.type
          })
        })
      })
    },
    showChoice (e, index) {
      e.stopPropagation()
      let _self = this
      _self.getChoice.forEach(function (v, n) {
        if (n !== index) {
          _self.$set(_self.getChoice, n, false)
        }
      })
      _self.$set(_self.getChoice, index, !_self.getChoice[index])
    },
    scrollData (e) {
      e.stopPropagation()
      if (this.page < this.total / 10) {
        let url = 'http://waimai.baidu.com/waimai/shoplist/364666c7feccf9a9?display=json&count=10&page=' + (parseInt(this.page) + 1)
        let dom = e.target
        let _self = this
        if (dom.offsetHeight + dom.scrollTop >= dom.scrollHeight) {
          _self.$http.jsonp(url).then(function (response) {
            return response.json()
          }).then(function (data) {
            _self.datas = _self.datas.concat(data.result.shop_info)
            _self.page = _self.page + 1
          })
        }
      }
    },
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
    }
  }
}
</script>
<style>
.food-suggest-search {
    padding: 8px 10px;
    background: white;
    border-bottom: 1px solid rgba(0,0,0,.1);
}
.food-suggest-box {
    background: white;
    padding: 15px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, .1)
}
.el-rate__icon {
    font-size: 12px;
}
</style>
