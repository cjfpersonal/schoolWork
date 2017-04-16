<template>
<div style="margin-bottom: 70px; width: 100%; overflow: hidden">
  <choice-popup :decideShow="decideShow" :dataChoice="typeChoice" v-on:get="getChoce"></choice-popup>
    <mt-field label="商品名称" v-model="data.shopName" placeholder="请输入商品名称" class="activity-create-input"></mt-field>
    <mt-field label="商品数量" v-model="data.shopNumber" type="num" placeholder="请输入商品数量" class="activity-create-input"></mt-field>
    <mt-field label="商品价格" v-model="data.shopPrice" type="num" placeholder="请输入商品价格" class="activity-create-input"></mt-field>
    <mt-field label="商品类型" v-model="data.shopType" type="num" 
    disabled
    @click.native="decideShowAction"
    placeholder="选择商品类型" class="activity-create-input">
    </mt-field>
    <!--<mt-cell title="商品类型" is-link @click="decideShowAction">
      <span >点击进行筛选</span>
    </mt-cell>-->
    <mt-field label="商品描述" placeholder="商品描述" v-model="data.shopDescription" type="textarea" rows="4"></mt-field>
    <mt-radio
    title="是否匿名出售"
    v-model="data.authChoice"
    :options="['是', '否']">
    </mt-radio>
    <div class="pictureOperation">
        <div class="m25 clearfix">
        <label class="activity-create-label">活动图片</label>
        <div style="position: relative">
            <img v-if="data.shopPicture" :src="data.shopPicture" class="avatar">
            <i v-else class="el-icon-upload avatar-uploader"></i>
            <input type="file" class="uploadInput" v-on:change="fileUpload">
        </div>
        <p class='activity-create-input remain-font'>注意:图片不超过5m</p>
        </div>
    </div>
    <mt-button type="primary" class="attend-activity" @click="attendActivity($event)">上传商品</mt-button>
</div>
</template>
<script>
import { MessageBox, Toast } from 'mint-ui'
import popupShow from '../common/toastChoice'

export default {
  name: 'tradeCreate',
  components: {
    'choice-popup': popupShow
  },
  data () {
    return {
      decideShow: false,
      typeChoice: [
        {
          name: '全部',
          value: '全部'
        }, {
          name: '衣服',
          value: '商品'
        }, {
          name: '医药',
          value: '医药'
        }, {
          name: '水果',
          value: '水果'
        }, {
          name: '零食',
          value: '零食'
        }, {
          name: '电器',
          value: '电器'
        }, {
          name: '家具',
          value: '家具'
        }, {
          name: '书籍',
          value: '书籍'
        }, {
          name: '瓷器',
          value: '瓷器'
        }, {
          name: '其他',
          value: '其他'}],
      data: {
        shopName: '',
        shopDescription: '',
        shopNumber: 100,
        shopPrice: 0,
        shopType: '',
        shopPicture: '',
        auth: '',
        authChoice: '是'
      }
    }
  },
  create () {
    this.init()
  },
  methods: {
    decideShowAction () {
      this.decideShow = true
    },
    getChoce (item) {
      this.decideShow = false
      this.data.shopType = item.value
    },
    init () {
      console.log(345)
    },
    fileUpload (e) {
      let _self = this
      let reader = new window.FileReader()
      let file = e.target.files[0]
      let ext = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
      if (!window.FileReader) {
        console.log('浏览器不支持这玩意')
      } else if (!window.Image) {
        console.log('浏览器暂不支持')
      }
      if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png') {
        Toast({
          message: '您上传的图片格式不正确,请重新上传',
          iconClass: 'el-icon-circle-cross',
          position: 'middle',
          duration: 1500
        })
        return
      }
      reader.readAsDataURL(file)// zhuan
      reader.onload = function (e) {
        _self.data.shopPicture = reader.result
      }
    },
    checkData () {
      for (let key in this.data) {
        if (this.data[key] === '' && key !== 'auth') {
          Toast({
            message: key + '未输入',
            iconClass: 'el-icon-circle-cross',
            position: 'middle',
            duration: 1500
          })
          return false
        }
      }
      return true
    },
    attendActivity (e) {
      e.stopPropagation()
      let _self = this
      if (!_self.checkData()) return false
      MessageBox.confirm('确定上传此商品?').then(action => {
        _self.postHttp('/login/create/create_goods/create', _self.data).then(function (value) {
          if (value.status === 0) {
            Toast({
              message: '创建成功',
              position: 'middle',
              duration: 1500
            })
            _self.$router.push('/shopping')
          }
        })
      }).catch(function () {
        Toast({
          message: '已取消上传',
          position: 'middle',
          duration: 1500
        })
      })
    }
  }
}
</script>
<style>
.pictureOperation {
    width: 100%;
    margin-top: 15px;
    background: white;
    padding: 15px 10px;
}
.attend-activity {
    position: fixed;
    bottom: 0;
    width: 100%
}
.uploadInput {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 80px;
  width: 72px;
  height: 72px;
  opacity: 0
}
</style>
