import React, { Component } from 'react';
import Logo from './Logo';

const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
class News extends Component {
	constructor(props) {
		super(props);
		this.buttonClick = this.buttonClick.bind(this);
	}

	get pages() {
		const pageCount = Math.ceil(this.props.news.data.length / 3);
  	const pages = [...Array(pageCount)].map((_, i) => { 
  		return { active: i === 0 }
  	});

  	return pages;
	}

	_updatePage() {
		const app = document.querySelector('#app');

		const articles = Array.from(app.querySelectorAll('.article'));
    const n = articles.length;
    if (n <= 3) {
        return;
    }

    if (this.state._currentPage * 3 >= n) {
    	this.setState({
    		_currentPage: 0
    	});
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

				{
					this.pages.map((page, i) => {
						return <a href="#" key={i} className={"button " + (page.active ? 'active' : '')} onClick={this.buttonClick} data-index={i}></a>
					})
				}

				<div className="acordion" style={{height: "141px"}} id="news">
					{
						this.props.news.data.map(function(article, i) {
							return <a href={article.url} 
												key={i} 
												className="article" 
												style={{height: '129px'}}
												ref={(elem) => { this.articleElem = elem}}>
								<div className="side-front">
									<Logo logo={article.logo} />
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
						}.bind(this))
					}
				</div>
			</div>
		);
	}
}

export default News;