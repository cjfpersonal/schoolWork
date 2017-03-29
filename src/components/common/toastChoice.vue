<template>
  <div class="toastChoice">
    <mt-popup
    class="toastChoice"
    v-model="decideShow"
    position="right">
    <p v-for="item in dataChoice" @click="returnChoice($event, item)" class="poppupContent">{{item.name}}</p>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'choice-popup',
  props: ['decideShow', 'dataChoice'],
  data () {
    return {
    }
  },
  methods: {
    returnChoice (e, item) {
      e.stopPropagation()
      this.$emit('eee', item)
    }
  }
}
</script>

<style>
.toastChoice {
    width: 100%;
    height: 100%;
    z-index: 10000000
}
.poppupContent{
    font-size: 16px;
    padding: 15px 0;
    margin-left: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, .1)
}
</style>
