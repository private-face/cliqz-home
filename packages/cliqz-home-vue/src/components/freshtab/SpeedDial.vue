<template>
  <a class="speed-dial" v-bind:href="dial.url">
    <logo :logo="dial.logo"></logo>
    <span class="title">{{ dial.displayTitle }}</span>
  </a>
</template>

<script>
import Logo from './Logo.vue'
export default {
  name: 'speed-dial',
  components: { Logo },
  props: ['dial', 'index'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color-cliqz-black: #1A1A25;
.speed-dial {
  text-align: center;
  text-decoration: none;
  .logo {
    margin: 0 auto;
  }
  .title {
    color: $color-cliqz-black;
    display: block;
  }
}
</style>
