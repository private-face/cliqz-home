<template>
  <div class="news" v-on:mouseover="onMouseOver" v-on:mouseout="onMouseOut">
    <a v-for="(article, index) in pages" v-on:click="setPage(index)" v-bind:id="'button-'+index"
    v-bind:class="currentPage === index ? 'active' : ''" class="button"></a>
    <div class="acordion">
      <a v-for="(article, index) in news" class="article" v-bind:href="article.url">
        <div class="side-front">
          <logo :logo="article.logo"></logo>
          <span class="source-name">
            {{article.displayUrl}}
          </span>
          <p class="title">
            {{article.title}}
          </p>
        </div>
        <div class="side-back">
          <p class="abstract">
            {{article.description}}
          </p>
          <a>Read more</a>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import Logo from './Logo.vue'
export default {
  name: 'news',
  components: { Logo },
  props: ['news'],
  data () {
    return {
    }
  },
  created () {
    this.articleHeight = 0
    this.currentPage = 0
    this.autopagination = true
    this.skipNextPagination = false
  },
  updated () {
    window.newsReady()
    const acordion = this.$el.querySelector('.acordion')
    const articles = Array.from(this.$el.querySelectorAll('.article'))
    const heights = articles.map(function (el) {
      return {
        offsetHeight: el.offsetHeight,
        clientHeight: el.clientHeight
      }
    })
    const maxOffsetHeight = Math.max(...heights.map(function (el) { return el.offsetHeight }))
    const maxClientHeight = Math.max(...heights.map(function (el) { return el.clientHeight }))

    // + 10 is padding
    this.articleHeight = maxOffsetHeight + 10
    articles.forEach(function (el) {
      el.style.height = maxClientHeight + 'px'
    })
    acordion.style.height = this.articleHeight + 'px'

    this.startAutopagination()
  },
  computed: {
    pageCount () {
      return Math.ceil(this.news.length / 3)
    },
    pages () {
      return Array(this.pageCount).fill(null)
    }
  },
  methods: {
    startAutopagination () {
      this.interval = setInterval(function () {
        if (!this.$el) {
          clearInterval(this.interval)
          delete this.interval
          return
        }

        if (!this.autopagination) {
          this.skipNextPagination = true
          return
        }

        if (this.skipNextPagination) {
          this.skipNextPagination = false
          return
        }

        let nextPage = this.currentPage + 1
        if (nextPage === this.pageCount) {
          nextPage = 0
        }

        this.setPage(nextPage)
      }.bind(this), 4000)
    },
    setPage (index) {
      this.setActive(index)
      const acordion = this.$el.querySelector('.acordion')
      acordion.scrollTop = this.articleHeight * index
      this.currentPage = index
    },
    setActive (index) {
      const buttonActive = this.$el.querySelector('.button.active')
      buttonActive.classList.remove('active')
      const currentButton = this.$el.querySelector(`#button-${index}`)
      currentButton.classList.add('active')
    },
    onMouseOver () {
      this.autopagination = false
    },
    onMouseOut () {
      this.autopagination = true
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './src/assets/styles/variables.scss';
$cliqz-news-column-gap: 20px;
$cliqz-news-column-width: calc((#{$content-width} - (2 * #{$cliqz-news-column-gap})) / 3);
$cliqz-news-animation-speed: 0.2s;
$cliqz-news-logo-size: 30px;

.news {
  margin-top: 20px;
  margin: 0 auto;

  a.button {
    border: 1px solid $color-cliqz-gray;
    width: 12px;
    height: 12px;
    display: inline-block;
    border-radius: 100%;
    background-color: white;
    cursor: pointer;
    margin-bottom: 10px;
    padding: 0px;

    &.active {
      background-color: $color-cliqz-gray;
    }
  }

  .acordion {
    width: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: $cliqz-news-column-width $cliqz-news-column-width $cliqz-news-column-width;
    grid-column-gap: $cliqz-news-column-gap;
  }

  .article {
    background-color: white;
    border: 1px solid #DBDBDB;
    padding: 5px;

    color: $color-cliqz-black;
    text-decoration: none;
    position: relative;

    p {
      margin: 0px;
      clear: both;
    }

    .source-name, .logo {
      float: left;
      display: inline-block;
      height: $cliqz-news-logo-size;
      margin-left: 10px;
    }

    .logo {
      width: $cliqz-news-logo-size;
    }

    .source-name {
      line-height: $cliqz-news-logo-size;
    }

    .title {
      padding: 20px 5px 0px;
    }

    .side-front {
      position: absolute;
      top: 0;
      left: 0px;
      width: 100%;
      height: 100%;
      transition:opacity $cliqz-news-animation-speed linear;
      transition-delay: $cliqz-news-animation-speed;
      opacity: 1;
    }

    .side-back {
      font-size: 14px;
      padding-bottom: 1em;
      transition:opacity $cliqz-news-animation-speed linear;
      transition-delay: 0s;
      opacity: 0;

      a {
        position: absolute;
        bottom: 0;
        right: 0;
        height: 1em;
        line-height: 1em;
        color: $color-cliqz-blue;
        padding: 5px;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    &:hover {
      .side-front {
        opacity: 0;
        transition-delay: 0s;
      }

      .side-back {
        transition-delay: $cliqz-news-animation-speed;
        opacity: 1;
      }
    }
  }
}
</style>
