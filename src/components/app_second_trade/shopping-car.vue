<template>
<div>
  <div class='manage-trade-shop-box clearfix' style="margin-top: 0">
    <el-row v-for="(item, index) in items" :key="index" v-if='items.length>0'
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
          <p class="hide-more-font manage-trade-description-price">
            <span>￥{{item.shopPrice}}</span>
            <span style="float: right">
              <i class="operation-btn" @click="shopNumChane('reduce', index)">-</i>
              <input v-model="shopNum[index]" :min="1" class="shop-num-input" readonly></input>
              <i class="operation-btn" @click="shopNumChane('add', index)">+</i>
            </span>
          </p>
        </div>
      </el-col>
    </el-row>
    <div v-if='items.length == 0' class="empty-box">
      <p class="empty-logo">(ㆆᴗㆆ)</p>
      <p class="empty-description">没有搜索到您需要的商品，请尝试更换条件</p>
    </div>
  </div>
  <el-row class="pay-footer">
    <el-col :xs="6" style="text-align: center">
       <el-checkbox class="all-radio" v-model="allChoice" label="全选"></el-checkbox>
    </el-col>
    <el-col :xs="10">
       <p class="pay-footer-money">
         <span>合计:</span>
         <i>￥{{totalMoney?totalMoney:'0.00'}}</i>
       </p>
       <p>￥{{totalMoney?totalMoney:'0.00'}}</p>
    </el-col>
    <el-col :xs="8" style="height:100%">
       <el-button type="danger"  style="width: 100%; border-radius: 0;height: 100%">去结算</el-button>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'heaPage',
  data () {
    return {
      allChoice: false,
      getChoice: [false, false],
      choiceShop: [],
      shopNum: [],
      totalMoney: 0,
      data: {
        shopName: '',
        shopType: '全部',
        priceStart: '全部'
      },
      items: []
    }
  },
  watch: {
    'allChoice' (newVal, oldVal) {
      let _self = this
      if (newVal === true) {
        _self.choiceShop.forEach(function (item, index) {
          _self.choiceShop[index] = true
        })
      } else if (newVal === false) {
        _self.choiceShop.forEach(function (item, index) {
          _self.choiceShop[index] = false
        })
      }
      this.getTotal()
    },
    'choiceShop' (newVal, oldVal) {
      this.getTotal()
    },
    'shopNum' (newVal, oldVal) {
      this.getTotal()
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
           _self.choiceShop[index] = true
           _self.shopNum[index] = 1
         })
         _self.getTotal()
       })
    },
    gotoRouter (e, value) {
      e.stopPropagation()
      this.$router.push(value)
    },
    downLoad () {
      console.log(this.choiceShop)
    },
    shopNumChane (type, index) {
      if (type === 'add') {
        this.$set(this.shopNum, index, this.shopNum[index] + 1)
      } else {
        if (this.shopNum[index] > 1) {
          this.$set(this.shopNum, index, this.shopNum[index] - 1)
        }
      }
    },
    getTotal () {
      let _self = this
      _self.totalMoney = 0
      _self.choiceShop.forEach(function (item, index) {
        if (item === true) {
          _self.totalMoney = _self.totalMoney + _self.shopNum[index] * _self.items[index].shopPrice
        }
      })
    }
  }
}
</script>
<style>
.pay-footer {
  position: fixed; 
  width: 100%; 
  bottom: 0px;
  z-index: 100;
  background: white;
  height: 40px;
  box-shadow: 0 0 10px #888888;
}
.all-radio {
  line-height: 40px;
  text-align: center;
  font-size: 12px
}
.pay-footer-money {
  padding-top: 2px;
  font-size: 14px;
}
.shop-num-input {
  width: 30px;
  height: 20px;
  padding: 0 2px;
  border: 1px solid #bfcbd9;
}
.operation-btn {
  border: 1px solid #bfcbd9;
  text-align: center;
  line-height: 18px;
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 4px;
  color: #bfcbd9
}
</style>
