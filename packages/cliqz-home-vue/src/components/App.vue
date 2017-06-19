<template>
  <div id="app">
    <home :freshtab="freshtab" :core="core"></home>
  </div>
</template>

<script>
import Spanan from 'spanan'
import Home from './freshtab/Home.vue'
export default {
  name: 'app',
  components: { Home },
  data () {
    return {
      freshtab: {},
      core: {}
    }
  },
  created () {
    this.handleMessage = this.handleMessage.bind(this)
    this.freshtabSpanan = this.createSpananForModule('freshtab')
    this.coreSpanan = this.createSpananForModule('core')
    window.addEventListener('message', this.handleMessage)
    this.freshtab = this.freshtabSpanan.createProxy()
    this.core = this.coreSpanan.createProxy()
  },
  destroyed () {
    window.removeEventListener('message', this.handleMessage)
  },
  methods: {
    handleMessage (event) {
      const message = JSON.parse(event.data)

      if (message.type !== 'response') {
        return
      }

      this.freshtabSpanan.dispatch({
        uuid: message.requestId,
        returnedValue: message.response
      })

      this.coreSpanan.dispatch({
        uuid: message.requestId,
        returnedValue: message.response
      })
    },
    createSpananForModule (moduleName) {
      return new Spanan(({ uuid, functionName, args }) => {
        const message = JSON.stringify({
          target: 'cliqz',
          module: moduleName,
          action: functionName,
          requestId: uuid,
          args
        })
        window.postMessage(message, '*')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
