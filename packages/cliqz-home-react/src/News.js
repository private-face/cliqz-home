import React, { Component } from 'react';
import Logo from './Logo';

const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
class News extends Component {
	constructor(props) {
		super(props);
		this.state = {
			version: '',
			news: []
		}
		this.buttonClick = this.buttonClick.bind(this);
	}

	componentDidMount() {
		this.loadNews();
	}

	loadNews() {
		this.props.freshtab.getNews().then( (data) => {
			const pages = Math.ceil(data.news.length / 3);
			const pagesState = [...Array(pages)].map((_, i) => { 
        return { active: i === 0 }
      })
			this.setState({
				version: data.version,
				news: data.news,
				pages: pagesState,
				_currentPage: 0,
				_switchPageTimeout: null,
				_animationTimeout: null,	
			})
		})
	}

	_updatePage() {
		const app = document.querySelector('#app');

		const articles = Array.from(app.querySelectorAll('.article'));
    const n = articles.length;
    if (n <= 3) {
        return;
    }

    if (this.state._currentPage * 3 >= n) {
      this.state._currentPage = 0;
    }
    articles.forEach((el) => el.classList.add('opaque'));
    clearTimeout(this._animationTimeout);

    this._animationTimeout = setTimeout(() => {
	    const start = this.state._currentPage * 3;
	    const end = this.state._currentPage * 3 + 3;
	    articles.forEach((el, i) => {
        if (i >= start && i < end) {
            el.style.display = 'block';
            el.classList.remove('opaque');
        } else {
            el.style.display = 'none';
        }
	    });
	    $$('a.button', app).forEach((e, i) => {
	       e.classList[i === this.state._currentPage ? 'add' : 'remove']('active');
	    });
		}, 300);

	}

	_startPageSwitch() {
		clearInterval(this._switchPageTimeout);
		this._switchPageTimeout = setInterval(this._nextPage.bind(this), 5e3);
	}

	_nextPage() {
		const currentPage = this.state._currentPage++;
		this.setState({
			_currentPage: currentPage
		}, () => {
			this._updatePage();
		});
	}

	buttonClick(event) {
		const el = event.target;
		if(!el.classList.contains('button') || el.classList.contains('active')) {
			return;
		}

		const currentPage = +el.dataset.index
		this.setState({
			_currentPage: currentPage
		}, () => {
			this._updatePage();
			this._startPageSwitch();
		});

	}

	render() {
		return (
			<div className="cliqz-news">

				<a href="#" className="active button" onClick={this.buttonClick} data-index="0"></a>
				<a href="#" className="button" onClick={this.buttonClick} data-index="1"></a>
				<a href="#" className="button" onClick={this.buttonClick} data-index="2"></a>

				<div className="acordion" style={{height: "141px"}} id="news">
					{
						this.state.news.map(function(article) {
							return <a href={article.url} className="article" style={{height: '129px'}}>
								<div className="side-front">
									<Logo logo = {article.logo} />
									<span className="source-name">
										{article.displayUrl}
									</span>
									<p className="title">
										{article.title}
									</p>
								</div>

								<div className="side-back">
									<p className="abstract">
										{article.description}
									</p>
								</div>
							</a>
						})
					}
				</div>
			</div>
		);
	}
}

export default News;