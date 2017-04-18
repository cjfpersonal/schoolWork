<template>
<div>
  <mt-search style="height: auto"
    v-model="data.shopName"
    cancel-text="取消"
    placeholder="搜索">
  </mt-search>
  <div class="trade-shop-search-box clearfix">
    <div class="trade-shop-search-button fl" @click="showChoice($event, 0)">
      <span>{{data.shopType}}</span>
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
        v-model="data.shopType"
        :options="['全部', '衣服', '商品', '医药', '水果', '零食', '电器', '家具', '书籍', '瓷器', '其他']">
      </mt-radio>
    </div>
  </div>
  <div class="type-choice-box" :class="{active: getChoice[1]}">
    <div class="clearfix" style="padding: 10px">
      <mt-radio class="type-choice-radio"
        v-model="data.priceStart"
        :options="['全部', '0', '200', '400', '600', '800', '1000']">
      </mt-radio>
    </div>
  </div>
  <div class='manage-trade-shop-box clearfix'>
    <el-row v-for="(item, index) in items" :key="index" v-if="items.length>0"
      class="manage-trade-content-box">
      <el-col :xs="4" style="line-height: 60px; text-align: center">
        <el-checkbox class="radio" v-model="choiceShop[index]"></el-checkbox>
      </el-col>
      <el-col :xs="8">
        <img :src="item.shopPicture" class="manage-trade-picture" />
      </el-col>
      <el-col :xs="12">
        <div class="manage-trade-description-box" style="position:relative">
          <p class="hide-more-font manage-trade-description-name">{{item.shopName + '' + index%2}}</p>
          <p class="hide-more-font" style="font-size: 12px">{{item.shopType}}</p>
          <p class="hide-more-font" style="font-size: 12px">{{item.shopDescription}}</p>
          <p class="hide-more-font manage-trade-description-price">￥{{item.shopPrice}}</p>
          <p class="detail-btn" @click="gotoRouter($event, 'manage/' + item._id)">详情</p>
        </div>
      </el-col>
    </el-row>
    <div v-if='items.length == 0' class="empty-box">
      <p class="empty-logo">(ㆆᴗㆆ)</p>
      <p class="empty-description">没有搜索到您需要的商品，请尝试更换条件</p>
    </div>
  </div>
  <el-row v-if='items.length>0&&!getChoice[0]&&!getChoice[1]' style="position: fixed; width: 100%; bottom: 0px;z-index: 100">
    <el-col :xs="8">
       <el-button style="width: 100%; border-radius: 0" @click="downLoad">下架</el-button>
    </el-col>
    <el-col :xs="8">
       <el-button type="danger"  style="width: 100%; border-radius: 0">删除</el-button>
    </el-col>
    <el-col :xs="8">
       <el-button type="primary"  style="width: 100%; border-radius: 0" @click="showChart">上架</el-button>
    </el-col>
  </el-row>
</div>
</template>

<script>

export default {
  name: 'heaPage',
  data () {
    return {
      radio: false,
      getChoice: [false, false],
      choiceShop: [],
      data: {
        shopName: '',
        shopType: '全部',
        priceStart: '全部'
      },
      items: []
    }
  },
  watch: {
    'data.shopName' (newVal, oldVal) {
      this.init()
    },
    'data.shopType' (newVal, oldVal) {
      this.init()
    },
    'data.priceStart' (newVal, oldVal) {
      this.init()
    }
  },
  created () {
    let _self = this
    _self.init()
  },
  methods: {
    init () {
      let oBj = this.data
      let _self = this
      _self.getChoice = [false, false]
      _self.getHttp('/login/search/user?shopName=' + oBj.shopName +
       '&shopType=' + oBj.shopType + '&priceStart=' + oBj.priceStart).then(function (data) {
         _self.items = data
         data.forEach(function (item, index) {
           _self.choiceShop[index] = false
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
    gotoRouter (e, value) {
      e.stopPropagation()
      this.$router.push(value)
    },
    downLoad () {
      console.log(this.choiceShop)
    }
  }
}
</script>
<style>
.mint-searchbar-core {
  width: 100%
}
.trade-shop-search-box {
  margin: 8px 10px;
}
.trade-shop-search-button {
  display: inline-block;
  padding: 10px 20px;
  background: white;
  border: 1px solid #a7a7a7;
  font-size: 12px;
}
.type-choice-box {
  position: absolute;
  background: white;
  width: 100%;
  height: 0;
  transition: all .4s;
  overflow: hidden
}
.type-choice-box.active {
  height: 100%;
  transition: all .4s
}
.icon-init {
  transition: all .4s
}
.icon-init.active {
  transform: rotateZ(90deg);
  transition: all .4s
}
.type-choice-radio a {
  width: 50%;
  float: left
}
.manage-trade-shop-box {
  padding: 15px 10px 60px 10px;
  width: 100%;
  min-height: 100%;
  background: white;
  margin-top: 15px;
}
.manage-trade-content-box {
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  width: 100%;
  display: inline-block
}
.manage-trade-picture {
  height: 60px;
  width: 60px;
  display: inline-block
}
.manage-trade-description-price {
  color: red;
  position: relative;
  bottom: 0px;
  font-size: 14px
}
.detail-btn {
  position: absolute;
  bottom: 0px;
  right: 15px;
  color: #20a0ff
}
.empty-box {
  display: block;
  margin-top: 25px; 
}
.empty-logo {
  font-size: 26px;
  text-align: center;
  color: black
}
.empty-description {
  font-size: 12px;
  text-align: center;
  color: rgba(0, 0, 0, .4)
}
</style>
