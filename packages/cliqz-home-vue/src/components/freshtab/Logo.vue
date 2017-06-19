<template>
  <span v-bind:style="logo.style" class="logo">
    {{ logo.text }}
  </span>
</template>

<script>
export default {
  name: 'logo',
  props: ['logo'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.logo {
  display:flex;
  align-items: center;
  justify-content:center;

  height: 50px;
  width: 50px;

  padding: 0.3em;
  font-weight: bold;
  font-size: 150%;
  color: #ffffff;

  overflow: hidden;
  background-origin: content-box;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  box-sizing: border-box;

  font-family: Helvetica, sans;
}
</style>
