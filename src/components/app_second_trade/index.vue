<template>
<div>
  <!--<headl title="商品交易" backRouth="/home/user"></headl>-->
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
  <div class='all-trade-shop-box clearfix'>
    <div v-for="(item, index) in items" v-if='items.length>0'
      @click="gotoRouter($event, '/shopping/manage/' + item._id)"
      class="trade-content-box">
      <img :src="item.shopPicture" class="trade-picture" />
      <div class="trade-description-box">
        <p class="trade-description-name">{{item.shopName + '' + index%2}}</p>
        <p>{{item.shopType}}</p>
        <p class="trade-description-price">￥{{item.shopPrice}}</p>
      </div>
    </div>
    <div v-if='items.length == 0' class="empty-box">
      <p class="empty-logo">(ㆆᴗㆆ)</p>
      <p class="empty-description">没有搜索到您需要的商品，请尝试更换条件</p>
    </div>
  </div>
</div>
</template>

<script>
import headl from '../common/head'
export default {
  name: 'heaPage',
  components: {
    'headl': headl
  },
  data () {
    return {
      getChoice: [false, false],
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
    window.onresize = function () {
      _self.imgResize()
    }
  },
  methods: {
    init () {
      let oBj = this.data
      let _self = this
      _self.getChoice = [false, false]
      _self.$http.get('/login/search/user?shopName=' + oBj.shopName +
       '&shopType=' + oBj.shopType + '&priceStart=' + oBj.priceStart).then(function (response) {
         return response.json()
       }).then(function (data) {
         if (data.status === 0) {
           _self.items = data.data
           _self.imgResize()
         }
       })
    },
    imgResize () {
      if (this.items.length === 0) {
        return false
      }
      setTimeout(function () {
        let obj = document.getElementsByClassName('trade-picture')
        obj[0].style.width = '80%'
        for (let i = 0; i < obj.length; i++) {
          obj[i].style.height = parseInt(obj[0].offsetWidth) + 'px'
          obj[i].style.width = parseInt(obj[0].offsetWidth) + 'px'
        }
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
    gotoRouter (e, path) {
      e.stopPropagation()
      this.$router.push(path)
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
  overflow: hidden;
  z-index: 100  
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
.all-trade-shop-box {
  padding: 0 10px;
  width: 100%;
  min-height: 100%;
}
.trade-content-box {
  background: white;
  width: calc(50% - 7px);
  display: inline-block;
  margin-bottom: 14px;
  text-align: center;
  float: left
}
@media (max-width: 450px) {
  .trade-content-box:nth-child(2n - 1) {
    margin-right: 14px
  }
}
.trade-picture {
  width: 80%;
  margin: 10px 0;
}
@media (min-width: 450px) {
  .trade-content-box {
    background: white;
    width: 32%;
    display: inline-block;
    margin-bottom: 14px;
    text-align: center;
    float: left
  }
  .trade-content-box:nth-child(3n - 1), .trade-content-box:nth-child(3n - 2) {
    margin-right: 2%
  }
}
.trade-description-box {
  padding: 10px 0;
}
.trade-description-name {
  font-size: 17px;
  font-weight: 600;
  height: 24px;
}
.trade-description-price {
  color: rgba(0, 0, 0, .4)
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
