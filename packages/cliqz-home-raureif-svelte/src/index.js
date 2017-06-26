/* global document */
import cliqz from './cliqz-service';
import Home from './svelte-components/home.html';
import Benchmark from 'cliqz-home-benchmark';

window.benchmark = new Benchmark('svelte');
Promise.all([
    new Promise((resolve) => { window.urlbarReady = () => { benchmark.markOnce('url bar'); resolve(); } }),
    new Promise((resolve) => { window.speeddialsReady = () => { benchmark.markOnce('speed dials'); resolve(); } }),
    new Promise((resolve) => { window.newsReady = () => { benchmark.markOnce('news'); resolve(); } }),
]).then((...args) => {
    window.benchmark.saveAndReload();
});

const home = new Home({
  target: document.querySelector('#app'),
  data: {
    locale: '',
    speedDials: {
      history: [],
      custom: [],
    },
    news: {},
  },
});

async function start() {
  const config = await cliqz.freshtab.getConfig();
  home.set({
    locale: config.locale,
  });

  const speedDials = await cliqz.freshtab.getSpeedDials();
  home.set({
    speedDials: {
      history: speedDials.history.slice(0, 5),
      custom: speedDials.custom,
    }
  });

  const news = await cliqz.freshtab.getNews();
  home.set({
    news,
  });
}

start();
