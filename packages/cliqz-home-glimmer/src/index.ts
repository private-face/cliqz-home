import App from './main';
import { ComponentManager, setPropertyDidChange } from '@glimmer/component';
import Benchmark from 'cliqz-home-benchmark';

window.benchmark = new Benchmark('glimmer');
Promise.all([
    new Promise((resolve) => { window.urlbarReady = () => { benchmark.markOnce('url bar'); resolve(); } }),
    new Promise((resolve) => { window.speeddialsReady = () => { benchmark.markOnce('speed dials'); resolve(); } }),
    new Promise((resolve) => { window.newsReady = () => { benchmark.markOnce('news'); resolve(); } }),
]).then((...args) => {
    window.benchmark.saveAndReload();
});

const app = new App();
const containerElement = document.getElementById('app');

setPropertyDidChange(() => {
  app.scheduleRerender();
});

app.registerInitializer({
  initialize(registry) {
    registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager)
  }
});

app.renderComponent('cliqz-home', containerElement, null);

app.boot();
