const templates = require('../templates/compiled');
const cliqz = require('./cliqz-service');
const config = require('./config');
const Benchmark = require('cliqz-home-benchmark');

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

window.benchmark = new Benchmark('nativejs');

class DynamicComponent {
    constructor(targetId, template) {
        this._template = template;
        this._targetEl = $(`#${targetId}`);
        this._name = this.constructor.name;
    }

    start() {
        return this.getData()
            .then(this.render.bind(this));
    }

    getData() {
        return Promise.resolve({});
    }

    render(data) {
        return new Promise((resolve) => {
            this._targetEl.innerHTML = this._template(data);
            benchmark.mark(`${this._name}`);
            resolve();
        });
    }
}


class SpeedDials extends DynamicComponent {
    constructor() {
        super('top', templates.speeddials);
        this._name = 'speed dials';
    }

    getData() {
        return Promise.all([cliqz.freshtab.getSpeedDials(), config])
            .then(([speedDials, config]) => {
                speedDials.i18n = config.i18n;
                return speedDials;
            });
    }
}

class UrlBar extends DynamicComponent {
    constructor() {
        super('middle', templates.urlbar);
        this._SPECIAL_KEYS = [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 91, 224];
        this._targetEl.addEventListener('keydown', this._queryCliqz.bind(this));
        this._name = 'url bar';
    }

    _element() {
        return $('.url-bar', this._targetEl);
    }

    _queryCliqz(ev) {
        if (!ev.target.classList.contains('url-bar')) {
            return;
        }
        let input = this._SPECIAL_KEYS.indexOf(ev.which) > -1 ? '' : ev.key;

        if (ev.keyCode === 13) {
            input = this._element.value;
        }

        cliqz.core.queryCliqz(input);

        cliqz.core.sendTelemetry({
            type: 'home',
            action: 'search_keystroke'
        });

        setTimeout(() => {
            this._element.value = '';
        }, 0);
    }

    getData() {
        return config;
    }
}

class News extends DynamicComponent {
    constructor() {
        super('bottom', templates.news);
        this._name = 'news';
        this._currentPage = 0;
        this._animationTimeout = null;
        this._switchPageTimeout = null;
        this._targetEl.addEventListener('click', this._onButtonClick.bind(this));
        this._startPageSwitch();
    }

    _onButtonClick(e) {
        const el = e.target;
        if (!el.classList.contains('button') || el.classList.contains('active')) {
            return;
        }
        this._currentPage = +el.dataset.index;
        this._updatePage();
        this._startPageSwitch();
    }

    _startPageSwitch() {
        clearInterval(this._switchPageTimeout);
        this._switchPageTimeout = setInterval(this._nextPage.bind(this), 5e3);
    }

    _nextPage() {
        this._currentPage++;
        this._updatePage();
    }

    _updatePage() {
        const articles = Array.from(this._targetEl.querySelectorAll('.article'));
        const n = articles.length;
        if (n <= 3) {
            return;
        }
        if (this._currentPage * 3 >= n) {
            this._currentPage = 0;
        }
        articles.forEach((el) => el.classList.add('opaque'));
        clearTimeout(this._animationTimeout);
        
        this._animationTimeout = setTimeout(() => {
            const start = this._currentPage * 3;
            const end = this._currentPage * 3 + 3;
            articles.forEach((el, i) => {
                if (i >= start && i < end) {
                    el.style.display = 'block';
                    el.classList.remove('opaque');
                } else {
                    el.style.display = 'none';
                }
            });
            $$('a.button', this._targetEl).forEach((e, i) => {
                e.classList[i === this._currentPage ? 'add' : 'remove']('active');
            });
        }, 300);
    }

    getData() {
        return cliqz.freshtab.getNews()
            .then((data) => {
                const pages = Math.ceil(data.news.length / 3);
                data.pages = [...Array(pages)].map((_, i) => { 
                    return { active: i === 0 }
                });
                return data;
            });
    }
}

class App {
    constructor() {
        this._urlBar = new UrlBar();
        this._speedDials = new SpeedDials();
        this._news = new News();
    }

    start() {
        Promise.all([
            this._speedDials.start(),
            this._news.start(),
            this._urlBar.start()            
        ]).then(benchmark.saveAndReload.bind(benchmark));
    }
}

const app = new App;
app.start();