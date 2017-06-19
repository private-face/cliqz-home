import App from './svelte-components/index.html';

const app = new App({
  target: document.querySelector('#main'),
  data: { name: 'world', count: 0 }
});

setInterval(function () {
  app.set({ count: app.get('count') + 1 });
}, 1000);
