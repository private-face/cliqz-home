// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
/* App component */
import App from './components/App'
import Benchmark from 'cliqz-home-benchmark'

/* eslint-disable */
window.benchmark = new Benchmark('vue')
Promise.all([
    new Promise((resolve) => { window.urlbarResolve = resolve }),
    new Promise((resolve) => { window.speeddialsResolve = resolve }),
    new Promise((resolve) => { window.newsResolve = resolve }),
]).then((...args) => {
    window.benchmark.saveAndReload()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
