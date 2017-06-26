<template>
  <input class="url-bar" v-model="value" ref='search' v-on:keydown="queryCliqz" placeholder="Search or enter address" :locale="locale"></input>
</template>

<script>
export default {
  name: 'url-bar',
  props: ['core', 'locale'],
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.SPECIAL_KEYS = [8, 9, 13, 16, 17, 18, 19, 20, 27,
      33, 34, 35, 36, 37, 38, 39, 40, 91, 118, 224]
    this.queryCliqz.bind(this)
  },
  mounted () {
    this.$el.focus()
  },
  updated () {
    window.urlbarReady()
  },
  methods: {
    queryCliqz (ev) {
      let input = this.SPECIAL_KEYS.indexOf(ev.which) > -1 ? '' : ev.key

      if (ev.keyCode === 13) {
        input = this.value
      }

      this.core.queryCliqz(input)

      this.core.sendTelemetry({
        type: 'home',
        action: 'search_keystroke'
      })

      setTimeout(() => {
        this.value = ''
      }, 0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './src/assets/styles/variables.scss';
.url-bar {
  box-sizing: border-box;
  display: block;
  width: $content-width;
  margin: 0 auto;
  border: 1px solid #DBDBDB;
  font-size: 16px;
  height: 35px;
}
</style>
