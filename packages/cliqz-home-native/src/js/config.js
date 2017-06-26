const cliqz	= require('./cliqz-service');
const locale = {
  "speedDials": {
    "history-sites": "Most visited",
    "custom-sites": "Favorites",
  },
  "urlBar": {
    "search-address": "Search or enter address"
  },
};

module.exports = cliqz.freshtab.getConfig()
	.then((config) => {
		// const lang = config.locale.substr(0, 2);
		config.i18n = locale;
		return config;
		// return new Promise((resolve, reject) => {
		// 	console.time('fetch i18n');
		// 	fetch(`/locales/${lang}/translations.json`)
		// 		.then((response) => response.text())
		// 		.then((text) => {
		// 			config.i18n = JSON.parse(text);
		// 			console.timeEnd('fetch i18n');
		// 			return config;
		// 		})
		// 		.then(resolve)
		// 		.catch(reject);
		// });
	});