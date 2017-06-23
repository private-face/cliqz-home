<template>
  <div class="home">
    <nav id="nav-left"></nav>
    <section class="content">
      <section id="top">
        <speed-dials :dials="dials.history" type="history"></speed-dials>
        <speed-dials :dials="dials.custom" type="custom"></speed-dials>
      </section>

      <section id="middle">
        <url-bar :core="core" :locale="locale"></url-bar>
      </section>

      <section id="bottom">
        <news :news="news"></news>
      </section>
    </section>
    <nav id="nav-right"></nav>
  </div>
</template>

<script>
import SpeedDials from './SpeedDials.vue'
import UrlBar from './UrlBar.vue'
import News from './News.vue'
export default {
  name: 'home',
  components: { SpeedDials, UrlBar, News },
  props: ['freshtab', 'core'],
  data () {
    return {
      locale: '',
      dials: {},
      news: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.freshtab.getConfig().then(config => {
        this.locale = config.locale
      })

      this.freshtab.getSpeedDials().then(dials => {
        this.dials = {
          history: dials.history.slice(0, 5),
          custom: dials.custom
        }
      })

      this.freshtab.getNews().then(news => {
        this.news = news.news
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;

  #nav-left, #nav-right {
    width: 100px;
  }

  .content {
    width: 100%;
    flex: 1 0;
    display: flex;
    flex-direction: column;

    #top, #bottom {
      flex: 1 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    #middle {
      margin-bottom: 10px;
    }
  }
}
</style>
