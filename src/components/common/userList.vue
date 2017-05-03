<template>
<div class="a100">
  <el-row class="show-list-box" style="margin-bottom: 5px;" v-for="data in datas"
  @click.native="startChart($event, data.id, data.name)">
    <el-col :xs="8" class="show-list-img-box">
        <img src="../../assets/src/szu_logo.jpg" class="show-list-img" />
    </el-col>
    <el-col :xs="14" class="show-list-font-box">
    <div class="show-list-font">
        <p>
        <span class="show-list-name">{{data.name?data.name:'姓名'}}</span>
        <i class="ident-small logo-style1 logo-change" v-if="data.is_certified"></i>
        </p>
        <p style="margin-top: 10px">
        <span style="padding-right: 10px">{{data.gender?(data.gender===1? '男': '女'):'性别'}}</span>
        <span>{{data.grade?data.grade:'年级'}}</span>
        </p>
        <p>{{data.college?data.college:'学校'}}</p>
    </div>
    </el-col>
  </el-row>
</div>
</template>
<script scoped>
import { MessageBox } from 'mint-ui'
export default {
  name: 'user_list',
  data () {
    return {
      datas: []
    }
  },
  created () {
    let type = this.$route.params.type
    if (type === 'activity') {
      this.getActivityList()
    } else {
      console.log(4567)
    }
  },
  methods: {
    getActivityList () {
      let _self = this
      _self.getHttp('/api/active/getApplyActiveUsers/' + _self.$route.params.id).then(function (data) {
        _self.datas = data.users
      })
    },
    startChart (e, id, name) {
      e.stopPropagation()
      let _self = this
      MessageBox.confirm('是否发起对' + name + '聊天？').then(({ value, action }) => {
        _self.$parent.$refs.toastChart.click()
        // console.log(_self.$parent.$children.length)
        // console.log(_self.$parent.$children[_self.$parent.$children.length - 2].$refs)
        console.log(45678)
        console.log(_self.$parent.$children[_self.$parent.$children.length - 2].$refs.showChartDetail2[0])
        _self.$parent.$children[_self.$parent.$children.length - 2].$refs.showChartDetail2[0].showDetail()
        console.log(456787654)
      }).catch(function () {
      })
    }
  }
}
</script>
