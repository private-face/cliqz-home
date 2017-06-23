<template>
  <div class="speed-dials">
    <speed-dial
      v-for="(dial, index) in dials"
      v-bind:dial="dial"
      v-bind:index="index"
      v-bind:key="dial.id">
    </speed-dial>
  </div>
</template>

<script>
import SpeedDial from './SpeedDial.vue'
export default {
  name: 'speed-dials',
  components: { SpeedDial },
  props: ['dials', 'type'],
  updated () {
    if (this.type === 'custom') {
      window.speeddialsReady()
    }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './src/assets/styles/variables.scss';
.speed-dials {
  margin: 0 auto;
  display: grid;
  grid-template-columns: $speed-dial-width $speed-dial-width $speed-dial-width $speed-dial-width $speed-dial-width;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
