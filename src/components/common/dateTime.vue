<template>
<div style="position: absolute; overflow: hidden; width: 100%">
    <mt-datetime-picker
    ref="picker"
    :startDate="new Date(1980)"
    :type="dateType"
    @confirm="confirm"
    v-model="pickerValue">
  </mt-datetime-picker>
</div>
</template>

<script>
export default {
  name: 'home',
  props: ['startTime', 'openTime', 'dateType'],
  data () {
    return {
      pickerValue: ''
    }
  },
  watch: {
    'openTime' (newVal, oldVal) {
      if (newVal === true) {
        this.openPicker()
        this.pickerValue = this.formatTime(this.startTime)
        this.$emit('time', this.pickerValue)
      }
    },
    'pickerValue' (newVal, oldVal) {
      this.pickerValue = this.formatTime(this.pickerValue)
    }
  },
  created: function () {
    this.pickerValue = this.formatTime(this.pickerValue)
    this.dateType = this.dateType ? this.dateType : ('datetime')
  },
  methods: {
    openPicker () {
      this.$refs.picker.open()
    },
    confirm () {
      this.$emit('time', this.pickerValue)
    },
    formatTime (value) {
      if (!value) {
        value = new Date()
      }
      let date = new Date(value)
      let Y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      let H = date.getHours()
      let i = date.getMinutes()
      let s = date.getSeconds()
      if (m < 10) {
        m = '0' + m
      } if (d < 10) {
        d = '0' + d
      } if (H < 10) {
        H = '0' + H
      } if (i < 10) {
        i = '0' + i
      } if (s < 10) {
        s = '0' + s
      }
      let t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s
      if (this.dateType === 'date') {
        t = Y + '-' + m + '-' + d
      }
      return t
    }
  }
}
</script>
