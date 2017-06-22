/* global document */
import cliqz from './cliqz-service';
import Home from './svelte-components/home.html';

const home = new Home({
  target: document.querySelector('#app'),
  data: {
    locale: 'en',
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
