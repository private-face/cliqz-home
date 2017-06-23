// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
/* App component */
import App from './components/App'
import Benchmark from 'cliqz-home-benchmark'

/* eslint-disable */
window.benchmark = new Benchmark('vue')
Promise.all([
    new Promise((resolve) => { window.urlbarReady = () => { benchmark.markOnce('url bar'); resolve() } }),
    new Promise((resolve) => { window.speeddialsReady = () => { benchmark.markOnce('speed dials'); resolve() } }),
    new Promise((resolve) => { window.newsReady = () => { benchmark.markOnce('news'); resolve() } }),
]).then((...args) => {
    window.benchmark.saveAndReload();
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
