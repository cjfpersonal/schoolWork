<template>
  <div class="a100">
    <div class="activity-detail-list-content">
      <img :src='data.shopPicture' style="min-height: 200px;width: 100%" />
      <div class="activity-one-detail-content">
          <p class="detail-main-title">{{data.shopName}}</p>
          <p class="activity-one-detail-box"><span>促销价:</span><span style="color: red">${{data.shopPrice}}</span></p>
          <p class="activity-one-detail-box"><span>商品类型:</span><span>{{data.shopType}}</span></p>
          <p class="activity-one-detail-box"><span>商家:</span><span>{{data.shopAuth}}</span></p>
          <p class="activity-one-detail-box"><span>剩余数量:</span><span>{{data.shopNumber}}</span></p>
          <div class="activity-one-detail-box">
              <p>商品详情:</p>{{data.shopDescription}}</div>
      </div>
    </div>
    <p class="create-activity" @click="addInCar($event, 'trends')">加入购物车</p>
    <!--<mt-button type="primary" class="attend-activity" @click="addInCar($event, 'trends')">加入购物车</mt-button>-->
  </div>
</template>

<script>
export default {
  name: 'activityDetail',
  props: ['choiceActivityInfo'],
  data: function () {
    return {
      data: {},
      typeInfo: ''
    }
  },
  watch: {
    'choiceActivityInfo': function (newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  },
  created: function () {
    let _self = this
    _self.getHttp('/api/good/detail/' + this.$route.params.id).then(function (data) {
      _self.data = data.good
    })
    // this.data = {
    //   shopPicture: require('../../assets/src/trends.png'),
    //   shopName: '见大世界咖啡',
    //   shopPrice: 1234,
    //   shopType: '瓷器',
    //   shopNumber: 111,
    //   shopDescription: 'dasfdsaDasfdas的萨芬的地方的撒范德萨发的的的撒发多少'
    // }
  },
  methods: {
    gotoRouter: function (e, value) {
      e.stopPropagation()
      this.$router.push(value)
    }
  }
}
</script>

<style>
#oneDetailShow {
    width: 100%;
    height: 200px;
}
.attend-activity {
    position: fixed;
    bottom: 0;
    width: 100%
}
</style>
